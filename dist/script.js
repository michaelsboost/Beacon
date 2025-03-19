document.addEventListener('alpine:init', () => {
  // App Data
  Alpine.data('app', () => ({
    appData: {
      appName: "Beacon",
      appDescription: "Offline Survival Training & Tools",
      features: {
        tools: {
          title: "Survival Tools",
          items: [
            { name: "SOS Signal", description: "Emits a Morse code distress signal.", icon: "🚨" },
            { name: "Signal Mirror", description: "Flashes an SOS sequence using device screen.", icon: "🪞" },
            { name: "Compass", description: "Uses device orientation sensors for navigation.", icon: "🧭" },
            { name: "Pedometer", description: "Tracks steps and estimated travel distance.", icon: "🚶" },
            { name: "Level Tool", description: "Uses accelerometer to level objects.", icon: "📏" }
          ]
        }
      }
    },
    activeTab: 'training',
    selectedGuide: null,
    searchQuery: '',
    activeCategory: 'all',

    // Filter Guides
    get filteredGuides() {
      let guides = this.appData.features.library.guides;
      if (this.activeCategory !== 'all') {
        guides = guides.filter(guide => guide.category === this.activeCategory);
      }
      if (this.searchQuery) {
        guides = guides.filter(guide =>
          guide.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          guide.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return guides;
    },

    // Open Guide
    openGuide(guide) {
      this.selectedGuide = guide;
    },
  }));
  
  // localStorage
  function saveStateToLocalStorage(key, state) {
    localStorage.setItem(key, JSON.stringify(state));
  }
  function loadStateFromLocalStorage(key, defaultValue) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  }
  
  // Training System
  Alpine.data('training', () => ({
    skillPoints: loadStateFromLocalStorage("skillPoints", 0),

    skills: loadStateFromLocalStorage("skills", [
      // 🎒 Bug-Out Bag Readiness
      {
        name: "Bug-Out Bag Readiness",
        icon: "🎒",
        subSkills: [
            { name: "Weight Management", progress: 0 },
            { name: "Speed Packing", progress: 0 },
            { name: "Endurance Training", progress: 0 }
        ],
        challenges: [
            { text: "Pack a 45L bug-out bag in under 5 minutes.", targetSubSkill: "Speed Packing" },
            { text: "Adjust pack weight for optimal mobility in under 10 minutes.", targetSubSkill: "Weight Management" },
            { text: "Complete a 3-mile hike with a 30lb bag in under 1 hour.", targetSubSkill: "Endurance Training" },
            { text: "Pack essential bug-out gear while blindfolded (simulating power outage).", targetSubSkill: "Speed Packing" },
            { text: "Reduce your bug-out bag weight by at least 15% without removing essentials.", targetSubSkill: "Weight Management" },
            { text: "Perform a full gear check and repack under 3 minutes.", targetSubSkill: "Speed Packing" },
            { text: "Hike for 5 miles while carrying a full bug-out bag and map out water sources along the way.", targetSubSkill: "Endurance Training" }
        ],
        challengeActive: false, expanded: false, level: "Beginner"
    },
      
      // 🛠 Tool Mastery
      {
        name: "Tool Mastery",
        description: "Knife, Axe, Saw",
        icon: "🗡️",
        subSkills: [
          { name: "Knife Skills", progress: 0 },
          { name: "Axe Handling", progress: 0 },
          { name: "Saw Techniques", progress: 0 }
        ],
        challenges: [
          // Knife Skills
          {
            text: "Sharpen a knife to a razor edge in under 5 minutes.",
            targetSubSkill: "Knife Skills"
          },
          {
            text: "Carve a wooden spoon using only a knife in under 10 minutes.",
            targetSubSkill: "Knife Skills"
          },
          {
            text: "Split a log using a knife and a piece of wood in under 5 minutes.",
            targetSubSkill: "Knife Skills"
          },
          {
            text: "Whittle a tent peg from a stick in under 3 minutes.",
            targetSubSkill: "Knife Skills"
          },
          // Axe Handling
          {
            text: "Split a log using an axe in under 3 minutes.",
            targetSubSkill: "Axe Handling"
          },
          {
            text: "Polish an axe using animal fat.",
            targetSubSkill: "Axe Handling"
          },
          {
            text: "Make a featherstick using an axe in under 10 minutes.",
            targetSubSkill: "Axe Handling"
          },
          {
            text: "Chop down a small tree (4-6 inches in diameter) in under 5 minutes.",
            targetSubSkill: "Axe Handling"
          },
          // Saw Techniques
          {
            text: "Cut a straight line through a piece of wood using a saw in under 2 minutes.",
            targetSubSkill: "Saw Techniques"
          },
          {
            text: "Cut a v-notch in a piece of wood using a saw in under 5 minutes.",
            targetSubSkill: "Saw Techniques"
          },
          {
            text: "Cut a log into three equal pieces using a saw in under 10 minutes.",
            targetSubSkill: "Saw Techniques"
          }
        ],
        challenge: {},
        challengeActive: false,
        timeRemaining: 0,
        level: "Beginner",
        expanded: false,
      },
      
      // 🪨 Flint Knapping & Primitive Toolmaking
      {
        name: "Flint Knapping & Primitive Toolmaking",
        description: "Stone Tools, Pressure Flaking, Advanced Crafting",
        icon: "🪨",
        subSkills: [
          { name: "Core Reduction", progress: 0 },
          { name: "Pressure Flaking", progress: 0 },
          { name: "Blade & Tool Making", progress: 0 }
        ],
        challenges: [
          // Core Reduction
          { text: "Select and prepare a suitable rock for knapping.", targetSubSkill: "Core Reduction" },
          { text: "Break a stone into usable flakes using percussion techniques.", targetSubSkill: "Core Reduction" },
          { text: "Create a sharp cutting tool from a raw stone.", targetSubSkill: "Core Reduction" },
      
          // Pressure Flaking
          { text: "Refine a stone blade using pressure flaking techniques.", targetSubSkill: "Pressure Flaking" },
          { text: "Sharpen a dull edge on a flint knife using only a bone or antler.", targetSubSkill: "Pressure Flaking" },
          { text: "Create a notched point for an arrowhead using pressure flaking.", targetSubSkill: "Pressure Flaking" },
      
          // Blade & Tool Making
          { text: "Make a stone knife and attach it to a handle using sinew or cordage.", targetSubSkill: "Blade & Tool Making" },
          { text: "Craft a primitive spearhead using stone and attach it to a shaft.", targetSubSkill: "Blade & Tool Making" },
          { text: "Create a stone scraper for hide processing.", targetSubSkill: "Blade & Tool Making" },
          { text: "Use a stone drill to bore a hole in wood or bone.", targetSubSkill: "Blade & Tool Making" }
        ],
        challenge: {},
        challengeActive: false,
        timeRemaining: 0,
        level: "Beginner",
        expanded: false
      },
      
      // 🔥 Fire Mastery
      {
        name: "Fire Starting",
        icon: "🔥",
        subSkills: [
          { name: "Ferro Rod", progress: 0 },
          { name: "Mirror", progress: 0 },
          { name: "Magnifying Lens", progress: 0 },
          { name: "Bow Drill", progress: 0 },
          { name: "Flint & Steel", progress: 0 },
          { name: "Hand Drill", progress: 0 },
          { name: "Fire Plough", progress: 0 }
        ],
        challenges: [
          // Ferro Rod
          {
            text: "Start a fire using a ferro rod in under 5 minutes.",
            targetSubSkill: "Ferro Rod"
          },
          {
            text: "Ignite a pile of dry tinder using a ferro rod in under 3 minutes.",
            targetSubSkill: "Ferro Rod"
          },
          {
            text: "Start a fire using a ferro rod with damp tinder in under 10 minutes.",
            targetSubSkill: "Ferro Rod"
          },
          // Mirror
          {
            text: "Start a fire using a mirror in under 10 minutes.",
            targetSubSkill: "Mirror"
          },
          {
            text: "Reflect sunlight onto a target 50 meters away using a mirror.",
            targetSubSkill: "Mirror"
          },
          // Magnifying Lens
          {
            text: "Start a fire using a magnifying lens in under 10 minutes.",
            targetSubSkill: "Magnifying Lens"
          },
          {
            text: "Ignite a piece of char cloth using a magnifying lens in under 5 minutes.",
            targetSubSkill: "Magnifying Lens"
          },
          // Bow Drill
          {
            text: "Start a fire using a bow drill in under 5 minutes.",
            targetSubSkill: "Bow Drill"
          },
          {
            text: "Carve a bow drill set from raw materials in under 20 minutes.",
            targetSubSkill: "Bow Drill"
          },
          // Flint & Steel
          {
            text: "Start a fire using flint and steel (or pyrite and chert) in under 7 minutes.",
            targetSubSkill: "Flint & Steel"
          },
          {
            text: "Ignite a pile of tinder using flint and steel in under 3 minutes.",
            targetSubSkill: "Flint & Steel"
          },
          // Hand Drill
          {
            text: "Start a fire using a hand drill in under 7 minutes.",
            targetSubSkill: "Hand Drill"
          },
          {
            text: "Carve a hand drill set from raw materials in under 15 minutes.",
            targetSubSkill: "Hand Drill"
          },
          // Fire Plough
          {
            text: "Start a fire using a fire plough in under 7 minutes.",
            targetSubSkill: "Fire Plough"
          },
          {
            text: "Create a fire plough from raw materials in under 10 minutes.",
            targetSubSkill: "Fire Plough"
          }
        ],
        challenge: {},
        challengeActive: false,
        timeRemaining: 0,
        level: "Beginner",
        expanded: false,
      },

      // 💧 Water Collection & Purification
      {
        name: "Water Collection & Purification",
        description: "Gathering, Filtration, Boiling, Solar Still",
        icon: "💧",
        subSkills: [
          { name: "Water Collection", progress: 0 },
          { name: "Filtration", progress: 0 },
          { name: "Boiling", progress: 0 },
          { name: "Solar Still", progress: 0 }
        ],
        challenges: [
          // Water Collection
          { text: "Find and collect 2 liters of water from a natural source.", targetSubSkill: "Water Collection" },
          { text: "Construct a rainwater catchment system using only natural materials.", targetSubSkill: "Water Collection" },
          { text: "Extract water from plant sources such as grapevines or cactus in under 10 minutes.", targetSubSkill: "Water Collection" },
          { text: "Melt snow or ice into drinkable water without contaminating it.", targetSubSkill: "Water Collection" },
          
          // Filtration
          { text: "Filter muddy water using a cloth and sand in under 5 minutes.", targetSubSkill: "Filtration" },
          { text: "Filter muddy water using a grapevine within 24 hours.", targetSubSkill: "Filtration" },
          { text: "Create a multi-layer water filter using charcoal, sand, and gravel.", targetSubSkill: "Filtration" },
          
          // Boiling
          { text: "Boil water using a makeshift container and stones in under 10 minutes.", targetSubSkill: "Boiling" },
          { text: "Boil water using a metal container and a fire in under 5 minutes.", targetSubSkill: "Boiling" },
          
          // Solar Still
          { text: "Collect water using a solar still in under 15 minutes.", targetSubSkill: "Solar Still" },
          { text: "Create a solar still using a plastic sheet and a container.", targetSubSkill: "Solar Still" }
        ],
        challenge: {},
        challengeActive: false,
        timeRemaining: 0,
        level: "Beginner",
        expanded: false
      },

      // 🏋️ Fitness & Exercise
      {
        name: "Fitness & Exercise",
        icon: "🏋️",
        subSkills: [
            { name: "Bodyweight Strength", progress: 0 },
            { name: "Cardio & Endurance", progress: 0 },
            { name: "Flexibility & Mobility", progress: 0 },
            { name: "Agility & Speed", progress: 0 },
            { name: "Survival-Specific Training", progress: 0 }
        ],
        challenges: [
            // 🏋️ **Bodyweight Strength**
            { text: "Complete 100 push-ups in under 5 minutes.", targetSubSkill: "Bodyweight Strength" },
            { text: "Perform 20 pull-ups in one set.", targetSubSkill: "Bodyweight Strength" },
            { text: "Hold a plank position for 5 minutes.", targetSubSkill: "Bodyweight Strength" },
            { text: "Do 50 deep squats with no rest.", targetSubSkill: "Bodyweight Strength" },
            { text: "Perform 10 one-arm push-ups (5 per arm).", targetSubSkill: "Bodyweight Strength" },
            { text: "Do 50 lunges per leg without stopping.", targetSubSkill: "Bodyweight Strength" },
            { text: "Perform 10 muscle-ups (bar or tree branch).", targetSubSkill: "Bodyweight Strength" },
    
            // 🏃 **Cardio & Endurance**
            { text: "Run 5 miles without stopping.", targetSubSkill: "Cardio & Endurance" },
            { text: "Perform 200 jumping jacks in 2 minutes.", targetSubSkill: "Cardio & Endurance" },
            { text: "Sprint 100 meters in under 15 seconds.", targetSubSkill: "Cardio & Endurance" },
            { text: "Carry a 40lb pack for 10 miles.", targetSubSkill: "Cardio & Endurance" },
            { text: "Climb a 10ft wall without assistance.", targetSubSkill: "Cardio & Endurance" },
    
            // 🧘 **Flexibility & Mobility**
            { text: "Perform a deep squat hold for 5 minutes.", targetSubSkill: "Flexibility & Mobility" },
            { text: "Perform 10 slow controlled pistol squats per leg.", targetSubSkill: "Flexibility & Mobility" },
            { text: "Hold a bridge pose for 2 minutes.", targetSubSkill: "Flexibility & Mobility" },
            { text: "Do a full split (or close to it).", targetSubSkill: "Flexibility & Mobility" },
            { text: "Perform a full backbend from standing position.", targetSubSkill: "Flexibility & Mobility" },
    
            // ⚡ **Agility & Speed**
            { text: "Perform 50 burpees in under 3 minutes.", targetSubSkill: "Agility & Speed" },
            { text: "Complete a 10-yard sprint in under 2 seconds.", targetSubSkill: "Agility & Speed" },
            { text: "Jump over a 4-foot obstacle with a running start.", targetSubSkill: "Agility & Speed" },
            { text: "Perform a standing broad jump of 6 feet.", targetSubSkill: "Agility & Speed" },
            { text: "Perform 10 consecutive box jumps onto a 24-inch platform.", targetSubSkill: "Agility & Speed" },
    
            // 🏕 **Survival-Specific Training**
            { text: "Carry a person (fireman’s carry) for 100 meters.", targetSubSkill: "Survival-Specific Training" },
            { text: "Swim 500 meters in open water without stopping.", targetSubSkill: "Survival-Specific Training" },
            { text: "Climb a 15-foot tree or rope without assistance.", targetSubSkill: "Survival-Specific Training" },
            { text: "Crawl under a 20-foot obstacle in under 1 minute.", targetSubSkill: "Survival-Specific Training" },
            { text: "Perform 100 knee strikes on a tree or post (self-defense).", targetSubSkill: "Survival-Specific Training" },
            { text: "Drag a 100lb object for 50 meters.", targetSubSkill: "Survival-Specific Training" },
            { text: "Escape a wrist grab using leverage in under 2 seconds.", targetSubSkill: "Survival-Specific Training" },
            { text: "Climb a ladder with a 30lb weight in each hand.", targetSubSkill: "Survival-Specific Training" },
            { text: "Run a 1-mile obstacle course with full gear.", targetSubSkill: "Survival-Specific Training" }
        ],
        challengeActive: false, expanded: false, level: "Beginner"
    },

      // 🪢 Knot Tying & Ropes
      {
        name: "Knot Tying & Ropes",
        icon: "🪢",
        subSkills: [
          { name: "Basic Knots", progress: 0 },
          { name: "Lashings", progress: 0 },
          { name: "Advanced Knots", progress: 0 },
          { name: "Rope Making", progress: 0 }
        ],
        challenges: [
          // Basic Knots
          { text: "Tie a bowline knot in under 10 seconds.", targetSubSkill: "Basic Knots" },
          { text: "Tie a square knot in under 5 seconds.", targetSubSkill: "Basic Knots" },
          { text: "Tie a clove hitch in under 10 seconds.", targetSubSkill: "Basic Knots" },
          // Lashings
          { 
            text: "Create a secure tripod lashing using only natural materials.", 
            targetSubSkill: "Lashings" 
          },
          { 
            text: "Lash together a simple A-frame structure in under 10 minutes.", 
            targetSubSkill: "Lashings" 
          },
          // Advanced Knots
          { 
            text: "Tie a Prusik knot in under 15 seconds.", 
            targetSubSkill: "Advanced Knots" 
          },
          { 
            text: "Tie a fisherman's knot in under 10 seconds.", 
            targetSubSkill: "Advanced Knots" 
          },
          // Rope Making
          { 
            text: "Make 2 feet of cordage from plant fibers in under 15 minutes.", 
            targetSubSkill: "Rope Making" 
          },
          { 
            text: "Create a rope from animal sinew in under 20 minutes.", 
            targetSubSkill: "Rope Making" 
          }
        ],
        challenge: {},
        challengeActive: false,
        timeRemaining: 0,
        level: "Beginner",
        expanded: false,
      },

      // 🏕️ Shelter Building
      {
        name: "Shelter Building",
        icon: "🏕️",
        subSkills: [
          { name: "Debris Hut", progress: 0 },
          { name: "Lean-To Shelter", progress: 0 },
          { name: "Snow Cave", progress: 0 }
        ],
        challenges: [
          { text: "Build a debris hut using only natural materials in under 30 minutes.", targetSubSkill: "Debris Hut" },
          { text: "Improve a debris hut for insulation by adding extra layers in under 15 minutes.", targetSubSkill: "Debris Hut" },
          { text: "Construct a lean-to shelter using logs and cordage in under 20 minutes.", targetSubSkill: "Lean-To Shelter" },
          { text: "Make a lean-to with a reflective heat wall to stay warm in under 25 minutes.", targetSubSkill: "Lean-To Shelter" },
          { text: "Construct a snow cave that fits one person safely in under 30 minutes.", targetSubSkill: "Snow Cave" },
          { text: "Reinforce a snow cave to withstand wind and maintain warmth.", targetSubSkill: "Snow Cave" }
        ],
        challengeActive: false,
        timeRemaining: 0,
        level: "Beginner",
        expanded: false
      },

      // 🌦️ Weatherproof Survival
      {
        name: "Weatherproof Survival",
        description: "Cold, Wet, Hot Climates",
        icon: "🌦️",
        subSkills: [
          { name: "Cold Climates", progress: 0 },
          { name: "Wet Climates", progress: 0 },
          { name: "Hot Climates", progress: 0 }
        ],
        challenges: [
          { text: "Build a shelter to withstand freezing temperatures in under 15 minutes.", targetSubSkill: "Cold Climates" },
          { text: "Make a windproof barrier using natural materials in under 10 minutes.", targetSubSkill: "Cold Climates" },
          { text: "Create a waterproof shelter using natural materials in under 20 minutes.", targetSubSkill: "Wet Climates" },
          { text: "Make a quick rain cover from available resources in under 5 minutes.", targetSubSkill: "Wet Climates" },
          { text: "Find and create shade to avoid heatstroke in under 10 minutes.", targetSubSkill: "Hot Climates" },
          { text: "Make an evaporative cooling system to keep water cool.", targetSubSkill: "Hot Climates" }
        ],
        challenge: {},
        challengeActive: false,
        timeRemaining: 0,
        level: "Beginner",
        expanded: false
      },

      // 🧭 Navigation & Orienteering
      {
        name: "Navigation & Orienteering",
        description: "Compass, Sun & Stars, Natural Landmarks",
        icon: "🧭",
        subSkills: [
          { name: "Compass Use", progress: 0 },
          { name: "Sun & Stars", progress: 0 },
          { name: "Natural Landmarks", progress: 0 }
        ],
        challenges: [
          { text: "Navigate to a specific location using a compass in under 10 minutes.", targetSubSkill: "Compass Use" },
          { text: "Determine your bearing with a compass and adjust your path accordingly.", targetSubSkill: "Compass Use" },
          { text: "Determine north using the sun and a stick in under 5 minutes.", targetSubSkill: "Sun & Stars" },
          { text: "Use the stars to navigate in a low-light setting.", targetSubSkill: "Sun & Stars" },
          { text: "Find your way back to camp using natural landmarks in under 15 minutes.", targetSubSkill: "Natural Landmarks" },
          { text: "Identify at least 3 natural signs of direction (e.g., moss growth, tree bends, wind patterns).", targetSubSkill: "Natural Landmarks" }
        ],
        challenge: {},
        challengeActive: false,
        timeRemaining: 0,
        level: "Beginner",
        expanded: false
      },

      // 🎣 Foraging & Trapping
      {
        name: "Foraging & Trapping",
        description: "Identifying Edibles, Snares, Fishing",
        icon: "🎣",
        subSkills: [
          { name: "Identifying Edibles", progress: 0 },
          { name: "Snares", progress: 0 },
          { name: "Fishing", progress: 0 }
        ],
        challenges: [
          { text: "Identify and collect 5 edible plants in under 10 minutes.", targetSubSkill: "Identifying Edibles" },
          { text: "Harvest and properly prepare wild edibles for a meal.", targetSubSkill: "Identifying Edibles" },
          { text: "Set up a snare trap to catch small game in under 15 minutes.", targetSubSkill: "Snares" },
          { text: "Build and set a deadfall trap in under 15 minutes.", targetSubSkill: "Snares" },
          { text: "Catch a fish using improvised tools in under 20 minutes.", targetSubSkill: "Fishing" },
          { text: "Make and use a primitive fishing spear or hand-line.", targetSubSkill: "Fishing" }
        ],
        challenge: {},
        challengeActive: false,
        timeRemaining: 0,
        level: "Beginner",
        expanded: false
      },

      // 🏥 Medical & First Aid
      {
        name: "Medical & First Aid",
        description: "Field Dressing, Tourniquets, Medicinal Plants",
        icon: "🏥",
        subSkills: [
          { name: "Field Dressing", progress: 0 },
          { name: "Tourniquets", progress: 0 },
          { name: "Medicinal Plants", progress: 0 }
        ],
        challenges: [
          { text: "Apply a field dressing to a simulated wound in under 5 minutes.", targetSubSkill: "Field Dressing" },
          { text: "Demonstrate how to clean and dress a wound using natural materials.", targetSubSkill: "Field Dressing" },
          { text: "Apply a tourniquet to stop simulated bleeding in under 3 minutes.", targetSubSkill: "Tourniquets" },
          { text: "Demonstrate proper pressure bandaging techniques for severe wounds.", targetSubSkill: "Tourniquets" },
          { text: "Identify and prepare a medicinal plant for use in under 10 minutes.", targetSubSkill: "Medicinal Plants" },
          { text: "Make a poultice from medicinal plants and apply it to a simulated injury.", targetSubSkill: "Medicinal Plants" }
        ],
        challenge: {},
        challengeActive: false,
        timeRemaining: 0,
        level: "Beginner",
        expanded: false
      },

      // Signaling & Communication
      {
        name: "Signaling & Communication",
        icon: "📡",
        subSkills: [
          { name: "Mirror Signaling", progress: 0 },
          { name: "Smoke Signals", progress: 0 },
          { name: "Ground Markings", progress: 0 }
        ],
        challenges: [
          { text: "Use a mirror to reflect sunlight onto a target 50 meters away.", targetSubSkill: "Mirror Signaling" },
          { text: "Use a mirror to signal a partner at a long distance.", targetSubSkill: "Mirror Signaling" },
          { text: "Create a visible smoke signal using damp materials.", targetSubSkill: "Smoke Signals" },
          { text: "Build a fire that maximizes visibility for aerial rescue.", targetSubSkill: "Smoke Signals" },
          { text: "Create a visible ground SOS sign for aerial spotting.", targetSubSkill: "Ground Markings" },
          { text: "Mark a trail using natural materials for tracking or rescue.", targetSubSkill: "Ground Markings" }
        ],
        challengeActive: false,
        timeRemaining: 0,
        level: "Beginner",
        expanded: false
      },

      // ⚖️ Leadership & Conflict De-escalation
      {
        name: "Leadership & Conflict De-escalation",
        description: "Urban & Group Survival",
        icon: "⚖️",
        subSkills: [
          { name: "Urban Survival", progress: 0 },
          { name: "Group Survival", progress: 0 },
          { name: "Conflict De-escalation", progress: 0 }
        ],
        challenges: [
          { text: "Lead a group through a simulated urban survival scenario in under 20 minutes.", targetSubSkill: "Urban Survival" },
          { text: "Plan a safe escape route from a city during a simulated crisis.", targetSubSkill: "Urban Survival" },
          { text: "Find and secure a defensible shelter in an urban survival scenario.", targetSubSkill: "Urban Survival" },
          { text: "Gather supplies from an urban environment while avoiding unnecessary risks.", targetSubSkill: "Urban Survival" },
          
          { text: "Organize a group to build a shelter in under 15 minutes.", targetSubSkill: "Group Survival" },
          { text: "Establish clear roles within a group to enhance survival efficiency.", targetSubSkill: "Group Survival" },
          { text: "Resolve a disagreement within a survival group to maintain cohesion.", targetSubSkill: "Group Survival" },
          { text: "Create a food and water rationing plan for a group.", targetSubSkill: "Group Survival" },
      
          { text: "De-escalate a simulated conflict using verbal techniques in under 10 minutes.", targetSubSkill: "Conflict De-escalation" },
          { text: "Mediate a dispute between two individuals in a survival scenario.", targetSubSkill: "Conflict De-escalation" },
          { text: "Use body language and negotiation skills to prevent a fight.", targetSubSkill: "Conflict De-escalation" },
          { text: "Convince a hostile individual to stand down without using force.", targetSubSkill: "Conflict De-escalation" }
        ],
        challenge: {},
        challengeActive: false,
        timeRemaining: 0,
        level: "Beginner",
        expanded: false
      },
      
      // ⚔ Tactical & War Preparation
      {
        name: "Tactical & War Preparation",
        icon: "⚔",
        subSkills: [
            { name: "Handgun Training", progress: 0 },
            { name: "Rifle Training", progress: 0 },
            { name: "CQB (Close-Quarters Combat)", progress: 0 },
            { name: "Hand-to-Hand Combat", progress: 0 },
            { name: "Escape & Evasion", progress: 0 }
        ],
        challenges: [
            // Handgun Training
            { text: "Hit 10 targets within 15 meters using a handgun.", targetSubSkill: "Handgun Training" },
            { text: "Rapid fire drill: Hit 3 targets in under 3 seconds.", targetSubSkill: "Handgun Training" },
            { text: "Tactical reload drill: Reload in under 2 seconds.", targetSubSkill: "Handgun Training" },
            
            // Rifle Training
            { text: "Hit 5 targets at 50 meters in under 10 seconds.", targetSubSkill: "Rifle Training" },
            { text: "Transition from rifle to handgun in under 2 seconds.", targetSubSkill: "Rifle Training" },
            { text: "Fire from cover & change positions 3 times.", targetSubSkill: "Rifle Training" },
    
            // CQB (Close-Quarters Combat)
            { text: "Clear a room in under 30 seconds (dry run).", targetSubSkill: "CQB (Close-Quarters Combat)" },
            { text: "Engage a target from behind cover in under 2 seconds.", targetSubSkill: "CQB (Close-Quarters Combat)" },
            { text: "Execute a breach-and-clear drill using dummy weapons.", targetSubSkill: "CQB (Close-Quarters Combat)" },
    
            // Hand-to-Hand Combat
            { text: "Disarm a knife-wielding attacker in under 5 seconds.", targetSubSkill: "Hand-to-Hand Combat" },
            { text: "Escape from a rear chokehold using leverage.", targetSubSkill: "Hand-to-Hand Combat" },
            { text: "Control an opponent using wrist locks.", targetSubSkill: "Hand-to-Hand Combat" },
    
            // Escape & Evasion
            { text: "Pick handcuffs or zip ties in under 2 minutes.", targetSubSkill: "Escape & Evasion" },
            { text: "Escape from a locked room using only available materials.", targetSubSkill: "Escape & Evasion" },
            { text: "Evade a tracking team for 30 minutes.", targetSubSkill: "Escape & Evasion" }
        ],
        challengeActive: false, expanded: false, level: "Beginner"
    },
      
      // ⚡ Electrical Engineering & Hacking
      {
        name: "Electrical Engineering & Hacking",
        icon: "⚡",
        subSkills: [
            { name: "HAM Radio Operations", progress: 0 },
            { name: "Solar Power Systems", progress: 0 },
            { name: "Cybersecurity & Hacking", progress: 0 },
            { name: "EMP Protection & Recovery", progress: 0 }
        ],
        challenges: [
            // HAM Radio Operations
            { text: "Set up and test an emergency HAM radio.", targetSubSkill: "HAM Radio Operations" },
            { text: "Send and receive a Morse code message.", targetSubSkill: "HAM Radio Operations" },
            { text: "Use a HAM radio to establish long-distance communication.", targetSubSkill: "HAM Radio Operations" },
    
            // Solar Power Systems
            { text: "Install a solar panel and battery storage system.", targetSubSkill: "Solar Power Systems" },
            { text: "Build a small off-grid solar-powered system from scratch.", targetSubSkill: "Solar Power Systems" },
            { text: "Charge a 12V battery using solar power.", targetSubSkill: "Solar Power Systems" },
    
            // Cybersecurity & Hacking
            { text: "Encrypt a hard drive for data protection.", targetSubSkill: "Cybersecurity & Hacking" },
            { text: "Set up a secure VPN for private browsing.", targetSubSkill: "Cybersecurity & Hacking" },
            { text: "Find and remove a spyware infection from a computer.", targetSubSkill: "Cybersecurity & Hacking" },
    
            // EMP Protection & Recovery
            { text: "Shield electronics using a Faraday cage.", targetSubSkill: "EMP Protection & Recovery" },
            { text: "Diagnose and repair electronic devices after an EMP test.", targetSubSkill: "EMP Protection & Recovery" },
            { text: "Create an EMP-resistant backup power system.", targetSubSkill: "EMP Protection & Recovery" }
        ],
        challengeActive: false, expanded: false, level: "Beginner"
    },
      
      // 💰 Finance & Wealth-Building
      {
        name: "Finance & Wealth-Building",
        icon: "💰",
        subSkills: [
            { name: "Stock Trading", progress: 0 },
            { name: "Real Estate Investment", progress: 0 },
            { name: "Multiple Income Streams", progress: 0 },
            { name: "Bartering & Alternative Currency", progress: 0 }
        ],
        challenges: [
            // Stock Trading
            { text: "Identify and track a stock for 1 week.", targetSubSkill: "Stock Trading" },
            { text: "Predict a stock price movement correctly.", targetSubSkill: "Stock Trading" },
            { text: "Paper trade a stock and make a 10% return in 1 month.", targetSubSkill: "Stock Trading" },
    
            // Real Estate Investment
            { text: "Find and analyze a below-market property deal.", targetSubSkill: "Real Estate Investment" },
            { text: "Evaluate a rental market and determine best investments.", targetSubSkill: "Real Estate Investment" },
            { text: "Calculate cash flow and ROI on a potential rental.", targetSubSkill: "Real Estate Investment" },
    
            // Multiple Income Streams
            { text: "Generate $100 from a side hustle within 7 days.", targetSubSkill: "Multiple Income Streams" },
            { text: "Sell a flipped product for double the original price.", targetSubSkill: "Multiple Income Streams" },
            { text: "Start a dropshipping, e-commerce, or flipping business.", targetSubSkill: "Multiple Income Streams" },
    
            // Bartering & Alternative Currency
            { text: "Trade an item without using money for something of equal value.", targetSubSkill: "Bartering & Alternative Currency" },
            { text: "Make 3 successful barter trades in one day.", targetSubSkill: "Bartering & Alternative Currency" },
            { text: "Establish a local barter network for essential goods.", targetSubSkill: "Bartering & Alternative Currency" }
        ],
        challengeActive: false, expanded: false, level: "Beginner"
    },

      // 🌍 Adaptive Survival Challenges
      {
        name: "Adaptive Survival Challenges",
        description: "Survive extreme environments while securing resources or wealth.",
        icon: "🌍",
        subSkills: [
            { name: "2-Day Homeless Survival", progress: 0 },
            { name: "7-Day Homeless Survival", progress: 0 },
            { name: "30-Day Homeless Survival", progress: 0 },
            { name: "90-Day Survival Challenge", progress: 0 },
            { name: "Urban Survival", progress: 0 },
            { name: "Woodland Survival", progress: 0 },
            { name: "Desert Survival", progress: 0 },
            { name: "Island & Raft Survival", progress: 0 },
            { name: "Arctic Cold Survival", progress: 0 }
        ],
        challenges: [
            // 🚶 **2-Day Homeless Survival**
            { text: "Survive 2 days with no money, no shelter, and no assistance.", targetSubSkill: "2-Day Homeless Survival" },
            { text: "Find food and water within 24 hours.", targetSubSkill: "2-Day Homeless Survival" },
            { text: "Identify a safe sleeping location for 2 nights.", targetSubSkill: "2-Day Homeless Survival" },
            { text: "Make at least $10 from street-level strategies.", targetSubSkill: "2-Day Homeless Survival" },
    
            // 🏚 **7-Day Homeless Survival**
            { text: "Survive 7 days without shelter or external aid.", targetSubSkill: "7-Day Homeless Survival" },
            { text: "Find and prepare food daily for a week.", targetSubSkill: "7-Day Homeless Survival" },
            { text: "Earn at least $100 using legal survival methods.", targetSubSkill: "7-Day Homeless Survival" },
            { text: "Secure a safe semi-permanent shelter by day 4.", targetSubSkill: "7-Day Homeless Survival" },
            { text: "Avoid violent encounters and maintain personal safety.", targetSubSkill: "7-Day Homeless Survival" },
    
            // 🏠 **30-Day Homeless Survival**
            { text: "Survive 30 days while homeless with no starting cash.", targetSubSkill: "30-Day Homeless Survival" },
            { text: "Find a way to make at least $500 by day 30.", targetSubSkill: "30-Day Homeless Survival" },
            { text: "Secure stable food and water sources for a full month.", targetSubSkill: "30-Day Homeless Survival" },
            { text: "Network with local resources or build a community for support.", targetSubSkill: "30-Day Homeless Survival" },
            { text: "Stay undetected while sleeping in urban areas.", targetSubSkill: "30-Day Homeless Survival" },
    
            // 🏆 **90-Day Survival Challenge**
            { text: "Survive 90 days in a post-collapse world with minimal gear.", targetSubSkill: "90-Day Survival Challenge" },
            { text: "Start with $0 and build up to at least $5000 in 90 days.", targetSubSkill: "90-Day Survival Challenge" },
            { text: "Secure a long-term shelter that lasts at least 60 days.", targetSubSkill: "90-Day Survival Challenge" },
            { text: "Trade/barter your way to a sustainable food supply.", targetSubSkill: "90-Day Survival Challenge" },
            { text: "Avoid detection while navigating a hostile environment for 90 days.", targetSubSkill: "90-Day Survival Challenge" },
            { text: "Gain allies and form a self-sustaining survival community.", targetSubSkill: "90-Day Survival Challenge" },
    
            // 🏙 **Urban Survival**
            { text: "Find and secure shelter in a post-disaster urban environment.", targetSubSkill: "Urban Survival" },
            { text: "Scavenge food and water while avoiding detection.", targetSubSkill: "Urban Survival" },
            { text: "Navigate an unfamiliar city without a map or GPS.", targetSubSkill: "Urban Survival" },
            { text: "Barter for supplies in a collapsed economy.", targetSubSkill: "Urban Survival" },
            { text: "Escape an urban riot scenario without harm.", targetSubSkill: "Urban Survival" },
    
            // 🌲 **Woodland Survival**
            { text: "Survive 7 days in a dense forest with minimal gear.", targetSubSkill: "Woodland Survival" },
            { text: "Build a waterproof shelter using only natural materials.", targetSubSkill: "Woodland Survival" },
            { text: "Find and purify water from a woodland source.", targetSubSkill: "Woodland Survival" },
            { text: "Hunt or forage enough food to sustain yourself for 3 days.", targetSubSkill: "Woodland Survival" },
            { text: "Navigate out of the wilderness without a compass.", targetSubSkill: "Woodland Survival" },
            { text: "Start a fire in wet conditions using natural materials.", targetSubSkill: "Woodland Survival" },
    
            // 🏜 **Desert Survival**
            { text: "Survive 7 days in a desert with minimal supplies.", targetSubSkill: "Desert Survival" },
            { text: "Find and extract drinkable water in a desert environment.", targetSubSkill: "Desert Survival" },
            { text: "Build a shelter to withstand extreme heat.", targetSubSkill: "Desert Survival" },
            { text: "Travel 5 miles across the desert using minimal water.", targetSubSkill: "Desert Survival" },
            { text: "Identify and safely consume desert plants and insects.", targetSubSkill: "Desert Survival" },
    
            // 🌴 **Island & Raft Survival**
            { text: "Survive 30 days on an uninhabited island.", targetSubSkill: "Island & Raft Survival" },
            { text: "Build a primitive raft and successfully sail it 5 miles.", targetSubSkill: "Island & Raft Survival" },
            { text: "Catch fish using only hand-crafted tools.", targetSubSkill: "Island & Raft Survival" },
            { text: "Desalinate seawater using primitive methods.", targetSubSkill: "Island & Raft Survival" },
            { text: "Create a distress signal visible from the air.", targetSubSkill: "Island & Raft Survival" },
            { text: "Construct a stormproof shelter using only natural materials.", targetSubSkill: "Island & Raft Survival" },
    
            // ❄ **Arctic Cold Survival**
            { text: "Survive 14 days in an arctic climate.", targetSubSkill: "Arctic Cold Survival" },
            { text: "Start a fire on snow using only natural materials.", targetSubSkill: "Arctic Cold Survival" },
            { text: "Build an igloo or snow cave shelter.", targetSubSkill: "Arctic Cold Survival" },
            { text: "Find and prepare food in a frozen wilderness.", targetSubSkill: "Arctic Cold Survival" },
            { text: "Navigate safely across a frozen lake or river.", targetSubSkill: "Arctic Cold Survival" },
            { text: "Avoid frostbite and hypothermia while outdoors for 24 hours.", targetSubSkill: "Arctic Cold Survival" }
        ],
        challengeActive: false, expanded: false, level: "Ultimate Survivalist"
      },

      // ⚠️ Hardcore Mode Challenges
      {
        name: "Hardcore Mode Challenges",
        description: "Extreme Randomized Scenarios",
        icon: "⚠️",
        subSkills: [
            { name: "Primitive Survival", progress: 0 },
            { name: "Fire in the Rain", progress: 0 },
            { name: "Night Navigation", progress: 0 },
            { name: "Extreme Cold", progress: 0 },
            { name: "Desert Survival", progress: 0 },
            { name: "Jungle Survival", progress: 0 },
            { name: "High-Altitude Adaptation", progress: 0 },
            { name: "Urban Post-Collapse", progress: 0 }
        ],
        challenges: [
            // 🌿 **Primitive Survival**
            { text: "Survive 10 days using only self-made primitive tools.", targetSubSkill: "Primitive Survival" },
            { text: "Make a primitive fishing trap and catch a fish.", targetSubSkill: "Primitive Survival" },
            { text: "Build a primitive debris hut and sleep in it for 3 nights.", targetSubSkill: "Primitive Survival" },
            { text: "Make a full primitive bow, arrows, and quiver.", targetSubSkill: "Primitive Survival" },
            { text: "Tann a hide using only natural materials.", targetSubSkill: "Primitive Survival" },
            { text: "Create a friction fire using only hand drill in under 10 minutes.", targetSubSkill: "Primitive Survival" },
            
            // 🌧 **Fire in the Rain**
            { text: "Start a fire in a storm using only natural materials.", targetSubSkill: "Fire in the Rain" },
            { text: "Make a fire without matches or lighters in under 5 minutes.", targetSubSkill: "Fire in the Rain" },
            { text: "Construct a long-lasting waterproof fire lay.", targetSubSkill: "Fire in the Rain" },
            { text: "Collect dry firewood in a soaking wet environment.", targetSubSkill: "Fire in the Rain" },
    
            // 🌙 **Night Navigation**
            { text: "Navigate 2 miles at night using only the stars.", targetSubSkill: "Night Navigation" },
            { text: "Identify the North Star and use it to maintain direction.", targetSubSkill: "Night Navigation" },
            { text: "Use the moon’s shadow to determine time and direction.", targetSubSkill: "Night Navigation" },
            { text: "Create an emergency light source from natural materials.", targetSubSkill: "Night Navigation" },
            
            // ❄ **Extreme Cold Survival**
            { text: "Survive 24 hours in below-freezing temperatures.", targetSubSkill: "Extreme Cold" },
            { text: "Build an emergency snow cave and sleep in it overnight.", targetSubSkill: "Extreme Cold" },
            { text: "Start a fire in deep snow using only a ferro rod.", targetSubSkill: "Extreme Cold" },
            { text: "Make a full winter outfit using only fur and natural insulation.", targetSubSkill: "Extreme Cold" },
            { text: "Find and purify drinking water in a frozen environment.", targetSubSkill: "Extreme Cold" },
    
            // 🏜 **Desert Survival**
            { text: "Locate and extract drinkable water in a desert.", targetSubSkill: "Desert Survival" },
            { text: "Construct a shade shelter using only natural materials.", targetSubSkill: "Desert Survival" },
            { text: "Identify edible desert plants and prepare a meal.", targetSubSkill: "Desert Survival" },
            { text: "Survive a full day with no water source.", targetSubSkill: "Desert Survival" },
            { text: "Create a solar still to extract water from the ground.", targetSubSkill: "Desert Survival" },
    
            // 🌴 **Jungle Survival**
            { text: "Build a raised jungle shelter to avoid insects & wildlife.", targetSubSkill: "Jungle Survival" },
            { text: "Make a water filtration system from natural materials.", targetSubSkill: "Jungle Survival" },
            { text: "Find and extract drinking water from vines and plants.", targetSubSkill: "Jungle Survival" },
            { text: "Avoid dangerous jungle predators using stealth.", targetSubSkill: "Jungle Survival" },
            { text: "Navigate a dense jungle using natural markers.", targetSubSkill: "Jungle Survival" },
    
            // ⛰ **High-Altitude Adaptation**
            { text: "Survive 24 hours in a high-altitude, low-oxygen environment.", targetSubSkill: "High-Altitude Adaptation" },
            { text: "Build a shelter in rocky, high-altitude terrain.", targetSubSkill: "High-Altitude Adaptation" },
            { text: "Find and purify drinking water in a mountain environment.", targetSubSkill: "High-Altitude Adaptation" },
            { text: "Hike 5 miles uphill while carrying 50 lbs.", targetSubSkill: "High-Altitude Adaptation" },
            { text: "Identify and avoid altitude sickness symptoms.", targetSubSkill: "High-Altitude Adaptation" },
    
            // 🏙 **Urban Post-Collapse Survival**
            { text: "Find a defensible shelter in a collapsed city scenario.", targetSubSkill: "Urban Post-Collapse" },
            { text: "Scavenge essential supplies while avoiding detection.", targetSubSkill: "Urban Post-Collapse" },
            { text: "Make a rooftop escape using emergency rappel techniques.", targetSubSkill: "Urban Post-Collapse" },
            { text: "Navigate a city in total blackout conditions.", targetSubSkill: "Urban Post-Collapse" },
            { text: "Create a barter system using found resources.", targetSubSkill: "Urban Post-Collapse" }
        ],
        challengeActive: false, expanded: false, level: "Survival Master"
    }
    ]),

    challengeInterval: null,

    // Compute Global Progress
    get globalProgress() {
      let totalProgress = this.skills.reduce((sum, skill) => {
        return sum + skill.subSkills.reduce((subSum, subSkill) => subSum + subSkill.progress, 0);
      }, 0);
      let totalSkills = this.skills.reduce((sum, skill) => sum + skill.subSkills.length, 0);
      return totalSkills ? Math.round((totalProgress / (totalSkills * 100)) * 100) : 0;
    },
    
    // Compute User's Overall Skill Level
    get overallSkillLevel() {
      const progress = this.globalProgress;

      if (progress >= 90) return "Expert";
      if (progress >= 60) return "Advanced";
      if (progress >= 30) return "Intermediate";
      return "Beginner";
    },

    // Compute Skill Progress
    getSkillProgress(skill) {
      let totalProgress = skill.subSkills.reduce((sum, subSkill) => sum + subSkill.progress, 0);
      return skill.subSkills.length ? Math.round(totalProgress / skill.subSkills.length) : 0;
    },

    // Expand/Collapse Skill Sections
    toggleSkill(skill) {
      skill.expanded = !skill.expanded;
    },

    // Start a new challenge
    startChallenge(skill) {
      if (!skill.challenge) {
        this.selectNewChallenge(skill);
      }

      skill.challengeActive = true;
      skill.timeRemaining = 300; // 5 minutes

      this.challengeInterval = setInterval(() => {
        skill.timeRemaining--;
        if (skill.timeRemaining <= 0) {
          clearInterval(this.challengeInterval);
          skill.challengeActive = false;
          alert("Challenge failed!");
        }
      }, 1000);
    },

    // Complete a challenge
    completeChallenge(skill, success) {
        if (this.challengeInterval) {
            clearInterval(this.challengeInterval);
            this.challengeInterval = null; // Ensure the interval is fully cleared
        }
        
        skill.challengeActive = false;
    
        const targetSubSkill = skill.subSkills.find(subSkill => subSkill.name === skill.challenge.targetSubSkill);
    
        if (targetSubSkill) {
            if (success) {
                targetSubSkill.progress = Math.min(targetSubSkill.progress + 20, 100);
                this.skillPoints += 10;
                alert("Challenge completed! Progress updated.");
            } else {
                targetSubSkill.progress = Math.max(targetSubSkill.progress - 10, 0);
                alert("Challenge failed. Progress decreased.");
            }
        }
    
        this.updateSkillLevel(skill);
        this.selectNewChallenge(skill);
    },

    // Select a new challenge
    selectNewChallenge(skill) {
      if (skill.challenges.length > 0) {
        const randomIndex = Math.floor(Math.random() * skill.challenges.length);
        skill.challenge = skill.challenges[randomIndex];
      }
    },

    // Update skill level based on progress
    updateSkillLevel(skill) {
      const totalProgress = skill.subSkills.reduce((sum, subSkill) => sum + subSkill.progress, 0);
      const averageProgress = totalProgress / skill.subSkills.length;
      if (averageProgress >= 90) skill.level = "Expert";
      else if (averageProgress >= 60) skill.level = "Advanced";
      else if (averageProgress >= 30) skill.level = "Intermediate";
      else skill.level = "Beginner";
    },

    init() {
      this.skills.forEach(skill => this.selectNewChallenge(skill));
        this.$watch('skillPoints', (value) => saveStateToLocalStorage("skillPoints", value));
        this.$watch('skills', (value) => saveStateToLocalStorage("skills", value));
    },

    updateSkillProgress(skill, subSkillName, progressAmount) {
        let subSkill = skill.subSkills.find(s => s.name === subSkillName);
        if (subSkill) {
            subSkill.progress = Math.min(subSkill.progress + progressAmount, 100);
            saveStateToLocalStorage("skills", this.skills);
        }
    }
  }));

  // Survival Scenario Simulator
  Alpine.data('scenarioSimulator', () => ({
    scenarios: [
      // 🏕️ Wilderness Survival Scenarios
      {
        title: "Lost in the Wilderness",
        description: "You're stranded in a remote forest. Survive for 3 days.",
        challenges: [
          "Find and purify water",
          "Build a shelter",
          "Start a fire",
          "Forage for food"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 180 // 3 days in minutes
      },
      {
        title: "Snowstorm Stranded",
        description: "You're caught in a blizzard with no shelter. Stay warm and survive for 24 hours.",
        challenges: [
          "Find or build an insulated shelter",
          "Avoid frostbite",
          "Melt snow for drinking water",
          "Signal for rescue"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 1440 // 1 day in minutes
      },
      {
        title: "Desert Survival",
        description: "You're lost in a scorching desert with no water. Survive until rescue.",
        challenges: [
          "Find shade to prevent heatstroke",
          "Locate water source",
          "Travel at night to conserve energy",
          "Identify edible desert plants"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 120 // 2 hours in extreme heat
      },
      {
        title: "Venomous Snake Bite",
        description: "You've been bitten by a snake. Survive until help arrives.",
        challenges: [
          "Identify the snake species",
          "Slow your movement to prevent venom spread",
          "Use first aid to minimize damage",
          "Get to safety"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 180 // 3 hours before effects worsen
      },
      {
        title: "Bear Encounter",
        description: "A bear is nearby. Avoid provoking it and escape safely.",
        challenges: [
          "Stay calm and assess the bear’s behavior",
          "Slowly back away without turning your back",
          "Climb a tree or find a safe position",
          "Use deterrents like noise or bear spray"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 15 // 15 minutes of high stress!
      },

      // 🌆 Urban Disaster Scenarios
      {
        title: "Major Earthquake",
        description: "An earthquake has struck your city. Survive for 48 hours.",
        challenges: [
          "Find safe shelter",
          "Locate emergency supplies",
          "Treat injuries",
          "Signal for help"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 120 // 2 days in minutes
      },
      {
        title: "Citywide Blackout",
        description: "The power grid has failed. Survive without electricity.",
        challenges: [
          "Find alternative light sources",
          "Secure food before it spoils",
          "Stay safe from potential looters",
          "Communicate without the internet"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 1440 // 1 day in minutes
      },
      {
        title: "Terrorist Attack",
        description: "A bomb or mass shooting occurred in your area. Escape and survive.",
        challenges: [
          "Find immediate cover",
          "Identify safe escape routes",
          "Avoid crowds and panic",
          "Help others while staying safe"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 60 // 1-hour escape window
      },
      {
        title: "Nuclear Fallout",
        description: "A nuclear explosion occurred. Seek underground shelter and survive for 7 days.",
        challenges: [
          "Find a fallout shelter",
          "Seal windows and doors",
          "Ration food and water",
          "Avoid exposure to radiation"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 10080 // 7 days in minutes
      },

      // 🏝️ Island & Ocean Survival
      {
        title: "Shipwrecked on an Island",
        description: "You've washed ashore with limited supplies. Survive for 7 days.",
        challenges: [
          "Find drinkable water",
          "Build a signal fire",
          "Hunt or fish for food",
          "Construct a shelter"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 10080 // 7 days in minutes
      },
      {
        title: "Adrift on a Raft",
        description: "You’re lost at sea with minimal supplies. Stay alive and signal for rescue.",
        challenges: [
          "Collect rainwater for drinking",
          "Avoid sunburn and dehydration",
          "Catch fish with makeshift tools",
          "Signal for rescue"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 4320 // 3 days in minutes
      },
      {
        title: "Shark Attack",
        description: "A shark is circling your raft. Defend yourself and escape.",
        challenges: [
          "Stay calm and avoid splashing",
          "Use an oar or object as a weapon",
          "Find a way to deter the shark",
          "Secure yourself on the raft"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 30 // 30-minute critical window
      },

      // 🔥 Fire & Natural Disasters
      {
        title: "Forest Fire",
        description: "A wildfire is approaching fast. Escape before it's too late.",
        challenges: [
          "Determine wind direction to avoid flames",
          "Find or create a firebreak",
          "Protect yourself from smoke inhalation",
          "Signal for rescue"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 90 // 90 minutes before smoke overtakes you
      },
      {
        title: "House Fire",
        description: "Your home is burning. Escape in time.",
        challenges: [
          "Stay low to avoid smoke inhalation",
          "Check doors for heat before opening",
          "Find the fastest escape route",
          "Stop, drop, and roll if needed"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 5 // 5 minutes before it's too late
      },
      {
        title: "Tornado Hits Town",
        description: "A tornado is approaching. Seek shelter and survive.",
        challenges: [
          "Get to an underground shelter",
          "Protect yourself from debris",
          "Stay low and cover your head",
          "Wait for the storm to pass"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 30 // 30 minutes of terror
      },
      {
        title: "Tsunami Warning",
        description: "A massive tsunami is approaching. Get to high ground immediately.",
        challenges: [
          "Recognize the warning signs",
          "Get to the highest possible ground",
          "Hold on and brace for impact",
          "Help others if possible"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 45 // 45 minutes until impact
      },

      // 🆘 Extreme Survival Scenarios
      {
        title: "Hostage Situation",
        description: "You’ve been kidnapped. Find a way to escape or survive.",
        challenges: [
          "Stay calm and assess your captors",
          "Look for escape opportunities",
          "Try to communicate with rescuers",
          "Use psychology to gain trust"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 600 // 10-hour critical window
      },
      {
        title: "Zombie Outbreak",
        description: "A deadly virus has spread. Find a safe location and survive.",
        challenges: [
          "Secure a shelter",
          "Stockpile supplies",
          "Avoid infected individuals",
          "Find a group for protection"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 2880 // 2 days in minutes
      },
      {
        title: "EMP Attack",
        description: "All electronics have failed. Survive in a world without technology.",
        challenges: [
          "Find food without refrigeration",
          "Secure transportation without fuel",
          "Use maps instead of GPS",
          "Protect yourself from societal collapse"
        ],
        expanded: false,
        timeRemaining: 0,
        challengeIndex: 0,
        outcome: null,
        intervalId: null,
        duration: 10080 // 7 days in minutes
      }
    ],
    activeScenario: null,

  // Toggle scenario details (expands/collapses)
  toggleScenario(scenario) {
    this.scenarios.forEach(s => {
      if (s !== scenario) s.expanded = false; // Collapse others
    });
    scenario.expanded = !scenario.expanded;
  },

  // Start scenario when "Start Scenario" is clicked
  startScenario(scenario) {
    // Stop any existing timers
    this.scenarios.forEach(s => {
      if (s.intervalId) clearInterval(s.intervalId);
    });

    // Start the new scenario
    scenario.started = true;
    scenario.outcome = "";
    scenario.timeRemaining = scenario.timeRemaining || 30;
    this.runScenario(scenario);
  },

  // Run scenario countdown
  runScenario(scenario) {
    scenario.intervalId = setInterval(() => {
      if (scenario.timeRemaining > 0) {
        scenario.timeRemaining--;
      } else {
        clearInterval(scenario.intervalId);
        scenario.outcome = "You survived!";
      }
    }, 1000);
  },

  // Complete challenges within the scenario
  completeChallenge(scenario) {
    if (scenario.challengeIndex < scenario.challenges.length - 1) {
      scenario.challengeIndex++;
    } else {
      clearInterval(scenario.intervalId);
      scenario.outcome = "Scenario Completed! 🎉";
    }
  }
  }));

  // Resource Management Mini-Game
  Alpine.data('resourceGame', () => ({
    resources: { water: 10, food: 5 },
    energy: 100,
    health: 100,
    hunger: 0, // Hunger level (0 = full, 100 = starving)
    thirst: 0, // Thirst level (0 = hydrated, 100 = dehydrated)
    daysSurvived: 0,
    weather: "Clear",
    season: "Spring",
    temperature: 15,
    injury: null,
    sickness: null,
    pet: null,
    inventory: ["wood", "stone", "rope", "charcoal", "medicine"], // Starting inventory
    showStats: false,
    showInventory: false,
    showConsumption: false,
    showCrafting: false,
    eventLog: "",
    alertMessage: "",
    actionCount: 0, // Track number of actions taken
  
    // Initialize the game
    init() {
      this.updateWeather();
      setInterval(() => this.updateWeather(), 60000); // Update weather every minute
      setInterval(() => this.updateStatus(), 10000); // Update hunger, thirst, and health every 10 seconds
    },
  
    // Update hunger, thirst, and health
    updateStatus() {
      // Increase hunger and thirst over time
      this.hunger = Math.min(this.hunger + 1, 100);
      this.thirst = Math.min(this.thirst + 1, 100);
  
      // Apply effects of hunger and thirst
      if (this.hunger >= 80) {
        this.health -= 2;
        this.eventLog = "You're starving! Your health is deteriorating.";
      }
      if (this.thirst >= 80) {
        this.health -= 2;
        this.eventLog = "You're dehydrated! Your health is deteriorating.";
      }
  
      // Apply effects of injuries
      if (this.injury) {
        this.health -= 1;
        this.eventLog = `Your ${this.injury} is getting worse! Seek treatment soon.`;
      }
  
      // Check for death
      if (this.health <= 0) {
        this.eventLog = "You have died. Game over.";
        this.alertMessage = "Game Over! Refresh to restart.";
        return;
      }
  
      // Notify player of critical status
      if (this.health < 30) {
        this.alertMessage = "You're in critical condition! Rest or find medicine.";
      } else if (this.energy < 20) {
        this.alertMessage = "You're feeling fatigued. Rest to regain energy.";
      } else if (this.hunger >= 80) {
        this.alertMessage = "You're starving! Find food immediately.";
      } else if (this.thirst >= 80) {
        this.alertMessage = "You're dehydrated! Find water immediately.";
      } else {
        this.alertMessage = "";
      }
    },
  
    // Consume resources
    consume(type) {
      if (type === "food" && this.resources.food > 0) {
        this.resources.food -= 1;
        this.hunger = Math.max(this.hunger - 20, 0);
        this.energy = Math.min(this.energy + 15, 100);
        this.eventLog = "You ate food and regained 15 energy.";
      } else if (type === "water" && this.resources.water > 0) {
        this.resources.water -= 1;
        this.thirst = Math.max(this.thirst - 20, 0);
        this.health = Math.min(this.health + 5, 100);
        this.eventLog = "You drank water and feel refreshed.";
      } else if (type === "medicine" && this.inventory.includes("medicine")) {
        this.inventory.splice(this.inventory.indexOf("medicine"), 1);
        this.health = Math.min(this.health + 30, 100);
        if (this.sickness) this.sickness = null;
        this.eventLog = "You took medicine and recovered some health.";
      } else {
        this.eventLog = "You don't have enough resources for that action.";
      }
      this.checkForNextDay();
    },
  
    // Forage for food
    forageFood() {
      if (this.energy < 10) {
        this.eventLog = "You're too exhausted to forage!";
        return;
      }
      this.energy -= 10;
      const foodFound = Math.floor(Math.random() * 3) + 1;
      this.resources.food += foodFound;
      this.eventLog = `You foraged and found ${foodFound} kg of food.`;
      this.checkForNextDay();
    },
  
    // Collect water
    collectWater() {
      if (this.energy < 8) {
        this.eventLog = "You're too exhausted to collect water!";
        return;
      }
      this.energy -= 8;
      const waterCollected = Math.floor(Math.random() * 4) + 1;
      this.resources.water += waterCollected;
      this.eventLog = `You collected ${waterCollected} liters of fresh water!`;
      this.checkForNextDay();
    },
  
    // Hunt for food and pelts
    hunt() {
      if (this.energy < 15) {
        this.eventLog = "You're too exhausted to hunt!";
        return;
      }
      this.energy -= 15;
      const success = Math.random() > 0.4;
      if (success) {
        const foodGained = Math.floor(Math.random() * 5) + 2;
        this.resources.food += foodGained;
        const peltChance = Math.random();
        if (peltChance < 0.5) {
          this.inventory.push("pelt");
          this.eventLog = `You hunted and got ${foodGained} kg of meat and a pelt!`;
        } else {
          this.eventLog = `You hunted and got ${foodGained} kg of meat!`;
        }
      } else {
        const injuries = ["Sprained Ankle", "Broken Arm", "Animal Bite", "Deep Cut"];
        this.injury = injuries[Math.floor(Math.random() * injuries.length)];
        this.health -= 10;
        this.eventLog = `Your hunt failed, and you got injured: ${this.injury}.`;
      }
      this.checkForNextDay();
    },
  
    // Rest to regain energy and health
    rest() {
      this.energy = Math.min(this.energy + 30, 100);
      this.health = Math.min(this.health + 20, 100);
      this.eventLog = "You rested and regained 30 energy and 20 health.";
      this.checkForNextDay();
    },
  
    // Explore to find loot
    explore() {
      if (this.energy < 10) {
        this.eventLog = "You're too exhausted to explore!";
        return;
      }
      this.energy -= 10;
      const find = Math.random();
      if (find < 0.3) {
        this.inventory.push("medicine");
        this.eventLog = "You found a hidden stash of medicine!";
      } else if (find < 0.6) {
        this.inventory.push("fur");
        this.eventLog = "You discovered an animal carcass and skinned it for fur!";
      } else {
        this.eventLog = "You explored but found nothing useful.";
      }
      this.checkForNextDay();
    },
  
    // Trade items for resources
    trade() {
      if (this.inventory.includes("pelt")) {
        this.inventory.splice(this.inventory.indexOf("pelt"), 1);
        this.resources.food += 5;
        this.eventLog = "You traded a pelt for 5 kg of food!";
      } else if (this.inventory.includes("fur")) {
        this.inventory.splice(this.inventory.indexOf("fur"), 1);
        this.resources.food += 3;
        this.eventLog = "You traded fur for 3 kg of food!";
      } else {
        this.eventLog = "You have nothing to trade.";
      }
      this.checkForNextDay();
    },
  
    // Crafting recipes
    craftingRecipes: {
      spear: { materials: ["wood", "stone"], energy: 15 },
      bow: { materials: ["wood", "rope", "stone"], energy: 25 },
      axe: { materials: ["wood", "stone", "rope"], energy: 20 },
      knife: { materials: ["stone", "rope"], energy: 10 },
      fishingRod: { materials: ["rope", "stick", "hook"], energy: 15 },
      fireStarter: { materials: ["charcoal", "wood"], energy: 10 },
      waterFilter: { materials: ["charcoal", "cloth", "sand"], energy: 10 },
      clayPot: { materials: ["clay", "fire"], energy: 15 },
      cookingGrill: { materials: ["metal", "rope"], energy: 20 },
      shelter: { materials: ["wood", "rope"], energy: 20 },
      raft: { materials: ["wood", "rope"], energy: 30 },
      tent: { materials: ["cloth", "rope", "wood"], energy: 25 },
      warmClothing: { materials: ["fur", "cloth"], energy: 20 },
      snowshoes: { materials: ["wood", "rope"], energy: 10 },
      camouflageGear: { materials: ["cloth", "mud"], energy: 15 },
      herbalTea: { materials: ["herbs", "boiled water"], energy: 5 },
      bandages: { materials: ["cloth", "herbs"], energy: 5 },
      antiseptic: { materials: ["alcohol", "herbs"], energy: 10 },
      painkillers: { materials: ["herbs", "water"], energy: 10 },
      metalTools: { materials: ["metal", "fire", "rope"], energy: 30 },
      storageBox: { materials: ["wood", "rope"], energy: 15 },
      animalTraps: { materials: ["rope", "wood", "bait"], energy: 20 },
      smoker: { materials: ["wood", "rope", "fire"], energy: 25 }
    },
  
    // Get available crafting options based on inventory
    availableCraftingOptions() {
      let options = {};
      for (let item in this.craftingRecipes) {
        const recipe = this.craftingRecipes[item];
  
        // Ensure player has all materials before allowing crafting
        const canCraft = recipe.materials.every(mat => this.inventory.includes(mat));
  
        if (canCraft) {
          options[item] = recipe;
        }
      }
      return options;
    },
  
    // Craft an item
    craft(item) {
      const recipe = this.craftingRecipes[item];
  
      if (!recipe) {
        this.eventLog = "That item cannot be crafted.";
        return;
      }
  
      if (this.energy < recipe.energy) {
        this.eventLog = "You're too exhausted to craft!";
        return;
      }
  
      // Ensure materials exist before crafting
      for (let mat of recipe.materials) {
        if (!this.inventory.includes(mat)) {
          this.eventLog = `You don't have enough ${mat} to craft ${item}.`;
          return;
        }
      }
  
      // Remove used materials
      recipe.materials.forEach(mat => {
        const index = this.inventory.indexOf(mat);
        if (index > -1) {
          this.inventory.splice(index, 1);
        }
      });
  
      // Deduct energy and add crafted item to inventory
      this.energy -= recipe.energy;
      this.inventory.push(item);
      this.eventLog = `You crafted a ${item}!`;
  
      // Force Alpine.js to update UI properly
      Alpine.nextTick(() => this.showCrafting = true);
    },
    
    // Check if a new day should start
    checkForNextDay() {
      this.actionCount++;
      if (this.actionCount >= 3) { // Trigger next day after 3 actions
        this.nextDay();
        this.actionCount = 0; // Reset action count
      }
    },
  
    // Simulate the next day
    nextDay() {
      this.daysSurvived++;
      this.energy = Math.max(this.energy - 10, 0); // Daily energy drain
      this.resources.water = Math.max(this.resources.water - 2, 0); // Daily water consumption
      this.resources.food = Math.max(this.resources.food - 1, 0); // Daily food consumption
  
      if (this.resources.water <= 0) {
        this.thirst += 20;
        this.eventLog = "You're dehydrated! Your thirst level increased.";
      }
      if (this.resources.food <= 0) {
        this.hunger += 20;
        this.eventLog = "You're starving! Your hunger level increased.";
      }
      if (this.temperature < 0) {
        this.health -= 5;
        this.eventLog = "It's freezing! You lost 5 health.";
      }
      if (this.temperature > 30) {
        this.health -= 5;
        this.eventLog = "It's scorching hot! You lost 5 health.";
      }
  
      this.updateWeather();
      this.updateSeason();
    },
  
    // Update weather conditions
    updateWeather() {
      const weatherTypes = ["Clear", "Rainy", "Stormy", "Snowy"];
      this.weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      if (this.weather === "Rainy") {
        this.resources.water += 2; // Rain increases water supply
        this.eventLog = "It's raining! You collected 2 liters of water.";
      } else if (this.weather === "Stormy") {
        this.health -= 5; // Storms are dangerous
        this.eventLog = "A storm is raging! You lost 5 health.";
      } else if (this.weather === "Snowy") {
        this.temperature -= 10; // Snow lowers temperature
        this.eventLog = "It's snowing! The temperature dropped by 10°C.";
      }
    },
  
    // Update seasonal effects
    updateSeason() {
      const seasons = ["Spring", "Summer", "Fall", "Winter"];
      this.season = seasons[Math.floor(Math.random() * seasons.length)];
      if (this.season === "Winter") {
        this.temperature -= 15; // Winter is cold
        this.eventLog = "Winter has arrived! The temperature dropped significantly.";
      } else if (this.season === "Summer") {
        this.temperature += 15; // Summer is hot
        this.eventLog = "Summer is here! The temperature rose significantly.";
      }
    },
  
    // Toggle UI sections
    toggleStats() { this.showStats = !this.showStats; },
    toggleInventory() { this.showInventory = !this.showInventory; },
    toggleConsumption() { this.showConsumption = !this.showConsumption; },
    toggleCrafting() { 
      this.showCrafting = !this.showCrafting; 
      Alpine.nextTick(() => this.availableCraftingOptions()); // Force Alpine update
    }
  }));

  // Emergency Preparedness Checklist
  Alpine.data('emergencyChecklist', () => ({
    categories: loadStateFromLocalStorage("emergencyCategories", [
      
      // 🚗 Stability & Mobility Status
      {
        name: "Stability & Mobility Status",
        description: "Assess your shelter, transportation, and financial stability.",
        icon: "🚗",
        items: [
            { name: "I have a stable full-time income", checked: false },
            { name: "I have a part-time or irregular income", checked: false },
            { name: "I am currently unemployed", checked: false },
            { name: "I have an emergency savings fund (3-6 months of expenses)", checked: false },
            { name: "I have investments (stocks, real estate, crypto, etc.)", checked: false },
            { name: "I have a side hustle or passive income stream", checked: false },
            { name: "I have cash reserves for immediate emergencies ($500+ in cash)", checked: false },
            { name: "I have valuable tradeable assets (gold, silver, bartering items)", checked: false },
            { name: "I have a financial backup plan (loans, family support, credit line)", checked: false },
            { name: "I have a plan for generating income post-collapse (bartering, trading, selling skills)", checked: false },
            { name: "I have a stable home/apartment", checked: false },
            { name: "I have temporary housing (staying with family, hotel, shelter)", checked: false },
            { name: "I am currently homeless", checked: false },
            { name: "I have a bug-out location (cabin, secondary shelter)", checked: false },
            { name: "I have a vehicle for transportation", checked: false },
            { name: "I rely on public transportation", checked: false },
            { name: "I have no reliable transportation", checked: false },
            { name: "I have an emergency backup vehicle (bike, motorcycle, etc.)", checked: false },
            { name: "I have a fully stocked bug-out bag ready to go", checked: false },
            { name: "I have an emergency evacuation plan", checked: false }
        ]
    },
      
      // 💧 Water Essentials (Expanded)
      { 
        name: "Water", icon: "💧", expanded: false,
        items: [
          { name: "Bottled Water (4 liters per person per day)", checked: false },
          { name: "Water Purification Tablets (At least 20 per person)", checked: false },
          { name: "Portable Water Filter (e.g., Sawyer, LifeStraw)", checked: false },
          { name: "Collapsible Water Containers (For storage & transport)", checked: false },
          { name: "Water Storage Barrels (Long-term supply)", checked: false },
          { name: "Boiling Pot or Kettle (For water purification)", checked: false },
          { name: "DIY Rainwater Collection System", checked: false },
          { name: "Emergency Desalination Kit (If in coastal area)", checked: false },
          { name: "Bleach or Pool Shock (For emergency water treatment)", checked: false }
        ]
      },

      // 🍲 Food Essentials (Expanded)
      {
        name: "Food", icon: "🍲", expanded: false,
        items: [
          { name: "Canned Goods (Meats, Vegetables, Fruits, Soups)", checked: false },
          { name: "Energy Bars & Protein Bars", checked: false },
          { name: "Freeze-Dried or Dehydrated Meals", checked: false },
          { name: "Powdered Milk or Shelf-Stable Dairy Alternatives", checked: false },
          { name: "Rice, Beans, Lentils (Long-term bulk storage)", checked: false },
          { name: "Nut Butters (Peanut, Almond, etc.)", checked: false },
          { name: "Honey & Sugar (Natural sweeteners & preservatives)", checked: false },
          { name: "Cooking Oil (Coconut, Olive, or Vegetable Oil)", checked: false },
          { name: "Salt, Pepper, & Seasonings (Essential for nutrition & taste)", checked: false },
          { name: "Multivitamins (To prevent malnutrition)", checked: false },
          { name: "Camping Stove & Fuel (Propane, alcohol, or wood-burning)", checked: false },
          { name: "Cooking Pot & Utensils (For food prep & boiling water)", checked: false },
          { name: "Manual Can Opener (Non-electric backup)", checked: false },
          { name: "Fishing Kit (Hooks, line, lures, net, etc.)", checked: false },
          { name: "Foraging Guide & Plant Identification Book", checked: false },
          { name: "Food Storage Containers (For preserving leftovers)", checked: false }
        ]
      },

      // 🏕️ Shelter Essentials
      {
        name: "Shelter", icon: "⛺", expanded: false,
        items: [
          { name: "Tent (Lightweight & waterproof)", checked: false },
          { name: "Emergency Blankets (Thermal Mylar)", checked: false },
          { name: "Tarp & Rope (For makeshift shelters)", checked: false },
          { name: "Sleeping Bag (Rated for local climate)", checked: false },
          { name: "Sleeping Pad or Ground Mat", checked: false },
          { name: "Extra Clothing (Layered for all weather conditions)", checked: false },
          { name: "Wool Socks & Gloves (Cold weather protection)", checked: false },
          { name: "Work Gloves (For handling rough materials)", checked: false },
          { name: "Rain Poncho or Waterproof Jacket", checked: false }
        ]
      },

      // 🔥 Fire & Heat Essentials
      {
        name: "Fire & Heat", icon: "🔥", expanded: false,
        items: [
          { name: "Ferro Rod or Magnesium Fire Starter", checked: false },
          { name: "Waterproof Matches", checked: false },
          { name: "Lighters (At least 3 backups)", checked: false },
          { name: "Fire Starter Kit (Fatwood, cotton balls with Vaseline, etc.)", checked: false },
          { name: "Magnifying Lens (Sunlight fire-starting)", checked: false },
          { name: "Emergency Stove or Rocket Stove", checked: false },
          { name: "Extra Fuel (Propane, alcohol, wood, or charcoal)", checked: false },
          { name: "Candle Lantern or Oil Lamp", checked: false },
          { name: "Hand Warmers (For extreme cold survival)", checked: false }
        ]
      },

      // 🗺️ Navigation & Communication Essentials
      {
        name: "Navigation & Communication", icon: "🗺️", expanded: false,
        items: [
          { name: "Compass & Topographic Maps (For navigation without GPS)", checked: false },
          { name: "Hand-Crank or Solar-Powered Radio", checked: false },
          { name: "Whistle (For signaling rescue)", checked: false },
          { name: "Notebook & Pencil (For tracking locations & notes)", checked: false },
          { name: "Signal Mirror (Emergency signaling)", checked: false },
          { name: "Glow Sticks (Emergency lighting & signaling)", checked: false },
          { name: "Walkie-Talkies (Short-range emergency comms)", checked: false },
          { name: "HAM Radio or CB Radio (Long-range emergency comms)", checked: false },
          { name: "USB Charging Cables & Power Banks", checked: false }
        ]
      },

      // ⚕️ Medical & First Aid Essentials
      { 
        name: "Medical & First Aid", icon: "⚕️", expanded: false,
        items: [
          { name: "First Aid Kit (Bandages, antiseptics, gauze, etc.)", checked: false },
          { name: "Prescription Medications (At least 14-day supply)", checked: false },
          { name: "Pain Relievers (Ibuprofen, Acetaminophen, etc.)", checked: false },
          { name: "Antiseptic Wipes & Alcohol Pads", checked: false },
          { name: "Tweezers, Scissors & Safety Pins", checked: false },
          { name: "Emergency Tourniquet (For severe bleeding)", checked: false },
          { name: "Suture Kit or Butterfly Closures", checked: false },
          { name: "Splint Materials (For immobilizing injuries)", checked: false },
          { name: "Snake Bite Kit (For venomous regions)", checked: false },
          { name: "N95 Masks (For air contamination protection)", checked: false }
        ]
      },

      // 🛠️ Tools & Repair Essentials
      { 
        name: "Tools & Repairs", icon: "🛠️", expanded: false,
        items: [
          { name: "Multi-Tool or Swiss Army Knife", checked: false },
          { name: "Duct Tape (Fix anything)", checked: false },
          { name: "Paracord (50+ feet for tying & securing)", checked: false },
          { name: "Folding Saw or Wire Saw", checked: false },
          { name: "Hatchet or Machete", checked: false },
          { name: "Shovel (Compact, folding, or full-size)", checked: false },
          { name: "Sharpening Stone (For maintaining blades)", checked: false },
          { name: "Super Glue (Quick repairs & medical use)", checked: false },
          { name: "Sewing Kit (For repairing gear & clothing)", checked: false }
        ]
      },
      
      // 🎒 Bug-Out Bag Essentials
      { 
        name: "Bug-Out Bag Essentials", icon: "🎒", expanded: false,
        items: [
          { name: "Bug-Out Bag (45L+)", checked: false },
          { name: "Tactical Knife", checked: false },
          { name: "Multi-Tool", checked: false },
          { name: "Paracord (50+ feet)", checked: false },
          { name: "Emergency Shelter (Tarp, Tent, Space Blanket)", checked: false },
          { name: "Portable Water Filter", checked: false },
          { name: "Solar Charger & Power Bank", checked: false },
          { name: "Headlamp & Extra Batteries", checked: false },
          { name: "Self-Defense Weapon (Pepper Spray, Baton, etc.)", checked: false }
        ]
      },

      // ⚒️ Skills & Sustainability
      { 
        name: "Skills & Sustainability", icon: "⚒️", expanded: false,
        items: [
          { name: "Fire-Starting (Bow Drill, Flint & Steel)", checked: false },
          { name: "Water Collection & Purification", checked: false },
          { name: "Foraging & Wild Edibles", checked: false },
          { name: "Trapping & Hunting", checked: false },
          { name: "Gardening & Permaculture", checked: false },
          { name: "DIY Soap & Hygiene Production", checked: false },
          { name: "Knot Tying & Rope Work", checked: false },
          { name: "Sewing & Clothing Repair", checked: false },
          { name: "Leatherworking & Hide Tanning", checked: false }
        ]
      },

      // ⚔️ Tactical & War Preparation
      { 
        name: "Tactical & War Preparation", icon: "⚔️", expanded: false,
        items: [
          { name: "Handgun & Ammo", checked: false },
          { name: "Rifle & Ammo", checked: false },
          { name: "Shotgun & Shells", checked: false },
          { name: "Bow & Arrows (Silent Weapon)", checked: false },
          { name: "Bulletproof Vest (Level III+)", checked: false },
          { name: "Gas Mask & Filters", checked: false },
          { name: "Combat First Aid & Tourniquet", checked: false },
          { name: "Urban & Rural Combat Tactics", checked: false },
          { name: "CQB & Hand-to-Hand Combat Training", checked: false }
        ]
      },

      // 🕵️‍♂️ Advanced Defense & Counter-Surveillance
      { 
        name: "Advanced Defense & Counter-Surveillance", icon: "🕵️‍♂️", expanded: false,
        items: [
          { name: "Night Vision Goggles (Gen 3+)", checked: false },
          { name: "Thermal Imaging Device", checked: false },
          { name: "Security Cameras & Motion Sensors", checked: false },
          { name: "Tripwires & Alarm Systems", checked: false },
          { name: "Escape & Evasion Tactics", checked: false },
          { name: "Counter-Tracking & Deception Techniques", checked: false },
          { name: "Cybersecurity & Digital Privacy", checked: false },
          { name: "Dead Drop & Secret Communication Training", checked: false },
          { name: "Lock Picking & Bypass Techniques", checked: false }
        ]
      },

      // ⚡ Electrical Engineering & Hacking
      { 
        name: "Electrical Engineering & Hacking", icon: "⚡", expanded: false,
        items: [
          { name: "Solar Panels & Battery Bank", checked: false },
          { name: "HAM Radio & Emergency Comms", checked: false },
          { name: "Multimeter & Soldering Tools", checked: false },
          { name: "EMP Protection (Faraday Cage)", checked: false },
          { name: "Cyber Hacking & Penetration Testing", checked: false },
          { name: "Alternative Energy Sources (Hydro, Wind, etc.)", checked: false },
          { name: "DIY Generator & Off-Grid Power Solutions", checked: false },
          { name: "DIY Drone & Remote Surveillance", checked: false }
        ]
      },

      // 🏭 Post-Collapse Manufacturing & Zero Waste
      { 
        name: "Post-Collapse Manufacturing & Zero Waste", icon: "🏭", expanded: false,
        items: [
          { name: "Blacksmithing & Metalworking", checked: false },
          { name: "Glass Blowing & Reclaiming", checked: false },
          { name: "Plastic Recycling & Upcycling", checked: false },
          { name: "Leatherworking & Hide Tanning", checked: false },
          { name: "DIY Brick & Cement Making", checked: false },
          { name: "Clothing & Textile Production", checked: false },
          { name: "Soap, Candles, & Household Necessities", checked: false },
          { name: "Basic Carpentry & Shelter Building", checked: false },
          { name: "Renewable Agriculture & Off-Grid Farming", checked: false }
        ]
      },

      // 💰 Finance & Wealth-Building
      { 
        name: "Finance & Wealth-Building", icon: "💰", expanded: false,
        items: [
          { name: "Emergency Fund (3-6 Months)", checked: false },
          { name: "Stock Market Investing", checked: false },
          { name: "Real Estate Flipping & Rentals", checked: false },
          { name: "Multiple Streams of Income", checked: false },
          { name: "Bartering & Alternative Economy Skills", checked: false },
          { name: "Precious Metals & Tangible Assets (Gold, Silver)", checked: false },
          { name: "Cryptocurrency & Digital Security", checked: false },
          { name: "Survival Business Ideas (Self-Sufficient Income)", checked: false }
        ]
      }
    ]),

    // 🔥 Individual Readiness Meters
    getCategoryPercentage(categoryName) {
      let category = this.categories.find(c => c.name === categoryName);
      let checkedCount = category.items.filter(item => item.checked).length;
      return Math.round((checkedCount / category.items.length) * 100);
    },

    getCategoryReadinessLevel(categoryName) {
      const percentage = this.getCategoryPercentage(categoryName);
      if (percentage === 100) return "Mastery 🏆";
      if (percentage >= 80) return "Highly Skilled ⚡";
      if (percentage >= 60) return "Competent 🔥";
      if (percentage >= 40) return "Beginner 🌱";
      return "Unprepared 🚨";
    },

    // 🔥 Global Readiness Meter (Based on ALL categories)
    get globalReadinessPercentage() {
      let totalPercentage = this.categories.reduce((sum, category) => sum + this.getCategoryPercentage(category.name), 0);
      return Math.round(totalPercentage / this.categories.length);
    },

    get globalReadinessLevel() {
      const percentage = this.globalReadinessPercentage;
      if (percentage === 100) return "Ultimate Survivalist 🏆";
      if (percentage >= 80) return "Elite Prepper ⚔️";
      if (percentage >= 60) return "Survivalist 🔥";
      if (percentage >= 40) return "Basic Preparedness 🌱";
      return "Unprepared & Vulnerable 🚨";
    },

    init() {
        this.$watch('categories', (value) => saveStateToLocalStorage("emergencyCategories", value));
    },
    
    toggleItem(item) {
      this.$set(item, 'checked', !item.checked);
      saveStateToLocalStorage("emergencyCategories", this.categories);
    },

    toggleCategory(category) {
      category.expanded = !category.expanded;
    }
  }));

  // Survival Tools
  Alpine.data('survivalTools', () => ({
    status: {
      currentVersion: "0.0.4",  // Update this every time you release a new version
      latestVersion: null,
      updateAvailable: false,
  
      init() {
          this.checkForUpdate();
      },
  
      async checkForUpdate() {
          try {
              let response = await fetch('/version.json', { cache: 'no-cache' });
              let data = await response.json();
              this.latestVersion = data.version;
  
              if (this.latestVersion !== this.currentVersion) {
                  this.updateAvailable = true;
              }
          } catch (error) {
              console.warn("Could not check for updates:", error);
          }
      },
  
      updatePWA() {
          if (navigator.serviceWorker) {
              navigator.serviceWorker.getRegistrations().then(registrations => {
                  for (let registration of registrations) {
                      registration.unregister();
                  }
              });
          }
  
          caches.keys().then(cacheNames => {
              cacheNames.forEach(cacheName => caches.delete(cacheName));
          });
  
          setTimeout(() => {
              location.reload();
          }, 1000);
      },
      
      // Import/Export Data
      exportAppData() {
          const appData = {
              emergencyCategories: JSON.parse(localStorage.getItem("emergencyCategories") || "[]"),
              guides: JSON.parse(localStorage.getItem("guides") || "[]"),
              skillPoints: JSON.parse(localStorage.getItem("skillPoints") || "0"),
              skills: JSON.parse(localStorage.getItem("skills") || "[]")
          };
      
          const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
          const downloadAnchor = document.createElement("a");
          downloadAnchor.setAttribute("href", dataStr);
          downloadAnchor.setAttribute("download", "BeaconAppData.json");
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          document.body.removeChild(downloadAnchor);
      },
      importAppData(event) {
          const file = event.target.files[0];
          if (!file) return;
      
          const reader = new FileReader();
          reader.onload = function(event) {
              try {
                  const appData = JSON.parse(event.target.result);
                  
                  if (appData) {
                      localStorage.setItem("emergencyCategories", JSON.stringify(appData.emergencyCategories || []));
                      localStorage.setItem("guides", JSON.stringify(appData.guides || []));
                      localStorage.setItem("skillPoints", JSON.stringify(appData.skillPoints || 0));
                      localStorage.setItem("skills", JSON.stringify(appData.skills || []));
      
                      alert("Data imported successfully! Refreshing the page...");
                      location.reload(); // Refresh the page to apply changes
                  }
              } catch (error) {
                  alert("Invalid JSON file. Please upload a valid BeaconAppData.json file.");
              }
          };
          
          reader.readAsText(file);
      },
    },
      
    // 📡 Signal Mirror
    signalMirror: {
        flashing: false,
        interval: null,
        sosPattern: [250, 250, 250, 250, 250, 750, 250, 750, 250, 750, 250, 250, 250, 250, 250, 1000],
        flashIndex: 0,
        flashScreen() {
            if (this.flashing) {
                this.flashIndex = 0;
                this.runSOS();
            } else {
                clearInterval(this.interval);
                document.getElementById('signalMirror').classList.add('hidden');
                document.querySelectorAll('.tile').forEach(e => e.classList.remove('hidden'));
            }
        },
        runSOS() {
            if (!this.flashing) return;
            let duration = this.sosPattern[this.flashIndex];
            document.getElementById('signalMirror').classList.toggle('hidden');
            this.flashIndex++;
            if (this.flashIndex >= this.sosPattern.length) {
                setTimeout(() => {
                    this.flashIndex = 0;
                    this.runSOS();
                }, 2000);
            } else {
                setTimeout(() => this.runSOS(), duration);
            }
        }
    },

    // 🧭 Compass
    compass: {
        heading: 0
    },

    initCompass() {
        if ('ondeviceorientationabsolute' in window) {
            window.addEventListener('deviceorientationabsolute', (event) => {
                this.compass.heading = Math.round(event.alpha);

                // Access the arrow via Alpine's $refs
                let arrow = this.$root.querySelector('[x-ref="compassArrow"]');
                if (arrow) {
                    arrow.style.transform = `rotate(${360 - this.compass.heading}deg)`;
                }
            });
        } else {
            this.compass.heading = 'Not Supported';
        }
    },

    // 🚶 Pedometer
    pedometer: {
        steps: 0,
        stepLength: 0.75, // Average step length in meters
        reset() {
            this.steps = 0;
        },
        init() {
            if ('ondevicemotion' in window) {
                let lastY = null;
                window.addEventListener('devicemotion', (event) => {
                    let y = event.accelerationIncludingGravity.y;
                    if (lastY !== null && Math.abs(y - lastY) > 1) {
                        this.steps++;
                    }
                    lastY = y;
                });
            }
        }
    },

    // 📝 Morse Code Translator
    morseCode: {
        playing: null,
        textInput: '',
        morseOutput: '',
        morseMap: {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.',
            'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.',
            'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
            'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
            '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
            '6': '-....', '7': '--...', '8': '---..', '9': '----.'
        },
        updateMorse() {
            this.morseOutput = this.textInput.toUpperCase().split('')
                .map(letter => this.morseMap[letter] || ' ')
                .join(' ');
        },
        playMorseCode() {
            if (this.playing) {
                this.playing = false;
                clearTimeout(this.timeout);
                navigator.vibrate(0);
                return;
            }
            this.playing = true;
            let morseSequence = this.morseOutput.split('');
            let index = 0;
            let unit = 200;
            const playNext = () => {
                if (!this.playing || index >= morseSequence.length) {
                    this.playing = false;
                    return;
                }
                let symbol = morseSequence[index];
                index++;
                switch (symbol) {
                    case '.':
                        navigator.vibrate(unit);
                        this.timeout = setTimeout(playNext, unit * 2);
                        break;
                    case '-':
                        navigator.vibrate(unit * 3);
                        this.timeout = setTimeout(playNext, unit * 4);
                        break;
                    case ' ':
                        this.timeout = setTimeout(playNext, unit * 6);
                        break;
                    default:
                        playNext();
                }
            };
            playNext();
        }
    },

    // 📏 Level Tool
    levelTool: {
        x: 0,
        y: 0,
        init() {
            if ('ondevicemotion' in window) {
                window.addEventListener('devicemotion', (event) => {
                    if (event.accelerationIncludingGravity) {
                        this.x = event.accelerationIncludingGravity.x.toFixed(2);
                        this.y = event.accelerationIncludingGravity.y.toFixed(2);
                    }
                });
            }
        },
        bubbleX() { return `translateX(${this.x * 10}px)`; },
        bubbleY() { return `translateY(${this.y * 10}px)`; }
    }
  }));

  // Guides
  Alpine.data("library", () => ({
      activeCategory: loadStateFromLocalStorage("activeCategory", "all"),
      searchQuery: loadStateFromLocalStorage("searchQuery", ""),
      categories: [
          { name: "All", key: "all" },
          { name: "Packing", key: "packing" },
          { name: "Tool Mastery", key: "tool-mastery" },
          { name: "Fire", key: "fire" },
          { name: "Water", key: "water" },
          { name: "Shelter", key: "shelter" },
          { name: "Navigation", key: "navigation" },
          { name: "First Aid", key: "first-aid" },
          { name: "Foraging", key: "foraging" },
          { name: "Trapping", key: "trapping" },
          { name: "Knots", key: "knots" },
          { name: "Signaling", key: "signaling" },
          { name: "Tactical", key: "tactical" },
          { name: "Electrical", key: "electrical" },
          { name: "Finance", key: "finance" },
          { name: "Hardcore", key: "hardcore" }
      ],

      // 📖 Survival Guides (Fully Detailed)
      guides: loadStateFromLocalStorage("guides", [

          // 🎒 Bug-Out Bag Readiness
          {
              "title": "Ranger Rolling: T-Shirts & Base Layers",
              "description": "Learn how to ranger roll t-shirts and base layers to save space in your pack.",
              "category": "packing",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "T-shirt or base layer",
                  "Flat surface for rolling"
              ],
              "steps": [
                  "🔎 **Why Use Ranger Rolling?** – This method **compresses clothing**, saves space, and keeps items **tight and organized**.",
                  "1️⃣ **Lay the Shirt Flat** – Place the t-shirt **face-down on a flat surface**, smoothing out wrinkles.",
                  "2️⃣ **Fold the Bottom Up** – Fold **3-4 inches of fabric** at the bottom inside-out to create a **pocket**.",
                  "3️⃣ **Fold in the Sleeves** – Fold each sleeve **straight in toward the center**.",
                  "4️⃣ **Fold the Sides In** – Bring the **left and right sides** inward so the shirt forms a **narrow rectangle**.",
                  "5️⃣ **Roll Tightly from the Top** – Start from the **collar** and roll **downward** as **tight as possible**.",
                  "6️⃣ **Secure Using the Pocket** – Flip the **inside-out pocket over the roll**, locking it in place."
              ],
              "tips": [
                  "🎒 **Use This for All Base Layers** – Works great for **long-sleeve shirts, thermals, and undershirts**.",
                  "🧳 **Prepares Clothes for Quick Access** – Easily pull one roll from your bag **without disrupting the rest**.",
                  "🌀 **Roll Evenly for Maximum Compression** – Uneven rolls **waste space** and unravel more easily."
              ]
          },
          {
              "title": "Ranger Rolling: Pants & Trousers",
              "description": "Master ranger rolling for pants and trousers to fit more in your bag.",
              "category": "packing",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Pants, jeans, or tactical trousers",
                  "Flat surface for rolling"
              ],
              "steps": [
                  "🔎 **Why Roll Pants?** – Rolling pants **reduces bulk**, keeps them **tight and wrinkle-free**, and **saves space** in a bug-out bag.",
                  "1️⃣ **Lay Pants Flat** – Place the pants **face-up on a flat surface**, ensuring the legs are straight.",
                  "2️⃣ **Fold the Waistband Over** – Fold **4-5 inches** inside-out at the **waist** to create a **pocket**.",
                  "3️⃣ **Fold in the Legs** – Fold **one leg over the other**, keeping it even.",
                  "4️⃣ **Roll from the Cuffs Up** – Start rolling **tightly from the bottom** up toward the waist.",
                  "5️⃣ **Secure Using the Waist Pocket** – Flip the **inside-out pocket over the roll** to lock it in place."
              ],
              "tips": [
                  "🧢 **Avoid Rolling Too Tight** – If rolled too tight, pants **may become difficult to unpack**.",
                  "🎒 **Use for Tactical Pants & BDU Gear** – Works well for **military and hiking pants**.",
                  "🌲 **Great for Packing in Bug-Out Bags** – Saves space for more **gear and supplies**."
              ]
          },
          {
              "title": "Ranger Rolling: Socks & Underwear",
              "description": "Keep socks and underwear compact and easy to find using the ranger roll method.",
              "category": "packing",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Pairs of socks",
                  "Underwear (boxers, briefs, or thermal bottoms)",
                  "Flat surface"
              ],
              "steps": [
                  "🔎 **Why Roll Socks & Underwear?** – Keeps these **small essentials organized**, **prevents them from getting lost**, and **saves space**.",
                  "1️⃣ **Lay Socks Flat & Stack Together** – Place one sock **on top of the other**, aligning the cuffs.",
                  "2️⃣ **Roll from Toes to Cuff** – Start at the toe section and **roll tightly toward the cuff**.",
                  "3️⃣ **Use the Cuff to Secure the Roll** – Stretch the **top sock’s cuff over the roll** to lock it in place.",
                  "4️⃣ **For Underwear: Fold & Roll** – Lay underwear flat, **fold into thirds**, then **roll tightly from the waistband down**.",
                  "5️⃣ **Secure Using the Waistband** – Flip the waistband over the roll to **keep everything compact**."
              ],
              "tips": [
                  "🧦 **Pair Socks Before Rolling** – This makes it **easier to grab matching pairs**.",
                  "🎒 **Use for Thermals & Base Layers Too** – Works well for **cold-weather layers**.",
                  "🗂 **Sort by Type** – Keep **undergarments and socks separated** for quick packing."
              ]
          },
          {
              "title": "Packing a Bug-Out Bag with Ranger Rolls",
              "description": "Learn how to pack a bug-out bag efficiently using ranger rolling techniques.",
              "category": "packing",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Bug-out bag (or backpack)",
                  "Ranger-rolled clothing",
                  "Compression straps or packing cubes (optional)"
              ],
              "steps": [
                  "🔎 **Why Ranger Roll Your Bug-Out Bag?** – Organizes your gear for **fast access, weight balance, and maximum efficiency**.",
                  "1️⃣ **Roll & Group Items by Category** – Separate **shirts, pants, socks, and underwear** into distinct bundles.",
                  "2️⃣ **Place Heavy Items at the Bottom** – Store **boots, cooking gear, and heavier tools** at the base.",
                  "3️⃣ **Layer Clothing Rolls for Balance** – Stack ranger-rolled clothes **above heavy items** to **distribute weight evenly**.",
                  "4️⃣ **Use Side Pockets for Quick Access** – Pack **essential gear (fire kit, first aid, water filter)** in easily accessible areas.",
                  "5️⃣ **Compress & Secure with Straps** – Use **compression straps or packing cubes** to **prevent shifting** during movement."
              ],
              "tips": [
                  "🎒 **Keep Heavier Items Close to Your Back** – This improves **balance and reduces strain** while carrying the bag.",
                  "🔄 **Repack as Needed** – Adjust layout based on **urgency and ease of access** to supplies.",
                  "🏕 **Test the Load Before Hiking** – Wear your packed bag **to ensure comfort and proper weight distribution**."
              ]
          },
          {
              "title": "Ranger Rolling for Tactical & Military Gear",
              "description": "Organize military and tactical gear efficiently using ranger rolling.",
              "category": "packing",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "BDU or tactical uniforms",
                  "Tactical belts & pouches",
                  "Military boots (optional)",
                  "Backpack or rucksack"
              ],
              "steps": [
                  "🔎 **Why Roll Tactical Gear?** – Keeps **military clothing, uniforms, and pouches compact**, preventing clutter in the field.",
                  "1️⃣ **Fold BDU Shirts & Pants as Standard** – Follow the ranger roll techniques for **shirts and pants**.",
                  "2️⃣ **Secure Utility Pouches with Straps** – Keep small gear items **tight and accessible**.",
                  "3️⃣ **Pack Ammo & Equipment Strategically** – Place **tactical gear in layers**, keeping **weapons and survival tools within reach**.",
                  "4️⃣ **Use Modular Packing for Fast Deployment** – Arrange gear so it can be **grabbed and deployed instantly**.",
                  "5️⃣ **Secure Using Compression Straps** – Tighten load to prevent **gear shifting during movement**."
              ],
              "tips": [
                  "⚔ **Pack Heavier Tactical Gear in the Center** – Helps **balance the pack for movement**.",
                  "🛠 **Label or Mark Essential Gear** – Use **color-coding or pouches** to identify critical items fast.",
                  "🔄 **Practice Unpacking & Repacking** – The **faster you can set up your gear, the more prepared you’ll be**."
              ]
          },
          {
              "title": "Packing a Bug-Out Bag: Essentials & Organization",
              "description": "Learn how to efficiently pack a bug-out bag with all necessary survival gear.",
              "category": "packing",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Bug-out bag (backpack, rucksack, or duffel bag)",
                  "Survival gear (fire starter, water filter, first aid kit, etc.)",
                  "Clothing and sleeping gear",
                  "Food and emergency rations",
                  "Compression straps or packing cubes (optional)"
              ],
              "steps": [
                  "🔎 **Why Pack a Bug-Out Bag Correctly?** – A well-packed bug-out bag ensures **balance, easy access to gear, and weight efficiency for long-term survival**.",
                  "1️⃣ **Choose the Right Bag** – Select a **durable, waterproof bag** with enough storage for at least **72 hours of survival gear**.",
                  "2️⃣ **Pack Heavy Items at the Bottom** – Store **water bottles, tools, and cookware** at the base for better weight distribution.",
                  "3️⃣ **Keep Frequently Used Items Accessible** – Place **fire starters, maps, first aid, and weapons in outer pockets**.",
                  "4️⃣ **Use Waterproof Bags for Electronics & Documents** – Keep **phones, radios, and ID documents in zip-lock or dry bags**.",
                  "5️⃣ **Distribute Weight Evenly** – Avoid overloading one side, which can cause **strain and discomfort** during movement.",
                  "6️⃣ **Test the Bag's Weight & Fit** – Adjust straps and test-wear the bag **before an emergency** to ensure comfort."
              ],
              "tips": [
                  "🎒 **Stay Under 25% of Your Body Weight** – Avoid carrying too much weight to prevent **fatigue and injury**.",
                  "💦 **Carry Water Wisely** – Use **hydration bladders** or lightweight filtration systems instead of multiple heavy bottles.",
                  "🚑 **Make a Quick-Grab Emergency Pouch** – Keep **first aid, emergency food, and small tools in an easy-access pocket**."
              ]
          },
          {
              "title": "Packing for Cold Weather: Winter Survival Loadout",
              "description": "Learn how to pack for cold weather survival, ensuring warmth and efficiency.",
              "category": "packing",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Cold-weather clothing (thermal layers, insulated jacket, gloves, hat, etc.)",
                  "Sleeping bag rated for sub-zero temperatures",
                  "Hand warmers and fire-starting gear",
                  "Extra socks and waterproof boots"
              ],
              "steps": [
                  "🔎 **Why Pack Smart for Cold Weather?** – In extreme cold, **staying warm, dry, and mobile is essential** for survival.",
                  "1️⃣ **Layer Clothing Properly** – Pack in layers: **base layer (moisture-wicking), mid-layer (insulation), and outer layer (waterproof)**.",
                  "2️⃣ **Use Compression Bags for Bulkier Gear** – Stuff jackets, sleeping bags, and extra socks into **compression sacks**.",
                  "3️⃣ **Protect Fire-Starting Gear from Moisture** – Store **lighters, matches, and tinder in waterproof containers**.",
                  "4️⃣ **Keep Heat Packs in Outer Pockets** – Place hand and foot warmers where they’re easily accessible.",
                  "5️⃣ **Secure Ice & Snow Gear Separately** – Attach **crampons, snowshoes, or ice axes to external MOLLE straps**.",
                  "6️⃣ **Avoid Sweating** – **Overpacking causes overheating**, leading to sweat that **freezes in cold weather**."
              ],
              "tips": [
                  "🧊 **Insulate Water Bottles** – Store water **inside your jacket or sleeping bag** to prevent freezing.",
                  "🔥 **Have Multiple Fire Starters** – A single **failed fire-starting method could be deadly in freezing conditions**.",
                  "🦶 **Pack Extra Socks** – Wet feet in winter lead to **frostbite**, so always carry **dry backups**."
              ]
          },
          {
              "title": "Packing a Tactical Loadout: Military & Combat Gear",
              "description": "Optimize your tactical gear loadout for movement, accessibility, and combat readiness.",
              "category": "packing",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Tactical backpack or plate carrier",
                  "Ammunition pouches and firearm accessories",
                  "Medical kit and tourniquet",
                  "Body armor and protective gear"
              ],
              "steps": [
                  "🔎 **Why Pack a Tactical Loadout Efficiently?** – **Weight balance, quick access, and protection** are key for tactical readiness.",
                  "1️⃣ **Distribute Weight Evenly** – Heavy **ammo and gear should be close to the center of mass** for better agility.",
                  "2️⃣ **Prioritize Ammo & First Aid** – Place **magazines and medical gear in easy-access pouches**.",
                  "3️⃣ **Secure Body Armor Properly** – Adjust plate carriers and chest rigs for **mobility and protection**.",
                  "4️⃣ **Use MOLLE Attachments for Quick Deployment** – Store **flashlights, knives, and radios within reach**.",
                  "5️⃣ **Avoid Carrying Unnecessary Gear** – **Minimize bulk** by focusing on **mission-critical equipment only**.",
                  "6️⃣ **Pack a Backup Weapon if Possible** – A secondary firearm or knife **provides redundancy in emergencies**."
              ],
              "tips": [
                  "⚔ **Keep Loadout Under 35 lbs** – A heavy pack **reduces speed and maneuverability**.",
                  "🔫 **Train with Your Gear** – Regularly **wear and move with your tactical setup** to adjust for real-world use.",
                  "🗃 **Label & Organize Ammo** – Store **different calibers separately** for quick identification."
              ]
          },
          {
              "title": "Packing for Long-Term Survival: Extended Gear Loadout",
              "description": "Prepare for long-term survival with a pack designed for self-sufficiency.",
              "category": "packing",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Large-capacity backpack or external frame pack",
                  "Multi-tool and survival knife",
                  "Food and water purification system",
                  "Shelter and fire-starting gear",
                  "Hunting and trapping supplies"
              ],
              "steps": [
                  "🔎 **Why Pack for Long-Term Survival?** – This pack ensures **self-sufficiency for extended periods in the wild**.",
                  "1️⃣ **Pack Lightweight, High-Calorie Food** – Focus on **dried meats, nuts, and meal replacements** to maximize nutrition.",
                  "2️⃣ **Carry a Multi-Purpose Tool** – A **multi-tool or survival knife reduces the need for extra gear**.",
                  "3️⃣ **Include Renewable Water Collection** – Pack a **water filter, purification tablets, and solar still setup**.",
                  "4️⃣ **Pack Durable Shelter Gear** – A **lightweight tarp, hammock, or bivy sack** is preferable to a heavy tent.",
                  "5️⃣ **Keep a Backup Fire-Starting Method** – Always have **multiple ways to make fire (ferro rod, lighter, bow drill)**.",
                  "6️⃣ **Balance Between Mobility & Resources** – Avoid overloading your pack **beyond sustainable carrying weight**."
              ],
              "tips": [
                  "🌲 **Plan for Resupply** – Long-term survival relies on **hunting, foraging, and replenishing supplies**.",
                  "🔥 **Use Minimal Fuel Cooking Methods** – A small camp stove or Dakota fire hole **conserves resources**.",
                  "🗺 **Have Navigation Tools** – A **map, compass, or GPS device** ensures you **can relocate supply caches**."
              ]
          },
          {
              "title": "Packing a First Aid Kit: Medical Readiness",
              "description": "Assemble a well-stocked medical kit for survival situations.",
              "category": "packing",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Tourniquets, bandages, and gauze",
                  "Antiseptic wipes and antibiotic ointment",
                  "Emergency medications (pain relievers, antihistamines)",
                  "Medical gloves and trauma shears"
              ],
              "steps": [
                  "🔎 **Why Have a First Aid Kit?** – Injuries are **common in survival situations**; a medical kit can **prevent infection and save lives**.",
                  "1️⃣ **Start with Trauma Supplies** – Pack **tourniquets, gauze, and hemostatic agents** for serious injuries.",
                  "2️⃣ **Include Everyday Essentials** – Pack **band-aids, antiseptics, and allergy meds** for minor issues.",
                  "3️⃣ **Organize for Quick Access** – Store **critical items in separate pouches for fast retrieval**.",
                  "4️⃣ **Label Everything Clearly** – Ensure you **know what each item is and how to use it**.",
                  "5️⃣ **Store in a Waterproof Case** – A sealed medical bag **protects against moisture and contamination**.",
                  "6️⃣ **Restock Regularly** – Replace used or expired items to **keep your kit effective**."
              ],
              "tips": [
                  "🚑 **Learn Basic First Aid Skills** – Having supplies is useless **if you don’t know how to use them**.",
                  "🧼 **Prioritize Hygiene** – **Clean wounds immediately** to prevent infection in survival scenarios.",
                  "📋 **Pack a Medical Reference Guide** – **A small manual or printed instructions can save lives**."
              ]
          },
        
          // 🗡️ Tool Mastery
          {
              "title": "Flint Knapping: Understanding the Basics",
              "description": "Learn the fundamental techniques of flint knapping to create sharp stone tools.",
              "category": "tool-mastery",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Flint, chert, or obsidian",
                  "Hammerstone (for percussion flaking)",
                  "Pressure flaker (antler tine or copper-tipped tool)",
                  "Leather pad or hand protection"
              ],
              "steps": [
                  "🔎 **What is Flint Knapping?** – Flint knapping is the process of shaping **stone tools and weapons** by carefully striking rock.",
                  "1️⃣ **Choose Your Stone** – **Flint, chert, and obsidian** are ideal for knapping due to their fine-grained structure.",
                  "2️⃣ **Prepare the Core** – Strike off an **initial flake** using a hammerstone to create a workable edge.",
                  "3️⃣ **Percussion Flaking** – Hold the stone and strike at a **sharp angle** to remove **long, thin flakes**.",
                  "4️⃣ **Pressure Flaking** – Use a pointed tool (antler, bone, or copper) to refine the edge by applying controlled pressure.",
                  "5️⃣ **Shape the Tool** – Continue **removing small flakes** to form a **knife, scraper, or arrowhead**.",
                  "6️⃣ **Smooth & Sharpen** – Grind dull edges and refine the tool's shape for usability."
              ],
              "tips": [
                  "🛠 **Wear Gloves & Eye Protection** – Knapping creates **sharp shards** that can cut skin easily.",
                  "⚡ **Control Your Strikes** – Use **firm but controlled** blows for **better accuracy and efficiency**.",
                  "🪵 **Practice on Thicker Stones First** – Thin flakes are easier to break, so start with **larger cores**."
              ]
          },
          {
              "title": "Flint Knapping: Making a Stone Knife",
              "description": "Craft a sharp, durable stone knife using flint knapping techniques.",
              "category": "tool-mastery",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Flint or chert",
                  "Hammerstone",
                  "Pressure flaker",
                  "Wood or bone handle",
                  "Cordage or sinew (for binding)"
              ],
              "steps": [
                  "🔎 **Why a Stone Knife?** – Stone knives are **versatile survival tools** used for **cutting, skinning, and carving**.",
                  "1️⃣ **Select Your Flint Core** – Choose a piece with **a sharp edge** and a **manageable size**.",
                  "2️⃣ **Shape the Blade** – Use **percussion flaking** to remove excess material and form a **long, thin shape**.",
                  "3️⃣ **Refine the Edge** – Apply **pressure flaking** along both sides to create a **sharp cutting edge**.",
                  "4️⃣ **Prepare the Handle** – Carve a **notch in wood or bone** to fit the stone blade securely.",
                  "5️⃣ **Secure the Blade** – Use **sinew, plant fiber, or cordage** to tightly wrap the knife in place.",
                  "6️⃣ **Test & Sharpen** – Carefully test the knife on **softwood or meat** and refine if needed."
              ],
              "tips": [
                  "🔪 **Use Fine Pressure Flakes** – A **well-knapped edge** cuts better and lasts longer.",
                  "🪵 **Choose a Comfortable Handle** – Ensure the **grip feels secure** for safe handling.",
                  "🔥 **Fire-Harden the Handle** – Slightly charring wood **improves durability and grip**."
              ]
          },
          {
              "title": "Flint Knapping: Crafting an Arrowhead",
              "description": "Create a sharp stone arrowhead for hunting and survival tools.",
              "category": "tool-mastery",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Flint or obsidian",
                  "Pressure flaker",
                  "Hammerstone",
                  "Wooden shaft for mounting"
              ],
              "steps": [
                  "🔎 **Why Make an Arrowhead?** – Stone arrowheads were **essential tools for hunting** and **self-defense**.",
                  "1️⃣ **Find a Suitable Flake** – Choose a thin **but strong** piece of flint or obsidian.",
                  "2️⃣ **Shape the Arrowhead** – Use **percussion flaking** to rough out a **triangular shape**.",
                  "3️⃣ **Create Notches for Lashing** – Use **pressure flaking** to carve small notches at the base for attaching the shaft.",
                  "4️⃣ **Sharpen the Edges** – Refine the blade edge with **light, controlled pressure flaking**.",
                  "5️⃣ **Attach to a Shaft** – Use **sinew, glue, or resin** to secure the arrowhead to a wooden shaft.",
                  "6️⃣ **Test for Balance & Strength** – Ensure the arrow **flies straight** and doesn't break on impact."
              ],
              "tips": [
                  "🎯 **Thin = Sharp, Thick = Strong** – Balance **cutting ability** with **durability**.",
                  "🔥 **Fire-Harden the Shaft** – Heating the wood strengthens the arrow for better performance.",
                  "🛠 **Practice on Small Flakes First** – Arrowheads require **precise shaping**, so refine skills before making them."
              ]
          },
          {
              "title": "Flint Knapping: Making a Spearhead",
              "description": "Learn to craft a larger stone spearhead for big game hunting or self-defense.",
              "category": "tool-mastery",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Large piece of flint or chert",
                  "Hammerstone",
                  "Pressure flaker",
                  "Wooden spear shaft",
                  "Cordage or sinew"
              ],
              "steps": [
                  "🔎 **Why a Spearhead?** – Stone-tipped spears were used for **big game hunting and survival defense**.",
                  "1️⃣ **Choose a Large Flint Flake** – Look for a **thicker and wider** piece than an arrowhead.",
                  "2️⃣ **Rough Out the Shape** – Use **percussion flaking** to form a **broad, pointed blade**.",
                  "3️⃣ **Refine with Pressure Flaking** – Create **sharp edges** and notch the base for secure attachment.",
                  "4️⃣ **Prepare the Shaft** – Carve a **slot in a wooden pole** to hold the spearhead.",
                  "5️⃣ **Secure the Spearhead** – Lash it tightly with **sinew, rawhide, or plant fiber**.",
                  "6️⃣ **Reinforce with Resin (Optional)** – Pine resin or hide glue can **strengthen the binding**."
              ],
              "tips": [
                  "⚒ **Use a Stronger Core** – A **thicker, denser stone** makes the spearhead **more durable**.",
                  "🔥 **Harden the Shaft** – Fire-hardening the wood **increases spear strength**.",
                  "🎯 **Test for Balance** – A well-balanced spear flies straighter and hits harder."
              ]
          },
          {
              "title": "Flint Knapping: Advanced Pressure Flaking Techniques",
              "description": "Master fine-detail pressure flaking to refine and perfect stone tools.",
              "category": "tool-mastery",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Flint, chert, or obsidian",
                  "Copper-tipped or antler flaker",
                  "Leather pad for hand protection",
                  "Abrader stone"
              ],
              "steps": [
                  "🔎 **What is Pressure Flaking?** – This technique **removes small, controlled flakes** to sharpen and refine tools.",
                  "1️⃣ **Select Your Tool** – Use an **antler tine, copper flaker, or strong bone** for best results.",
                  "2️⃣ **Grip the Stone Securely** – Hold the tool **on a leather pad or against your leg** for control.",
                  "3️⃣ **Apply Steady Pressure** – Press **firmly and consistently** near the tool’s edge to remove fine flakes.",
                  "4️⃣ **Work Evenly on Both Sides** – This ensures the blade **remains symmetrical and balanced**.",
                  "5️⃣ **Sharpen & Finish** – Continue refining **until the blade reaches desired sharpness**.",
                  "6️⃣ **Polish & Strengthen** – Use an **abrader stone** to smooth edges and **harden the surface**."
              ],
              "tips": [
                  "🛠 **Use Small, Controlled Movements** – Large pressure changes **can break delicate tools**.",
                  "🔥 **Heat-Treating Stone Helps** – Heating flint **improves flake quality and sharpness**.",
                  "⚡ **Practice on Scrap First** – Perfect your **technique** before working on a **final tool**."
              ]
          },
          
          // 🔥 Fire Starting
          {
              title: "Fire Making: Ferro Rod",
              description: "Learn how to start a fire using a ferro rod. This reliable method creates sparks to ignite tinder.",
              category: "fire",
              completed: false,
              expanded: false,
              materials: [
                  "Ferro rod (ferrocerium rod)",
                  "Metal striker or knife spine",
                  "Tinder bundle (dry grass, bark shavings, cotton balls, char cloth)",
                  "Kindling (small twigs, dry leaves)",
                  "Firewood (small to large pieces)"
              ],
              steps: [
                  "🔎 **Understanding the Ferro Rod** – A ferro rod produces hot sparks when scraped with a metal striker. These sparks ignite tinder to start a fire.",
                  "1️⃣ **Prepare Your Tinder Bundle** – Gather dry, fluffy materials like dry grass, bark shavings, or cotton balls. Fluff the tinder to make it catch sparks easily.",
                  "2️⃣ **Position the Ferro Rod** – Hold the ferro rod close to the tinder bundle. Angle the rod slightly downward to direct sparks into the tinder.",
                  "3️⃣ **Scrape the Rod** – Use a metal striker or the back of a knife to scrape the ferro rod firmly and quickly. Aim for **long, controlled scrapes** to produce a shower of sparks.",
                  "4️⃣ **Catch the Sparks** – Direct the sparks onto the tinder bundle. If the tinder begins to smolder, gently blow on it to encourage flames.",
                  "5️⃣ **Add Kindling** – Once the tinder ignites, carefully add small twigs and dry leaves to build the fire.",
                  "6️⃣ **Build the Fire** – Gradually add larger sticks and logs to sustain the fire."
              ],
              tips: [
                  "🔥 **Use Dry Tinder** – Wet or damp tinder won’t catch sparks. Always keep your tinder dry.",
                  "🎯 **Aim for the Base** – Direct sparks at the base of the tinder bundle for the best chance of ignition.",
                  "🪵 **Practice Scraping** – Ferro rods require a firm, quick scrape. Practice your technique before relying on it in the wild."
              ]
          },
          {
              title: "Fire Making: Flint & Steel (Pyrite & Chert)",
              description: "Master the ancient fire-starting technique using flint and steel or pyrite and chert.",
              category: "fire",
              completed: false,
              expanded: false,
              materials: [
                  "Flint (or chert) rock",
                  "High-carbon steel striker (or the back of a knife blade)",
                  "Char cloth (or natural tinder like dry fungus, chaga, or amadou)",
                  "Tinder nest (dry grass, shredded bark, cotton)",
                  "Kindling (small twigs, dry leaves)"
              ],
              steps: [
                  "🔎 **Understanding Flint & Steel** – Striking flint against steel creates high-temperature sparks, which can ignite char cloth or dry tinder.",
                  "1️⃣ **Prepare Your Tinder** – Place char cloth on top of the flint so it catches sparks easily.",
                  "2️⃣ **Hold the Flint Correctly** – Grip the flint with a sharp edge facing outward. Hold the striker in the other hand.",
                  "3️⃣ **Strike to Create Sparks** – Strike the steel down against the flint at a sharp angle. A bright orange spark should land on the char cloth.",
                  "4️⃣ **Nurture the Ember** – When the char cloth smolders, carefully place it in a tinder nest.",
                  "5️⃣ **Blow Gently** – Blow on the ember until the tinder nest catches fire.",
                  "6️⃣ **Build the Fire** – Add small twigs and progressively larger wood to sustain the flame."
              ],
              tips: [
                  "🪨 **Use Sharp Flint** – A dull edge won’t create strong sparks. Break off a fresh edge if needed.",
                  "🔥 **Have Char Cloth Ready** – Char cloth catches sparks much faster than dry grass or bark.",
                  "💨 **Blow Slowly** – Too much air can smother the ember. Blow gently and evenly."
              ]
          },
          {
              title: "Fire Making: Bow Drill",
              description: "Learn the art of friction fire using a bow drill to create an ember.",
              category: "fire",
              completed: false,
              expanded: false,
              materials: [
                  "Bow (a flexible stick with a cord tied at both ends)",
                  "Spindle (a straight, smooth hardwood stick)",
                  "Hearthboard (a softwood base with a carved notch)",
                  "Handhold (a smooth rock, bone, or wood piece to apply pressure)",
                  "Tinder bundle (dry grass, fine bark, wood shavings)"
              ],
              steps: [
                  "🔎 **Understanding the Bow Drill** – A bow drill creates heat through friction, generating an ember that ignites tinder.",
                  "1️⃣ **Prepare the Hearthboard** – Cut a shallow notch in the hearthboard where the spindle will rotate.",
                  "2️⃣ **Position the Spindle** – Place the spindle upright in the notch and secure the top with the handhold.",
                  "3️⃣ **Wrap the Bowstring** – Wrap the bowstring around the spindle in one loop.",
                  "4️⃣ **Start Drilling** – Move the bow back and forth in smooth, steady strokes. Apply downward pressure on the spindle.",
                  "5️⃣ **Generate Heat** – Continue drilling until smoke and fine wood dust appear in the notch.",
                  "6️⃣ **Catch the Ember** – Once an ember forms, carefully transfer it to the tinder bundle.",
                  "7️⃣ **Blow Gently** – Blow until the tinder ignites into a flame, then build your fire."
              ],
              tips: [
                  "🔥 **Use Softwood for the Hearthboard** – Cedar, poplar, or willow works best.",
                  "🪵 **Keep the Spindle Dry** – Moisture prevents friction heat.",
                  "🎯 **Apply Firm, Even Pressure** – Too much pressure can stop the spindle; too little won’t create enough heat."
              ]
          },
          {
              title: "Fire Making: Fire Plough",
              description: "Create fire through friction using the fire plough method.",
              category: "fire",
              completed: false,
              expanded: false,
              materials: [
                  "Hearthboard (softwood like cedar, willow, or pine)",
                  "Fire plough stick (a hardwood stick for friction)",
                  "Tinder bundle (dry grass, bark shavings, fine wood dust)"
              ],
              steps: [
                  "🔎 **Understanding the Fire Plough** – Rubbing a hardwood stick against a softwood base creates friction, producing heat to ignite tinder.",
                  "1️⃣ **Set Up the Hearthboard** – Cut a shallow groove down the center.",
                  "2️⃣ **Position the Fire Plough Stick** – Hold the stick at a 45° angle in the groove.",
                  "3️⃣ **Plough Back & Forth** – Apply firm downward pressure while moving the stick rapidly back and forth.",
                  "4️⃣ **Create Wood Dust** – Fine wood particles will build up and start to smolder.",
                  "5️⃣ **Catch the Ember in Tinder** – Transfer the glowing dust into a tinder bundle.",
                  "6️⃣ **Blow to Ignite** – Blow gently until flames appear, then build your fire."
              ],
              tips: [
                  "🔥 **Use Dry Wood** – Wet or damp wood won’t generate enough heat.",
                  "🪵 **Increase Friction** – A rougher surface increases heat buildup.",
                  "💨 **Be Patient** – This method takes time and persistence."
              ]
          },
          {
            "title": "Fire Making: Hand Drill",
            "description": "Master the most primitive friction fire-starting method using only your hands and a drill.",
            "category": "fire",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "Drill (straight, dry plant stalk or branch, 1-2 feet long)",
                "Hearth board (softwood with a small notch)",
                "Tinder bundle (dry grass, bark fibers, fine plant material)"
            ],
            "steps": [
                "🔎 **Understanding the Hand Drill** – The hand drill method uses direct hand friction to rotate a spindle, generating heat to create an ember.",
                "1️⃣ **Prepare the Hearth Board** – Carve a small notch in the hearth board to collect dust and form an ember.",
                "2️⃣ **Position the Drill** – Place the drill into the notch and hold it upright between your palms.",
                "3️⃣ **Spin the Drill with Your Hands** – Move your hands downward while pressing and rolling the drill between your palms.",
                "4️⃣ **Increase Speed & Pressure** – Once smoke appears, apply more pressure and spin faster to generate an ember.",
                "5️⃣ **Transfer the Ember** – Carefully move the ember into a tinder bundle and gently blow to start a flame.",
                "6️⃣ **Build the Fire** – Add kindling and larger fuel to sustain the fire."
            ],
            "tips": [
                "🔥 **Use Dry, Straight Wood** – The drill should be light and dry for better friction.",
                "✋ **Protect Your Hands** – If your hands blister easily, wrap them with cloth for cushioning.",
                "💨 **Focus on Speed & Pressure** – A steady increase in both produces the best results."
            ]
        },
          {
            "title": "Fire Making: Fire Piston",
            "description": "Learn how to use a fire piston to create fire by compressing air to ignite tinder.",
            "category": "fire",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "Fire piston (or DIY version using metal, wood, or bamboo tube)",
                "Char cloth or dry tinder (fungus, cotton, punk wood)",
                "Lubrication (grease, oil, or wax for sealing the piston)",
                "Kindling and fuel wood"
            ],
            "steps": [
                "🔎 **Understanding the Fire Piston** – A fire piston uses rapid compression of air inside a sealed cylinder to create heat, igniting tinder inside.",
                "1️⃣ **Prepare the Fire Piston** – Ensure the piston’s seal is tight by applying grease or wax around the gasket.",
                "2️⃣ **Load the Tinder** – Place a small piece of char cloth or finely processed tinder at the end of the piston.",
                "3️⃣ **Compress the Piston** – Insert the piston quickly and forcefully into the cylinder, creating rapid air compression.",
                "4️⃣ **Extract the Ember** – Once compressed, remove the piston and check if the tinder is glowing.",
                "5️⃣ **Transfer the Ember** – Carefully place the ember into a dry tinder bundle and blow gently to encourage flames.",
                "6️⃣ **Build the Fire** – Once the tinder ignites, add small twigs, then larger fuel wood."
            ],
            "tips": [
                "💨 **Speed Matters** – The piston must be compressed rapidly to generate enough heat.",
                "🔥 **Use Dry Tinder** – Char cloth is highly recommended for best results.",
                "🛠 **Check the Seal** – A loose or dry gasket won’t create enough pressure, so keep it greased."
            ]
        },
          {
            "title": "Fire Making: Fire Thong",
            "description": "Master the rare and ancient fire thong technique, using friction to ignite wood fibers.",
            "category": "fire",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "Fire board (softwood like cedar, pine, or willow)",
                "Flexible cordage (plant fiber, rawhide, or natural rope)",
                "Tinder bundle (dry grass, bark fibers, fine plant material)"
            ],
            "steps": [
                "🔎 **Understanding the Fire Thong** – This method generates friction by rapidly pulling a flexible cord back and forth against a groove in a wooden board.",
                "1️⃣ **Carve a Groove** – Cut a shallow groove into the fire board where friction will generate heat.",
                "2️⃣ **Position the Cord** – Wrap the cord around both ends of the groove so it crosses the fire board.",
                "3️⃣ **Apply Pressure** – Press the cord into the groove while maintaining tension.",
                "4️⃣ **Saw Back & Forth** – Rapidly pull both ends of the cord back and forth to generate heat through friction.",
                "5️⃣ **Create an Ember** – Once charred wood dust forms and begins smoldering, stop sawing and gently blow on it.",
                "6️⃣ **Transfer the Ember** – Place the ember into a tinder bundle and blow until flames appear.",
                "7️⃣ **Build the Fire** – Add small twigs and gradually larger wood to maintain the fire."
            ],
            "tips": [
                "💪 **Use Strong Cordage** – Thin or weak cord may snap under tension.",
                "🔥 **Keep the Groove Dry** – Moisture can prevent heat buildup, so use completely dry wood.",
                "⏳ **Be Patient** – This method requires endurance and persistence."
            ]
        },
          {
            "title": "Fire Making: Solar Fire (Lens & Mirror)",
            "description": "Learn how to start a fire using magnification from a lens or reflection from a mirror.",
            "category": "fire",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "Magnifying glass or convex lens (eyeglasses, binoculars, or camera lens)",
                "Mirror or shiny metal (signal mirror, polished tin can, CD)",
                "Tinder bundle (dry grass, shredded bark, char cloth)",
                "Kindling and fuel wood"
            ],
            "steps": [
                "🔎 **Understanding Solar Fire** – A lens focuses sunlight into a concentrated point, while a mirror redirects sunlight to ignite tinder.",
                "1️⃣ **Find a Lens or Mirror** – Use a magnifying glass, eyeglasses, binocular lens, or polished metal.",
                "2️⃣ **Position the Lens or Mirror** – Hold the lens at an angle to direct sunlight onto the tinder.",
                "3️⃣ **Focus the Light** – Adjust the distance so that the light forms a small, bright point on the tinder.",
                "4️⃣ **Wait for Ignition** – Hold steady as the tinder heats up and starts to smolder.",
                "5️⃣ **Blow on the Tinder** – Gently blow to encourage a flame.",
                "6️⃣ **Build the Fire** – Add small twigs, then larger sticks to keep the fire going."
            ],
            "tips": [
                "☀️ **Use Direct Sunlight** – This method only works in clear, sunny conditions.",
                "🎯 **Focus the Beam** – The smaller and brighter the focal point, the faster ignition occurs.",
                "🔥 **Use Char Cloth** – Blackened material absorbs heat better than light-colored tinder."
            ]
        },
          {
            "title": "Fire Making: Empty Lighter Sparks",
            "description": "Learn how to start a fire using only the sparks from an empty lighter.",
            "category": "fire",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "Empty gas lighter (non-electric, non-piezo type)",
                "Fine tinder (char cloth, dry grass, shredded bark, steel wool)",
                "Kindling (small twigs, leaves)"
            ],
            "steps": [
                "🔎 **Understanding Empty Lighter Sparks** – Even if a lighter is out of fuel, its flint still produces sparks that can ignite tinder.",
                "1️⃣ **Prepare Fine Tinder** – Use char cloth, dry grass, or shredded bark. The finer the material, the better.",
                "2️⃣ **Position the Tinder** – Hold the tinder close to the lighter’s nozzle.",
                "3️⃣ **Strike the Lighter** – Rapidly flick the lighter’s wheel to generate sparks.",
                "4️⃣ **Catch the Sparks** – The sparks should land on the tinder and begin smoldering.",
                "5️⃣ **Encourage the Ember** – Blow gently to increase heat and ignite flames.",
                "6️⃣ **Build the Fire** – Add small twigs, then gradually larger wood."
            ],
            "tips": [
                "⚡ **Flint Must Be Intact** – If the lighter’s flint is completely worn down, it won’t produce sparks.",
                "🔥 **Use Char Cloth** – It catches sparks easily and holds an ember longer.",
                "💨 **Blow Gently** – Too much air can extinguish the ember before it catches."
            ]
        },
          {
            "title": "Fire Making: Steel Wool & Battery",
            "description": "Create fire instantly by short-circuiting a battery with steel wool.",
            "category": "fire",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "Fine steel wool (0000-grade recommended)",
                "Battery (9V, AA, AAA, or larger)",
                "Tinder bundle (dry grass, shredded bark, char cloth)",
                "Kindling (small twigs, dry leaves)"
            ],
            "steps": [
                "🔎 **Understanding Steel Wool & Battery Fire** – When steel wool touches both battery terminals, it short-circuits, creating sparks and heat.",
                "1️⃣ **Prepare Fine Steel Wool** – Stretch out a small amount to maximize air exposure.",
                "2️⃣ **Place the Steel Wool on Tinder** – Position it directly over a dry tinder bundle.",
                "3️⃣ **Touch the Battery Terminals** – Press both ends of the steel wool against the battery terminals.",
                "4️⃣ **Observe the Ignition** – Sparks will travel through the steel wool, igniting it.",
                "5️⃣ **Transfer the Fire** – Once the steel wool catches, blow on it and use it to ignite the tinder.",
                "6️⃣ **Build the Fire** – Add small twigs and gradually larger fuel to keep the fire going."
            ],
            "tips": [
                "⚠️ **Only Use Fine Steel Wool** – Coarse steel wool won’t ignite as easily.",
                "🔥 **Have Tinder Ready** – Steel wool burns fast, so work quickly.",
                "🔋 **Works with Most Batteries** – 9V batteries work best, but AA/AAA batteries can also work in pairs."
            ]
        },

          // 💧 Water Purification
          {
              title: "Water Collection: Finding Natural Sources",
              description: "Learn how to locate safe, natural water sources in the wild.",
              category: "water",
              completed: false,
              expanded: false,
              materials: [
                  "Map (optional but useful for terrain analysis)",
                  "Container for collecting water",
                  "Cloth or bandana for filtering debris",
                  "Water purification method (boiling, filter, tablets, etc.)"
              ],
              steps: [
                  "🔎 **Understanding Natural Water Sources** – Water is most commonly found in streams, rivers, lakes, and underground sources. Knowing where to look is essential for survival.",
                  "1️⃣ **Look for Flowing Water** – Moving water (streams, rivers) is generally safer than stagnant water (ponds, puddles), as it is less likely to contain bacteria and parasites.",
                  "2️⃣ **Follow Animal Trails & Insects** – Many animals create paths leading to water sources. Increased insect activity can also indicate water nearby.",
                  "3️⃣ **Search Low-Lying Areas** – Water naturally flows downhill. Valleys, depressions, and the base of hills are likely to have water sources.",
                  "4️⃣ **Check Vegetation Growth** – Green, lush plants often indicate underground water. Digging at their base may reveal moisture.",
                  "5️⃣ **Use the Sound of Water** – In quiet environments, you may hear running water before seeing it. Listen for the distinct sound of a stream or waterfall.",
                  "6️⃣ **Avoid Contaminated Water** – Stay away from water sources with dead animals, algae blooms, or a foul odor, as these indicate contamination."
              ],
              tips: [
                  "💧 **Avoid Stagnant Water** – Stagnant pools are breeding grounds for bacteria and parasites.",
                  "🌿 **Look for Morning Dew** – In dry environments, dew can be collected from grass and leaves using a cloth.",
                  "🏔️ **Use Rock Formations** – Rock crevices and indentations may contain rainwater or condensation."
              ]
          },
          {
            "title": "Water Collection: Rainwater Collection & Filtering",
            "description": "Rainwater is a clean source of water, but it should still be filtered before drinking.",
            "category": "water",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "Large tarp or plastic sheet",
                "Container (bowl, bucket, or bottle)",
                "Cloth or bandana (for filtering debris)",
                "Storage bottle (for long-term use)"
            ],
            "steps": [
                "🔎 **Why Collect Rainwater?** – Rainwater is naturally distilled by the atmosphere, making it one of the cleanest water sources.",
                "1️⃣ **Set Up a Collection Surface** – Lay a tarp or plastic sheet in an open area to catch rain.",
                "2️⃣ **Create a Funnel System** – Tilt the tarp slightly so water flows into a container.",
                "3️⃣ **Filter Through Cloth** – Pour collected water through a cloth to remove dirt and debris.",
                "4️⃣ **Store in Clean Containers** – Transfer rainwater to a sealed bottle or container for later use.",
                "5️⃣ **Boil or Purify Before Drinking** – While rainwater is generally clean, bacteria or contaminants from the air may still be present."
            ],
            "tips": [
                "☔ **Use a Large Surface Area** – A bigger tarp collects more water.",
                "🔄 **Filter After Collection** – Even clean rainwater can contain dust or insect debris.",
                "🏺 **Store Properly** – Use **sealed bottles** to prevent contamination."
            ]
        },
          {
              title: "Water Collection: Solar Still",
              description: "A solar still uses the sun’s heat to collect clean water from the ground.",
              category: "water",
              completed: false,
              expanded: false,
              materials: [
                  "Plastic sheet or tarp",
                  "Small container or cup",
                  "Digging tool (stick or rock)",
                  "Green plants or damp soil"
              ],
              steps: [
                  "🔎 **How a Solar Still Works** – The sun heats the ground, causing water to evaporate and condense on the plastic sheet, collecting clean water.",
                  "1️⃣ **Dig a Hole in Moist Ground** – Find a low spot with damp soil and dig a hole about **2 feet wide and 1 foot deep**.",
                  "2️⃣ **Place a Container in the Center** – Put a cup or container at the bottom of the hole to collect condensed water.",
                  "3️⃣ **Cover the Hole with Plastic** – Stretch a plastic sheet over the hole, securing the edges with rocks or soil.",
                  "4️⃣ **Place a Small Rock in the Center of the Plastic** – This creates a low point for water droplets to drip into the cup.",
                  "5️⃣ **Let the Sun Do the Work** – Over several hours, water will evaporate, condense on the plastic, and drip into the container.",
                  "6️⃣ **Collect & Drink the Water** – Retrieve the container and enjoy the purified water."
              ],
              tips: [
                  "☀️ **Works Best in Sunny Weather** – Cloudy conditions reduce effectiveness.",
                  "🌱 **Add Green Leaves for Extra Moisture** – Placing plants inside the hole increases water collection.",
                  "💦 **Seal the Edges Tight** – Any air leaks reduce water collection."
              ]
          },
          {
              title: "Water Filtration: DIY Charcoal Filter",
              description: "Learn how to make a simple charcoal water filter using natural materials.",
              category: "water",
              completed: false,
              expanded: false,
              materials: [
                  "Plastic bottle or hollowed-out log",
                  "Charcoal (from a fire)",
                  "Sand",
                  "Small gravel",
                  "Cloth or grass fibers",
                  "Container for filtered water"
              ],
              steps: [
                  "🔎 **How Filtration Works** – Charcoal filters out bacteria, dirt, and some toxins, making water safer to drink.",
                  "1️⃣ **Prepare a Filtering Container** – Cut the bottom off a plastic bottle, or hollow out a log to create a funnel.",
                  "2️⃣ **Layer the Filter** – Add layers from bottom to top: **charcoal**, **sand**, and **gravel**.",
                  "3️⃣ **Add Cloth or Grass as a Final Filter** – Place a layer of cloth, grass fibers, or even moss at the top to catch large debris.",
                  "4️⃣ **Pour Water Through the Filter** – Slowly pour murky water into the filter. Let it drip into a clean container.",
                  "5️⃣ **Boil the Filtered Water** – Although the filter removes debris and some bacteria, boiling afterward ensures safety."
              ],
              tips: [
                  "🛠️ **Use Hardwood Charcoal** – Softwood charcoal is less effective at filtering impurities.",
                  "🌊 **Let Water Drip Slowly** – Fast water flow reduces filtration effectiveness.",
                  "🔥 **Combine Filtration & Boiling** – A DIY filter removes debris, but boiling is necessary to kill pathogens."
              ]
          },
          {
            "title": "Water Filtration: Using Grapevines as a Natural Filter",
            "description": "Learn how to use grapevines to naturally filter and purify water.",
            "category": "water",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "Grapevine (or similar water-bearing vine)",
                "Knife or machete (to cut the vine)",
                "Container (for collecting water)"
            ],
            "steps": [
                "🔎 **Why Use Grapevines?** – Certain vines, including wild grapevines, contain **naturally filtered water** free of most contaminants.",
                "1️⃣ **Identify a Suitable Vine** – Look for **thick, green, and flexible vines** growing from trees or on the ground. Avoid vines with **milky or colored sap**, as they may be toxic.",
                "2️⃣ **Cut the Vine Near the Base** – Use a knife or machete to make a clean cut close to the ground.",
                "3️⃣ **Make a Second Cut Higher Up** – This allows water to **flow freely** through the vine.",
                "4️⃣ **Collect the Water** – Hold the lower end of the vine over your container and let the water drip out.",
                "5️⃣ **Test Before Drinking** – If the water is clear and has **no bitter or unusual taste**, it is safe to drink.",
                "6️⃣ **Optional Additional Filtering** – If needed, pour the water through a cloth or sand filter for further purification."
            ],
            "tips": [
                "🌿 **Only Use Safe Vines** – Avoid vines with **colored or milky sap**, as they may be toxic.",
                "💧 **Best After Rainfall** – Grapevines contain the most water after heavy rainfall or in humid environments.",
                "🪵 **Use Multiple Vines** – A single vine may not provide much water, so check several vines if needed."
            ]
        },
          {
              title: "Water Purification: Using Water Purification Tablets",
              description: "Purification tablets kill harmful pathogens in water, making it safe to drink.",
              category: "water",
              completed: false,
              expanded: false,
              materials: [
                  "Water purification tablets (iodine, chlorine, or other chemical-based)",
                  "Container for water",
                  "Unclean water source"
              ],
              steps: [
                  "🔎 **How Tablets Work** – These tablets use chemicals like iodine or chlorine to kill bacteria, viruses, and parasites.",
                  "1️⃣ **Collect Water** – Gather water from a natural source, preferably clear water. If murky, let it settle or filter it first.",
                  "2️⃣ **Read Tablet Instructions** – Follow the manufacturer's instructions for the correct dosage per liter of water.",
                  "3️⃣ **Drop the Tablet in the Water** – Add the tablet to the container and stir if needed.",
                  "4️⃣ **Wait for Purification** – Let the tablet work for **30 minutes to 4 hours**, depending on the type used.",
                  "5️⃣ **Drink or Store Safely** – The water is now safe to drink. Store in a clean container if not drinking immediately."
              ],
              tips: [
                  "⏳ **Be Patient** – Chemical purification takes time to be effective.",
                  "💊 **Iodine Tablets Have a Taste** – If the taste is too strong, add vitamin C or let it air out.",
                  "🦠 **Tablets Don't Remove Sediment** – Use a cloth or sand filter for debris before purifying."
              ]
          },
          {
              title: "Water Purification: Boiling",
              description: "Boiling is the most reliable way to kill bacteria and parasites in water.",
              category: "water",
              completed: false,
              expanded: false,
              materials: [
                  "Fire source (matches, ferro rod, lighter, or bow drill)",
                  "Metal container or pot",
                  "Unclean water source"
              ],
              steps: [
                  "🔎 **Why Boiling Works** – Boiling water kills bacteria, viruses, and parasites that can cause illness.",
                  "1️⃣ **Collect Water** – Gather water from a natural source. If murky, let it settle or filter it through a cloth first.",
                  "2️⃣ **Prepare a Fire** – Start a fire using any available method. The fire must be strong enough to sustain a boil.",
                  "3️⃣ **Pour Water into a Metal Container** – Use a metal pot or any fire-safe container to hold the water.",
                  "4️⃣ **Boil for at Least 1 Minute** – Bring the water to a **rolling boil** for at least **1 minute**. If at high altitudes (above 6,500 ft), boil for **3 minutes**.",
                  "5️⃣ **Let Cool & Store Safely** – Once boiled, let the water cool and store it in a clean container."
              ],
              tips: [
                  "🔥 **Always Boil When in Doubt** – If unsure about water quality, boiling is your safest option.",
                  "⏳ **Boil Longer at High Altitudes** – Water boils at a lower temperature at high elevations, so extend boiling time.",
                  "🩺 **Boiling Does Not Remove Toxins** – Chemical pollutants (like heavy metals) require additional filtration."
              ]
          },

          // 🏕️ Shelter Building
          {
              title: "Shelter Building: Debris Hut",
              description: "A debris hut is a simple, effective survival shelter using natural materials for insulation and protection.",
              category: "shelter",
              completed: false,
              expanded: false,
              materials: [
                  "Long branch (6-8 feet long)",
                  "Shorter sticks (3-4 feet long)",
                  "Leaves, grass, pine needles, or bark for insulation",
                  "Optional: Cordage for securing structure"
              ],
              steps: [
                  "🔎 **Why a Debris Hut?** – A debris hut provides insulation and protection against wind, rain, and cold without requiring tools.",
                  "1️⃣ **Find a Sturdy Ridgepole** – Locate a straight branch **6-8 feet long** to act as the central support beam.",
                  "2️⃣ **Prop the Ridgepole Up** – Lean one end on a log, rock, or forked branch to create an A-frame.",
                  "3️⃣ **Add Ribbing Sticks** – Place **3-4 foot long** sticks along both sides of the ridgepole, forming a triangular shape.",
                  "4️⃣ **Layer Smaller Sticks** – Add smaller sticks across the ribbing for additional support.",
                  "5️⃣ **Insulate the Shelter** – Cover the frame with **at least 2 feet** of leaves, pine needles, or dry grass to trap heat.",
                  "6️⃣ **Block the Entrance** – Use a pile of debris or a small branch to block the entrance for warmth retention.",
                  "7️⃣ **Test the Shelter** – Crawl inside and check for gaps. Add more debris if needed."
              ],
              tips: [
                  "🌿 **Use Dry Materials** – Wet leaves and grass won’t insulate well.",
                  "🔥 **Position Near a Fire** – If possible, build near a safe fire source for added warmth.",
                  "💨 **Avoid Windy Areas** – Set up your debris hut in a **wind-protected** location."
              ]
          },
          {
              title: "Shelter Building: Lean-To",
              description: "A lean-to shelter is a fast and effective way to shield yourself from wind and rain.",
              category: "shelter",
              completed: false,
              expanded: false,
              materials: [
                  "1 long ridgepole (6-8 feet)",
                  "Several sturdy branches (for framing)",
                  "Leaves, bark, or grass for insulation",
                  "Cordage (optional)"
              ],
              steps: [
                  "🔎 **Why a Lean-To?** – A lean-to provides protection from **wind and rain**, is quick to build, and allows for a fire in front for added warmth.",
                  "1️⃣ **Find Two Support Trees** – Locate two trees about **6-8 feet apart** or use large rocks to support your ridgepole.",
                  "2️⃣ **Secure the Ridgepole** – Tie or wedge a **6-8 foot branch** between the two supports at **chest height**.",
                  "3️⃣ **Lean Support Sticks** – Place branches or logs against the ridgepole at an **angle**, forming a slanted wall.",
                  "4️⃣ **Add Insulation** – Layer leaves, bark, or dry grass over the sticks to create a waterproof wall.",
                  "5️⃣ **Face Away from Wind** – Position the open side opposite **strong winds** for maximum protection.",
                  "6️⃣ **Use a Fire Reflector** – If building a fire, place a **heat-reflecting wall** (rocks or logs) opposite the shelter."
              ],
              tips: [
                  "🌬 **Angle Matters** – A **steeper** lean-to sheds rain better; a **shallower** one traps heat better.",
                  "🔥 **Add a Fire** – A lean-to pairs well with a **fire in front** for warmth and safety.",
                  "🪵 **Reinforce the Frame** – Use stronger logs if expecting heavy rain or snow."
              ]
          },
          {
              title: "Shelter Building: Snow Cave",
              description: "A snow cave provides excellent insulation in extreme cold environments, preventing heat loss and wind exposure.",
              category: "shelter",
              completed: false,
              expanded: false,
              materials: [
                  "Deep snowdrift or packed snow",
                  "Shovel or digging tool (if available)",
                  "Branch or pole (for ventilation)"
              ],
              steps: [
                  "🔎 **Why a Snow Cave?** – A snow cave **traps body heat**, shielding you from cold winds and freezing temperatures.",
                  "1️⃣ **Find a Deep Snowbank** – Look for a **6+ foot snowdrift** or compact snow suitable for digging.",
                  "2️⃣ **Dig an Entrance Tunnel** – Use a **shovel, stick, or hands** to dig a small tunnel leading into the snowbank.",
                  "3️⃣ **Expand the Sleeping Chamber** – Hollow out a **larger inner chamber** where you will sleep. Keep the roof dome-shaped to prevent collapse.",
                  "4️⃣ **Keep the Entrance Low** – Make sure the entrance is **lower** than your sleeping area to trap warm air inside.",
                  "5️⃣ **Ventilation is Key** – Poke a **small hole** in the roof using a stick or pole for fresh air circulation.",
                  "6️⃣ **Smooth the Ceiling** – A smooth interior prevents melting snow from dripping onto you.",
                  "7️⃣ **Block the Entrance at Night** – Use a backpack, snow block, or natural material to **partially** seal the entrance, reducing cold air entry."
              ],
              tips: [
                  "☃️ **Avoid Thin Snow** – Snow caves only work with **deep, packed snow**.",
                  "🌡️ **Body Heat is Your Best Insulation** – The smaller the cave, the **warmer** it will be.",
                  "🔄 **Check Ventilation** – Always keep a small airflow hole to **prevent suffocation**."
              ]
          },
          {
              title: "Shelter Building: Tarp Shelter",
              description: "A tarp shelter is a quick and effective way to create protection from rain and wind.",
              category: "shelter",
              completed: false,
              expanded: false,
              materials: [
                  "Tarp or emergency blanket",
                  "Cordage (paracord or rope)",
                  "Stakes or heavy rocks"
              ],
              steps: [
                  "🔎 **Why a Tarp Shelter?** – A tarp shelter is **lightweight, fast to set up, and highly versatile**, making it ideal for unexpected survival situations.",
                  "1️⃣ **Choose a Setup Location** – Find a **flat, dry** area protected from wind and falling branches.",
                  "2️⃣ **Tie the Tarp Overhead** – Secure a rope between two trees and drape the tarp over it.",
                  "3️⃣ **Stake the Corners Down** – Use **rocks, logs, or stakes** to secure the tarp edges to the ground.",
                  "4️⃣ **Angle for Rain Runoff** – Set one side higher than the other to allow rainwater to run off.",
                  "5️⃣ **Block Windy Sides** – Adjust the tarp or add natural windbreaks (logs, branches) for better protection."
              ],
              tips: [
                  "🏕 **Use a Ridgeline** – A horizontal rope makes setup **easier** and more stable.",
                  "🌬 **Face Away from Wind** – Always position your **entrance opposite** strong winds.",
                  "🔥 **Reflect Heat** – If using a **space blanket**, angle it towards a fire for **heat reflection**."
              ]
          },
          {
              title: "Shelter Building: A-Frame Shelter",
              description: "An A-frame shelter provides excellent protection from rain, wind, and snow by using natural materials.",
              category: "shelter",
              completed: false,
              expanded: false,
              materials: [
                  "1 long ridgepole (6-8 feet)",
                  "Several sturdy branches (for frame)",
                  "Leaves, bark, or grass for insulation",
                  "Cordage (optional for securing)"
              ],
              steps: [
                  "🔎 **Why an A-Frame?** – This shelter is **stable, durable, and weather-resistant**, making it one of the best all-around options.",
                  "1️⃣ **Find a Ridgepole** – Locate a **6-8 foot long** sturdy branch to serve as the main support beam.",
                  "2️⃣ **Support the Ridgepole** – Prop each end on two **forked sticks** or secure between two trees.",
                  "3️⃣ **Create the A-Frame** – Lean **sturdy branches** against both sides of the ridgepole to form an A-shape.",
                  "4️⃣ **Add Smaller Cross-Sticks** – Lay smaller branches **horizontally** across the A-frame for extra stability.",
                  "5️⃣ **Layer Insulation** – Cover the frame with **leaves, grass, bark, or snow** for protection from wind and rain.",
                  "6️⃣ **Check for Gaps** – Crawl inside and **look for light coming through**. Add more debris to seal gaps."
              ],
              tips: [
                  "🛠 **Stronger Frame = Better Protection** – Use thick, sturdy branches for durability.",
                  "🌦 **More Insulation = More Warmth** – The thicker the debris layer, the **warmer** the shelter.",
                  "🔥 **Fire Placement** – Build a fire **in front** of the shelter for warmth and visibility."
              ]
          },

          // 🧭 Navigation
          {
              title: "Navigation: Using a Compass",
              description: "Learn how to properly use a compass to navigate through any terrain.",
              category: "navigation",
              completed: false,
              expanded: false,
              materials: [
                  "Compass (preferably with a baseplate and rotating bezel)",
                  "Topographic map (optional but helpful)",
                  "Landmarks for reference"
              ],
              steps: [
                  "🔎 **Why Use a Compass?** – A compass helps you determine direction even in unfamiliar environments. It remains reliable without batteries or technology.",
                  "1️⃣ **Understand the Compass Parts** – A compass consists of a **magnetic needle**, a **rotating bezel** (degree markings), a **direction-of-travel arrow**, and a **baseplate**.",
                  "2️⃣ **Hold the Compass Correctly** – Keep it flat in your hand, ensuring the **needle moves freely**.",
                  "3️⃣ **Find North** – The red end of the needle always points **toward magnetic north**.",
                  "4️⃣ **Set Your Bearing** – Rotate the bezel until the **degree marking** lines up with your intended direction.",
                  "5️⃣ **Follow the Arrow** – Once set, move in the direction of the **direction-of-travel arrow**, keeping the needle inside the orienting box.",
                  "6️⃣ **Check Your Surroundings** – Use landmarks (mountains, rivers, trees) to verify your path and prevent accidental drift."
              ],
              tips: [
                  "🧭 **Keep it Flat** – Holding the compass at an angle may cause incorrect readings.",
                  "🌍 **Adjust for Declination** – In some areas, **true north** and **magnetic north** differ. Adjust your bearing accordingly.",
                  "🛑 **Avoid Metal & Electronics** – Large metal objects or electronics can **interfere with the compass needle**."
              ]
          },
          {
              title: "Navigation: Finding North Without a Compass",
              description: "Learn multiple ways to determine direction without a compass using the sun, stars, and natural signs.",
              category: "navigation",
              completed: false,
              expanded: false,
              materials: [
                  "Stick (for shadow method)",
                  "Watch (for analog clock method)",
                  "Clear night sky (for star navigation)"
              ],
              steps: [
                  "🔎 **Why Find North Without a Compass?** – If you lose your compass, these natural methods can still help you determine direction.",
                  "1️⃣ **Shadow Stick Method (Daytime)** – Place a stick in the ground and mark the tip of the shadow. Wait 15 minutes and mark the new position. **A line between the two points runs west to east**.",
                  "2️⃣ **Using an Analog Watch (Daytime, Northern Hemisphere)** – Point the **hour hand** at the sun. Halfway between the hour hand and 12 o’clock is **south** (opposite is north).",
                  "3️⃣ **Using the North Star (Nighttime, Northern Hemisphere)** – Locate the **Big Dipper** and follow the two stars at the edge of the bowl. These lead directly to the **North Star (Polaris)**, which always points north.",
                  "4️⃣ **Using the Southern Cross (Nighttime, Southern Hemisphere)** – Find the **Southern Cross constellation** and extend an imaginary line **5 times its length** downward. This points **toward south**.",
                  "5️⃣ **Observing Natural Landmarks** – Moss grows **more abundantly on the north** side of trees in the Northern Hemisphere. **Ant hills** are often **built facing the sun (south)**."
              ],
              tips: [
                  "☀ **Use Multiple Methods** – Always cross-check techniques for accuracy.",
                  "🌍 **Hemispheres Matter** – Star navigation differs between the **Northern and Southern Hemispheres**.",
                  "🕰 **Time of Day Affects Shadows** – The **shadow stick method works best midday** when the sun is highest."
              ]
          },
          {
              title: "Navigation: Reading a Topographic Map",
              description: "Understand how to read contour lines, elevation, and terrain features on a topographic map.",
              category: "navigation",
              completed: false,
              expanded: false,
              materials: [
                  "Topographic map",
                  "Compass (for orientation)",
                  "Landmarks for reference"
              ],
              steps: [
                  "🔎 **What is a Topographic Map?** – A topographic map shows elevation, terrain features, and navigation landmarks using **contour lines** and symbols.",
                  "1️⃣ **Understand Contour Lines** – Contour lines **connect points of the same elevation**. The closer the lines, the **steeper** the terrain.",
                  "2️⃣ **Identify Terrain Features** – Look for valleys, ridges, and peaks by how contour lines bend.",
                  "3️⃣ **Orient the Map with a Compass** – Align north on the map with north on your compass to match the real-world layout.",
                  "4️⃣ **Use Landmarks for Navigation** – Compare visible landmarks (rivers, mountains, trails) with those on the map.",
                  "5️⃣ **Follow Contour Lines for Easy Travel** – Instead of climbing up and down hills, follow a **path along contour lines** to conserve energy."
              ],
              tips: [
                  "🗺 **Check the Map Scale** – Some maps cover large areas; others show detailed sections. Know your map’s scale.",
                  "⛰ **Look for Water Features** – Rivers and lakes are great navigation aids.",
                  "🛑 **Avoid Steep Areas** – If contour lines are packed closely together, the terrain is steep and difficult to cross."
              ]
          },
          {
              title: "Navigation: Using Landmarks for Wayfinding",
              description: "Learn how to use natural and man-made landmarks for navigation without tools.",
              category: "navigation",
              completed: false,
              expanded: false,
              materials: [
                  "Clear view of surroundings",
                  "Notepad (optional for marking landmarks)"
              ],
              steps: [
                  "🔎 **Why Use Landmarks?** – Landmarks help maintain direction and track progress when navigating.",
                  "1️⃣ **Choose a Distinct Landmark** – Pick a mountain, large tree, or other **unique features** visible from a distance.",
                  "2️⃣ **Align Your Path with Landmarks** – When traveling, keep your landmark in **a consistent position** (e.g., ahead or to your right).",
                  "3️⃣ **Use Two or More Landmarks** – Cross-check with a second landmark to confirm you are staying on track.",
                  "4️⃣ **Update Landmarks as You Travel** – As you move, select new landmarks in the direction you’re heading.",
                  "5️⃣ **Track Your Distance Using Pacing** – Count your steps between landmarks to estimate distance traveled."
              ],
              tips: [
                  "🗺 **Use Permanent Landmarks** – Temporary objects (fallen trees, snowbanks) may change over time.",
                  "🌄 **Mountain Peaks Make Great Guides** – They remain visible over long distances.",
                  "🛑 **Don’t Rely on Just One Landmark** – If you lose sight of it, have a secondary point of reference."
              ]
          },
          {
              title: "Navigation: Creating a Bushcraft Compass",
              description: "Learn how to make a simple survival compass using natural materials.",
              category: "navigation",
              completed: false,
              expanded: false,
              materials: [
                  "Metal sewing needle or straight piece of wire",
                  "Small leaf or cork",
                  "Small bowl or puddle of still water",
                  "Magnet or silk cloth (for magnetizing the needle)"
              ],
              steps: [
                  "🔎 **Why Make a Compass?** – If lost without a real compass, this technique helps you find **north using magnetism**.",
                  "1️⃣ **Magnetize the Needle** – Stroke a **needle or wire** in one direction with a magnet (or silk cloth) at least **20-30 times**.",
                  "2️⃣ **Prepare the Floating Platform** – Place the needle on a **small leaf or piece of cork**.",
                  "3️⃣ **Set It in Water** – Float the leaf with the needle in a bowl of **still water**.",
                  "4️⃣ **Watch the Needle Align** – The needle will slowly rotate, with one end pointing **north**.",
                  "5️⃣ **Verify with Landmarks** – Double-check the direction using **natural signs like the sun or stars**."
              ],
              tips: [
                  "🧲 **Stronger Magnet = Faster Alignment** – A powerful magnet will magnetize the needle more effectively.",
                  "💨 **Use Still Water** – Even small movements in the water **can disrupt accuracy**.",
                  "🌞 **Double-Check with the Sun** – Ensure your compass aligns with other natural navigation methods."
              ]
          },

          // 🏥 First Aid & Medical Guides
          {
              title: "First Aid: Treating a Bleeding Wound",
              description: "Learn how to properly stop bleeding and dress a wound using first aid techniques.",
              category: "first-aid",
              completed: false,
              expanded: false,
              materials: [
                  "Sterile gauze or clean cloth",
                  "Adhesive bandages or medical tape",
                  "Antiseptic wipes or clean water",
                  "Gloves (if available)",
                  "Tourniquet (if severe bleeding)"
              ],
              steps: [
                  "🔎 **Understanding Bleeding Control** – Controlling bleeding quickly prevents excessive blood loss and reduces infection risk.",
                  "1️⃣ **Apply Direct Pressure** – Place sterile gauze or a clean cloth over the wound and press firmly to slow bleeding.",
                  "2️⃣ **Elevate the Wound** – If possible, raise the injured area above heart level to reduce blood flow.",
                  "3️⃣ **Apply Additional Layers if Needed** – If blood soaks through the first layer, **do not remove it**. Instead, apply another layer on top.",
                  "4️⃣ **Secure the Dressing** – Use medical tape or a bandage to keep the gauze in place.",
                  "5️⃣ **Apply a Tourniquet (for Severe Bleeding)** – If bleeding is **uncontrollable**, place a tourniquet **2 inches above the wound**, tighten it, and note the time applied.",
                  "6️⃣ **Monitor for Shock** – Look for symptoms like pale skin, rapid breathing, and dizziness. Keep the person warm and calm until help arrives."
              ],
              tips: [
                  "🩸 **Do Not Remove Impaled Objects** – If an object is stuck in the wound, **leave it in place** and bandage around it.",
                  "🛑 **Use Clean Materials** – Avoid using dirty cloths, which can cause infections.",
                  "⏳ **Tourniquets Are a Last Resort** – Only apply if **direct pressure fails** and help is far away."
              ]
          },
          {
              title: "First Aid: Performing CPR",
              description: "Learn how to perform CPR (Cardiopulmonary Resuscitation) to help someone who is not breathing.",
              category: "first-aid",
              completed: false,
              expanded: false,
              materials: [
                  "None (CPR can be performed without tools)",
                  "CPR mask (optional for rescue breaths)"
              ],
              steps: [
                  "🔎 **Why Perform CPR?** – CPR helps restart the heart and lungs in emergencies like cardiac arrest or drowning.",
                  "1️⃣ **Check Responsiveness** – Shake the person and ask loudly, ‘Are you okay?’ If no response, check for breathing.",
                  "2️⃣ **Call for Help** – If no one is nearby, call **911 (or emergency services)** before starting CPR.",
                  "3️⃣ **Begin Chest Compressions** – Place your hands **centered on the chest**, interlock fingers, and push **hard and fast (100-120 beats per minute)**.",
                  "4️⃣ **Rescue Breaths (if trained)** – Tilt the head back, pinch the nose, and give **2 breaths** after every **30 compressions**.",
                  "5️⃣ **Continue Until Help Arrives** – Keep going until professional medical help takes over."
              ],
              tips: [
                  "🫀 **Use Only Chest Compressions if Untrained** – If unsure, hands-only CPR is still effective.",
                  "⚠️ **Do Not Stop Unless Necessary** – CPR should continue until the person revives or medical help arrives.",
                  "🎵 **Use a Rhythm** – Press to the beat of ‘Stayin’ Alive’ or ‘Baby Shark’ to maintain proper speed."
              ]
          },
          {
              title: "First Aid: Treating a Burn",
              description: "Learn how to properly treat burns to reduce pain and prevent infection.",
              category: "first-aid",
              completed: false,
              expanded: false,
              materials: [
                  "Cool running water",
                  "Sterile gauze or clean cloth",
                  "Aloe vera gel or burn cream",
                  "Pain relievers (if available)"
              ],
              steps: [
                  "🔎 **Understanding Burn Severity** – Burns are categorized as **first-degree (mild), second-degree (blisters), and third-degree (deep tissue damage).**",
                  "1️⃣ **Cool the Burn** – Immediately run **cool (not cold)** water over the burn for at least **10-15 minutes** to reduce damage.",
                  "2️⃣ **Avoid Ice** – **Do not apply ice**, as it can cause further skin damage.",
                  "3️⃣ **Cover with a Sterile Dressing** – Use a **clean gauze or cloth** to protect the area and prevent infection.",
                  "4️⃣ **Apply Aloe Vera or Burn Ointment** – Only for **first-degree burns** (mild redness). Avoid applying to severe burns.",
                  "5️⃣ **Do Not Pop Blisters** – If blisters form, **leave them intact** to prevent infection.",
                  "6️⃣ **Seek Medical Help for Severe Burns** – If the burn is **larger than your palm**, affects the face or joints, or is **third-degree**, seek immediate medical care."
              ],
              tips: [
                  "❌ **Avoid Butter or Oils** – These **trap heat** and make the burn worse.",
                  "🩹 **Keep It Covered** – Protect the burn from dirt and bacteria while healing.",
                  "🆘 **Watch for Infection** – Red streaks, swelling, or pus may indicate infection."
              ]
          },
          {
              title: "First Aid: Treating a Fracture or Broken Bone",
              description: "Learn how to stabilize a broken bone and provide first aid before medical treatment.",
              category: "first-aid",
              completed: false,
              expanded: false,
              materials: [
                  "Splint (rigid stick, rolled-up cloth, or board)",
                  "Bandages or strips of cloth",
                  "Ice pack (optional)"
              ],
              steps: [
                  "🔎 **Identifying a Fracture** – Signs include **swelling, bruising, deformity, and severe pain** when moving the area.",
                  "1️⃣ **Do Not Move the Limb** – Keep the injured area **still** to prevent further damage.",
                  "2️⃣ **Create a Splint** – Use a **rigid object** (stick, board) and tie it securely with cloth or bandages.",
                  "3️⃣ **Immobilize the Joint** – If the **bone is in the leg or arm**, stabilize the nearest joints as well.",
                  "4️⃣ **Apply Ice (if available)** – Wrap ice in cloth and place on the injury to reduce swelling.",
                  "5️⃣ **Seek Immediate Medical Help** – A fracture needs **professional treatment** to heal properly."
              ],
              tips: [
                  "🛑 **Do Not Try to ‘Reset’ the Bone** – Never attempt to push a broken bone back into place.",
                  "🩹 **Keep It Immobilized** – Movement can cause **worse injuries or internal bleeding**.",
                  "🚑 **Shock is a Risk** – Watch for **pale skin, confusion, and fainting**."
              ]
          },
          {
              title: "First Aid: Identifying & Treating Hypothermia",
              description: "Learn how to recognize and treat hypothermia, a life-threatening cold exposure condition.",
              category: "first-aid",
              completed: false,
              expanded: false,
              materials: [
                  "Warm clothing or blankets",
                  "Dry shelter",
                  "Warm (not hot) drinks",
                  "Body heat (if needed)"
              ],
              steps: [
                  "🔎 **What is Hypothermia?** – A dangerous condition where body temperature drops **below 95°F (35°C)**.",
                  "1️⃣ **Recognize Symptoms** – Look for **shivering, confusion, slurred speech, weak pulse, and cold skin**.",
                  "2️⃣ **Move to a Warmer Place** – Get the person **indoors, inside a tent, or near a fire** if possible.",
                  "3️⃣ **Remove Wet Clothing** – Wet clothes **increase heat loss**. Replace them with **dry, warm layers**.",
                  "4️⃣ **Wrap in Blankets** – Cover the person **entirely**, including the head and hands.",
                  "5️⃣ **Provide Warm Liquids** – Offer **warm (not hot) drinks** to help gradually increase body temperature.",
                  "6️⃣ **Use Body Heat** – If no blankets are available, **use body heat by sharing warmth** under insulation."
              ],
              tips: [
                  "🔥 **Avoid Direct Heat** – Placing a person **next to a fire too quickly can shock the system**.",
                  "🛑 **Do Not Give Alcohol** – Alcohol **lowers body temperature** even though it feels warm.",
                  "💨 **Shelter is Key** – Wind and moisture accelerate hypothermia, so **stay covered**."
              ]
          },
        
          // 🎣 Foraging & Trapping Guides 
          {
            "title": "Foraging: Identifying Edible Wild Plants",
            "description": "Learn how to safely identify and gather edible wild plants for survival.",
            "category": "foraging",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "Field guide (or plant identification apps like iNaturalist, Seek, or PlantNet)",
                "AI research tool (DeepSeek AI, ChatGPT for historical uses)",
                "Knife or scissors for harvesting",
                "Collection bag or basket"
            ],
            "steps": [
                "🔎 **Understanding Wild Edibles** – Many wild plants are edible, but some are toxic. **Proper identification is crucial before consuming any plant.**",
                "1️⃣ **Use Plant Identification Apps** – Take clear photos of plants and use **iNaturalist, Seek, or PlantNet** to identify them before consuming.",
                "2️⃣ **Research Traditional Uses** – Use **DeepSeek AI or ChatGPT** to learn how **indigenous tribes** used the plant for food or medicine.",
                "3️⃣ **Check for Toxic Traits** – **Avoid plants with:** white sap, bitter taste, almond-like scent (cyanide risk), three-leaf patterns (may be poison ivy), or umbrella-shaped flowers (hemlock lookalike).",
                "4️⃣ **Perform the Universal Edibility Test (Step-by-Step)** – If you're unsure if a plant is safe, follow this process over **24 hours**:",
                "   - **Step 1:** Separate the plant into parts (leaves, stems, roots, flowers, fruits).",
                "   - **Step 2:** Rub a small piece on your **inner wrist** for 15 minutes. If irritation occurs, **do not eat.**",
                "   - **Step 3:** Hold a small portion on your lips for **3 minutes**. If burning/tingling occurs, **spit it out.**",
                "   - **Step 4:** Place a tiny piece on your **tongue for 15 minutes** without chewing. If there’s discomfort, **spit it out.**",
                "   - **Step 5:** Chew but do not swallow. Wait **15 minutes**. If no reaction, swallow a tiny piece.",
                "   - **Step 6:** Wait **6 hours** for signs of sickness (vomiting, dizziness, stomach pain).",
                "   - **Step 7:** If no reaction, eat a **small amount** and wait another **6 hours**.",
                "   - **Step 8:** If still no reaction, the plant is likely safe in moderation.",
                "5️⃣ **Harvest Only in Clean Areas** – Avoid plants near **roadsides, polluted water, or pesticide-treated areas**.",
                "6️⃣ **Prepare the Plant Properly** – Some wild plants **must be boiled or cooked** before eating to remove toxins.",
                "7️⃣ **Test Small Samples First** – Even with safe plants, eat **only a tiny portion** at first to avoid digestive upset."
            ],
            "tips": [
                "📱 **Use AI & Foraging Apps** – Apps like **iNaturalist** help with plant ID, while **DeepSeek AI** can provide historical context on traditional uses.",
                "🌿 **Learn 5-10 Safe Plants First** – Focus on a few reliable edibles before expanding knowledge.",
                "🚫 **Avoid White Sap & Bitter Taste** – Many poisonous plants have **milky sap** or an extremely bitter taste.",
                "🛑 **Mushrooms Require Expert Knowledge** – Unless you **100% identify** an edible mushroom, **do not eat it**.",
                "🏕 **Edible Parts Matter** – Some plants have edible **leaves but toxic roots**, or **flowers but toxic stems**."
            ]
          },
          {
              title: "Foraging: Finding & Collecting Wild Berries",
              description: "Learn how to identify safe wild berries and avoid poisonous ones.",
              category: "foraging",
              completed: false,
              expanded: false,
              materials: [
                  "Berry identification guide",
                  "Collection container",
                  "Gloves (optional for thorny bushes)"
              ],
              steps: [
                  "🔎 **Why Forage Berries?** – Berries are a great source of **vitamins, hydration, and calories** in survival situations.",
                  "1️⃣ **Identify the Berry Type** – Safe berries include **blackberries, raspberries, blueberries, and strawberries**.",
                  "2️⃣ **Avoid Poisonous Berries** – **Bright red or white berries** are often toxic (e.g., **holly, baneberry, yew**).",
                  "3️⃣ **Pick Only Ripe Berries** – Unripe berries may be **sour, hard, or mildly toxic**.",
                  "4️⃣ **Wash Before Eating** – Rinse berries in **clean water** to remove dirt and insects.",
                  "5️⃣ **Store for Later Use** – Dry or mash berries into a **paste for longer shelf life**."
              ],
              tips: [
                  "🍓 **Stick to What You Know** – If you’re unsure about a berry, **do not eat it**.",
                  "🌿 **Observe Animal Behavior** – Birds and small mammals eating a berry doesn’t always mean it’s safe for humans.",
                  "❌ **Do Not Eat Bitter or Soapy-Tasting Berries** – This is a sign of toxicity."
              ]
          },
          {
              title: "Trapping: Making a Basic Snare Trap",
              description: "Learn how to construct a simple snare trap for catching small game.",
              category: "trapping",
              completed: false,
              expanded: false,
              materials: [
                  "Wire or strong cordage (paracord, sinew, or natural fiber)",
                  "Knife or sharp tool",
                  "Small sticks for trigger mechanism"
              ],
              steps: [
                  "🔎 **What is a Snare Trap?** – A snare is a **looped wire or cordage trap** that tightens when an animal steps into it.",
                  "1️⃣ **Find a Game Trail** – Look for **tracks, droppings, or disturbed vegetation** near water sources.",
                  "2️⃣ **Cut a Length of Wire or Cordage** – Around **12-18 inches** is typically enough.",
                  "3️⃣ **Make a Noose** – Form a small loop **just big enough for the target animal’s head or foot**.",
                  "4️⃣ **Anchor the Snare** – Tie the other end of the snare **to a sturdy branch or stake**.",
                  "5️⃣ **Set the Snare at the Right Height** – Position it **just above the ground** where the animal is likely to step.",
                  "6️⃣ **Check Your Trap Often** – Animals may **struggle and escape** if not checked regularly."
              ],
              tips: [
                  "🐾 **Camouflage the Trap** – Use **leaves, dirt, or grass** to hide unnatural materials.",
                  "🦊 **Check Traps Every Few Hours** – Leaving an animal trapped for too long **causes suffering and escape risk**.",
                  "🚫 **Follow Local Laws** – Trapping regulations vary, so **know the rules before using in non-survival situations**."
              ]
          },
          {
              title: "Trapping: Building a Deadfall Trap",
              description: "Learn how to construct a deadfall trap to catch small animals using a falling weight.",
              category: "trapping",
              completed: false,
              expanded: false,
              materials: [
                  "Heavy flat rock or log",
                  "Trigger stick (Y-shaped or notched stick)",
                  "Bait (nuts, fruit, or small meat scraps)"
              ],
              steps: [
                  "🔎 **What is a Deadfall Trap?** – A deadfall trap **crushes small game** when triggered by the animal’s movement.",
                  "1️⃣ **Find a Suitable Location** – Look for **animal tracks or burrow entrances**.",
                  "2️⃣ **Select a Heavy Weight** – A **flat rock or log** heavy enough to kill small game instantly.",
                  "3️⃣ **Carve the Trigger Mechanism** – Use a **Y-stick or notch two sticks together** to make a balanced trigger.",
                  "4️⃣ **Position the Trap Properly** – The rock or log must **balance** on the trigger without falling prematurely.",
                  "5️⃣ **Bait the Trap** – Place **small food scraps** under the weight where the animal will step.",
                  "6️⃣ **Set the Trap & Leave the Area** – Animals avoid human scent, so check from a distance."
              ],
              tips: [
                  "🪵 **Use Dry, Heavy Wood or Stone** – Damp wood may not fall with enough force.",
                  "🦝 **Use the Right Bait** – Target specific animals (e.g., **seeds for rodents, meat for predators**).",
                  "🚷 **Do Not Set Near Trails** – Avoid setting traps where people or pets may trigger them."
              ]
          },
          {
              title: "Fishing: Making a Handline Fishing Rig",
              description: "Learn how to catch fish using a simple handline without a fishing rod.",
              category: "trapping",
              completed: false,
              expanded: false,
              materials: [
                  "Strong fishing line (10-20 ft.)",
                  "Fish hooks (or sharpened bone/metal hooks)",
                  "Bait (worms, insects, or small fish parts)",
                  "Small weight (rock or metal piece)",
                  "Bobber (optional, such as cork or bottle cap)"
              ],
              steps: [
                  "🔎 **Why Use a Handline?** – A handline is an **easy, portable way to catch fish without rods or reels**.",
                  "1️⃣ **Tie a Hook to the Line** – Secure a **fishing hook or sharpened bone hook** with a strong knot.",
                  "2️⃣ **Attach a Small Weight** – This helps the bait **sink** to where fish are swimming.",
                  "3️⃣ **Add a Bobber (Optional)** – If fishing in still water, a floating bobber **helps indicate bites**.",
                  "4️⃣ **Bait the Hook** – Use **worms, insects, or fish scraps** to attract fish.",
                  "5️⃣ **Cast the Line** – Throw the baited hook **into the water** and hold onto the free end.",
                  "6️⃣ **Feel for Bites & Reel In** – When a fish bites, **pull the line steadily** to hook it."
              ],
              tips: [
                  "🎣 **Be Patient** – Fish may take **minutes or hours** to bite.",
                  "🐠 **Choose the Right Bait** – Match bait to local fish species (e.g., **worms for freshwater, shrimp for saltwater**).",
                  "🧤 **Protect Hands from the Line** – Wrapping the line around fingers **can cut skin when pulling in a big fish**."
              ]
          },
        
          // 🪢 Knot Tying & Rope Work Guides 
          {
              title: "Basic Knot: Bowline",
              description: "Learn how to tie a bowline knot, known as the 'rescue knot' due to its secure, non-slipping loop.",
              category: "knots",
              completed: false,
              expanded: false,
              materials: [
                  "3-5 feet of rope or paracord"
              ],
              steps: [
                  "🔎 **What is a Bowline?** – The bowline forms a **secure, non-tightening loop** that is easy to untie even after heavy strain.",
                  "1️⃣ **Make a Small Loop** – Form a small loop near the end of the rope, leaving a few inches of tail.",
                  "2️⃣ **Pass the Tail Through the Loop** – Imagine the tail as a ‘rabbit’ that comes out of the hole.",
                  "3️⃣ **Wrap Around the Standing Line** – The ‘rabbit’ moves **around the tree** (standing part of the rope).",
                  "4️⃣ **Tuck the Tail Back into the Loop** – The ‘rabbit’ **goes back into the hole** (through the original loop).",
                  "5️⃣ **Tighten the Knot** – Pull the standing line while holding the tail to **secure the loop**."
              ],
              tips: [
                  "🛟 **Perfect for Rescue** – A bowline is ideal for **pulling someone up or securing loads**.",
                  "🧵 **Easy to Untie** – Unlike other knots, the bowline **doesn’t jam** under heavy strain.",
                  "🚫 **Not for Slippery Rope** – If using **synthetic rope**, use a double bowline for extra security."
              ]
          },
          {
              title: "Basic Knot: Square Knot",
              description: "Learn how to tie a square knot, commonly used for joining two ropes of equal thickness.",
              category: "knots",
              completed: false,
              expanded: false,
              materials: [
                  "Two pieces of rope (same thickness)"
              ],
              steps: [
                  "🔎 **What is a Square Knot?** – The square knot securely joins two ropes **of equal size**, useful for tying bandages or securing bundles.",
                  "1️⃣ **Hold One Rope in Each Hand** – Start with an **overhand right-over-left** cross.",
                  "2️⃣ **Cross the Ropes Again** – Now do a **left-over-right** cross, forming a symmetrical pattern.",
                  "3️⃣ **Tighten Evenly** – Pull both ends firmly to **lock the knot in place**."
              ],
              tips: [
                  "❌ **Not for Critical Loads** – The square knot **can slip** under uneven tension. Use a **sheet bend** for ropes of different thicknesses.",
                  "⚓ **Common in Sailing** – This knot is often used for **tying sails and securing bundles**."
              ]
          },
          {
              title: "Basic Knot: Clove Hitch",
              description: "Learn how to tie a clove hitch, a quick and adjustable knot for securing a rope to a post.",
              category: "knots",
              completed: false,
              expanded: false,
              materials: [
                  "A rope",
                  "A pole or stick to tie onto"
              ],
              steps: [
                  "🔎 **What is a Clove Hitch?** – The clove hitch is a **fast, adjustable knot** used for tying **ropes to poles or trees**.",
                  "1️⃣ **Wrap Around the Pole** – Pass the rope **around the post** and cross it over itself.",
                  "2️⃣ **Wrap Around Again** – Loop the rope around the post **a second time**, creating an X-shape.",
                  "3️⃣ **Tuck the End Under** – Pass the tail of the rope under the final loop and pull tight."
              ],
              tips: [
                  "🌲 **Great for Temporary Use** – Clove hitches **can slip** under heavy strain, so add an extra half-hitch for security.",
                  "🚣 **Common in Boating** – This knot is frequently used for **securing boats to docks**."
              ]
          },
          {
              title: "Advanced Knot: Prusik Knot",
              description: "Learn how to tie a Prusik knot, used for climbing, rescue, and securing a loop around a rope.",
              category: "knots",
              completed: false,
              expanded: false,
              materials: [
                  "A main rope",
                  "A smaller loop of cord or rope"
              ],
              steps: [
                  "🔎 **What is a Prusik Knot?** – This knot grips tightly when weight is applied but **slides when loose**, making it useful for **climbing and rescue**.",
                  "1️⃣ **Make a Loop with the Small Rope** – The Prusik needs a smaller loop to wrap around the main rope.",
                  "2️⃣ **Wrap the Loop Around the Main Rope** – Pass the loop **through itself** and wrap around **3-5 times**.",
                  "3️⃣ **Tighten by Pulling Both Ends** – The more wraps, the stronger the grip.",
                  "4️⃣ **Test the Grip** – Pull down to check if the knot **locks in place**."
              ],
              tips: [
                  "🧗 **Used in Climbing & Rescue** – Prusik knots allow **ascending ropes or creating safety backups**.",
                  "🔄 **Must Use a Smaller Rope** – The loop should be **smaller in diameter than the main rope** for proper grip."
              ]
          },
          {
              title: "Lashings: Tripod Lashing",
              description: "Learn how to tie a tripod lashing, useful for building three-legged structures in survival situations.",
              category: "knots",
              completed: false,
              expanded: false,
              materials: [
                  "Three sturdy sticks (4-6 feet long)",
                  "Strong rope or cordage"
              ],
              steps: [
                  "🔎 **What is a Tripod Lashing?** – This binding technique **connects three poles together**, creating a stable tripod for shelters or cooking.",
                  "1️⃣ **Position the Three Poles** – Lay them next to each other with the tops aligned.",
                  "2️⃣ **Start Wrapping the Rope** – Secure the rope around **all three poles** with a few tight wraps.",
                  "3️⃣ **Weave Between Poles** – Go over and under each pole to **bind them together**.",
                  "4️⃣ **Tie Off & Spread the Tripod** – Secure the end and spread the legs apart **to create a stable tripod**."
              ],
              tips: [
                  "🏕 **Use for Cooking Racks & Shelters** – This lashing is **great for hanging pots or tarp shelters**.",
                  "🪢 **Tighten as Needed** – If the tripod loosens over time, **adjust the lashings** to maintain stability."
              ]
          },
          {
              title: "Rope Making: Twisting Natural Fibers",
              description: "Learn how to make strong, usable rope from natural plant fibers.",
              category: "knots",
              completed: false,
              expanded: false,
              materials: [
                  "Long plant fibers (grass, bark, sinew, or vines)"
              ],
              steps: [
                  "🔎 **Why Make Rope?** – In survival situations, strong rope is **essential for securing shelters, traps, and gear**.",
                  "1️⃣ **Find Strong Fibers** – Use **inner bark from trees, long grass, or sinew**.",
                  "2️⃣ **Separate & Soften Fibers** – Rub and twist the fibers to **loosen them** for braiding.",
                  "3️⃣ **Start Twisting** – Hold the fibers in two sections and twist **both in opposite directions**.",
                  "4️⃣ **Reverse Wrap for Strength** – Loop one twisted section over the other **to lock them together**.",
                  "5️⃣ **Continue Twisting & Adding Fibers** – Keep twisting and adding more material for **longer, stronger cordage**."
              ],
              tips: [
                  "🌿 **Use Dry Fibers** – Wet fibers may weaken over time.",
                  "💪 **Test Strength Before Use** – Tug the rope **before relying on it** for weight-bearing tasks.",
                  "🛠 **Make Extra Rope** – Having spare rope **prevents emergencies** where cordage is needed."
              ]
          },
          
          // 📡 Signaling & Communication Guides 
          {
              title: "Mirror Signaling for Rescue",
              description: "Learn how to use a mirror to send distress signals over long distances using sunlight.",
              category: "signaling",
              completed: false,
              expanded: false,
              materials: [
                  "Signal mirror (or any reflective surface)",
                  "Sunlight",
                  "Target (aircraft, rescue team, or distant observer)"
              ],
              steps: [
                  "🔎 **Why Use a Signal Mirror?** – A mirror can reflect sunlight to **attract attention over long distances**, making it an **essential survival tool**.",
                  "1️⃣ **Find a Clear View** – Position yourself in an open area where **rescuers or aircraft can see the reflection**.",
                  "2️⃣ **Hold the Mirror Steady** – Hold the mirror **at arm’s length**, angling it toward the sun.",
                  "3️⃣ **Aim at Your Target** – Use a **finger or V-sign with your hand** to line up the reflection with the target.",
                  "4️⃣ **Flash in Intervals** – Move the mirror slightly to create **short flashes of light**, signaling intentionally.",
                  "5️⃣ **Use SOS Signals** – Flash **three short, three long, three short** signals (**Morse code for SOS**)."
              ],
              tips: [
                  "☀ **Works Best on Sunny Days** – Cloudy conditions reduce the mirror’s effectiveness.",
                  "🚁 **Aim for Aircraft Cockpits** – Pilots **can see flashes from miles away**.",
                  "🌊 **Great for Ocean Survival** – A signal mirror **can be seen up to 20 miles over water**."
              ]
          },
          {
              title: "Creating Effective Smoke Signals",
              description: "Learn how to make a smoke signal for long-distance distress communication.",
              category: "signaling",
              completed: false,
              expanded: false,
              materials: [
                  "Firewood",
                  "Green leaves, moss, or wet grass (to create thick smoke)",
                  "Lighter, ferro rod, or fire-starting tool"
              ],
              steps: [
                  "🔎 **Why Smoke Signals?** – Smoke can be seen **from miles away**, making it an effective emergency signal.",
                  "1️⃣ **Build a Fire in an Open Area** – Clear a **safe space** where smoke can rise without obstruction.",
                  "2️⃣ **Use Dry Wood to Create a Base Fire** – Start with a small, **steady flame** before adding smoke-producing material.",
                  "3️⃣ **Add Greenery for Dense Smoke** – Throw **wet leaves, moss, or fresh grass** onto the flames to **produce thick white smoke**.",
                  "4️⃣ **Create a Signal Pattern** – Use a blanket or tarp to **cover and release the smoke in bursts**.",
                  "5️⃣ **Use the SOS Pattern** – Three **short, distinct smoke puffs** mean distress."
              ],
              tips: [
                  "🔥 **White Smoke is More Visible** – Avoid black smoke from burning plastics or oil.",
                  "🌬 **Choose a High Location** – Hills and open spaces **help smoke rise and travel farther**.",
                  "🚁 **Use with a Mirror** – A mirror and smoke combo **improves visibility for rescuers**."
              ]
          },
          {
              title: "Ground Markings & SOS Signs",
              description: "Learn how to create large ground signals to communicate distress to aircraft and search teams.",
              category: "signaling",
              completed: false,
              expanded: false,
              materials: [
                  "Logs, rocks, or contrasting material",
                  "Open ground (sand, snow, or grassy field)"
              ],
              steps: [
                  "🔎 **Why Use Ground Markings?** – Large symbols are visible **from the air**, signaling distress to rescue teams.",
                  "1️⃣ **Choose a Clear Area** – Find an open space like a **beach, field, or snowy area**.",
                  "2️⃣ **Use Contrasting Materials** – Arrange **dark rocks on light sand** or **light branches on dark ground**.",
                  "3️⃣ **Make Large Letters** – Create an **SOS (at least 10-15 feet tall)** or **arrows pointing toward safety**.",
                  "4️⃣ **Add Fire or Reflection** – Improve visibility by **placing a fire near the marking at night** or adding reflective objects."
              ],
              tips: [
                  "📏 **Bigger is Better** – Letters should be **at least 10 feet tall** for aircraft visibility.",
                  "🌲 **Use Natural Materials** – Logs, branches, or stones make great emergency markings.",
                  "🔦 **Enhance with Light** – A flashlight, fire, or mirror near the marking **increases visibility at night**."
              ]
          },
          {
              title: "Whistle Communication for Rescue",
              description: "Learn how to use a whistle to signal for help in emergencies.",
              category: "signaling",
              completed: false,
              expanded: false,
              materials: [
                  "Loud whistle (plastic or metal)",
                  "Clear open area (for sound travel)"
              ],
              steps: [
                  "🔎 **Why Use a Whistle?** – A loud whistle **carries farther than shouting** and is useful in forests, canyons, and survival situations.",
                  "1️⃣ **Blow in Sets of Three** – Three short blasts (**Morse SOS**) signal distress.",
                  "2️⃣ **Pause Between Blasts** – Wait a few seconds between sets to **listen for a response**.",
                  "3️⃣ **Repeat Every Minute** – Continue the pattern **until help arrives**."
              ],
              tips: [
                  "🔊 **Use a Pealess Whistle** – Pealess models work **in any weather** and don’t freeze.",
                  "🌲 **Best for Dense Forests** – A whistle **carries farther than shouting** in wooded areas.",
                  "👂 **Listen for Echoes** – An echo can **help gauge distance** or confirm someone heard the signal."
              ]
          },
          {
              title: "Using Flashlights for Night Signaling",
              description: "Learn how to use a flashlight to send distress signals at night.",
              category: "signaling",
              completed: false,
              expanded: false,
              materials: [
                  "Flashlight or headlamp",
                  "Dark, open area for visibility"
              ],
              steps: [
                  "🔎 **Why Use a Flashlight?** – A strong flashlight can **send distress signals over long distances**, especially in remote areas.",
                  "1️⃣ **Use the SOS Pattern** – Flash **three short, three long, three short** beams (**Morse code for SOS**).",
                  "2️⃣ **Aim at Searchlights or Aircraft** – Direct the beam toward rescuers or searchlights **to get noticed**.",
                  "3️⃣ **Create Slow Flashing Patterns** – Flash **once every 5-10 seconds** for consistent visibility."
              ],
              tips: [
                  "🔋 **Save Battery** – Use brief flashes to **conserve power**.",
                  "🛠 **Use a Reflective Surface** – Direct the flashlight beam **off a mirror or CD** for a wider signal.",
                  "🌃 **Best in Open Areas** – Flashlights work **best in darkness away from city lights**."
              ]
          },
          {
              title: "Hand Signals for Silent Communication",
              description: "Learn basic hand signals used for silent communication in survival situations.",
              category: "signaling",
              completed: false,
              expanded: false,
              materials: [
                  "Knowledge of hand signals",
                  "Visibility of team members"
              ],
              steps: [
                  "🔎 **Why Use Hand Signals?** – Silent communication is useful for **stealth, hunting, and emergency teamwork**.",
                  "1️⃣ **Stop Signal** – Raise one hand, **palm facing out**, to indicate stopping.",
                  "2️⃣ **Go Forward** – Point **two fingers forward** to signal movement.",
                  "3️⃣ **Danger Signal** – Cross arms **in an X over your chest** for warning.",
                  "4️⃣ **Need Assistance** – Raise both hands **above your head and wave**.",
                  "5️⃣ **Rally Here** – Make a **circle motion with one hand** to regroup."
              ],
              tips: [
                  "🖐 **Agree on Signals in Advance** – Make sure **everyone in your group knows the meaning** of each signal.",
                  "🌲 **Great for Hunting or Stealth** – Avoid making noise when **tracking animals or moving quietly**.",
                  "🚀 **Use at Night with a Glow Stick** – A small light **enhances visibility in darkness**."
              ]
          },
        
          // ⚔ Tactical & War Preparation Guides
          {
            title: "Basic Handgun Training",
            description: "Learn the fundamentals of handling, aiming, and firing a handgun safely.",
            category: "tactical",
            completed: false,
            expanded: false,
            materials: [
                "Handgun (9mm recommended for beginners)",
                "Eye and ear protection",
                "Paper target or steel target",
                "Ammunition (appropriate for the firearm)"
            ],
            steps: [
                "🔎 **Understanding Handgun Basics** – A handgun is a short-barrel firearm designed for self-defense or tactical use. Mastering **grip, stance, sight alignment, and trigger control** is essential.",
                "1️⃣ **Safety First** – Always keep the gun pointed in a safe direction. **Finger off the trigger** until ready to fire.",
                "2️⃣ **Proper Grip** – Wrap your dominant hand around the grip, keeping the **thumb forward**. Support with the **non-dominant hand**.",
                "3️⃣ **Stance & Balance** – Stand with feet **shoulder-width apart**, slightly leaning forward.",
                "4️⃣ **Aiming & Sight Picture** – Align the front sight **between the rear sights**, focusing on the **front sight, not the target**.",
                "5️⃣ **Trigger Control** – Slowly squeeze the trigger without jerking the firearm to maintain accuracy.",
                "6️⃣ **Firing in Controlled Bursts** – Start with **single shots**, then practice controlled **double-taps**.",
                "7️⃣ **Reloading** – Drop the magazine, insert a fresh one, and **chamber a round smoothly**."
            ],
            tips: [
                "🔫 **Grip is Key** – A weak grip will cause **poor recoil control**.",
                "🎯 **Focus on the Front Sight** – Your target should be slightly blurry; the **front sight must be crystal clear**.",
                "🔥 **Trigger Pull Must Be Smooth** – Avoid flinching; let the gun surprise you when it fires."
            ]
        },
          {
              title: "Close Quarters Battle (CQB) Basics",
              description: "Learn how to move and engage threats in close-quarter combat situations.",
              category: "tactical",
              completed: false,
              expanded: false,
              materials: [
                  "Training pistol or airsoft gun (for practice)",
                  "Protective gear (gloves, goggles, helmet)",
                  "A mock indoor environment (hallways, rooms)"
              ],
              steps: [
                  "🔎 **What is CQB?** – Close Quarters Battle (CQB) is combat within **confined spaces** like buildings or alleyways. **Speed, surprise, and aggression** are key.",
                  "1️⃣ **Weapon Ready Position** – Keep your gun **low and ready** to engage threats quickly.",
                  "2️⃣ **Pie the Corner** – Instead of rushing in, **slice the pie** by moving slowly around a corner while keeping your gun trained forward.",
                  "3️⃣ **Entry Techniques** – Use **doorway entry techniques** such as the **button hook (quick side movement)** or **cross entry (opposite sides).**",
                  "4️⃣ **Room Clearing** – Upon entering, **scan and clear** sectors of the room systematically.",
                  "5️⃣ **Engage Threats Quickly** – Fire two controlled shots to center mass if a target is hostile.",
                  "6️⃣ **Use Cover & Movement** – Always stay **near cover** and move in **short bursts** to avoid exposure."
              ],
              tips: [
                  "🏃 **Never Stand in a Doorway** – The **fatal funnel** is a prime kill zone in CQB.",
                  "🔍 **Look Before You Enter** – Always **scan the corners first** when entering a room.",
                  "🛡️ **Move as a Team** – If working with others, **cover each other's blind spots**."
              ]
          },
          {
              title: "Hand-to-Hand Combat: Striking Basics",
              description: "Learn essential self-defense strikes that can disable an opponent in survival situations.",
              category: "tactical",
              completed: false,
              expanded: false,
              materials: [
                  "Striking pads or heavy bag",
                  "Training gloves (optional)",
                  "Practice partner (for controlled drills)"
              ],
              steps: [
                  "🔎 **Why Learn Hand-to-Hand Combat?** – In survival situations, **you may not have a weapon**. Learning to strike effectively can **neutralize threats quickly**.",
                  "1️⃣ **Stance & Balance** – Keep feet **shoulder-width apart**, hands up, **chin tucked**.",
                  "2️⃣ **Basic Strikes** – Master the **jab, cross, elbow strike, and palm strike**.",
                  "3️⃣ **Target Areas** – Strike vulnerable points like the **nose, throat, groin, and solar plexus**.",
                  "4️⃣ **Power Generation** – Use your **hips and body rotation** to generate maximum force.",
                  "5️⃣ **Defensive Movements** – Learn to **block, slip, and counterattack** efficiently."
              ],
              tips: [
                  "👊 **Use the Palm, Not Fists** – A palm strike reduces the risk of **breaking knuckles**.",
                  "🎯 **Aim for Soft Targets** – Eyes, throat, and groin are **highly effective strike zones**.",
                  "🏃 **Escape After Striking** – Don't stay engaged; **disable and disengage**."
              ]
          },
          {
              title: "Escape & Evasion Tactics",
              description: "Learn how to evade capture and escape restraints in a survival scenario.",
              category: "tactical",
              completed: false,
              expanded: false,
              materials: [
                  "Duct tape or zip ties (for practice)",
                  "Handcuffs (if available)",
                  "Escape tools (bobby pins, paper clips, shoelaces)"
              ],
              steps: [
                  "🔎 **Why Escape & Evasion?** – If captured, knowing how to **escape restraints and avoid detection** can save your life.",
                  "1️⃣ **Breaking Zip Ties** – Raise your **bound hands overhead**, then **slam them down quickly onto your thigh** to snap the ties.",
                  "2️⃣ **Escaping Duct Tape** – Twist your wrists back and forth to **weaken the adhesive**, then pull apart rapidly.",
                  "3️⃣ **Picking Handcuffs** – Use a **bobby pin** or paperclip to **manipulate the locking mechanism**.",
                  "4️⃣ **Evasion Techniques** – If pursued, **change directions frequently, move through dense cover, and avoid predictable routes.**",
                  "5️⃣ **Blending In** – Act natural in urban environments to avoid looking suspicious."
              ],
              tips: [
                  "🔗 **Zip Tie Weakness** – Heat or **friction weakens plastic ties**.",
                  "🚶 **Walk Like You Belong** – Avoid **suspicious movements** when blending in.",
                  "🌲 **Use Nature for Cover** – Dense foliage provides **natural concealment** from pursuers."
              ]
          },
          {
              title: "Tactical Reloading Techniques",
              description: "Learn how to reload a firearm efficiently during combat scenarios.",
              category: "tactical",
              completed: false,
              expanded: false,
              materials: [
                  "Handgun or rifle (unloaded for practice)",
                  "Extra magazines",
                  "Dummy rounds (for safety)"
              ],
              steps: [
                  "🔎 **Why Learn Tactical Reloads?** – Reloading **under stress** is a crucial skill in self-defense and combat situations.",
                  "1️⃣ **Speed Reload** – Drop the empty magazine, insert a new one **without retaining the old mag**.",
                  "2️⃣ **Tactical Reload** – Swap an **almost-empty magazine with a fresh one** while keeping the partially loaded mag.",
                  "3️⃣ **Emergency Reload** – If your firearm **runs empty**, reload as fast as possible under cover.",
                  "4️⃣ **Magazine Indexing** – Keep magazines in a **consistent position on your belt** for quick access.",
                  "5️⃣ **Reassess the Situation** – After reloading, scan for threats before resuming engagement."
              ],
              tips: [
                  "🔫 **Keep Your Gun Up** – Don’t drop your firearm while reloading.",
                  "📏 **Practice with Dummy Rounds** – Train safely before using live ammo.",
                  "🚀 **Muscle Memory is Key** – Repetition makes reloading instinctive."
              ]
          },
          
          // ⚡ Electrical Engineering & Hacking Guides
          {
              title: "HAM Radio Basics: Long-Distance Emergency Communication",
              description: "Learn how to set up and use a HAM radio for emergency communication.",
              category: "electrical",
              completed: false,
              expanded: false,
              materials: [
                  "HAM radio (Baofeng UV-5R or similar)",
                  "Antenna (default or extended for better range)",
                  "Battery pack or solar charger",
                  "Local frequency chart or band plan"
              ],
              steps: [
                  "🔎 **What is HAM Radio?** – HAM radio is a reliable way to communicate **over long distances** without relying on cell towers or the internet.",
                  "1️⃣ **Power On the Radio** – Ensure the battery is charged, then turn on the radio.",
                  "2️⃣ **Set the Frequency** – Use a local frequency chart to tune into an active emergency or general frequency.",
                  "3️⃣ **Adjust the Antenna** – A longer antenna improves signal range. Position it **vertically for best reception.**",
                  "4️⃣ **Listen Before Transmitting** – Always **listen** before pressing the PTT (Push-to-Talk) button.",
                  "5️⃣ **Make a Call** – Press PTT and say, 'This is [Your Call Sign], is anyone receiving?'. Speak **clearly and concisely.**",
                  "6️⃣ **Respond to Incoming Calls** – If someone responds, **confirm your location and intent** (e.g., requesting emergency help)."
              ],
              tips: [
                  "📻 **Practice in Non-Emergencies** – Test your radio before an actual crisis.",
                  "🔋 **Conserve Battery** – Keep transmissions **short** to extend battery life.",
                  "🌎 **Use Repeaters** – If the signal is weak, try **repeater frequencies** to boost communication range."
              ]
          },
          {
              title: "Building a Simple Solar Power System",
              description: "Set up a small off-grid solar power system to generate electricity.",
              category: "electrical",
              completed: false,
              expanded: false,
              materials: [
                  "Solar panel (50W or higher)",
                  "Charge controller",
                  "12V deep-cycle battery",
                  "Power inverter (optional for AC devices)",
                  "Wiring and connectors"
              ],
              steps: [
                  "🔎 **How Solar Power Works** – Solar panels convert sunlight into **electricity**, which is stored in a battery for later use.",
                  "1️⃣ **Position the Solar Panel** – Place the panel **facing the sun** at an optimal angle (30-45°).",
                  "2️⃣ **Connect to the Charge Controller** – Wire the **solar panel to the charge controller** to regulate power flow.",
                  "3️⃣ **Connect the Battery** – Attach the charge controller to the **12V battery** to store power.",
                  "4️⃣ **Add an Inverter (Optional)** – If using **AC-powered devices**, connect an inverter to the battery.",
                  "5️⃣ **Test the System** – Power a small device (USB charger, LED light) to confirm everything works.",
                  "6️⃣ **Expand as Needed** – Add more panels or batteries for a larger off-grid setup."
              ],
              tips: [
                  "☀️ **Maximize Sunlight Exposure** – Move the panel **throughout the day** for peak energy collection.",
                  "🔋 **Use Deep-Cycle Batteries** – Regular car batteries **aren't ideal** for long-term solar use.",
                  "⚡ **Use LED Lights** – They consume less power, extending battery life."
              ]
          },
          {
              title: "Cybersecurity: Protecting Your Digital Identity",
              description: "Learn how to secure your personal and financial data online.",
              category: "electrical",
              completed: false,
              expanded: false,
              materials: [
                  "Password manager (Bitwarden, LastPass, or KeePass)",
                  "Two-Factor Authentication (Google Authenticator, Authy)",
                  "VPN (ProtonVPN, NordVPN, or Mullvad)",
                  "Secure browser (Brave, Firefox, or Tor)"
              ],
              steps: [
                  "🔎 **Why Cybersecurity Matters** – Hackers can **steal passwords, monitor activity, and hijack accounts**. These steps prevent digital theft.",
                  "1️⃣ **Use Strong Passwords** – Create **unique** passwords for every account (16+ characters, random).",
                  "2️⃣ **Enable Two-Factor Authentication (2FA)** – Require **a second verification step** (SMS codes, Authenticator apps).",
                  "3️⃣ **Use a VPN** – Encrypt internet traffic to **prevent tracking** from hackers and ISPs.",
                  "4️⃣ **Secure Your Browser** – Use **Brave, Firefox, or Tor** with privacy settings enabled.",
                  "5️⃣ **Avoid Phishing Scams** – Never **click suspicious email links** or download unknown attachments.",
                  "6️⃣ **Regularly Update Software** – Keep **all apps, browsers, and operating systems updated** to prevent vulnerabilities."
              ],
              tips: [
                  "🔐 **Never Reuse Passwords** – If one account gets hacked, all others remain safe.",
                  "🌍 **Browse Securely** – Avoid entering sensitive information on **public Wi-Fi** without a VPN.",
                  "⚠️ **Check Email Senders** – Hackers disguise themselves as trusted companies; **always verify sender addresses**."
              ]
          },
          {
              title: "EMP Protection: Shielding Electronics from Electromagnetic Pulses",
              description: "Learn how to protect sensitive electronics from an EMP attack.",
              category: "electrical",
              completed: false,
              expanded: false,
              materials: [
                  "Faraday bag or metal container",
                  "Aluminum foil",
                  "Plastic insulation (bubble wrap, cloth, or cardboard)",
                  "Battery-powered emergency devices (radio, flashlight, USB charger)"
              ],
              steps: [
                  "🔎 **What is an EMP?** – An **Electromagnetic Pulse (EMP)** can fry electronics **instantly** if unprotected.",
                  "1️⃣ **Wrap Electronics in Foil** – Completely cover devices in **multiple layers of aluminum foil**.",
                  "2️⃣ **Use a Faraday Cage** – Store items inside a **metal box lined with insulation** (plastic or cardboard).",
                  "3️⃣ **Avoid Gaps in Protection** – Even **small openings** allow EMP waves in.",
                  "4️⃣ **Backup Critical Devices** – Protect **radios, batteries, and survival electronics**.",
                  "5️⃣ **Test Your Faraday Cage** – Use a radio **inside the container**. If it doesn’t receive a signal, the cage works.",
                  "6️⃣ **Have Manual Backups** – Store printed maps, physical cash, and mechanical tools."
              ],
              tips: [
                  "⚡ **Store a Spare Phone** – Keep an **old phone** in a Faraday cage as an emergency backup.",
                  "🔋 **Use Hand-Crank Radios** – EMP-proof radios **don’t rely on batteries**.",
                  "🔎 **Wrap Cables Separately** – EMPs travel through wires; **disconnect all electronics when stored.**"
              ]
          },
          {
              title: "Hacking Survival: Basic Ethical Hacking for Self-Defense",
              description: "Learn basic hacking techniques for personal cybersecurity and survival.",
              category: "electrical",
              completed: false,
              expanded: false,
              materials: [
                  "Kali Linux (or Parrot OS) on USB",
                  "USB Rubber Ducky or basic keylogger",
                  "Wireshark (for packet analysis)",
                  "Tor Browser (for anonymous browsing)"
              ],
              steps: [
                  "🔎 **Why Learn Ethical Hacking?** – Knowing how hackers attack **helps you defend yourself.**",
                  "1️⃣ **Use Kali Linux** – This hacking-focused operating system has tools for **network security and penetration testing**.",
                  "2️⃣ **Detect Keyloggers** – Run **task manager (Windows)** or **top (Linux)** to find unauthorized software recording keystrokes.",
                  "3️⃣ **Monitor Network Traffic** – Use **Wireshark** to **analyze suspicious connections** in real time.",
                  "4️⃣ **Secure Your Router** – Change the default **admin password** and enable **WPA3 encryption**.",
                  "5️⃣ **Use Tor for Privacy** – If anonymous browsing is needed, **use Tor with caution** (avoid illegal activity).",
                  "6️⃣ **Check for Data Breaches** – Use websites like **HaveIBeenPwned** to see if your email/password was leaked."
              ],
              tips: [
                  "🔍 **Use VPN with Tor** – Prevent ISPs from knowing **when** you’re using Tor.",
                  "🖥️ **Always Log Out** – Don’t stay signed in to sensitive accounts.",
                  "🚫 **Never Use Public USB Ports** – Avoid **juice jacking** attacks by using your own charger."
              ]
          },
            
          // 💰 Finance & Wealth-Building Guides
          {
            title: "Trading Stocks, Futures, Forex, and Crypto: The Smart Way",
            description: "Learn how to trade profitably by using a simulated account, practicing risk management, and leveraging prop firms.",
            category: "finance",
            completed: false,
            expanded: false,
            materials: [
                "Demo trading account (e.g., ThinkorSwim, TradingView, MetaTrader, NinjaTrader)",
                "Brokerage account (for real trading later)",
                "Economic calendar (Forex Factory, Investing.com)",
                "Risk management calculator",
                "Access to a prop firm (e.g., Topstep, Earn2Trade, Apex Trader Funding)"
            ],
            steps: [
                "🔎 **What is Trading?** – Trading involves buying and selling assets like stocks, futures, forex, or crypto to profit from price movements.",
                "1️⃣ **Start with a Simulated Account** – Before risking real money, **trade in a demo (paper) account** for 3-6 months to practice strategy and refine risk management.",
                "2️⃣ **Learn Risk vs. Reward** – Your goal is to risk small amounts for **larger potential gains (Risk-Reward Ratio of 1:2 or better).**",
                "3️⃣ **Develop a Trading Plan** – A solid trading plan includes:",
                "   - ✅ **Entry & Exit Strategy** – Know exactly when to **buy and sell**.",
                "   - ✅ **Risk Management** – Risk **no more than 1-2% of your capital per trade**.",
                "   - ✅ **Stop Loss & Take Profit** – Set limits on **how much you’re willing to lose and when to take profits**.",
                "4️⃣ **Test Your Strategy** – Track results in your demo account and **only go live if consistently profitable** after 3-6 months.",
                "5️⃣ **Move to a Prop Firm** – Instead of risking personal savings, trade with a **prop firm** like **Topstep (the #1 prop firm in the US & world)**.",
                "6️⃣ **Pass the Prop Firm Evaluation** – To trade their capital, you must pass a **challenge or combine** by showing consistent profits while following rules.",
                "7️⃣ **Trade Their Money** – Once approved, you trade the firm’s money with a profit split. **Topstep gives a 90/10 split after you make $5,000**, meaning you keep 90% of profits.",
                "8️⃣ **Fund Your Own Account** – Use your **prop firm earnings** to build a personal trading account, reducing risk and increasing financial independence."
            ],
            tips: [
                "📉 **Risk Small, Win Big** – Never risk more than **1-2% of your account per trade**.",
                "📊 **Keep a Trading Journal** – Track trades to **analyze mistakes and improve strategy**.",
                "🏆 **Patience is Key** – **Don’t rush into real trading** until profitable in demo mode.",
                "💰 **Topstep is the #1 Prop Firm** – If going the prop firm route, **Topstep is a proven and regulated choice**."
            ]
        },
          {
              title: "Stock Trading: How to Buy & Sell Shares",
              description: "Learn how to invest in the stock market, analyze stocks, and execute trades.",
              category: "finance",
              completed: false,
              expanded: false,
              materials: [
                  "Online brokerage account (e.g., TD Ameritrade, E*TRADE, Webull)",
                  "Stock market tracking app (Yahoo Finance, TradingView)",
                  "Investment funds (optional)"
              ],
              steps: [
                  "🔎 **What is Stock Trading?** – Buying and selling company shares allows you to grow wealth over time.",
                  "1️⃣ **Open a Brokerage Account** – Choose an online brokerage and complete registration.",
                  "2️⃣ **Fund Your Account** – Deposit money into your brokerage account (minimum varies by platform).",
                  "3️⃣ **Research Stocks** – Use **Yahoo Finance, TradingView, or brokerage tools** to study companies.",
                  "4️⃣ **Choose a Stock** – Look for **stable companies with growth potential**.",
                  "5️⃣ **Place a Trade** – Buy shares at **market price (instant) or limit price (at your preferred price)**.",
                  "6️⃣ **Monitor and Sell** – Watch price changes and sell when profit targets are reached."
              ],
              tips: [
                  "📈 **Start Small** – Don’t risk money you can’t afford to lose.",
                  "💹 **Use Stop-Loss Orders** – Set limits to **automatically sell if the price drops**.",
                  "📊 **Diversify** – Invest in **different industries** to reduce risk."
              ]
          },
          {
              title: "Real Estate Investment: How to Buy Rental Properties",
              description: "Learn how to invest in real estate and generate rental income.",
              category: "finance",
              completed: false,
              expanded: false,
              materials: [
                  "Cash savings or loan approval",
                  "Property listing websites (Zillow, Realtor, Redfin)",
                  "Property valuation tools (BiggerPockets, PropStream)"
              ],
              steps: [
                  "🔎 **Why Real Estate?** – Owning rental properties can create **passive income** and build wealth.",
                  "1️⃣ **Choose Your Market** – Research **affordable cities with high rental demand**.",
                  "2️⃣ **Find a Property** – Look on **Zillow, Realtor.com, or through local agents**.",
                  "3️⃣ **Analyze the Numbers** – Use the **1% rule** (rent should be 1% of purchase price).",
                  "4️⃣ **Secure Financing** – Pay with cash or apply for a **mortgage loan**.",
                  "5️⃣ **Close the Deal** – Sign contracts and **officially own the property**.",
                  "6️⃣ **Rent It Out** – List your property online and find tenants."
              ],
              tips: [
                  "🏡 **Start with Small Properties** – Single-family homes are easier for beginners.",
                  "📉 **Don’t Overpay** – Use property valuation tools to estimate **fair market value**.",
                  "💰 **Account for Hidden Costs** – Repairs, taxes, and management fees **reduce profit**."
              ]
          },
          {
              title: "Creating Multiple Income Streams",
              description: "Learn how to make money from different sources instead of relying on one job.",
              category: "finance",
              completed: false,
              expanded: false,
              materials: [
                  "Internet connection",
                  "Online marketplace accounts (eBay, Etsy, Facebook Marketplace)",
                  "Side hustle idea"
              ],
              steps: [
                  "🔎 **Why Multiple Income Streams?** – Having multiple ways to make money protects you from job loss.",
                  "1️⃣ **Identify Your Skills** – What services or products can you sell? (e.g., graphic design, carpentry, flipping items).",
                  "2️⃣ **Choose a Platform** – Sell products on **eBay, Etsy, or Amazon** or offer services on **Fiverr or Upwork**.",
                  "3️⃣ **Start with One Income Source** – Focus on **one side hustle at a time**.",
                  "4️⃣ **Scale Up** – Reinvest profits to **grow your business or add more income streams**.",
                  "5️⃣ **Automate Income** – Create **passive income sources** (rental properties, dividends, online courses)."
              ],
              tips: [
                  "💡 **Start Small & Expand** – Don’t overwhelm yourself by **trying too many things at once**.",
                  "📊 **Track Your Earnings** – Keep records of **what’s profitable** and what’s not.",
                  "🛑 **Avoid Get-Rich-Quick Scams** – Real income growth **takes time and effort**."
              ]
          },
          {
              title: "Bartering & Alternative Currency in Survival Situations",
              description: "Learn how to trade goods and services when traditional money loses value.",
              category: "finance",
              completed: false,
              expanded: false,
              materials: [
                  "Valuable barter items (food, medicine, tools, ammo, alcohol, skills)",
                  "A network of potential trade partners",
                  "Knowledge of supply and demand in your local area"
              ],
              steps: [
                  "🔎 **Why Bartering?** – If the economy collapses, physical goods become more valuable than cash.",
                  "1️⃣ **Stock Up on Barter Items** – Collect **high-demand goods** like canned food, fuel, and first-aid supplies.",
                  "2️⃣ **Find Trade Partners** – Establish **trusted connections** with like-minded individuals.",
                  "3️⃣ **Assess Trade Value** – Compare **supply and demand** before making a deal.",
                  "4️⃣ **Negotiate Smartly** – Never reveal how much stock you have; **start with low offers** and adjust.",
                  "5️⃣ **Trade Securely** – Avoid trading in **unsafe or public places**; have protection if needed.",
                  "6️⃣ **Use Skills as Currency** – If you lack goods, offer **useful survival skills in exchange**."
              ],
              tips: [
                  "⚖️ **Diversify Trade Goods** – Not everyone needs the same items, so **offer variety**.",
                  "🎯 **Know When to Trade** – Trade when **demand is highest** for what you have.",
                  "🛡️ **Stay Cautious** – Don’t let people know **everything you own** to avoid becoming a target."
              ]
          },
          {
              title: "Prepping Financially for an Economic Collapse",
              description: "Learn how to protect your wealth and survive financial instability.",
              category: "finance",
              completed: false,
              expanded: false,
              materials: [
                  "Cash savings (in small denominations)",
                  "Precious metals (gold, silver)",
                  "Non-perishable food and survival supplies",
                  "Alternative currency (crypto, trade goods)"
              ],
              steps: [
                  "🔎 **Why Prepare Financially?** – If the economy crashes, cash **may lose value overnight**.",
                  "1️⃣ **Diversify Wealth** – Store **cash, precious metals, and tradeable goods**.",
                  "2️⃣ **Reduce Debt** – Pay off **high-interest loans** to avoid financial collapse.",
                  "3️⃣ **Stockpile Essential Supplies** – Focus on **food, water, medicine, and energy sources**.",
                  "4️⃣ **Keep Some Cash Handy** – In a crisis, banks **may freeze accounts** or limit withdrawals.",
                  "5️⃣ **Invest in Skills** – Learn **self-sufficiency** (gardening, repairs, first aid).",
                  "6️⃣ **Find Alternative Income Sources** – Side hustles, remote work, and barter networks ensure financial stability."
              ],
              tips: [
                  "💵 **Small Bills Are Better** – In a collapse, making **change for large bills** will be difficult.",
                  "🔑 **Keep Important Documents Safe** – Store ID, property deeds, and emergency contacts in a **fireproof safe**.",
                  "📈 **Be Flexible** – Adapt to **new economic conditions quickly**."
              ]
          },
          {
            "title": "Dropshipping: Sell Products Without Inventory",
            "description": "Learn how to start a dropshipping business and make profits without handling inventory.",
            "category": "finance",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "Dropshipping platform (Shopify, eBay, TikTok Shop, etc.)",
                "Reliable supplier (Walmart, AliExpress, CJ Dropshipping, etc.)",
                "Product research tool (Google Trends, TikTok, etc.)"
            ],
            "steps": [
                "🔎 **Understanding Dropshipping** – Dropshipping is a retail model where you sell products without keeping inventory, and the supplier ships the items directly to the customer.",
                "1️⃣ **Find a Winning Product** – Use Google Trends, TikTok trends, or product research tools to find high-demand items.",
                "2️⃣ **Choose a Supplier** – Select a reliable supplier from platforms like Walmart, CJ Dropshipping, or AliExpress.",
                "3️⃣ **Set Up Your Store** – Use Shopify, eBay, or TikTok Shop to create a storefront for your products.",
                "4️⃣ **List Products at a Markup** – Download product images and descriptions, then list them at a 10-20% markup.",
                "5️⃣ **Advertise Your Store** – Promote your products through TikTok videos, Facebook ads, or influencer marketing.",
                "6️⃣ **Process Orders and Scale** – When a customer buys, order from your supplier with the buyer’s shipping details and reinvest profits into ads to scale."
            ],
            "tips": [
                "💡 **Sell Trending Products** – Focus on items that solve problems or have viral potential.",
                "🚚 **Check Shipping Times** – Choose suppliers with fast shipping to improve customer satisfaction.",
                "📊 **Track Profit Margins** – Ensure your selling price covers product cost, ad spend, and platform fees."
            ]
        },
          {
            "title": "Freelancing: Get Paid for Your Skills",
            "description": "Start freelancing on platforms like Upwork, Fiverr, or Freelancer to earn money remotely.",
            "category": "finance",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "Freelance platform account (Upwork, Fiverr, Freelancer)",
                "Marketable skills (graphic design, writing, programming, etc.)",
                "Portfolio or sample work"
            ],
            "steps": [
                "🔎 **Understanding Freelancing** – Freelancers provide services remotely and get paid per project or hourly.",
                "1️⃣ **Identify Your Skills** – Choose a service you can offer, such as graphic design, copywriting, web development, or virtual assistance.",
                "2️⃣ **Create a Portfolio** – Showcase previous work samples to attract clients.",
                "3️⃣ **Sign Up on a Freelance Platform** – Register on Upwork, Fiverr, or Freelancer to find work.",
                "4️⃣ **Optimize Your Profile** – Write a compelling bio, add a professional profile picture, and set competitive pricing.",
                "5️⃣ **Start Bidding on Jobs** – Apply for projects that match your skills and gradually build up reviews.",
                "6️⃣ **Scale Your Income** – Once you have positive reviews, increase your rates and attract higher-paying clients."
            ],
            "tips": [
                "📝 **Specialize in a Niche** – Narrow down your services to stand out (e.g., “Shopify store setup” instead of just “web design”).",
                "📢 **Market Yourself** – Share your work on LinkedIn, Reddit, or Twitter to attract more clients.",
                "💰 **Negotiate Smartly** – Don’t undersell your skills; research market rates before setting prices."
            ]
        },
          {
            "title": "Flipping & Reselling: Profiting from Used Goods",
            "description": "Learn how to buy and sell used items for profit using platforms like Craigslist, Facebook Marketplace, and OfferUp.",
            "category": "finance",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "A smartphone with a camera",
                "Access to Facebook Marketplace, Craigslist, OfferUp, or eBay",
                "Basic knowledge of product pricing"
            ],
            "steps": [
                "🔎 **Understanding Flipping** – Flipping involves buying undervalued items and reselling them for profit.",
                "1️⃣ **Find Undervalued Items** – Look for free or cheap items on Craigslist, Facebook Marketplace, and thrift stores.",
                "2️⃣ **Research Market Value** – Check eBay ‘sold listings’ or search for similar items online to determine resale price.",
                "3️⃣ **Clean & Fix Items** – Improve the value of items with minor repairs, cleaning, or better photos.",
                "4️⃣ **List the Item for Sale** – Take clear pictures, write a compelling description, and price competitively.",
                "5️⃣ **Negotiate & Sell** – Be prepared to negotiate with buyers and accept payments securely.",
                "6️⃣ **Scale Your Reselling Business** – Use profits to buy higher-value items and reinvest into more inventory."
            ],
            "tips": [
                "📦 **Start with Small Items** – Electronics, furniture, and power tools flip quickly.",
                "📸 **Take Good Photos** – High-quality pictures increase selling price and buyer trust.",
                "🚚 **Offer Local Pickup** – This reduces shipping costs and makes selling easier."
            ]
        },
          {
            "title": "Wholesaling Real Estate: Contract Flipping",
            "description": "Learn how to wholesale real estate by securing contracts and selling them to investors without buying property.",
            "category": "finance",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "Access to online property listings (Zillow, Redfin, Craigslist)",
                "Basic contract knowledge (purchase agreements, assignment contracts)",
                "Real estate investor network"
            ],
            "steps": [
                "🔎 **Understanding Wholesaling** – Wholesaling is finding a distressed property, securing it under contract, and assigning that contract to a buyer for a fee.",
                "1️⃣ **Find Distressed Properties** – Look for motivated sellers, foreclosure properties, or abandoned homes.",
                "2️⃣ **Make an Offer** – Negotiate with the seller to secure the property at a below-market price.",
                "3️⃣ **Secure the Contract** – Sign a purchase agreement with the seller, ensuring you have an assignment clause.",
                "4️⃣ **Find a Cash Buyer** – Market the contract to real estate investors and landlords who want to buy below market value.",
                "5️⃣ **Assign the Contract** – Sell your contract to the investor for an assignment fee (typically $5,000-$20,000).",
                "6️⃣ **Close the Deal & Get Paid** – The investor buys the property, and you collect your assignment fee."
            ],
            "tips": [
                "🏠 **Network with Investors** – The more buyers you have, the faster you can sell contracts.",
                "📜 **Use Legal Contracts** – Ensure all agreements are legally binding and allow assignment.",
                "💰 **Negotiate Smartly** – The lower you get the property under contract, the higher your assignment fee."
            ]
        },
          {
            "title": "Affiliate Marketing: Passive Income from Commissions",
            "description": "Learn how to earn commissions by promoting products from Amazon, ClickBank, or other affiliate networks.",
            "category": "finance",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "An affiliate account (Amazon Associates, ClickBank, ShareASale, etc.)",
                "A blog, YouTube channel, or social media account",
                "Knowledge of product niches"
            ],
            "steps": [
                "🔎 **Understanding Affiliate Marketing** – Affiliate marketing is promoting other people’s products and earning a commission per sale.",
                "1️⃣ **Sign Up for an Affiliate Program** – Join Amazon Associates, ClickBank, or ShareASale.",
                "2️⃣ **Choose a Niche** – Pick a category (fitness, tech, survival gear) that aligns with your content.",
                "3️⃣ **Create Content Around the Product** – Write reviews, tutorials, or make videos showcasing the product.",
                "4️⃣ **Insert Your Affiliate Links** – Place unique tracking links in your content.",
                "5️⃣ **Drive Traffic to Your Content** – Use SEO, social media, or ads to increase clicks on your links.",
                "6️⃣ **Earn Commissions** – Get paid every time someone purchases through your link."
            ],
            "tips": [
                "💡 **Choose High-Paying Programs** – Some programs pay 30-50% commission per sale.",
                "📊 **Use SEO for Traffic** – Rank your blog or videos on Google for free traffic.",
                "📈 **Build an Email List** – Capture leads and send them affiliate offers over time."
            ]
          },
          {
            "title": "Passive Income: Make Money While You Sleep",
            "description": "Learn how to create passive income through digital products, YouTube, or rental properties.",
            "category": "finance",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "A monetizable platform (YouTube, blog, online store)",
                "Digital product ideas (eBooks, courses, printables)",
                "An audience or marketing strategy"
            ],
            "steps": [
                "🔎 **Understanding Passive Income** – Passive income is money earned with minimal ongoing effort.",
                "1️⃣ **Choose a Passive Income Stream** – Options include YouTube monetization, online courses, eBooks, or real estate.",
                "2️⃣ **Create a Digital Product** – Write an eBook, design a printable, or develop a course.",
                "3️⃣ **List the Product for Sale** – Sell on Gumroad, Teachable, or Amazon Kindle.",
                "4️⃣ **Automate Your Sales** – Use paid ads, SEO, or email marketing to generate ongoing sales.",
                "5️⃣ **Expand and Scale** – Launch more products or grow your audience for higher earnings."
            ],
            "tips": [
                "📚 **Start with Low-Cost Digital Products** – eBooks and printables are cheap to create.",
                "📹 **Monetize YouTube Content** – Earn ad revenue, sponsorships, and affiliate commissions.",
                "🏠 **Invest in Rental Properties** – Real estate provides steady passive income over time."
            ]
        },
          {
            "title": "Budgeting & Money Management: Take Control of Your Finances",
            "description": "Learn how to create a budget, manage spending, and grow savings using apps like Mint or EveryDollar.",
            "category": "finance",
            "completed": false,
            "expanded": false,
              "level": "Unprepared 🚨",
            "materials": [
                "Budgeting app (Mint, EveryDollar, YNAB)",
                "A list of monthly income and expenses",
                "Financial goals (saving, investing, debt repayment)"
            ],
            "steps": [
                "🔎 **Understanding Budgeting** – Budgeting is planning how you allocate money to cover expenses, save, and invest.",
                "1️⃣ **Track Your Income & Expenses** – List all sources of income and monthly expenses.",
                "2️⃣ **Categorize Your Spending** – Divide expenses into necessities (rent, food) and discretionary (entertainment, shopping).",
                "3️⃣ **Set Financial Goals** – Plan to save, pay off debt, or invest a portion of income.",
                "4️⃣ **Use a Budgeting App** – Track spending automatically using Mint, EveryDollar, or YNAB.",
                "5️⃣ **Adjust and Improve Over Time** – Review spending habits monthly and make adjustments to improve financial health."
            ],
            "tips": [
                "💰 **Follow the 50/30/20 Rule** – 50% needs, 30% wants, 20% savings/investing.",
                "📉 **Cut Unnecessary Expenses** – Identify subscriptions or habits that drain money.",
                "📈 **Automate Savings** – Set up automatic transfers to a savings or investment account."
            ]
        },
        
          // ⚠️ Hardcore Survival Challenges
          {
              "title": "Primitive Survival: Living Off the Land",
              "description": "Survive 10 days using only self-made primitive tools and natural resources.",
              "category": "hardcore",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Natural materials (wood, stone, plant fibers)",
                  "Flint or chert for tool-making",
                  "Cordage (natural or handmade)",
                  "Basic knowledge of primitive shelter and fire-starting"
              ],
              "steps": [
                  "🔎 **Understanding Primitive Survival** – This challenge tests your ability to live with **no modern tools** and only what you can craft.",
                  "1️⃣ **Choose a Suitable Location** – Find an area with **water, shelter-building materials, and food sources**.",
                  "2️⃣ **Build a Shelter First** – Use **debris huts, lean-tos, or natural caves** to protect yourself from the elements.",
                  "3️⃣ **Start a Fire with Primitive Methods** – Use a **bow drill, fire plough, or hand drill** to create an ember.",
                  "4️⃣ **Find & Purify Water** – Collect water from natural sources and **boil or filter it** using natural materials.",
                  "5️⃣ **Make Primitive Tools** – Knapp a **stone knife**, carve a **digging stick**, and weave **cordage** for traps.",
                  "6️⃣ **Hunt, Trap & Forage for Food** – Set up **deadfall traps**, make **fishing spears**, and **identify edible plants**.",
                  "7️⃣ **Adapt & Improve Daily** – Strengthen your shelter, refine your tools, and secure long-term food sources."
              ],
              "tips": [
                  "🪨 **Use Sharp Rocks** – Flint, chert, or obsidian can be knapped into knives and scrapers.",
                  "🔥 **Always Have Fire Ready** – Keeping an ember alive makes fire-starting much easier.",
                  "🥩 **Prioritize Protein** – Small game and insects are crucial for survival energy.",
                  "🚰 **Stay Hydrated** – Dehydration is the number one killer in primitive survival."
              ]
          },
          {
              "title": "Fire in the Rain: Wet Weather Fire Starting",
              "description": "Start a fire in stormy, wet conditions using only natural materials.",
              "category": "hardcore",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Ferro rod or flint and steel",
                  "Waterproof tinder (birch bark, fatwood, or char cloth)",
                  "Dry kindling stored in a waterproof container"
              ],
              "steps": [
                  "🔎 **Why is Fire Hard in the Rain?** – Wet wood and rain make it nearly impossible to start a fire without proper preparation.",
                  "1️⃣ **Find or Make Dry Tinder** – Look for **dead standing wood**, peel away wet bark, or make **feather sticks**.",
                  "2️⃣ **Use a Waterproof Fire Starter** – Fatwood, birch bark, and char cloth ignite even when damp.",
                  "3️⃣ **Build a Fire Base** – Use large logs or rocks to create a **dry platform** for your fire.",
                  "4️⃣ **Use a Ferro Rod or Flint & Steel** – Striking sparks onto **fine, dry tinder** will ignite a fire even in rain.",
                  "5️⃣ **Protect the Fire from Wind & Rain** – Use **a lean-to structure, body cover, or a tarp** to shield the flames.",
                  "6️⃣ **Gradually Dry Out Larger Wood** – Start with **small twigs** and slowly add damp wood as it dries out."
              ],
              "tips": [
                  "🪵 **Split Wood to Find Dryness** – The inside of logs stays dry even in the rain.",
                  "🔥 **Use a Fire Reflector** – Rocks or a heat wall help keep flames strong and dry surrounding fuel.",
                  "💨 **Create an Airflow Pocket** – Raising the fire slightly off the wet ground keeps oxygen flowing."
              ]
          },
          {
              "title": "Night Navigation: Finding Your Way in the Dark",
              "description": "Navigate at night using only natural signs, stars, and terrain.",
              "category": "hardcore",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "No artificial light (challenge is done in total darkness)",
                  "Knowledge of stars (North Star, Orion’s Belt, etc.)",
                  "Awareness of terrain features"
              ],
              "steps": [
                  "🔎 **Why Night Navigation?** – In survival, moving at night can help you avoid predators and conserve energy.",
                  "1️⃣ **Find the North Star** – Locate **Polaris** in the night sky to determine **true north**.",
                  "2️⃣ **Use the Moon’s Shadow** – A **full moon rises in the east and sets in the west**, helping with orientation.",
                  "3️⃣ **Follow Natural Terrain** – Rivers **flow downhill**, moss **grows on the shaded side of trees**, and mountain ridges lead to valleys.",
                  "4️⃣ **Mark Your Path** – Leave **stick markers, rock piles, or scratches** on trees to track your movement.",
                  "5️⃣ **Stay Quiet & Alert** – Move slowly, avoid making noise, and **listen for natural sounds** like water or wind patterns.",
                  "6️⃣ **Only Move if Necessary** – If lost, staying put is often safer than walking aimlessly in darkness."
              ],
              "tips": [
                  "🌌 **Memorize Star Patterns** – Orion’s Belt and the Big Dipper help confirm directions.",
                  "🌑 **Avoid Using Flashlights** – Light can ruin night vision and alert animals or people.",
                  "🎯 **Practice Before You Need It** – Try night navigation in familiar areas first."
              ]
          },
          {
              "title": "Extreme Cold Survival: Staying Alive in Freezing Conditions",
              "description": "Survive 24+ hours in below-freezing temperatures with limited resources.",
              "category": "hardcore",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Multiple layers of clothing (preferably wool)",
                  "Emergency fire-starting kit",
                  "Shelter-building materials (snow, branches, tarp)"
              ],
              "steps": [
                  "🔎 **Cold Kills Fast** – **Frostbite and hypothermia** set in within minutes in extreme cold if you are unprepared.",
                  "1️⃣ **Layer Your Clothing Correctly** – Use **wool or synthetic layers**, avoiding cotton (which absorbs moisture).",
                  "2️⃣ **Build a Shelter Immediately** – Snow caves, **lean-tos**, or **windbreaks** prevent deadly heat loss.",
                  "3️⃣ **Keep Extremities Covered** – Use **gloves, hats, and thick socks** to prevent frostbite on fingers and toes.",
                  "4️⃣ **Start a Fire ASAP** – Use **fatwood, birch bark, or a fire reflector** to maintain warmth.",
                  "5️⃣ **Stay Dry at All Costs** – Wet clothes lose **95% of insulation ability**. **Remove damp clothing immediately.**",
                  "6️⃣ **Conserve Energy** – Move **slowly and efficiently** to avoid sweating, which cools the body dangerously fast."
              ],
              "tips": [
                  "🔥 **Use Rocks to Store Heat** – Heat **stones in a fire** and place them inside your shelter.",
                  "🥶 **Keep Moving if Stuck Without Shelter** – Sitting still will cause you to freeze faster.",
                  "🍵 **Drink Warm Liquids** – Hot water or soup helps keep your core temperature stable."
              ]
          },
          {
              "title": "Urban Post-Collapse Survival: Staying Alive in a City Gone Dark",
              "description": "Survive in a city where basic infrastructure has collapsed.",
              "category": "hardcore",
              "completed": false,
              "expanded": false,
              "level": "Unprepared 🚨",
              "materials": [
                  "Scavenged survival supplies",
                  "Bartering items (food, fuel, medical gear)",
                  "Self-defense tools"
              ],
              "steps": [
                  "🔎 **Why Urban Survival?** – Cities have resources, but they’re also **dangerous** post-collapse due to looters and lack of clean water.",
                  "1️⃣ **Find a Safe Shelter** – Avoid **obvious places (grocery stores, hospitals, police stations)** as they attract desperate crowds.",
                  "2️⃣ **Secure a Water Source** – Rain collection, rooftop condensation, and underground pipes may provide water.",
                  "3️⃣ **Stay Low-Key** – Do **not** draw attention with **flashlights, noise, or fires** at night.",
                  "4️⃣ **Gather Barter Items** – People will trade for **water filters, medicine, alcohol, and batteries.**",
                  "5️⃣ **Avoid Open Conflict** – If confronted, **negotiate or escape** instead of fighting.",
                  "6️⃣ **Travel Only When Necessary** – Moving during the **early morning or night** reduces encounters with hostile people."
              ],
              "tips": [
                  "⚠️ **Blend In** – Avoid looking **too clean, too rich, or too prepared**.",
                  "💰 **Use Skills, Not Just Goods** – Knowing how to **purify water or repair things** is more valuable than just hoarding supplies.",
                  "🏃 **Have Multiple Escape Routes** – Cities can be **traps**. Always have a **backup plan**."
              ]
          }
      ]),

      // 📌 Convert Markdown to HTML
      markdownToHTML(text) {
          return marked.parse(text); // Converts Markdown to HTML
      },

      // 📊 Individual Readiness Meters (Per Guide Category)
      getCategoryPercentage(categoryName) {
          let categoryGuides = this.guides.filter(guide => guide.category === categoryName);
          let completedCount = categoryGuides.filter(guide => guide.completed).length;
          return categoryGuides.length > 0 ? Math.round((completedCount / categoryGuides.length) * 100) : 0;
      },
  
      getCategoryReadinessLevel(categoryName) {
          const percentage = this.getCategoryPercentage(categoryName);
          if (percentage === 100) return "Mastery 🏆";
          if (percentage >= 80) return "Highly Skilled ⚡";
          if (percentage >= 60) return "Competent 🔥";
          if (percentage >= 40) return "Beginner 🌱";
          return "Unprepared 🚨";
      },
  
      // 🌎 Global Readiness Meter (Based on ALL Categories)
      get globalReadinessPercentage() {
          let totalPercentage = this.categories
              .filter(c => c.key !== 'all')
              .reduce((sum, category) => sum + this.getCategoryPercentage(category.key), 0);
          return Math.round(totalPercentage / (this.categories.length - 1));
      },
  
      get globalReadinessLevel() {
        const percentage = this.globalReadinessPercentage;
        
        if (percentage === 100) return "Ultimate Survivalist 🦾";
        if (percentage >= 95) return "Legendary Survivalist 🌍";
        if (percentage >= 80) return "Elite Prepper ⚔️";
        if (percentage >= 60) return "Survivalist 🔥";
        if (percentage >= 40) return "Basic Preparedness 🏕";
        if (percentage >= 20) return "Survival Novice 🌱";
        return "Totally Unprepared 🆘";
    },
  
      // 🏷️ Filtered Guides
      get filteredGuides() {
          return this.guides.filter(guide =>
              (this.activeCategory === 'all' || guide.category === this.activeCategory) &&
              (guide.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
               guide.description.toLowerCase().includes(this.searchQuery.toLowerCase()))
          );
      },
  
      get totalGuides() {
          return this.guides.length;
      },
  
      get completedGuides() {
          return this.guides.filter(guide => guide.completed).length;
      },
  
      get libraryProgress() {
          return Math.round((this.completedGuides / this.totalGuides) * 100) || 0;
      },
  
      toggleGuide(guide) {
          guide.expanded = !guide.expanded;
      },
  
      toggleGuideCompletion(guide) {
          guide.completed = !guide.completed;
          saveStateToLocalStorage("guides", this.guides);
          this.updateProgress();
      },
  
      updateProgress() {
          this.libraryProgress;
      }
  }));
});
