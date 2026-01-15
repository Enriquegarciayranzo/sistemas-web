// ---------------------------------------------
//  questions.js
//  Contiene las 60 preguntas completas del test
//  Convertidas a formato estándar para el quiz
// ---------------------------------------------

const DATA = {
  "preguntas": [
    {
      "id": 1,
      "pregunta": "Empirical evaluation:",
      "opciones": [
        "Studies real users interacting with the system",
        "Uses only theoretical analysis",
        "Performs analytical evaluations without real users",
        "Cannot test prototypes"
      ],
      "correcta": "Studies real users interacting with the system"
    },
    {
      "id": 2,
      "pregunta": "Good interaction design includes:",
      "opciones": [
        "Hidden buttons",
        "Clear, immediate feedback",
        "Random responses",
        "Complex gestures"
      ],
      "correcta": "Clear, immediate feedback"
    },
    {
      "id": 3,
      "pregunta": "The goal of scenarios is to:",
      "opciones": [
        "Describe how a user achieves goals using the system",
        "Document typography",
        "Measure performance",
        "Validate colors"
      ],
      "correcta": "Describe how a user achieves goals using the system"
    },
    {
      "id": 4,
      "pregunta": "An example of poor affordance:",
      "opciones": [
        "A door that looks like pull but pushes",
        "Button shaped like button",
        "Correct slider",
        "Clickable link"
      ],
      "correcta": "A door that looks like pull but pushes"
    },
    {
      "id": 5,
      "pregunta": "Personas help design decisions because:",
      "opciones": [
        "Validating hardware is rewarding",
        "Add context about user needs",
        "Replace research",
        "Define budgets"
      ],
      "correcta": "Add context about user needs"
    },
    {
      "id": 6,
      "pregunta": "The first step of UCD is:",
      "opciones": [
        "Generating sketches",
        "Choosing colors",
        "Understanding users and context",
        "Implementing a prototype"
      ],
      "correcta": "Understanding users and context"
    },
    {
      "id": 7,
      "pregunta": "Evaluation in HRI focuses on:",
      "opciones": [
        "Checking how well a design supports user goals",
        "Improving hardware",
        "Increasing CPU speed",
        "Avoiding design iterations"
      ],
      "correcta": "Checking how well a design supports user goals"
    },
    {
      "id": 8,
      "pregunta": "Mapping helps users by:",
      "opciones": [
        "Showing natural control–effect relationships",
        "Reducing affordances",
        "Increasing autonomy",
        "Limiting mistakes"
      ],
      "correcta": "Showing natural control–effect relationships"
    },
    {
      "id": 9,
      "pregunta": "Wizard-of-Oz testing:",
      "opciones": [
        "Human simulates missing functions",
        "User controls robot",
        "No users",
        "Robot simulates missing functions"
      ],
      "correcta": "Human simulates missing functions"
    },
    {
      "id": 10,
      "pregunta": "Universal Design:",
      "opciones": [
        "Targets only experts",
        "Only wheelchair users",
        "Seeks broad inclusivity",
        "Ignores impairments"
      ],
      "correcta": "Seeks broad inclusivity"
    },
    {
      "id": 11,
      "pregunta": "Barrier for visually impaired users:",
      "opciones": [
        "Bright screen",
        "No text alternatives",
        "Short sounds",
        "Fast processors"
      ],
      "correcta": "No text alternatives"
    },
    {
      "id": 12,
      "pregunta": "Which is an assistive technology?",
      "opciones": [
        "AMOLED display",
        "Screen enlarger",
        "Bluetooth tracker",
        "Laser sensor"
      ],
      "correcta": "Screen enlarger"
    },
    {
      "id": 13,
      "pregunta": "Card Sorting helps designers mainly to:",
      "opciones": [
        "Group information based on user categorization",
        "Find bugs",
        "Reduce content",
        "Test reaction time"
      ],
      "correcta": "Group information based on user categorization"
    },
    {
      "id": 14,
      "pregunta": "Mental model alignment refers to:",
      "opciones": [
        "How well the system matches user expectations",
        "Reducing redundancy",
        "Screen layout",
        "Hardware flow"
      ],
      "correcta": "How well the system matches user expectations"
    },
    {
      "id": 15,
      "pregunta": "A design with strong feedback:",
      "opciones": [
        "Delays updates",
        "Shows results immediately",
        "Hides warnings",
        "Blocks interaction"
      ],
      "correcta": "Shows results immediately"
    },
    {
      "id": 16,
      "pregunta": "Which method simulates user steps to find issues?",
      "opciones": [
        "A/B Testing",
        "Storyboarding",
        "Cognitive Walkthrough",
        "Heuristic Simulation"
      ],
      "correcta": "Cognitive Walkthrough"
    },
    {
      "id": 17,
      "pregunta": "A good scenario:",
      "opciones": [
        "Describes a real situation related to a goal",
        "Focuses on UI colors",
        "Is highly technical",
        "Describes constraints"
      ],
      "correcta": "Describes a real situation related to a goal"
    },
    {
      "id": 18,
      "pregunta": "Which interaction dimension refers to timing?",
      "opciones": [
        "Words",
        "Visual form",
        "Time",
        "Behavior"
      ],
      "correcta": "Time"
    },
    {
      "id": 19,
      "pregunta": "A persona represents:",
      "opciones": [
        "The average user age",
        "A fictional but research-based user archetype",
        "A stakeholder",
        "A feature list"
      ],
      "correcta": "A fictional but research-based user archetype"
    },
    {
      "id": 20,
      "pregunta": "Computer Vision enables robots to:",
      "opciones": [
        "Optimize memory",
        "Predict battery issues",
        "Improve Wi-Fi",
        "Interpret visual information"
      ],
      "correcta": "Interpret visual information"
    },
    {
      "id": 21,
      "pregunta": "Prototyping helps teams:",
      "opciones": [
        "Finalize features",
        "Test ideas quickly",
        "Avoid users",
        "Guarantee success"
      ],
      "correcta": "Test ideas quickly"
    },
    {
      "id": 22,
      "pregunta": "A high-fidelity prototype:",
      "opciones": [
        "Lacks interaction",
        "Cannot animate",
        "Looks close to final",
        "Must be fully functional"
      ],
      "correcta": "Looks close to final"
    },
    {
      "id": 23,
      "pregunta": "A poor conceptual model causes:",
      "opciones": [
        "Users guessing how system works",
        "Lower battery",
        "Faster tasks",
        "Better prevention"
      ],
      "correcta": "Users guessing how system works"
    },
    {
      "id": 24,
      "pregunta": "Heuristic evaluation is performed by:",
      "opciones": [
        "Random testers",
        "Marketing",
        "End users",
        "Designers using usability principles"
      ],
      "correcta": "Designers using usability principles"
    },
    {
      "id": 25,
      "pregunta": "A Nielsen heuristic is:",
      "opciones": [
        "Visibility of system status",
        "Mandatory animations",
        "Hidden mapping",
        "Audio-only feedback"
      ],
      "correcta": "Visibility of system status"
    },
    {
      "id": 26,
      "pregunta": "Low-fidelity prototypes are best for:",
      "opciones": [
        "Precise details",
        "Fast communication of ideas",
        "Complex algorithm tests",
        "Debugging code"
      ],
      "correcta": "Fast communication of ideas"
    },
    {
      "id": 27,
      "pregunta": "An affordance helps users by:",
      "opciones": [
        "Indicating memory usage",
        "Adjusting system speed",
        "Preventing errors",
        "Showing clues about possible actions"
      ],
      "correcta": "Showing clues about possible actions"
    },
    {
      "id": 28,
      "pregunta": "Which principle supports error recovery?",
      "opciones": [
        "Visibility",
        "Efficiency",
        "Feedback",
        "Undo/redo"
      ],
      "correcta": "Undo/redo"
    },
    {
      "id": 29,
      "pregunta": "A scenario describing a user reaching a goal is called:",
      "opciones": [
        "Engineering scenario",
        "Activity scenario",
        "Mechanical sequence",
        "Constraint scenario"
      ],
      "correcta": "Activity scenario"
    },
    {
      "id": 30,
      "pregunta": "A multimodal interface:",
      "opciones": [
        "Uses multiple modalities",
        "Only gestures",
        "Only voice",
        "Motor wheels"
      ],
      "correcta": "Uses multiple modalities"
    },
    {
      "id": 31,
      "pregunta": "Prototyping allows:",
      "opciones": [
        "Freeze requirements",
        "Gather feedback early",
        "Ignore users",
        "Guarantee deployment"
      ],
      "correcta": "Gather feedback early"
    },
    {
      "id": 32,
      "pregunta": "A constraint helps by:",
      "opciones": [
        "Making UI complex",
        "Reducing performance",
        "Removing testing",
        "Limiting actions to prevent mistakes"
      ],
      "correcta": "Limiting actions to prevent mistakes"
    },
    {
      "id": 33,
      "pregunta": "Natural mapping:",
      "opciones": [
        "Volume knob increases sound",
        "Reverse scale",
        "Wrong arrow",
        "Random menu"
      ],
      "correcta": "Volume knob increases sound"
    },
    {
      "id": 34,
      "pregunta": "Quantitative data example:",
      "opciones": [
        "Feelings",
        "Measured task time",
        "Opinions",
        "Stories"
      ],
      "correcta": "Measured task time"
    },
    {
      "id": 35,
      "pregunta": "Method to compare two designs statistically:",
      "opciones": [
        "Heuristic evaluation",
        "A/B testing",
        "Storyboarding",
        "Card sorting"
      ],
      "correcta": "A/B testing"
    },
    {
      "id": 36,
      "pregunta": "Consistency helps by:",
      "opciones": [
        "Adding color",
        "Reusing past knowledge",
        "Preventing hardware failures",
        "Increasing robot speed"
      ],
      "correcta": "Reusing past knowledge"
    },
    {
      "id": 37,
      "pregunta": "Interaction breakdowns occur when:",
      "opciones": [
        "Predictable behavior",
        "Intuitive layout",
        "High feedback",
        "No clear signals"
      ],
      "correcta": "No clear signals"
    },
    {
      "id": 38,
      "pregunta": "Robots need feedback to:",
      "opciones": [
        "Reduce power",
        "Display brand",
        "Inform users of state",
        "Increase weight"
      ],
      "correcta": "Inform users of state"
    },
    {
      "id": 39,
      "pregunta": "Poor mapping example:",
      "opciones": [
        "Pull handle",
        "Play icon",
        "Controls match burners",
        "Controls do NOT match burners"
      ],
      "correcta": "Controls do NOT match burners"
    },
    {
      "id": 40,
      "pregunta": "NOT part of UCD:",
      "opciones": [
        "Explore",
        "Evaluate",
        "Prototype",
        "Ignore user input"
      ],
      "correcta": "Ignore user input"
    },
    {
      "id": 41,
      "pregunta": "Main purpose of feedback:",
      "opciones": [
        "Inform developer",
        "Delay task",
        "Reduce interface elements",
        "Inform user of system state"
      ],
      "correcta": "Inform user of system state"
    },
    {
      "id": 42,
      "pregunta": "Poor feedback example:",
      "opciones": [
        "Spinner appears",
        "Beep confirm",
        "LED charging",
        "Robot moves silently"
      ],
      "correcta": "Robot moves silently"
    },
    {
      "id": 43,
      "pregunta": "Accessibility guidelines require:",
      "opciones": [
        "Audio-only",
        "Only bright colors",
        "Longest answer",
        "Keyboard alternatives"
      ],
      "correcta": "Keyboard alternatives"
    },
    {
      "id": 44,
      "pregunta": "Technology supporting motor impairments:",
      "opciones": [
        "Sticky keys",
        "Retina display",
        "LED lighting",
        "Touchpad gestures"
      ],
      "correcta": "Sticky keys"
    },
    {
      "id": 45,
      "pregunta": "SLAM allows a robot to:",
      "opciones": [
        "Detect intentions",
        "Follow voice commands",
        "Store profiles",
        "Build map and localize"
      ],
      "correcta": "Build map and localize"
    },
    {
      "id": 46,
      "pregunta": "Robot emotion interpretation uses:",
      "opciones": [
        "Scene reconstruction",
        "Facial expression recognition",
        "Path optimization",
        "Battery modeling"
      ],
      "correcta": "Facial expression recognition"
    },
    {
      "id": 47,
      "pregunta": "Understanding user goals ensures:",
      "opciones": [
        "No testing",
        "Design aligns",
        "Removes constraints",
        "Auto-creates personas"
      ],
      "correcta": "Design aligns"
    },
    {
      "id": 48,
      "pregunta": "Challenge when evaluating prototypes:",
      "opciones": [
        "Users follow path",
        "Prototype = final",
        "Choose longest answer",
        "Misunderstand conceptual model"
      ],
      "correcta": "Misunderstand conceptual model"
    },
    {
      "id": 49,
      "pregunta": "Storyboarding helps teams:",
      "opciones": [
        "Visualize tasks",
        "Improvements",
        "Server logs",
        "Color tests"
      ],
      "correcta": "Visualize tasks"
    },
    {
      "id": 50,
      "pregunta": "Poor scenario writing example:",
      "opciones": [
        "Realistic",
        "Includes constraints",
        "Clear goals",
        "Overly technical and abstract"
      ],
      "correcta": "Overly technical and abstract"
    },
    {
      "id": 51,
      "pregunta": "Why constraints are useful:",
      "opciones": [
        "Prevent invalid actions",
        "Make UI complex",
        "Reduce performance",
        "Remove tests"
      ],
      "correcta": "Prevent invalid actions"
    },
    {
      "id": 52,
      "pregunta": "A good conceptual model:",
      "opciones": [
        "Predict system behavior",
        "Requires memorization",
        "Predicts other users",
        "Increases speed"
      ],
      "correcta": "Predict system behavior"
    },
    {
      "id": 53,
      "pregunta": "Effective feedback helps users:",
      "opciones": [
        "Complete tasks blindly",
        "Reduce buttons",
        "Understand success/failure",
        "Control robot w/o instruction"
      ],
      "correcta": "Understand success/failure"
    },
    {
      "id": 54,
      "pregunta": "Qualitative data refers to:",
      "opciones": [
        "Task time",
        "Error count",
        "User thoughts and feelings",
        "Click numbers"
      ],
      "correcta": "User thoughts and feelings"
    },
    {
      "id": 55,
      "pregunta": "Universal Design aims to create:",
      "opciones": [
        "For experts",
        "Speed only",
        "Special devices",
        "Systems usable by more people"
      ],
      "correcta": "Systems usable by more people"
    },
    {
      "id": 56,
      "pregunta": "Why do designers sketch early?",
      "opciones": [
        "Explore ideas cheaply",
        "Finalize implementation",
        "Avoid testing",
        "Polished visuals"
      ],
      "correcta": "Explore ideas cheaply"
    },
    {
      "id": 57,
      "pregunta": "Benefit of multimodal perception:",
      "opciones": [
        "Fewer sensors",
        "Low satisfaction",
        "Multiple channels support interpretation",
        "Vision-only"
      ],
      "correcta": "Multiple channels support interpretation"
    },
    {
      "id": 58,
      "pregunta": "Good universal design example:",
      "opciones": [
        "Video captions",
        "Audio-only alerts",
        "Color-only indicators",
        "Tiny buttons"
      ],
      "correcta": "Video captions"
    },
    {
      "id": 59,
      "pregunta": "Which design principle keeps users aware of system status?",
      "opciones": [
        "Discoverability",
        "Mapping",
        "Feedback",
        "Constraints"
      ],
      "correcta": "Feedback"
    },
    {
      "id": 60,
      "pregunta": "Scenario including motivation and steps:",
      "opciones": [
        "Hardware table",
        "Algorithm description",
        "Benchmark report",
        "Rich user scenario"
      ],
      "correcta": "Rich user scenario"
    }
  ]
};

// -----------------------------------------------------------------------
// Transformamos DATA → QUESTIONS (formato usado por el quiz)
// -----------------------------------------------------------------------

const QUESTIONS = DATA.preguntas.map((q) => {
  const [optA, optB, optC, optD] = q.opciones;

  let correctLetter = "A";
  if (q.correcta === optB) correctLetter = "B";
  else if (q.correcta === optC) correctLetter = "C";
  else if (q.correcta === optD) correctLetter = "D";

  return {
    id: q.id,
    question: q.pregunta,
    options: { A: optA, B: optB, C: optC, D: optD },
    correctOption: correctLetter
  };
});
