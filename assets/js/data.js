/* ==========================================================================
   SITE CONTENT — single source of truth
   --------------------------------------------------------------------------
   HOW TO ADD A PROJECT
   1. Copy any object in the `projects` array below and paste it at the end.
   2. Give it a unique `slug` (used in the URL: project.html?p=your-slug).
   3. `featured: true` gives it the large treatment on the home page.
      Only one project should be featured.
   4. Set `order` to control where it appears (lower number = earlier).

   HOW TO ADD AUDIO
   1. Drop the file into assets/audio/<project-slug>/ ...
   2. Add an entry to one of the `groups` inside `audio`.
      `title`   — what the listener reads
      `file`    — path relative to the site root
      `desc`    — optional one-line note
      `tags`    — optional list of small labels
   3. Optional: add variants to a group to get an A/B comparison player.

   Empty `audio.groups` renders a graceful "samples coming soon" state —
   the page never breaks.
   ========================================================================== */

const SITE = {
  meta: {
    siteName: "Seif Eldin — Game Audio & Sound Design",
    shortName: "Seif Eldin",
    // Change this to the final GitHub Pages / custom domain URL (no trailing slash).
    baseUrl: "",
    description:
      "Game Audio Designer and Sound Designer creating immersive sound for interactive worlds. Full audio direction, sound effects, voice and music for the VR adventure Horizon of Aten.",
  },

  profile: {
    name: "Seif Eldin Mohamed AbdelAziz",
    title: "Game Audio Designer & Sound Designer",
    secondary: "Game Developer",
    location: "Cairo, Egypt",
    email: "seifshanabo@gmail.com",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/seif-eldin-shanab", kind: "Profile" },
      { label: "GitHub", href: "https://github.com/seiflemonz", kind: "Code" },
      { label: "itch.io", href: "https://itch.io/profile/seiflemonz", kind: "Games" },
    ],
    intro:
      "I create immersive audio experiences for interactive worlds. Combining sound design with a background in game development, I bring sound, atmosphere and interaction together.",
    heroStatement:
      "Every sound in my most recent project was made by me — the ambience, the effects, the voice work and the music.",
  },

  /* Capabilities — kept deliberately short and non-technical in tone. */
  capabilities: [
    {
      title: "Sound Design",
      body: "Foley, impact, ambience and mechanical design built from recorded and synthesised sources. Shaped for the way a player reads distance, weight and danger.",
    },
    {
      title: "Game Audio Implementation",
      body: "Sound integrated into the systems that trigger it: audio pools, categorisation, mix groups and event-driven playback inside Unity and Unreal.",
    },
    {
      title: "Voice Direction & Casting",
      body: "Writing and directing performer lines, recording, comping and processing character voice from clean takes into in-world character.",
    },
    {
      title: "Music & Atmosphere",
      body: "Original cues and drones composed to sit under gameplay rather than over it, with the interactive state the player is in.",
    },
  ],

  projects: [
    /* ---------------------------------------------------------------------
       FEATURED — Horizons of Aten
       ------------------------------------------------------------------ */
    {
      slug: "horizon-of-aten",
      order: 1,
      featured: true,
      title: "Horizons of Aten",
      subtitle: "Ancient Egypt VR Adventure",
      tagline: "First-person VR puzzle & exploration set inside a lost Egyptian temple.",
      category: "VR Adventure",
      year: "2026",
      role: "Sound Designer & Game Audio Designer",
      credit: "All audio in the game is mine",
      tools: [
        "FL Studio",
        "REAPER",
        "AmpliTube",
        "Focusrite Scarlett Solo",
        "Electric guitar",
        "Instrumental microphone",
        "Unreal Engine",
      ],
      shortDescription:
        "A first-person PC VR puzzle and exploration game that takes the player through an abandoned ancient Egyptian city towards the heart of a mythical temple. I created every sound heard in the game.",
      overview: [
        "Horizons of Aten is a first-person PC VR puzzle and exploration experience set inside a forgotten ancient Egyptian city. The player moves from the ruins and the surrounding village into the interior of a temple, solving environmental puzzles, avoiding traps and uncovering what has been hidden there.",
        "I was responsible for the complete audio of the project. Every sound in the finished game is my work: the sound effects, the full audio pool and its categorisation, the voice acting across the cast, and the music. That meant designing for a medium where the player is physically inside the space — where a sound's direction, distance and reverb are not decoration but the main way the world communicates.",
        "Built alongside a mixed art and development team in collaboration with CUBE Consultants, the project was a deliberate exercise in joining game design, environment art, VR interaction, puzzle design and storytelling into a single immersive experience.",
      ],
      contributions: [
        "<strong>Complete sound design</strong> — every sound effect in the game, from footsteps and impacts to the mechanical and magical interactions that drive the puzzles.",
        "<strong>Audio pool & categorisation</strong> — the structure that organises, names and routes sounds so they can be triggered reliably from game events.",
        "<strong>Voice acting</strong> — performing and recording the character lines across the temple announcer, the village cast, the workers and the player character.",
        "<strong>Voice processing</strong> — treating raw takes into in-world character: reverb and echo for the temple space, and a ghostly treatment for the disembodied announcer.",
        "<strong>Music</strong> — original cues and atmosphere written for the temple and village sections of the game.",
        "<strong>Interactive integration</strong> — triggering audio from the gameplay systems so it responds to what the player actually does.",
      ],
      audioNote:
        "The material below is the actual source audio recorded and produced for the game. Where a single performance exists in several treatments, the A/B player lets you hear the processing side by side.",
      audio: {
        groups: [
          {
            key: "announcer",
            title: "Temple Announcer",
            note: "The voice that speaks to the player through the temple, in Egyptian Arabic and in English, with the processed variants used in-game.",
            tracks: [
              {
                title: "Announcer — Egyptian Arabic",
                file: "assets/audio/horizon-of-aten/vo/announcer/announcer-egyptian.mp3",
                desc: "Raw recorded performance, before processing.",
                tags: ["Voice", "Egyptian Arabic"],
                ab: {
                  label: "Processing",
                  variants: [
                    { name: "Dry", file: "assets/audio/horizon-of-aten/vo/announcer/announcer-egyptian.mp3" },
                    { name: "Reverb & Echo", file: "assets/audio/horizon-of-aten/vo/announcer/announcer-egyptian-reverb-echo.mp3" },
                  ],
                },
              },
              {
                title: "Announcer — English",
                file: "assets/audio/horizon-of-aten/vo/announcer/announcer-english.mp3",
                desc: "Raw recorded performance, before processing.",
                tags: ["Voice", "English"],
                ab: {
                  label: "Processing",
                  variants: [
                    { name: "Dry", file: "assets/audio/horizon-of-aten/vo/announcer/announcer-english.mp3" },
                    { name: "Reverb & Echo", file: "assets/audio/horizon-of-aten/vo/announcer/announcer-english-reverb-echo.mp3" },
                    { name: "Ghostly", file: "assets/audio/horizon-of-aten/vo/announcer/announcer-english-ghostly.mp3" },
                  ],
                },
              },
              {
                title: "Announcer — English, ghostly mix",
                file: "assets/audio/horizon-of-aten/vo/announcer/announcer-english-ghostly.mp3",
                desc: "The same performance pitched and smeared into something no longer human.",
                tags: ["Voice", "Processed"],
              },
              {
                title: "Man reacting to the announcement",
                file: "assets/audio/horizon-of-aten/vo/announcer/npc-reacts-announcement.mp3",
                desc: "An in-world character responding to what the temple announces.",
                tags: ["Voice", "Character"],
              },
              {
                title: "Player — announcement begins",
                file: "assets/audio/horizon-of-aten/vo/announcer/player-announce-start.mp3",
                tags: ["Voice", "Player"],
              },
              {
                title: "Player — translation available",
                file: "assets/audio/horizon-of-aten/vo/announcer/player-can-translate.mp3",
                tags: ["Voice", "Player"],
              },
              {
                title: "Player — translates during cutscene",
                file: "assets/audio/horizon-of-aten/vo/announcer/player-translates-cutscene.mp3",
                tags: ["Voice", "Player"],
              },
            ],
          },
          {
            key: "village",
            title: "Village Cast",
            note: "Four characters living in the ruins around the temple. All lines written, performed and recorded for the game.",
            tracks: [
              { title: "Friend — line 01", file: "assets/audio/horizon-of-aten/vo/village/friend-01.mp3", tags: ["Friend"] },
              { title: "Friend — line 02", file: "assets/audio/horizon-of-aten/vo/village/friend-02.mp3", tags: ["Friend"] },
              { title: "Friend — line 03", file: "assets/audio/horizon-of-aten/vo/village/friend-03.mp3", tags: ["Friend"] },
              { title: "Friend — line 04", file: "assets/audio/horizon-of-aten/vo/village/friend-04.mp3", tags: ["Friend"] },
              { title: "Friend — line 05", file: "assets/audio/horizon-of-aten/vo/village/friend-05.mp3", tags: ["Friend"] },
              { title: "High Priest — line 01", file: "assets/audio/horizon-of-aten/vo/village/high-priest-01.mp3", tags: ["High Priest"] },
              { title: "High Priest — line 02", file: "assets/audio/horizon-of-aten/vo/village/high-priest-02.mp3", tags: ["High Priest"] },
              { title: "High Priest — line 03", file: "assets/audio/horizon-of-aten/vo/village/high-priest-03.mp3", tags: ["High Priest"] },
              { title: "Homeless — line 01", file: "assets/audio/horizon-of-aten/vo/village/homeless-01.mp3", tags: ["Homeless"] },
              { title: "Homeless — line 02", file: "assets/audio/horizon-of-aten/vo/village/homeless-02.mp3", tags: ["Homeless"] },
              { title: "Homeless — line 03", file: "assets/audio/horizon-of-aten/vo/village/homeless-03.mp3", tags: ["Homeless"] },
              { title: "Homeless — line 04", file: "assets/audio/horizon-of-aten/vo/village/homeless-04.mp3", tags: ["Homeless"] },
              { title: "Homeless — line 05", file: "assets/audio/horizon-of-aten/vo/village/homeless-05.mp3", tags: ["Homeless"] },
              { title: "Homeless — line 06", file: "assets/audio/horizon-of-aten/vo/village/homeless-06.mp3", tags: ["Homeless"] },
              { title: "Mother — line 01", file: "assets/audio/horizon-of-aten/vo/village/mother-01.mp3", tags: ["Mother"] },
              { title: "Mother — line 02", file: "assets/audio/horizon-of-aten/vo/village/mother-02.mp3", tags: ["Mother"] },
              { title: "Mother — line 03", file: "assets/audio/horizon-of-aten/vo/village/mother-03.mp3", tags: ["Mother"] },
            ],
          },
          {
            key: "workers",
            title: "Temple Workers",
            note: "Two workers encountered in the excavation area outside the temple.",
            tracks: [
              { title: "Worker 1 — line 01", file: "assets/audio/horizon-of-aten/vo/workers/worker-1-line-01.mp3", tags: ["Worker 1"] },
              { title: "Worker 1 — line 02", file: "assets/audio/horizon-of-aten/vo/workers/worker-1-line-02.mp3", tags: ["Worker 1"] },
              { title: "Worker 2 — line 01", file: "assets/audio/horizon-of-aten/vo/workers/worker-2-line-01.mp3", tags: ["Worker 2"] },
              { title: "Worker 2 — line 02", file: "assets/audio/horizon-of-aten/vo/workers/worker-2-line-02.mp3", tags: ["Worker 2"] },
            ],
          },
          {
            key: "player-exterior",
            title: "Player Voice — Exterior",
            note: "The player character's spoken reactions across the outdoor journey, from first sight of the island through to the tunnel.",
            tracks: [
              { title: "Exterior start", file: "assets/audio/horizon-of-aten/vo/player-exterior/01-exterior-start.mp3" },
              { title: "Sees the island", file: "assets/audio/horizon-of-aten/vo/player-exterior/02-seen-island.mp3" },
              { title: "Sees the boat", file: "assets/audio/horizon-of-aten/vo/player-exterior/03-seen-boat.mp3" },
              { title: "Where are the citizens", file: "assets/audio/horizon-of-aten/vo/player-exterior/04-where-citizens.mp3" },
              { title: "After cutscene 1", file: "assets/audio/horizon-of-aten/vo/player-exterior/05-after-cutscene1.mp3" },
              { title: "After cutscene 2", file: "assets/audio/horizon-of-aten/vo/player-exterior/06-after-cutscene2.mp3" },
              { title: "Rope", file: "assets/audio/horizon-of-aten/vo/player-exterior/07-rope.mp3" },
              { title: "Door locked", file: "assets/audio/horizon-of-aten/vo/player-exterior/08-door-locked.mp3" },
              { title: "Lever", file: "assets/audio/horizon-of-aten/vo/player-exterior/09-lever.mp3" },
              { title: "After cutscene 3", file: "assets/audio/horizon-of-aten/vo/player-exterior/10-after-cutscene3.mp3" },
              { title: "Paddle found", file: "assets/audio/horizon-of-aten/vo/player-exterior/11-paddle-found.mp3" },
              { title: "Tunnel locked", file: "assets/audio/horizon-of-aten/vo/player-exterior/12-tunnel-locked.mp3" },
              { title: "Pillar hint", file: "assets/audio/horizon-of-aten/vo/player-exterior/13-pillar-hint.mp3" },
              { title: "Island solved", file: "assets/audio/horizon-of-aten/vo/player-exterior/14-island-solved.mp3" },
            ],
          },
          {
            key: "player-interior",
            title: "Player Voice — Temple Interior",
            note: "The player's reactions inside the temple, mapped to the puzzle sequence they accompany.",
            tracks: [
              { title: "Interior start", file: "assets/audio/horizon-of-aten/vo/player-interior/01-interior-start.mp3" },
              { title: "Torch lit", file: "assets/audio/horizon-of-aten/vo/player-interior/02-torch-lit.mp3" },
              { title: "Pressure plate", file: "assets/audio/horizon-of-aten/vo/player-interior/03-pressure-plate.mp3" },
              { title: "Bats", file: "assets/audio/horizon-of-aten/vo/player-interior/04-bats.mp3" },
              { title: "Bow and arrow", file: "assets/audio/horizon-of-aten/vo/player-interior/05-bow-and-arrow.mp3" },
              { title: "Climbing room", file: "assets/audio/horizon-of-aten/vo/player-interior/06-climbing-room.mp3" },
              { title: "Climbing", file: "assets/audio/horizon-of-aten/vo/player-interior/07-climbing.mp3" },
              { title: "Telekinesis hint", file: "assets/audio/horizon-of-aten/vo/player-interior/08-telekenisis-hint.mp3" },
              { title: "Translation hint", file: "assets/audio/horizon-of-aten/vo/player-interior/09-translate-hint.mp3" },
              { title: "Elevator puzzle", file: "assets/audio/horizon-of-aten/vo/player-interior/10-elevator-puzzle.mp3" },
              { title: "Elevator puzzle complete", file: "assets/audio/horizon-of-aten/vo/player-interior/11-elevator-puzzle-complete.mp3" },
              { title: "Fall", file: "assets/audio/horizon-of-aten/vo/player-interior/12-fall.mp3" },
              { title: "Hidden chamber", file: "assets/audio/horizon-of-aten/vo/player-interior/13-hidden-chamber.mp3" },
              { title: "Artifact", file: "assets/audio/horizon-of-aten/vo/player-interior/14-artifact.mp3" },
              { title: "Interior end", file: "assets/audio/horizon-of-aten/vo/player-interior/15-interior-end.mp3" },
            ],
          },
          {
            key: "sfx",
            title: "Interior Sound Effects",
            note: "Sound effects recorded and produced for the temple interior. EACH TITLE BELOW IS A WORKING PLACEHOLDER — tell me the real in-game name for each clip and I will rename them here.",
            tracks: [
              { title: "Interior SFX 01", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-01.mp3" },
              { title: "Interior SFX 02", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-02.mp3" },
              { title: "Interior SFX 03", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-03.mp3" },
              { title: "Interior SFX 04", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-04.mp3" },
              { title: "Interior SFX 05", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-05.mp3" },
              { title: "Interior SFX 06", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-06.mp3" },
              { title: "Interior SFX 07", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-07.mp3" },
              { title: "Interior SFX 08", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-08.mp3" },
              { title: "Interior SFX 09", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-09.mp3" },
              { title: "Interior SFX 10", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-10.mp3" },
              { title: "Interior SFX 11", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-11.mp3" },
              { title: "Interior SFX 12", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-12.mp3" },
              { title: "Interior SFX 13", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-13.mp3" },
              { title: "Interior SFX 14", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-14.mp3" },
              { title: "Interior SFX 15", file: "assets/audio/horizon-of-aten/sfx/interior-sfx-15.mp3" },
            ],
          },
        ],
      },
      cover: "",
      hero: "",
      video: null,
      gallery: [],
      links: [
        { label: "Game repository", href: "https://gitlab.com/ancient_egypt-group/ancient_egypt_demo", kind: "GitLab", note: "Private group repository" },
      ],
      credits: [
        { role: "Sound design, voice & music — all audio", names: ["Seif Eldin Mohamed"] },
        { role: "Development team", names: ["Mohab Atef", "Seif Eldin Mohamed", "Zeyad Habash", "Rober Nagy"] },
        { role: "Art team", names: ["Youssef Salah", "Efad ElBorollosy", "Abdelrahman Reda", "Alyaa Abdelhamed"] },
      ],
      facts: [
        { k: "Project", v: "Ancient Egypt VR Adventure" },
        { k: "Platform", v: "PC VR" },
        { k: "Genre", v: "Puzzle & Exploration" },
        { k: "Collaboration", v: "CUBE Consultants" },
      ],
    },

    /* ---------------------------------------------------------------------
       From the River to the Sea
       ------------------------------------------------------------------ */
    {
      slug: "from-the-river-to-the-sea",
      order: 2,
      featured: false,
      title: "From the River to the Sea",
      subtitle: "Egypt Game Jam 2026",
      tagline: "A 3D narrative walking simulator about identity, memory and loss.",
      category: "Narrative",
      year: "2026",
      role: "Game Developer & Sound Designer",
      credit: "All audio is mine",
      tools: ["Unity", "C#"],
      shortDescription:
        "A story-rich 3D walking simulator built in Unity for Egypt Game Jam 2026, exploring identity, media perception and lived experience in conflict.",
      overview: [
        "From the River to the Sea is a 3D narrative walking simulator built over the course of a game jam. It moves the player from the position of distant observer into participant, walking through a ruined city guided by a child character, K, who shares memories of loss and home.",
        "I co-developed the project and created its audio.",
      ],
      contributions: [
        "<strong>Narrative progression</strong> — building the transition from observer to participant as the core structural mechanic.",
        "<strong>Environmental storytelling</strong> — guiding the player's reading of the space through pacing and placement.",
        "<strong>Audio</strong> — all sound for the project was created by me.",
      ],
      audioNote:
        "Audio samples from this project are being prepared and will appear here soon.",
      audio: { groups: [] },
      cover: "",
      hero: "",
      video: "https://vimeo.com/1164941421",
      gallery: [],
      links: [
        { label: "Play on itch.io", href: "https://senpaii2.itch.io/from-the-river-to-the-sea", kind: "Download" },
      ],
      credits: [],
      facts: [
        { k: "Built for", v: "Egypt Game Jam 2026" },
        { k: "Engine", v: "Unity" },
        { k: "Released", v: "February 2026" },
      ],
    },

    /* ---------------------------------------------------------------------
       Attaba Syndrome
       ------------------------------------------------------------------ */
    {
      slug: "attaba-syndrome",
      order: 3,
      featured: false,
      title: "Attaba Syndrome",
      subtitle: "ITI Mini-Game Jam — 1st Place",
      tagline: "A physics-driven 2D platformer built from scratch in C++ and SFML.",
      category: "2D Platformer",
      year: "2025",
      role: "Game Developer & Sound Designer",
      credit: "All audio is mine",
      tools: ["C++", "SFML"],
      shortDescription:
        "A fast-paced, physics-driven 2D platformer in which the player, Gayar, crosses a city while avoiding the 'Attaba' effect and its hazards. First place at the ITI Mini-Game Jam.",
      overview: [
        "Attaba Syndrome was built for the ITI Mini-Game Jam without an engine — straight C++ on top of SFML. The player character, Gayar, has to cross a city while managing the disorienting 'Attaba' effect and its hazards.",
        "The game won first place.",
      ],
      contributions: [
        "<strong>Parallax scrolling</strong> — multi-layer background motion tied to player velocity.",
        "<strong>Obstacle systems</strong> — the hazard structures the player navigates.",
        "<strong>Bus events with spatialised audio</strong> — timed events with direction-aware sound placement.",
        "<strong>Random 'psycho' disruptions</strong> — unpredictable state changes that raise the pressure.",
        "<strong>Responsive controls</strong> — tuning movement feel for a precision platformer.",
        "<strong>Audio</strong> — all sound for the project was created by me.",
      ],
      audioNote:
        "Audio samples from this project are being prepared and will appear here soon.",
      audio: { groups: [] },
      cover: "",
      hero: "",
      video: "https://vimeo.com/1148077565",
      gallery: [],
      links: [
        { label: "Play on itch.io", href: "https://youssef-ahmed-m.itch.io/motlazmet-el-atbaa", kind: "Download" },
      ],
      credits: [],
      facts: [
        { k: "Result", v: "1st Place" },
        { k: "Framework", v: "SFML (no engine)" },
        { k: "Released", v: "December 2025" },
      ],
    },

    /* ---------------------------------------------------------------------
       Horrific City
       ------------------------------------------------------------------ */
    {
      slug: "horrific-city",
      order: 4,
      featured: false,
      title: "Horrific City",
      subtitle: "Unity FPS Prototype",
      tagline: "A timed FPS survival prototype set in a ruined and overrun temple.",
      category: "FPS",
      year: "2026",
      role: "Game Developer & Sound Designer",
      credit: "All audio is mine",
      tools: ["Unity", "C#"],
      shortDescription:
        "A timed FPS survival game set in a ruined ancient temple overrun by zombies and bats, with four weapons, distinct enemy AI behaviours and a boss encounter.",
      overview: [
        "Horrific City is a timed survival FPS built in Unity. The player holds out in a ruined temple infested with zombies and bats, fighting through several weapons to reach a boss.",
        "I built the gameplay systems and created the audio for the project.",
      ],
      contributions: [
        "<strong>Four weapons</strong> — implemented as distinct systems rather than a single reskinned gun.",
        "<strong>Enemy AI</strong> — three separate behaviours: patrolling, alert-and-flee, and swarming.",
        "<strong>Boss encounter</strong> — a 300 HP boss fight as the climax of the run.",
        "<strong>Day / night lighting variants</strong> — the same space read two different ways.",
        "<strong>Audio</strong> — all sound for the project was created by me.",
      ],
      audioNote:
        "Audio samples from this project are being prepared and will appear here soon.",
      audio: { groups: [] },
      cover: "",
      hero: "",
      video: "https://player.vimeo.com/video/1221315043",
      gallery: [],
      links: [
        { label: "Play on itch.io", href: "https://seiflemonz.itch.io/horrific-city", kind: "Download" },
      ],
      credits: [],
      facts: [
        { k: "Engine", v: "Unity" },
        { k: "Genre", v: "Timed survival FPS" },
        { k: "Released", v: "August 2026" },
      ],
    },

    /* ---------------------------------------------------------------------
       Life Journey
       ------------------------------------------------------------------ */
    {
      slug: "life-journey",
      order: 5,
      featured: false,
      title: "Life Journey",
      subtitle: "Cozy Medieval Adventure",
      tagline: "A cozy RPG about a retired warrior's last delivery round.",
      category: "RPG",
      year: "2026",
      role: "Game Developer & Sound Designer",
      credit: "All audio is mine, except background music",
      tools: ["Unity", "C#"],
      shortDescription:
        "A cozy medieval RPG following Fergus, a retired warrior turned village delivery man, as he makes his rounds through Elderwick before racing home.",
      overview: [
        "Life Journey is a cozy medieval RPG built in Unity. Fergus, a retired warrior now working as the village delivery man, makes his rounds through the village of Elderwick before racing home to the woman waiting for him.",
        "I built the game systems and created the audio. The only exception is the background music, which uses a temp track from Concerning Hobbits rather than original music.",
      ],
      contributions: [
        "<strong>Open village exploration</strong> — a traversable settlement with a delivery loop through it.",
        "<strong>NPC interaction</strong> — talking to the villagers Fergus delivers to.",
        "<strong>Horse-drawn delivery cart</strong> — a traversal system built around the character's job.",
        "<strong>Narrative design</strong> — the delivery round as a structure for telling the character's story.",
        "<strong>Audio</strong> — all sound was created by me; the background music is a temp track, not original.",
      ],
      audioNote:
        "Audio samples from this project are being prepared and will appear here soon.",
      audio: { groups: [] },
      cover: "",
      hero: "",
      video: "https://player.vimeo.com/video/1182653541",
      gallery: [],
      links: [
        { label: "Play on itch.io", href: "https://seiflemonz.itch.io/life-journey", kind: "Download" },
      ],
      credits: [],
      facts: [
        { k: "Engine", v: "Unity" },
        { k: "Tone", v: "Cozy / narrative" },
        { k: "Released", v: "August 2026" },
      ],
    },

    /* ---------------------------------------------------------------------
       Historealm
       ------------------------------------------------------------------ */
    {
      slug: "historealm",
      order: 6,
      featured: false,
      title: "Historealm",
      subtitle: "AR Tourist Companion App",
      tagline: "Ancient Egyptian characters that talk back to you in AR.",
      category: "AR / Mobile",
      year: "2025",
      role: "Developer",
      credit: "",
      tools: ["Unity", "Flutter", "LangChain", "Chroma", "OpenAI API", "Whisper", "ElevenLabs", "Dart"],
      shortDescription:
        "A senior project combining Unity and Flutter into an AR tourist companion that places interactive Ancient Egyptian historical characters into the real world.",
      overview: [
        "Historealm is an augmented reality tourist companion application developed as my senior project. It combines a Unity AR layer with a Flutter application, placing interactive Ancient Egyptian historical characters into the user's real surroundings.",
        "The characters hold conversations powered by a retrieval-based AI system, and speak with synthesised voice. My work here was on the application and its AI integration rather than on sound design: voice was produced with synthesis in service of the conversation system.",
      ],
      contributions: [
        "<strong>Interactive 3D historical characters</strong> — created and placed in AR.",
        "<strong>AI conversation system</strong> — assembled with LangChain, Chroma and the OpenAI API for grounded, character-consistent responses.",
        "<strong>Speech recognition</strong> — Whisper, so the user can simply talk to the character.",
        "<strong>Voice synthesis</strong> — ElevenLabs used to give the characters audible speech.",
        "<strong>Cross-platform architecture</strong> — Unity and Flutter working as one product.",
      ],
      audioNote:
        "The voice in Historealm is synthesised through ElevenLabs as part of the conversation system. It is not sound design work, so no audio samples are presented.",
      audio: { groups: [] },
      cover: "",
      hero: "",
      video: null,
      gallery: [],
      links: [
        { label: "Watch the demo", href: "https://drive.google.com/file/d/1vqvwb_xC87YDYUqvUAKdHxmIsF63JRoX/view", kind: "Video" },
      ],
      credits: [],
      facts: [
        { k: "Type", v: "Senior project" },
        { k: "Stack", v: "Unity + Flutter" },
        { k: "Developed", v: "November 2024 – June 2025" },
      ],
    },

    /* ---------------------------------------------------------------------
       Kaya's Adventure
       ------------------------------------------------------------------ */
    {
      slug: "kayas-adventure",
      order: 7,
      featured: false,
      title: "Kaya's Adventure",
      subtitle: "Third-Person Unity Game",
      tagline: "A stylised third-person adventure with movement, puzzles and traversal.",
      category: "Adventure",
      year: "2024",
      role: "Developer",
      credit: "",
      tools: ["Unity", "C#"],
      shortDescription:
        "A third-person adventure game built in Unity and C#, with player movement, puzzle systems and environment interaction inside a stylised 3D world.",
      overview: [
        "Kaya's Adventure is a third-person adventure built in Unity. It focuses on character movement, environmental puzzles and interaction systems within a stylised 3D environment.",
      ],
      contributions: [
        "<strong>Player movement</strong> — third-person locomotion and traversal feel.",
        "<strong>Puzzle systems</strong> — environmental puzzles and their interaction logic.",
        "<strong>Environment interaction</strong> — objects and spaces that respond to the player.",
        "<strong>Level design</strong> — challenges designed within a stylised 3D environment.",
      ],
      audioNote: "No original sound design was created for this project, so no audio samples are presented.",
      audio: { groups: [] },
      cover: "",
      hero: "",
      video: null,
      gallery: [],
      links: [
        { label: "Watch gameplay", href: "https://drive.google.com/file/d/1U0eoENOt4c-6p_6Hn17M0BD-abk_k4FG/view", kind: "Video" },
        { label: "Project folder", href: "https://drive.google.com/drive/u/0/folders/1QYjXzoK0n5emFqvP9fDoHUTrZ9MUA_iO", kind: "Download" },
      ],
      credits: [],
      facts: [
        { k: "Engine", v: "Unity" },
        { k: "Perspective", v: "Third person" },
        { k: "Built", v: "January 2024" },
      ],
    },

    /* ---------------------------------------------------------------------
       Red Light, Green Light
       ------------------------------------------------------------------ */
    {
      slug: "red-light-green-light",
      order: 8,
      featured: false,
      title: "Red Light, Green Light",
      subtitle: "Unity Gameplay Prototype",
      tagline: "A tense detection-and-movement prototype built around a single rule.",
      category: "Prototype",
      year: "2023",
      role: "Developer",
      credit: "",
      tools: ["Unity", "C#"],
      shortDescription:
        "A third-person challenge prototype inspired by Squid Game mechanics, built around AI detection and tight player state management.",
      overview: [
        "Red Light, Green Light is a gameplay prototype built in Unity around a single, tense rule: move when you are not being watched. It was an exercise in detection systems and player state.",
      ],
      contributions: [
        "<strong>AI detection systems</strong> — the observation logic the whole prototype rests on.",
        "<strong>Player state management</strong> — tracking and reacting to the player's movement state in real time.",
        "<strong>Moment design</strong> — engineering tension out of one simple rule.",
      ],
      audioNote: "No original sound design was created for this project, so no audio samples are presented.",
      audio: { groups: [] },
      cover: "",
      hero: "",
      video: null,
      gallery: [],
      links: [
        { label: "Watch gameplay", href: "https://drive.google.com/file/d/1XfMySq-en1L_crZJjMLw5PMV3Hl3SDnL/view", kind: "Video" },
        { label: "Project folder", href: "https://drive.google.com/drive/u/0/folders/1pDAb-6seyuCRHkd73KPatquM8yvOwMfX", kind: "Download" },
      ],
      credits: [],
      facts: [
        { k: "Engine", v: "Unity" },
        { k: "Type", v: "Gameplay prototype" },
        { k: "Built", v: "December 2023" },
      ],
    },
  ],

  /* About page content — sourced from the CV. */
  about: {
    paragraphs: [
      "I am a Game Audio Designer and Sound Designer, and a Computer Engineering graduate from the Arab Academy for Science, Technology and Maritime Transport. I currently study Game Programming at the Information Technology Institute (ITI), where I am completing a nine-month scholarship.",
      "My background is unusual for a sound designer: I came to audio through game development. I have built gameplay systems, AI, VR interactions and interactive environments in Unity and Unreal Engine, in C# and C++. That means when I design a sound I already understand the system that will play it — the event, the state, the trigger — and how to get the audio into it properly.",
      "My most recent work is Horizons of Aten, a first-person VR puzzle and exploration game set in an ancient Egyptian city, for which I created the complete audio: every sound effect, the audio pool and its categorisation, the voice cast, and the music.",
    ],
    facts: [
      { k: "Based in", v: "Cairo, Egypt" },
      { k: "Focus", v: "Game audio & sound design" },
      { k: "Also", v: "Game development" },
      { k: "Languages", v: "Arabic (native), English (fluent), French (professional), Spanish (basic)" },
    ],
    experience: [
      {
        when: "October 2025 – Present",
        role: "Scholarship in Game Development",
        org: "Information Technology Institute (ITI)",
        body: "A nine-month intensive Game Programming track focused on gameplay systems and engine architecture. Developed multiple game prototypes in Unity and Unreal Engine, including the VR title Horizons of Aten.",
        tags: ["Unity", "Unreal Engine", "C#", "C++", "VR", "Game AI"],
      },
      {
        when: "August 2024 – September 2024",
        role: "Virtual Reality Developer Intern",
        org: "National Academy of Information Technology for Persons with Disabilities (NAID)",
        body: "Developed interactive VR environments in Unity for social training simulations, designing immersive scenarios that help autistic users practise social interaction in public spaces. Awarded NAID Best Project 2024.",
        tags: ["Unity", "C#", "Unity XR", "VR", "Accessibility"],
      },
      {
        when: "July 2024 – September 2024",
        role: "Full Stack Developer Intern",
        org: "World Health Organization (WHO)",
        body: "Developed a banking teller queue system using C# (.NET) and Angular, implementing real-time queue updates to improve customer flow management.",
        tags: ["C#", ".NET", "Angular", "Clean Architecture"],
      },
    ],
    education: [
      {
        when: "October 2025 – Present",
        role: "Scholarship in Game Development",
        org: "Information Technology Institute (ITI)",
        body: "Nine-month intensive Game Programming track covering gameplay systems and engine architecture.",
      },
      {
        when: "October 2020 – July 2025",
        role: "BSc Computer Engineering",
        org: "Arab Academy for Science, Technology and Maritime Transport",
        body: "GPA 3.5. Comprehensive computer engineering curriculum with a focus on software development and system design.",
      },
    ],
    skills: [
      {
        title: "Audio",
        focus: true,
        items: [
          "FL Studio",
          "REAPER",
          "AmpliTube",
          "Sound design",
          "Foley & field recording",
          "Voice direction",
          "Audio implementation",
          "Audio pooling & categorisation",
          "Music composition",
          "Focusrite Scarlett Solo",
          "Electric guitar",
        ],
      },
      {
        title: "Engines & Game Dev",
        items: ["Unity", "Unreal Engine", "Game AI", "SFML", "VR / AR development"],
      },
      {
        title: "Programming",
        items: ["C#", "C++", "C", "Java", "Python", "Dart", "Kotlin"],
      },
      {
        title: "Other tools",
        items: ["Blender", "Git", "Flutter", "Angular", ".NET", "OpenGL"],
      },
    ],
    awards: [
      {
        title: "ITI Mini-Game Jam — 1st Place",
        org: "Information Technology Institute",
        year: "December 2025",
        body: "First place for Attaba Syndrome, a fast-paced physics-driven 2D platformer.",
      },
      {
        title: "NAID Best Project 2024",
        org: "National Academy of Information Technology for Persons with Disabilities",
        year: "September 2024",
        body: "Awarded for developing an innovative VR social training application for autistic users.",
      },
    ],
    cv: {
      // Drop your CV PDF here with this exact filename and the download button will work.
      file: "assets/cv/Seif-Eldin-Mohamed-CV.pdf",
      label: "Download CV (PDF)",
    },
  },
};

/* Expose globally for the plain-script pages. */
window.SITE = SITE;
