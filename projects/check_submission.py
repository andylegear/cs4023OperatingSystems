#!/usr/bin/env python3
"""
check_submission.py — CS4023 Project Submission Checker
Usage:  python check_submission.py  StudentID_Project1.zip
        python check_submission.py  StudentID_Project2.zip  --project 2

Checks:
  1. ZIP filename format
  2. project_N/ top-level folder exists
  3. project_N/code/ directory exists
  4. project_N/code/Makefile present
  5. At least one .c file in project_N/code/
  6. project_N/ai_log/ directory exists and has at least one file
  7. project_N/README.md present
  8. README.md contains all 7 required headings
  9. (optional) Attempts 'make' inside extracted code/ directory

Exit code: 0 if all required checks pass, 1 otherwise.
"""

import sys
import os
import re
import zipfile
import tempfile
import shutil
import subprocess
import argparse

# ── Required README headings (exact text, case-insensitive match) ──────────
REQUIRED_HEADINGS = [
    "## How to Build and Run",
    "## What Works",
    "## What Doesn't Work",          # also matches "What Doesn't Work / Known Issues"
    "## AI Tools Used",
    "## Where to Find the AI Critique",
    "## OS Concepts Demonstrated",
    "## Test Evidence",
]

# ANSI colours — disabled automatically if not a TTY
def _colour(code):
    return code if sys.stdout.isatty() else ""

GREEN  = _colour("\033[92m")
RED    = _colour("\033[91m")
YELLOW = _colour("\033[93m")
CYAN   = _colour("\033[96m")
BOLD   = _colour("\033[1m")
RESET  = _colour("\033[0m")

PASS  = f"{GREEN}PASS{RESET}"
FAIL  = f"{RED}FAIL{RESET}"
WARN  = f"{YELLOW}WARN{RESET}"
INFO  = f"{CYAN}INFO{RESET}"


def report(status, message):
    print(f"  [{status}] {message}")


def check_filename(zip_path, project_num):
    """Check ZIP filename matches StudentID_ProjectN.zip"""
    basename = os.path.basename(zip_path)
    pattern = rf'^[A-Za-z][0-9]{{8}}_Project{project_num}\.zip$'
    if re.match(pattern, basename, re.IGNORECASE):
        report(PASS, f"Filename format OK: {basename}")
        return True
    else:
        report(FAIL, f"Filename should be like A12345678_Project{project_num}.zip — got: {basename}")
        return False


def check_structure(extract_dir, project_num):
    """Check required directory/file structure inside the ZIP."""
    results = {}
    prefix = f"project_{project_num}"

    # 1. Top-level folder
    top = os.path.join(extract_dir, prefix)
    if os.path.isdir(top):
        report(PASS, f"{prefix}/ folder found")
        results['top'] = True
    else:
        # Tolerate case differences
        entries = os.listdir(extract_dir)
        match = next((e for e in entries if e.lower() == prefix), None)
        if match:
            report(WARN, f"Found '{match}/' but expected lowercase '{prefix}/'")
            top = os.path.join(extract_dir, match)
            results['top'] = True
        else:
            report(FAIL, f"Missing top-level folder '{prefix}/'  (found: {entries})")
            results['top'] = False
            return results, top

    # 2. code/ directory
    code_dir = os.path.join(top, "code")
    if os.path.isdir(code_dir):
        report(PASS, f"{prefix}/code/ directory found")
        results['code_dir'] = True
    else:
        report(FAIL, f"Missing {prefix}/code/ directory")
        results['code_dir'] = False

    # 3. Makefile
    makefile = os.path.join(code_dir, "Makefile")
    if os.path.isfile(makefile):
        report(PASS, "Makefile found in code/")
        results['makefile'] = True
    else:
        report(FAIL, "No Makefile in code/")
        results['makefile'] = False

    # 4. .c source file(s)
    c_files = [f for f in os.listdir(code_dir) if f.endswith('.c')] if os.path.isdir(code_dir) else []
    if c_files:
        report(PASS, f".c file(s) found: {', '.join(c_files)}")
        results['c_files'] = True
    else:
        report(FAIL, "No .c files found in code/")
        results['c_files'] = False

    # 5. ai_log/ directory with content
    ai_dir = os.path.join(top, "ai_log")
    if os.path.isdir(ai_dir):
        ai_files = [f for f in os.listdir(ai_dir)
                    if os.path.isfile(os.path.join(ai_dir, f))]
        if ai_files:
            report(PASS, f"ai_log/ has {len(ai_files)} file(s): {', '.join(ai_files)}")
            results['ai_log'] = True
        else:
            report(FAIL, "ai_log/ directory is empty")
            results['ai_log'] = False
    else:
        report(FAIL, f"Missing {prefix}/ai_log/ directory")
        results['ai_log'] = False

    # 6. README.md
    readme_path = os.path.join(top, "README.md")
    if os.path.isfile(readme_path):
        report(PASS, "README.md found")
        results['readme'] = True
        results['readme_path'] = readme_path
    else:
        # Case-insensitive search
        entries = os.listdir(top)
        match = next((e for e in entries if e.lower() == "readme.md"), None)
        if match:
            report(WARN, f"Found '{match}' — note it should be exactly 'README.md'")
            results['readme'] = True
            results['readme_path'] = os.path.join(top, match)
        else:
            report(FAIL, "Missing README.md")
            results['readme'] = False
            results['readme_path'] = None

    return results, top, code_dir


def check_readme_headings(readme_path):
    """Check that README.md contains all 7 required headings."""
    if not readme_path or not os.path.isfile(readme_path):
        report(FAIL, "README.md not found — cannot check headings")
        return False

    with open(readme_path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    all_pass = True
    for heading in REQUIRED_HEADINGS:
        # Case-insensitive; heading text starts at beginning of a line
        pattern = re.escape(heading[3:])           # strip leading "## "
        found = re.search(r'^##\s+' + pattern, content, re.IGNORECASE | re.MULTILINE)
        if found:
            report(PASS, f"Heading found: {heading}")
        else:
            report(FAIL, f"Missing heading: {heading}")
            all_pass = False

    # Warn about thin sections (< 30 chars of content under heading)
    lines = content.splitlines()
    for i, line in enumerate(lines):
        if line.startswith("## "):
            next_heading = next(
                (j for j in range(i + 1, len(lines)) if lines[j].startswith("## ")),
                len(lines)
            )
            section_content = "\n".join(lines[i + 1:next_heading]).strip()
            if len(section_content) < 30:
                report(WARN, f"Section '{line}' looks thin (< 30 chars of content)")

    return all_pass


def try_make(code_dir):
    """Attempt to run 'make' inside code_dir (Linux/macOS only)."""
    if sys.platform.startswith("win"):
        report(INFO, "Skipping 'make' check on Windows")
        return None

    if not shutil.which("make"):
        report(INFO, "make not found in PATH — skipping build check")
        return None

    makefile = os.path.join(code_dir, "Makefile")
    if not os.path.isfile(makefile):
        report(FAIL, "Cannot attempt build — Makefile missing")
        return False

    try:
        result = subprocess.run(
            ["make", "-C", code_dir],
            capture_output=True, text=True, timeout=30
        )
        if result.returncode == 0:
            report(PASS, "make succeeded")
            return True
        else:
            report(FAIL, f"make failed (exit {result.returncode})")
            if result.stderr:
                for line in result.stderr.strip().splitlines()[:8]:
                    print(f"         {line}")
            return False
    except subprocess.TimeoutExpired:
        report(WARN, "make timed out after 30 seconds")
        return None
    except Exception as exc:
        report(WARN, f"make could not be run: {exc}")
        return None


def main():
    parser = argparse.ArgumentParser(
        description="CS4023 Project submission structure checker"
    )
    parser.add_argument("zipfile", help="Path to the submission ZIP file")
    parser.add_argument(
        "--project", "-p",
        type=int, default=None,
        help="Project number (1-5). Inferred from filename if omitted."
    )
    parser.add_argument(
        "--no-build", action="store_true",
        help="Skip the optional 'make' build check"
    )
    args = parser.parse_args()

    zip_path = args.zipfile

    # ── Infer project number from filename if not supplied ─────────────
    project_num = args.project
    if project_num is None:
        m = re.search(r'[Pp]roject(\d)', os.path.basename(zip_path))
        if m:
            project_num = int(m.group(1))
        else:
            project_num = 1
            print(f"{YELLOW}Could not infer project number from filename;"
                  f" defaulting to 1.  Use --project N to override.{RESET}")

    print(f"\n{BOLD}CS4023 Submission Checker — Project {project_num}{RESET}")
    print(f"ZIP:  {zip_path}\n")

    failures = 0
    warnings = 0

    # ── Check: ZIP file exists ────────────────────────────────────────
    if not os.path.isfile(zip_path):
        print(f"[{FAIL}] File not found: {zip_path}")
        sys.exit(1)

    # ── Check: filename format ────────────────────────────────────────
    print(f"{BOLD}── Filename ───────────────────────────────────{RESET}")
    if not check_filename(zip_path, project_num):
        failures += 1

    # ── Extract ───────────────────────────────────────────────────────
    extract_dir = tempfile.mkdtemp(prefix="cs4023_check_")
    try:
        try:
            with zipfile.ZipFile(zip_path, 'r') as zf:
                zf.extractall(extract_dir)
        except zipfile.BadZipFile:
            print(f"[{FAIL}] Not a valid ZIP file")
            sys.exit(1)

        # ── Check: structure ─────────────────────────────────────────
        print(f"\n{BOLD}── Directory Structure ────────────────────────{RESET}")
        struct_results, top, code_dir = check_structure(extract_dir, project_num)

        for key in ('top', 'code_dir', 'makefile', 'c_files', 'ai_log', 'readme'):
            if not struct_results.get(key, False):
                failures += 1

        # ── Check: README headings ────────────────────────────────────
        print(f"\n{BOLD}── README.md Headings ─────────────────────────{RESET}")
        readme_path = struct_results.get('readme_path')
        if not check_readme_headings(readme_path):
            failures += 1

        # ── Check: build (optional) ───────────────────────────────────
        if not args.no_build:
            print(f"\n{BOLD}── Build Check (optional) ─────────────────────{RESET}")
            build_ok = try_make(code_dir)
            if build_ok is False:
                failures += 1

    finally:
        shutil.rmtree(extract_dir, ignore_errors=True)

    # ── Summary ───────────────────────────────────────────────────────
    print(f"\n{'═' * 48}")
    if failures == 0:
        print(f"{GREEN}{BOLD}All required checks PASSED ✓{RESET}")
        print("Your submission structure looks good.")
        sys.exit(0)
    else:
        print(f"{RED}{BOLD}{failures} check(s) FAILED ✗{RESET}")
        print("Fix the issues above before submitting.")
        sys.exit(1)


if __name__ == "__main__":
    main()
