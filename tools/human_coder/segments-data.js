// Static copy of aiActiveLearningStudy/data/extended-analysis/qualitative/{codebook,extracted_segments}.json
const QC_CODEBOOK = {
  "codebook_version": "1.0",
  "approach": "deductive",
  "description": "Deductive codebook for AI-assisted thematic analysis of expert and coordinator review qualitative segments. Categories derived from the study's theoretical framework.",
  "categories": [
    {
      "code": "ICAP",
      "label": "ICAP Engagement",
      "description": "References to learning engagement modes: passive reception, active manipulation, constructive generation, or interactive co-creation. Includes mentions of cognitive engagement depth, level of student participation, or engagement mode classifications.",
      "theoretical_source": "Chi & Wylie (2014). The ICAP Framework.",
      "example_keywords": ["passive", "active", "constructive", "interactive", "engagement", "cognitive", "participation", "hands-on", "building", "creating", "co-creation"],
      "example_segments": [
        "Students actively engage rather than passively watching",
        "The tool requires constructive responses, not just multiple choice"
      ]
    },
    {
      "code": "CONSTRUCTIONISM",
      "label": "Constructionism",
      "description": "References to learning through building, creating, or making meaningful artifacts. Includes mentions of the relationship between construction activities and understanding, personal relevance of what is being built, or the value of producing shareable outputs.",
      "theoretical_source": "Papert & Harel (1991). Situating Constructionism.",
      "example_keywords": ["build", "create", "make", "construct", "artifact", "meaningful", "hands-on", "craft", "produce", "output", "project"],
      "example_segments": [
        "Feels like hands-on training against a DB",
        "The user is not building, making or fixing"
      ]
    },
    {
      "code": "USABILITY",
      "label": "Usability",
      "description": "References to interface design quality, navigation, visual clarity, consistency, error handling, learnability, or any of Nielsen's 10 usability heuristics. Includes comments about user experience, ease of use, or interface friction.",
      "theoretical_source": "Nielsen (1994). Usability Engineering.",
      "example_keywords": ["navigation", "interface", "design", "clear", "confusing", "intuitive", "layout", "responsive", "mobile", "control", "freedom", "error", "feedback"],
      "example_segments": [
        "User control and freedom - during an exercise, how does a user return to a previous exercise",
        "It's clean, easy to use"
      ]
    },
    {
      "code": "PEDAGOGICAL_VALUE",
      "label": "Pedagogical Value",
      "description": "References to learning outcomes, curriculum alignment, teaching utility, concept coverage, assessment potential, or educational effectiveness. Includes mentions of how well the tool supports the intended learning objectives or fits into existing course structures.",
      "theoretical_source": "Derived from TPACK framework (Koehler & Mishra, 2009) and evaluation protocol.",
      "example_keywords": ["learning", "teaching", "curriculum", "lecture", "concept", "objective", "assessment", "students", "classroom", "semester", "module"],
      "example_segments": [
        "This can replace a large chunk of passive theoretical learning",
        "Very focused on the core concept"
      ]
    },
    {
      "code": "DISPOSABILITY",
      "label": "Disposability",
      "description": "References to the simplicity, replaceability, scope limitation, rapid creation, or throwaway nature of the software. Includes comments about AI generation capability, minimal dependencies, single-purpose design, or the artefact being easy to regenerate or discard.",
      "theoretical_source": "DSQI framework; Wiley (2000) on reusability paradox.",
      "example_keywords": ["simple", "disposable", "replaceable", "single-purpose", "lightweight", "minimal", "regenerate", "AI", "generated", "quick", "scope"],
      "example_segments": [
        "If AI created this, it's pretty disposable",
        "It does stick to one topic"
      ]
    },
    {
      "code": "TECHNICAL_QUALITY",
      "label": "Technical Quality",
      "description": "References to code quality, performance, reliability, bugs, technical implementation, browser compatibility, or software engineering concerns. Includes mentions of specific technical issues or praise for technical execution.",
      "theoretical_source": "Software engineering best practices; ISO/IEC 25010.",
      "example_keywords": ["bug", "performance", "code", "technical", "implementation", "browser", "compatibility", "responsive", "timer", "session", "crash"],
      "example_segments": [
        "There were some mobile responsive issues",
        "The feeling of time pressure from the 15 sec timer"
      ]
    },
    {
      "code": "ADOPTION_BARRIER",
      "label": "Adoption Barriers",
      "description": "References to obstacles for classroom use, integration challenges, prerequisites for deployment, concerns about student access, or reasons a coordinator might hesitate to adopt the tool. Includes practical constraints and contextual limitations.",
      "theoretical_source": "Davis (1989). Technology Acceptance Model.",
      "example_keywords": ["barrier", "obstacle", "concern", "challenge", "difficult", "require", "ensure", "limitation", "access", "laptop", "mobile", "device"],
      "example_segments": [
        "I would have to ensure the students bring a laptop to class",
        "I would ensure that AI tools are not available for the students"
      ]
    }
  ],
  "coding_instructions": {
    "assignment_rule": "Assign one primary code and up to two secondary codes per segment. Use 'UNCODED' if no category fits.",
    "confidence_scale": "0.0 to 1.0, where 1.0 = certain match, 0.5 = plausible but ambiguous",
    "minimum_confidence": 0.3,
    "segment_types": [
      "expert_icap_justification",
      "expert_constructionism_justification",
      "expert_heuristic_comment",
      "expert_E1_justification",
      "expert_E2_justification",
      "expert_most_positive",
      "expert_most_negative",
      "expert_other_comments",
      "coordinator_Q7_benefit",
      "coordinator_Q8_drawback"
    ]
  }
};

const QC_SEGMENTS = {
  "total": 46,
  "by_source": {
    "expert": 37,
    "coordinator": 9
  },
  "segments": [
    { "id": "expert-liam-mcnamara-01-unit-testing-gauntlet-most_positive", "source": "expert_review", "reviewer": "Liam McNamara", "artifact_id": "01-unit-testing-gauntlet", "artifact_name": "Unit Testing Gauntlet", "field": "most_positive", "label": "Expert — Most Positive", "text": "It's a simple but useful tool that is fun to use." },
    { "id": "expert-liam-mcnamara-01-unit-testing-gauntlet-most_negative", "source": "expert_review", "reviewer": "Liam McNamara", "artifact_id": "01-unit-testing-gauntlet", "artifact_name": "Unit Testing Gauntlet", "field": "most_negative", "label": "Expert — Most Negative", "text": "Chrome not working with the required version of JavaScript." },
    { "id": "expert-liam-mcnamara-02-big-o-visualiser-most_positive", "source": "expert_review", "reviewer": "Liam McNamara", "artifact_id": "02-big-o-visualiser", "artifact_name": "Big-O Visualiser", "field": "most_positive", "label": "Expert — Most Positive", "text": "Matching code snippets to O notation is a very useful skill." },
    { "id": "expert-liam-mcnamara-02-big-o-visualiser-most_negative", "source": "expert_review", "reviewer": "Liam McNamara", "artifact_id": "02-big-o-visualiser", "artifact_name": "Big-O Visualiser", "field": "most_negative", "label": "Expert — Most Negative", "text": "No undo/redo." },
    { "id": "expert-liam-mcnamara-03-sql-injection-simulator-most_positive", "source": "expert_review", "reviewer": "Liam McNamara", "artifact_id": "03-sql-injection-simulator", "artifact_name": "SQL Injection Simulator", "field": "most_positive", "label": "Expert — Most Positive", "text": "The exploits were fun and interesting." },
    { "id": "expert-liam-mcnamara-03-sql-injection-simulator-most_negative", "source": "expert_review", "reviewer": "Liam McNamara", "artifact_id": "03-sql-injection-simulator", "artifact_name": "SQL Injection Simulator", "field": "most_negative", "label": "Expert — Most Negative", "text": "None, it's great." },
    { "id": "expert-liam-mcnamara-04-css-flexbox-trainer-most_positive", "source": "expert_review", "reviewer": "Liam McNamara", "artifact_id": "04-css-flexbox-trainer", "artifact_name": "CSS Flexbox Trainer", "field": "most_positive", "label": "Expert — Most Positive", "text": "It's very well put together, everything is laid out simply and is very easy to understand what is going on." },
    { "id": "expert-liam-mcnamara-04-css-flexbox-trainer-most_negative", "source": "expert_review", "reviewer": "Liam McNamara", "artifact_id": "04-css-flexbox-trainer", "artifact_name": "CSS Flexbox Trainer", "field": "most_negative", "label": "Expert — Most Negative", "text": "None!" },
    { "id": "expert-liam-mcnamara-05-lexical-analyser-trainer-most_positive", "source": "expert_review", "reviewer": "Liam McNamara", "artifact_id": "05-lexical-analyser-trainer", "artifact_name": "Lexical Analyser Trainer", "field": "most_positive", "label": "Expert — Most Positive", "text": "Gives hints as to how to parse text and is easy to use." },
    { "id": "expert-liam-mcnamara-05-lexical-analyser-trainer-most_negative", "source": "expert_review", "reviewer": "Liam McNamara", "artifact_id": "05-lexical-analyser-trainer", "artifact_name": "Lexical Analyser Trainer", "field": "most_negative", "label": "Expert — Most Negative", "text": "Some text on the exact purpose of the exercise would help in a couple of sections." },
    { "id": "expert-peter-hall-01-unit-testing-gauntlet-most_positive", "source": "expert_review", "reviewer": "Peter Hall", "artifact_id": "01-unit-testing-gauntlet", "artifact_name": "Unit Testing Gauntlet", "field": "most_positive", "label": "Expert — Most Positive", "text": "It's hands-on, free form coding answers - no limit on individual creativity in finding solutions" },
    { "id": "expert-peter-hall-01-unit-testing-gauntlet-most_negative", "source": "expert_review", "reviewer": "Peter Hall", "artifact_id": "01-unit-testing-gauntlet", "artifact_name": "Unit Testing Gauntlet", "field": "most_negative", "label": "Expert — Most Negative", "text": "Inability to view previous answers" },
    { "id": "expert-peter-hall-01-unit-testing-gauntlet-other_comments", "source": "expert_review", "reviewer": "Peter Hall", "artifact_id": "01-unit-testing-gauntlet", "artifact_name": "Unit Testing Gauntlet", "field": "other_comments", "label": "Expert — Other Comments", "text": "Might be improved by understanding real world frequency of bugs and evaluating responses against that - so a simple fix which passes the test would score lower than one that passed the test but included logic that covered likely issues in a production environment.  I guess context would be the word" },
    { "id": "expert-peter-hall-02-big-o-visualiser-most_positive", "source": "expert_review", "reviewer": "Peter Hall", "artifact_id": "02-big-o-visualiser", "artifact_name": "Big-O Visualiser", "field": "most_positive", "label": "Expert — Most Positive", "text": "The feedback on answers" },
    { "id": "expert-peter-hall-02-big-o-visualiser-most_negative", "source": "expert_review", "reviewer": "Peter Hall", "artifact_id": "02-big-o-visualiser", "artifact_name": "Big-O Visualiser", "field": "most_negative", "label": "Expert — Most Negative", "text": "The feeling of time pressure" },
    { "id": "expert-peter-hall-03-sql-injection-simulator-most_positive", "source": "expert_review", "reviewer": "Peter Hall", "artifact_id": "03-sql-injection-simulator", "artifact_name": "SQL Injection Simulator", "field": "most_positive", "label": "Expert — Most Positive", "text": "Feels like you are interrogating a DB" },
    { "id": "expert-peter-hall-03-sql-injection-simulator-most_negative", "source": "expert_review", "reviewer": "Peter Hall", "artifact_id": "03-sql-injection-simulator", "artifact_name": "SQL Injection Simulator", "field": "most_negative", "label": "Expert — Most Negative", "text": "If you do not get the bonus questions on level 1 - you cannot progress to the next level - or at least there is no obvious way to do so" },
    { "id": "expert-peter-hall-04-css-flexbox-trainer-most_positive", "source": "expert_review", "reviewer": "Peter Hall", "artifact_id": "04-css-flexbox-trainer", "artifact_name": "CSS Flexbox Trainer", "field": "most_positive", "label": "Expert — Most Positive", "text": "It's quick to make progress" },
    { "id": "expert-peter-hall-04-css-flexbox-trainer-most_negative", "source": "expert_review", "reviewer": "Peter Hall", "artifact_id": "04-css-flexbox-trainer", "artifact_name": "CSS Flexbox Trainer", "field": "most_negative", "label": "Expert — Most Negative", "text": "Hints are a little too easy - the other hints still needed some application - I do see that you lose points so maybe thats OK" },
    { "id": "expert-peter-hall-04-css-flexbox-trainer-other_comments", "source": "expert_review", "reviewer": "Peter Hall", "artifact_id": "04-css-flexbox-trainer", "artifact_name": "CSS Flexbox Trainer", "field": "other_comments", "label": "Expert — Other Comments", "text": "I actually forgot the task.  Even though its visually represented, the initial challenge could be presented on the game page" },
    { "id": "expert-peter-hall-05-lexical-analyser-trainer-most_positive", "source": "expert_review", "reviewer": "Peter Hall", "artifact_id": "05-lexical-analyser-trainer", "artifact_name": "Lexical Analyser Trainer", "field": "most_positive", "label": "Expert — Most Positive", "text": "Great tool into the mysterious world of regular expressions - these cannot be learnt from reading - you do need an interactive tool" },
    { "id": "expert-peter-hall-05-lexical-analyser-trainer-most_negative", "source": "expert_review", "reviewer": "Peter Hall", "artifact_id": "05-lexical-analyser-trainer", "artifact_name": "Lexical Analyser Trainer", "field": "most_negative", "label": "Expert — Most Negative", "text": "Remembering what the task is - you get this wording between levels and its easy to forget" },
    { "id": "expert-tawny-whatmore-01-unit-testing-gauntlet-most_positive", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "01-unit-testing-gauntlet", "artifact_name": "Unit Testing Gauntlet", "field": "most_positive", "label": "Expert — Most Positive", "text": "the level system delivered the learning outcomes in a repetitive way that was not tiresome, but engaging with the 3 different tasks per level. repeatedly writing test cases for instance solidified the syntax in muscle memory a bit more." },
    { "id": "expert-tawny-whatmore-01-unit-testing-gauntlet-most_negative", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "01-unit-testing-gauntlet", "artifact_name": "Unit Testing Gauntlet", "field": "most_negative", "label": "Expert — Most Negative", "text": "the code editor was challenging to spot syntax issues being in plain text with no colours or lint feedback." },
    { "id": "expert-tawny-whatmore-01-unit-testing-gauntlet-other_comments", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "01-unit-testing-gauntlet", "artifact_name": "Unit Testing Gauntlet", "field": "other_comments", "label": "Expert — Other Comments", "text": "integrating the source code directly into the tooling ui would remind the learner to read through it some more as the link to the source code is easily missed at the start. Also reading the source code to 'cheat' is valuable learning in itself. making it more accessible could prevent a tired learner from asking what the answer is from AI and avoiding the learning outcomes." },
    { "id": "expert-tawny-whatmore-02-big-o-visualiser-most_positive", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "02-big-o-visualiser", "artifact_name": "Big-O Visualiser", "field": "most_positive", "label": "Expert — Most Positive", "text": "the different ways of interacting was good, instead of having all levels as a 'choose abcd' format. ending on the comparison was very good as it cemented the learning well through code analysis." },
    { "id": "expert-tawny-whatmore-02-big-o-visualiser-most_negative", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "02-big-o-visualiser", "artifact_name": "Big-O Visualiser", "field": "most_negative", "label": "Expert — Most Negative", "text": "because I didn't really know about big-o notation going into the tool I did feel a bit lost and ended up guessing." },
    { "id": "expert-tawny-whatmore-02-big-o-visualiser-other_comments", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "02-big-o-visualiser", "artifact_name": "Big-O Visualiser", "field": "other_comments", "label": "Expert — Other Comments", "text": "sound effects on scoring mechanics could give more reward and excitement to the learner." },
    { "id": "expert-tawny-whatmore-03-sql-injection-simulator-most_positive", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "03-sql-injection-simulator", "artifact_name": "SQL Injection Simulator", "field": "most_positive", "label": "Expert — Most Positive", "text": "learning at the point of view from an attacker is very valuable. the ui was fun to use and contained a lot of data which was laid out in a very usable way." },
    { "id": "expert-tawny-whatmore-03-sql-injection-simulator-most_negative", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "03-sql-injection-simulator", "artifact_name": "SQL Injection Simulator", "field": "most_negative", "label": "Expert — Most Negative", "text": "the hints could be revealed from most useful (the last one) to least useful (first one). this would enable the most valuable hint to be revealed first and cause the least amount of point loss." },
    { "id": "expert-tawny-whatmore-03-sql-injection-simulator-other_comments", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "03-sql-injection-simulator", "artifact_name": "SQL Injection Simulator", "field": "other_comments", "label": "Expert — Other Comments", "text": "an option where no points would be given but the solution to the problem would be revealed could be beneficial to allow the learner to still progress if they were stuck on answer and would also allow the user to learn from the solution that they were stuck on." },
    { "id": "expert-tawny-whatmore-04-css-flexbox-trainer-most_positive", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "04-css-flexbox-trainer", "artifact_name": "CSS Flexbox Trainer", "field": "most_positive", "label": "Expert — Most Positive", "text": "the code input mimics a traditional coding environment with linting/colours etc." },
    { "id": "expert-tawny-whatmore-04-css-flexbox-trainer-most_negative", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "04-css-flexbox-trainer", "artifact_name": "CSS Flexbox Trainer", "field": "most_negative", "label": "Expert — Most Negative", "text": "the prompt is easily missed if not paying attention and the dialog is dismissed immediately" },
    { "id": "expert-tawny-whatmore-04-css-flexbox-trainer-other_comments", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "04-css-flexbox-trainer", "artifact_name": "CSS Flexbox Trainer", "field": "other_comments", "label": "Expert — Other Comments", "text": "the relevant options for a css property could be displayed somewhere to help guide the user e.g. listing what are the accepted values for the align-items property are somewhere. perhaps as a hint even." },
    { "id": "expert-tawny-whatmore-05-lexical-analyser-trainer-most_positive", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "05-lexical-analyser-trainer", "artifact_name": "Lexical Analyser Trainer", "field": "most_positive", "label": "Expert — Most Positive", "text": "showing the possible regex components underneath the input" },
    { "id": "expert-tawny-whatmore-05-lexical-analyser-trainer-most_negative", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "05-lexical-analyser-trainer", "artifact_name": "Lexical Analyser Trainer", "field": "most_negative", "label": "Expert — Most Negative", "text": "the regex components were not actively explained as the user selected them. the question the user had to answer was not present during the interaction stage." },
    { "id": "expert-tawny-whatmore-05-lexical-analyser-trainer-other_comments", "source": "expert_review", "reviewer": "Tawny Whatmore", "artifact_id": "05-lexical-analyser-trainer", "artifact_name": "Lexical Analyser Trainer", "field": "other_comments", "label": "Expert — Other Comments", "text": "using something like tool tips instead of dialogs could help keep the user more informed, reduce the risk of missing information and allow the user to progress at their own pace. for example showing the success ui immediately instead of allowing the user to digest the success state of the data vs the regex." },
    { "id": "coord-andrew-le-gear-01-unit-testing-gauntlet-Q7_benefit", "source": "coordinator_review", "reviewer": "Andrew Le Gear", "artifact_id": "01-unit-testing-gauntlet", "artifact_name": "Unit Testing Gauntlet", "field": "Q7_benefit", "label": "Coordinator — Most Significant Benefit", "text": "This can replace a large chunk of passive theoretical learning in one of the lectures during the semester.  It provides a novel  in class way to teach a difficult programming concept." },
    { "id": "coord-andrew-le-gear-01-unit-testing-gauntlet-Q8_drawback", "source": "coordinator_review", "reviewer": "Andrew Le Gear", "artifact_id": "01-unit-testing-gauntlet", "artifact_name": "Unit Testing Gauntlet", "field": "Q8_drawback", "label": "Coordinator — Most Significant Drawback", "text": "I think there were some mobile responsive issues with the page.  It is probably best done on a laptop screen.  I would have to ensure the students bring a laptop to class,  or maybe engage with the developer to improve the implementation for mobile." },
    { "id": "coord-dr.-alan-ryan-04-css-flexbox-trainer-Q7_benefit", "source": "coordinator_review", "reviewer": "Dr. Alan Ryan", "artifact_id": "04-css-flexbox-trainer", "artifact_name": "CSS Flexbox Trainer", "field": "Q7_benefit", "label": "Coordinator — Most Significant Benefit", "text": "As the framework is provided, the student can focus on the specific task at hand." },
    { "id": "coord-dr.-alan-ryan-04-css-flexbox-trainer-Q8_drawback", "source": "coordinator_review", "reviewer": "Dr. Alan Ryan", "artifact_id": "04-css-flexbox-trainer", "artifact_name": "CSS Flexbox Trainer", "field": "Q8_drawback", "label": "Coordinator — Most Significant Drawback", "text": "When more complex (multi-stage) tasks are the objective, this would need to provide less support so that the student has to construct the flow of logic without hints." },
    { "id": "coord-dr.-nikola-s.-nikolov-03-sql-injection-simulator-Q7_benefit", "source": "coordinator_review", "reviewer": "Dr. Nikola S. Nikolov", "artifact_id": "03-sql-injection-simulator", "artifact_name": "SQL Injection Simulator", "field": "Q7_benefit", "label": "Coordinator — Most Significant Benefit", "text": "Clear and accessible explanation of the SQL injection concept through a practical example combined with hands-on experience, enabling students to understand both the theory and its real-world implications." },
    { "id": "coord-jim-buckley-05-lexical-analyser-trainer-Q7_benefit", "source": "coordinator_review", "reviewer": "Jim Buckley", "artifact_id": "05-lexical-analyser-trainer", "artifact_name": "Lexical Analyser Trainer", "field": "Q7_benefit", "label": "Coordinator — Most Significant Benefit", "text": "Provides engaging, relevant material while relieving the ML of the effort of constructing it" },
    { "id": "coord-jim-buckley-05-lexical-analyser-trainer-Q8_drawback", "source": "coordinator_review", "reviewer": "Jim Buckley", "artifact_id": "05-lexical-analyser-trainer", "artifact_name": "Lexical Analyser Trainer", "field": "Q8_drawback", "label": "Coordinator — Most Significant Drawback", "text": "It needs a few small refinements to be truly effective: the initial exercise should be a video example. And the descriptive prompt should stay on screen as you work through each  regular-expression exercises. I also note that the regular expression matches more in the sample code than it means to: the pre dot and post dot part of a float (for integers), keywords for identifiers etc. That is quite confusing." },
    { "id": "coord-paddy-healy-02-big-o-visualiser-Q7_benefit", "source": "coordinator_review", "reviewer": "Paddy Healy", "artifact_id": "02-big-o-visualiser", "artifact_name": "Big-O Visualiser", "field": "Q7_benefit", "label": "Coordinator — Most Significant Benefit", "text": "Gives students practical opportunities to come to understand one of the fundamental aspects of algorithms" },
    { "id": "coord-paddy-healy-02-big-o-visualiser-Q8_drawback", "source": "coordinator_review", "reviewer": "Paddy Healy", "artifact_id": "02-big-o-visualiser", "artifact_name": "Big-O Visualiser", "field": "Q8_drawback", "label": "Coordinator — Most Significant Drawback", "text": "I thought the timeout was a little too fast; the plotting was confusing -- see my botched attempts! :-)  Also, for, say, a linear-time algorithm would I have got correct marks if I plotted f(n)=20n?  I didn't even get that far but the examples seemed to assume a constant of C=1.  That's being extremely nit-picky :-)." }
  ]
};
