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

   HOW TO ADD IMAGES AND VIDEO
   `cover`  — used on the home page and as the project card image.
   `hero`   — the wide image at the top of the project page.
   `gallery`— list of { src, caption } shown under "Footage & stills".
   `video`  — either a Vimeo/YouTube URL or a local file such as
              "assets/video/my-clip.mp4". `videoPoster` is its still frame.
   ========================================================================== */

const SITE = {
  meta: {
    siteName: "Seif Eldin — Game Audio & Sound Design",
    shortName: "Seif Eldin",
    // Change this to the final GitHub Pages / custom domain URL (no trailing slash).
    baseUrl: "",
    description:
      "Game Audio Designer and Sound Designer creating immersive sound for interactive worlds. Sound design, voice and audio implementation for the VR adventure Horizon of Aten.",
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
      "Every sound in my most recent project was made by me — the ambience, the effects and the voice work.",
  },

  /* Capabilities — kept deliberately short and non-technical in tone. */
  capabilities: [
    {
      title: "Sound Design",
      body: "Impacts, ambience, mechanical and environmental sound — designed so a player reads distance, weight and danger without being told.",
    },
    {
      title: "Game Audio Implementation",
      body: "Sound wired into the systems that trigger it: audio pools, categorisation and event-driven playback, inside the same Unity and Unreal projects I help build.",
    },
    {
      title: "Voice & Character",
      body: "Performing and producing character voice — from the take through editing and processing into something that belongs in the world it is spoken in.",
    },
    {
      title: "Music & Atmosphere",
      body: "Original music and atmosphere written to sit under gameplay rather than over it, and to follow the state the player is in.",
    },
  ],

  projects: [
    /* ---------------------------------------------------------------------
       FEATURED — Horizon of Aten
       ------------------------------------------------------------------ */
    {
      slug: "horizon-of-aten",
      order: 1,
      featured: true,
      title: "Horizon of Aten",
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
        "Horizon of Aten is a first-person PC VR puzzle and exploration experience set inside a forgotten ancient Egyptian city. The player moves from the ruins and the surrounding village into the interior of a temple, solving environmental puzzles, avoiding traps and uncovering what has been hidden there.",
        "I was responsible for the complete audio of the project: the sound effects, the audio pool and its categorisation, the voice cast, and the music. That meant designing for a medium where the player is physically inside the space — where a sound's direction and distance are not decoration but the main way the world communicates.",
        "Built alongside a mixed art and development team in collaboration with CUBE Consultants, the project was a deliberate exercise in joining game design, environment art, VR interaction, puzzle design and storytelling into a single immersive experience.",
      ],
      contributions: [
        "<strong>Complete sound design</strong> — every sound effect in the game, from the footstep sets and impacts to the mechanical and magical interactions that drive the puzzles.",
        "<strong>Audio pool & categorisation</strong> — the structure that organises, names and routes sounds so they can be triggered reliably from game events.",
        "<strong>Voice acting</strong> — performing and recording the character lines across the temple announcer, the village cast, the workers and the player character.",
        "<strong>Voice processing</strong> — treating the raw takes into in-world character, including a ghostly treatment explored for the surreal moments in the temple.",
        "<strong>Music</strong> — original cues and atmosphere written for the temple and village sections of the game.",
        "<strong>Interactive integration</strong> — triggering audio from the gameplay systems so it responds to what the player actually does.",
      ],
      audioNote:
        "Every clip below is audio recorded and produced for the game. Where a single performance exists in more than one treatment, the A/B player lets you hear the versions side by side.",
      audio: {
        groups: [
          {
            key: "announcer",
            title: "Temple Announcer",
            note: "The voice that speaks to the player through the temple, recorded in Egyptian Arabic and in English.",
            tracks: [
              {
                title: "Announcer — Egyptian Arabic",
                file: "assets/audio/horizon-of-aten/vo/announcer/announcer-egyptian.mp3",
                desc: "The recorded performance.",
                tags: ["Voice", "Egyptian Arabic"],
              },
              {
                title: "Announcer — English",
                file: "assets/audio/horizon-of-aten/vo/announcer/announcer-english.mp3",
                desc: "The same announcement delivered in English.",
                tags: ["Voice", "English"],
                ab: {
                  label: "Treatment",
                  variants: [
                    { name: "Dry", file: "assets/audio/horizon-of-aten/vo/announcer/announcer-english.mp3" },
                    { name: "Ghostly", file: "assets/audio/horizon-of-aten/vo/announcer/announcer-english-ghostly.mp3" },
                  ],
                },
              },
              {
                title: "Man reacting to the announcement",
                file: "assets/audio/horizon-of-aten/vo/announcer/man-reacts-announcement.mp3",
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
            note: "The characters living in the ruins around the temple. Every line here was performed and recorded for the game.",
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
              { title: "Woman — line 01", file: "assets/audio/horizon-of-aten/vo/village/woman-01.mp3", tags: ["Woman"] },
              { title: "Lenny", file: "assets/audio/horizon-of-aten/vo/village/lenny.mp3", tags: ["Lenny"] },
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
            key: "sfx-footsteps",
            title: "Footsteps",
            note: "Three surfaces, three variations each, plus looped versions for continuous walking. Recorded, edited and prepared for the game.",
            tracks: [
              { title: "Footstep — Sand 1", file: "assets/audio/horizon-of-aten/sfx/footstep-sand-1.mp3", tags: ["Sand"] },
              { title: "Footstep — Sand 2", file: "assets/audio/horizon-of-aten/sfx/footstep-sand-2.mp3", tags: ["Sand"] },
              { title: "Footstep — Sand 3", file: "assets/audio/horizon-of-aten/sfx/footstep-sand-3.mp3", tags: ["Sand"] },
              { title: "Footstep — Stone 1", file: "assets/audio/horizon-of-aten/sfx/footstep-stone-1.mp3", tags: ["Stone"] },
              { title: "Footstep — Stone 2", file: "assets/audio/horizon-of-aten/sfx/footstep-stone-2.mp3", tags: ["Stone"] },
              { title: "Footstep — Stone 3", file: "assets/audio/horizon-of-aten/sfx/footstep-stone-3.mp3", tags: ["Stone"] },
              { title: "Footstep — Wood 1", file: "assets/audio/horizon-of-aten/sfx/footstep-wood-1.mp3", tags: ["Wood"] },
              { title: "Footstep — Wood 2", file: "assets/audio/horizon-of-aten/sfx/footstep-wood-2.mp3", tags: ["Wood"] },
              { title: "Footstep — Wood 3", file: "assets/audio/horizon-of-aten/sfx/footstep-wood-3.mp3", tags: ["Wood"] },
              { title: "Footsteps — Sand, loop", file: "assets/audio/horizon-of-aten/sfx/footsteps-sand-loop.mp3", tags: ["Loop"] },
              { title: "Footsteps — Stone, loop", file: "assets/audio/horizon-of-aten/sfx/footsteps-stone-loop.mp3", tags: ["Loop"] },
              { title: "Footsteps — Wood, loop", file: "assets/audio/horizon-of-aten/sfx/footsteps-wood-loop.mp3", tags: ["Loop"] },
            ],
          },
          {
            key: "sfx-world",
            title: "Effects & Interactions",
            note: "The mechanical, magical and environmental sounds the temple and its puzzles are built on.",
            tracks: [
              { title: "Appear", file: "assets/audio/horizon-of-aten/sfx/appear.mp3", tags: ["Magical"] },
              { title: "Ghosts fade in", file: "assets/audio/horizon-of-aten/sfx/ghosts-fade-in.mp3", tags: ["Magical"] },
              { title: "Sub hologram", file: "assets/audio/horizon-of-aten/sfx/sub-hologram.mp3", tags: ["Magical"] },
              { title: "Translate", file: "assets/audio/horizon-of-aten/sfx/translate.mp3", tags: ["Puzzle"] },
              { title: "Lever", file: "assets/audio/horizon-of-aten/sfx/lever.mp3", tags: ["Mechanism"] },
              { title: "Pressure plate", file: "assets/audio/horizon-of-aten/sfx/plate.mp3", tags: ["Mechanism"] },
              { title: "Push stone statue", file: "assets/audio/horizon-of-aten/sfx/push-stone-statue.mp3", tags: ["Mechanism"] },
              { title: "Rumbling", file: "assets/audio/horizon-of-aten/sfx/rumbling.mp3", tags: ["Environment"] },
              { title: "Crowd", file: "assets/audio/horizon-of-aten/sfx/crowd.mp3", tags: ["Environment"] },
              { title: "Fahh", file: "assets/audio/horizon-of-aten/sfx/fahh.mp3", tags: ["Voice"] },
            ],
          },
        ],
      },
      cover: "assets/img/horizon-of-aten/cover.jpg",
      hero: "assets/img/horizon-of-aten/hero.jpg",
      video: "assets/video/horizon-of-aten-trailer.mp4",
      videoPoster: "assets/img/horizon-of-aten/trailer-poster.jpg",
      gallery: [],
      links: [],
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
        "I co-developed the project and created its audio — the dialogue for both speaking characters, the interaction sounds and the main menu music.",
      ],
      contributions: [
        "<strong>Narrative progression</strong> — building the transition from observer to participant as the core structural mechanic.",
        "<strong>Environmental storytelling</strong> — guiding the player's reading of the space through pacing and placement.",
        "<strong>Voice</strong> — recording and editing the dialogue for K and for Max.",
        "<strong>Sound effects</strong> — interface feedback and interaction sounds, including the plate-breaking effect used in the opening.",
        "<strong>Music</strong> — the main menu cue.",
      ],
      audioNote:
        "The dialogue, interaction sounds and menu music created for the project.",
      audio: {
        groups: [
          {
            key: "k",
            title: "K — dialogue",
            note: "The child who guides the player through the city.",
            tracks: [
              { title: "K — line 01", file: "assets/audio/from-the-river-to-the-sea/vo/k/line-01.mp3", tags: ["K"] },
              { title: "K — line 02", file: "assets/audio/from-the-river-to-the-sea/vo/k/line-02.mp3", tags: ["K"] },
              { title: "K — line 03", file: "assets/audio/from-the-river-to-the-sea/vo/k/line-03.mp3", tags: ["K"] },
              { title: "K — line 04", file: "assets/audio/from-the-river-to-the-sea/vo/k/line-04.mp3", tags: ["K"] },
              { title: "K — line 05", file: "assets/audio/from-the-river-to-the-sea/vo/k/line-05.mp3", tags: ["K"] },
              { title: "K — line 06", file: "assets/audio/from-the-river-to-the-sea/vo/k/line-06.mp3", tags: ["K"] },
              { title: "K — line 07", file: "assets/audio/from-the-river-to-the-sea/vo/k/line-07.mp3", tags: ["K"] },
              { title: "K — line 08", file: "assets/audio/from-the-river-to-the-sea/vo/k/line-08.mp3", tags: ["K"] },
              { title: "K — line 09", file: "assets/audio/from-the-river-to-the-sea/vo/k/line-09.mp3", tags: ["K"] },
              { title: "K — line 10", file: "assets/audio/from-the-river-to-the-sea/vo/k/line-10.mp3", tags: ["K"] },
            ],
          },
          {
            key: "max",
            title: "Max — dialogue",
            note: "The second speaking character in the story.",
            tracks: [
              { title: "Max — line 01", file: "assets/audio/from-the-river-to-the-sea/vo/max/max-01.mp3", tags: ["Max"] },
              { title: "Max — line 02", file: "assets/audio/from-the-river-to-the-sea/vo/max/max-02.mp3", tags: ["Max"] },
              { title: "Max — line 03", file: "assets/audio/from-the-river-to-the-sea/vo/max/max-03.mp3", tags: ["Max"] },
              { title: "Max — line 04", file: "assets/audio/from-the-river-to-the-sea/vo/max/max-04.mp3", tags: ["Max"] },
              { title: "Max — line 05", file: "assets/audio/from-the-river-to-the-sea/vo/max/max-05.mp3", tags: ["Max"] },
              { title: "Max — line 06", file: "assets/audio/from-the-river-to-the-sea/vo/max/max-06.mp3", tags: ["Max"] },
              { title: "Max — line 07", file: "assets/audio/from-the-river-to-the-sea/vo/max/max-07.mp3", tags: ["Max"] },
              { title: "Max — line 08", file: "assets/audio/from-the-river-to-the-sea/vo/max/max-08.mp3", tags: ["Max"] },
              { title: "Max — line 09", file: "assets/audio/from-the-river-to-the-sea/vo/max/max-09.mp3", tags: ["Max"] },
            ],
          },
          {
            key: "sfx",
            title: "Interface & interaction",
            note: "Menu feedback and interaction sounds built for the game.",
            tracks: [
              { title: "UI — click", file: "assets/audio/from-the-river-to-the-sea/sfx/ui-click.mp3", tags: ["UI"] },
              { title: "UI — hover", file: "assets/audio/from-the-river-to-the-sea/sfx/ui-hover.mp3", tags: ["UI"] },
              { title: "Katana click", file: "assets/audio/from-the-river-to-the-sea/sfx/katana-click.mp3", tags: ["Interaction"] },
              { title: "Plate breaking", file: "assets/audio/from-the-river-to-the-sea/sfx/plate-breaking.mp3", tags: ["Interaction"] },
            ],
          },
          {
            key: "music",
            title: "Music",
            note: "The main menu cue written for the project.",
            tracks: [
              { title: "Main menu", file: "assets/audio/from-the-river-to-the-sea/music/main-menu.mp3", tags: ["Music"] },
            ],
          },
        ],
      },
      cover: "assets/img/from-the-river-to-the-sea/cover.jpg",
      hero: "assets/img/from-the-river-to-the-sea/hero.jpg",
      video: "https://vimeo.com/1164941421",
      gallery: [
        { src: "assets/img/from-the-river-to-the-sea/gallery-01.jpg" },
      ],
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
        "I built the gameplay systems and created the audio. The game won first place.",
      ],
      contributions: [
        "<strong>Parallax scrolling</strong> — multi-layer background motion tied to player velocity.",
        "<strong>Obstacle systems</strong> — the hazard structures the player navigates.",
        "<strong>Bus events with spatialised audio</strong> — timed events with direction-aware sound placement.",
        "<strong>Random 'psycho' disruptions</strong> — unpredictable state changes that raise the pressure.",
        "<strong>Responsive controls</strong> — tuning movement feel for a precision platformer.",
        "<strong>Dialogue</strong> — recording and editing the character lines.",
        "<strong>Sound effects & ambience</strong> — hazards, traffic, the park ambience and the interaction sounds.",
        "<strong>Music</strong> — the cues that follow the player's state through the run.",
      ],
      audioNote:
        "The dialogue, effects, ambience and music created for the game.",
      audio: {
        groups: [
          {
            key: "vo",
            title: "Dialogue",
            note: "The character lines, performed in Egyptian Arabic.",
            tracks: [
              { title: "Dialogue — main", file: "assets/audio/attaba-syndrome/vo/dialogue.mp3", tags: ["Dialogue"] },
              { title: "El btngan", file: "assets/audio/attaba-syndrome/vo/el-btngan.mp3", tags: ["Dialogue"] },
              { title: "Enzl ya mtdala3", file: "assets/audio/attaba-syndrome/vo/enzl-ya-mtdala3.mp3", tags: ["Dialogue"] },
              { title: "Grocery — line 01", file: "assets/audio/attaba-syndrome/vo/grocery-line-01.mp3", tags: ["Dialogue"] },
              { title: "Grocery — line 02", file: "assets/audio/attaba-syndrome/vo/grocery-line-02.mp3", tags: ["Dialogue"] },
              { title: "Kelab la", file: "assets/audio/attaba-syndrome/vo/kelab-la.mp3", tags: ["Dialogue"] },
              { title: "Player reply", file: "assets/audio/attaba-syndrome/vo/player-reply.mp3", tags: ["Dialogue"] },
              { title: "Refuse", file: "assets/audio/attaba-syndrome/vo/refuse.mp3", tags: ["Dialogue"] },
            ],
          },
          {
            key: "sfx",
            title: "Effects & ambience",
            note: "The hazards, traffic and environment sounds that drive the run.",
            tracks: [
              { title: "Park ambience", file: "assets/audio/attaba-syndrome/sfx/ambient-park.mp3", tags: ["Ambience"] },
              { title: "Traffic", file: "assets/audio/attaba-syndrome/sfx/traffic.mp3", tags: ["Ambience"] },
              { title: "Bus pass", file: "assets/audio/attaba-syndrome/sfx/bus-pass.mp3", tags: ["Event"] },
              { title: "Dog", file: "assets/audio/attaba-syndrome/sfx/dog.mp3", tags: ["Event"] },
              { title: "Grocery collision", file: "assets/audio/attaba-syndrome/sfx/grocery-collision.mp3", tags: ["Hazard"] },
              { title: "Effect", file: "assets/audio/attaba-syndrome/sfx/effect.mp3", tags: ["Interface"] },
            ],
          },
          {
            key: "music",
            title: "Music",
            note: "The cues written for the project, including the neutral and pressured states of the run.",
            tracks: [
              { title: "Theme", file: "assets/audio/attaba-syndrome/music/theme.mp3", tags: ["Music"] },
              { title: "Neutral", file: "assets/audio/attaba-syndrome/music/neutral.mp3", tags: ["Music"] },
              { title: "Crazy", file: "assets/audio/attaba-syndrome/music/crazy.mp3", tags: ["Music"] },
            ],
          },
        ],
      },
      cover: "assets/img/attaba-syndrome/cover.jpg",
      hero: "assets/img/attaba-syndrome/hero.jpg",
      video: "https://vimeo.com/1148077565",
      gallery: [
        { src: "assets/img/attaba-syndrome/gallery-01.jpg" },
      ],
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
      audioNote: "The audio for this project is not part of this selection.",
      audio: {
        groups: [],
        emptyMessage: "Audio samples from Horrific City are not included in this portfolio.",
      },
      cover: "assets/img/horrific-city/cover.jpg",
      hero: "assets/img/horrific-city/hero.jpg",
      video: "https://player.vimeo.com/video/1221315043",
      gallery: [
        { src: "assets/img/horrific-city/gallery-01.jpg" },
      ],
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
        "I built the game systems and created the audio: the voice cast, the horse-drawn cart and the environment. The only exception is the background music, which uses a temporary track rather than original music, so it is not included here.",
      ],
      contributions: [
        "<strong>Open village exploration</strong> — a traversable settlement with a delivery loop through it.",
        "<strong>NPC interaction</strong> — talking to the villagers Fergus delivers to.",
        "<strong>Horse-drawn delivery cart</strong> — a traversal system built around the character's job.",
        "<strong>Narrative design</strong> — the delivery round as a structure for telling the character's story.",
        "<strong>Voice cast</strong> — performing and recording Fergus, Rodrick, the Wife and the Young Boy.",
        "<strong>Sound effects</strong> — the horse-drawn cart and the project's interaction sounds.",
      ],
      audioNote:
        "The voice cast and sound effects created for the project. The background music is a temporary track rather than original work, so it is deliberately not included.",
      audio: {
        groups: [
          {
            key: "vo",
            title: "Voice cast",
            note: "The characters Fergus meets on his round, plus his own lines.",
            tracks: [
              { title: "Fergus — line 01", file: "assets/audio/life-journey/vo/fergus/01.mp3", tags: ["Fergus"] },
              { title: "Fergus — line 02", file: "assets/audio/life-journey/vo/fergus/02.mp3", tags: ["Fergus"] },
              { title: "Fergus — line 03", file: "assets/audio/life-journey/vo/fergus/03.mp3", tags: ["Fergus"] },
              { title: "Fergus — line 04", file: "assets/audio/life-journey/vo/fergus/04.mp3", tags: ["Fergus"] },
              { title: "Fergus — line 05", file: "assets/audio/life-journey/vo/fergus/05.mp3", tags: ["Fergus"] },
              { title: "Fergus — line 06", file: "assets/audio/life-journey/vo/fergus/06.mp3", tags: ["Fergus"] },
              { title: "Fergus — line 07", file: "assets/audio/life-journey/vo/fergus/07.mp3", tags: ["Fergus"] },
              { title: "Rodrick — line 01", file: "assets/audio/life-journey/vo/rodrick/01.mp3", tags: ["Rodrick"] },
              { title: "Rodrick — line 02", file: "assets/audio/life-journey/vo/rodrick/02.mp3", tags: ["Rodrick"] },
              { title: "Rodrick — line 03", file: "assets/audio/life-journey/vo/rodrick/03.mp3", tags: ["Rodrick"] },
              { title: "Wife — line 01", file: "assets/audio/life-journey/vo/wife/01.mp3", tags: ["Wife"] },
              { title: "Wife — line 02", file: "assets/audio/life-journey/vo/wife/02.mp3", tags: ["Wife"] },
              { title: "Wife — line 03", file: "assets/audio/life-journey/vo/wife/03.mp3", tags: ["Wife"] },
              { title: "Wife — line 04", file: "assets/audio/life-journey/vo/wife/04.mp3", tags: ["Wife"] },
              { title: "Young Boy — line 01", file: "assets/audio/life-journey/vo/young-boy/01.mp3", tags: ["Young Boy"] },
              { title: "Young Boy — line 02", file: "assets/audio/life-journey/vo/young-boy/02.mp3", tags: ["Young Boy"] },
            ],
          },
          {
            key: "sfx",
            title: "Effects",
            note: "The sound of Fergus's delivery round.",
            tracks: [
              { title: "Horse wagon", file: "assets/audio/life-journey/sfx/horse-wagon.mp3", tags: ["Traversal"] },
            ],
          },
        ],
      },
      cover: "assets/img/life-journey/cover.jpg",
      hero: "assets/img/life-journey/hero.jpg",
      video: "https://player.vimeo.com/video/1182653541",
      gallery: [
        { src: "assets/img/life-journey/gallery-01.jpg" },
        { src: "assets/img/life-journey/gallery-02.jpg" },
      ],
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
  ],

  /* About page content — sourced from the CV. */
  about: {
    paragraphs: [
      "I am a Game Audio Designer and Sound Designer, and a Computer Engineering graduate from the Arab Academy for Science, Technology and Maritime Transport. I currently study Game Programming at the Information Technology Institute (ITI), where I am completing a nine-month scholarship.",
      "My background is unusual for a sound designer: I came to audio through game development. I have built gameplay systems, AI, VR interactions and interactive environments in Unity and Unreal Engine, in C# and C++. That means when I design a sound I already understand the system that will play it — the event, the state, the trigger — and how to get the audio into it properly.",
      "My most recent work is Horizon of Aten, a first-person VR puzzle and exploration game set in an ancient Egyptian city, for which I created the complete audio: every sound effect, the audio pool and its categorisation, the voice cast, and the music.",
    ],
    facts: [
      { k: "Based in", v: "Cairo, Egypt" },
      { k: "Focus", v: "Game audio & sound design" },
      { k: "Also", v: "Game development" },
      { k: "Languages", v: "Arabic (native), English (fluent), French (professional), Spanish (basic)" },
    ],
    experience: [
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
          "Sound effects",
          "Voice acting",
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
      // To replace the CV, overwrite this file with the new PDF (keep the same filename).
      file: "assets/cv/Seif-Eldin-Mohamed-CV.pdf",
      label: "Download CV (PDF)",
    },
  },
};

/* Expose globally for the plain-script pages. */
window.SITE = SITE;
