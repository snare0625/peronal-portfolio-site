import type { Project, SiteContent } from "@/lib/types";

/**
 * Fallback content. Used when Supabase env vars are missing or a query fails,
 * so the site always builds. Mirror of supabase/seed.sql — edit either.
 * Images: use /public paths or full URLs. A project without a cover gets a text cover and
 * no screenshot frames; hover previews only appear for rows that have an image.
 */
export const seed: SiteContent = {
  site: {
    firstName: "NEO",
    lastName: "SEKHUKHUNE",
    displayName: "Neo Sekhukhune",
    role: "Software Engineer",
    tagline: "I build software that fixes costly, recurring business problems — and helps companies grow revenue.",
    available: true,
    availabilityLabel: "Open to Roles & Freelance",
    yearsLabel: "3+ years of experience",
    email: "sekhukhune056@gmail.com",
    portraitUrl: "/images/neo-portrait.png", // cut-out, edges faded so the selfie shoulders blend in
    avatarUrl: "/images/avatar.jpg",
    cvUrl: "/cv.pdf", // exported from the CV doc; re-export and replace this file when the CV changes
    ctaTitle: "HIRING, OR HAVE A PROJECT?",
    ctaBody:
      "I’m open to full-time software engineering roles and selected freelance projects. Tell me what you’re building — I’d love to hear about it.",
    counts: { work: "", service: "", experience: "3y+" }, // work/service are filled in automatically
  },
  projects: [
    {
      slug: "queuepro",
      type: "Personal",
      name: "QueuePro",
      title: "QueuePro — A Fair, Explainable Queue for Busy Clinics",
      tags: ["Next.js", "TypeScript", "Supabase", "React", "Vitest", "GitHub Actions", "Motion"],
      summary:
        "A clinic queue that decides who should be served next — balancing waiting time, urgency, appointments and service length — and explains every decision in plain language.",
      note: "Across 20 simulated busy clinic days, the smart queue cut urgent cases’ average wait from 38 to 16 minutes compared with first come, first served, saw the most appointments on time and had the fewest walk-outs of the three algorithms tested.",
      role: "Sole developer",
      highlights: [
        {
          label: "Smart ranking",
          text: "A transparent scoring algorithm weighs waiting time, urgency, appointments and service length, with a fairness guarantee proven by a unit test: after about 50 minutes, nobody can overtake you.",
        },
        { label: "Explains itself", text: "Every “why this customer?” is written in plain language from the same numbers that made the decision." },
        {
          label: "Staffing",
          text: "Assigns the best qualified staff member, forecasts every wait by replaying the queue forward, learns real service times during the day, and recommends an extra shift when a service is overloaded.",
        },
        {
          label: "Real-time & private",
          text: "Every desk and the public waiting-room screen stay in sync through Supabase Realtime. Conditional updates stop two desks calling the same customer, and Row Level Security keeps names off the public screen.",
        },
        { label: "Simulation", text: "Simulates a full clinic day (50–120 customers) and compares three queue algorithms, with playback and 20-day averages." },
        {
          label: "Quality",
          text: "69 automated tests and CI on every push, including a security check that attacks the real database with the public key and fails if any private data is readable or writable.",
        },
        {
          label: "AI workflow",
          text: "Built with Claude Code as an AI pair programmer, one feature at a time, each with tests — and design choices checked with data rather than assumed.",
        },
      ],
      coverUrl: "/images/projects/queuepro/live-queue.png",
      gallery: ["/images/projects/queuepro/live-queue.png", "/images/projects/queuepro/simulation.png", "/images/projects/queuepro/display.png"],
      liveUrl: "https://smart-queue-management-pi.vercel.app/",
      repoUrl: "https://github.com/snare0625/smart-queue-management",
      featured: true,
    },
    {
      slug: "ledger",
      type: "Personal",
      name: "Ledger",
      title: "Ledger — Zero-Based Budgeting, One Cycle at a Time",
      tags: ["Next.js 16", "TypeScript", "Supabase", "Tailwind CSS", "shadcn/ui", "Zod", "Vitest", "PWA"],
      summary:
        "A mobile-first budgeting app built around monthly cycles: income goes into Fixed, Variable and Savings line items until nothing is left to allocate. Includes savings goals, a read-only history of past cycles and CSV export.",
      note: "Designed in Claude Design, then built with Claude Code into a secure, installable app — adding real features wherever the prototype only mocked them up.",
      role: "Sole developer",
      highlights: [
        {
          label: "Passcode lock",
          text: "Email sign-in plus a 4-digit passcode lock, like a banking app. Passcodes are bcrypt-hashed in a private schema, five wrong attempts lock verification for five minutes in Postgres, and the unlock cookie is HMAC-signed and expires after 30 minutes idle.",
        },
        {
          label: "Data integrity",
          text: "Row Level Security on every table, one open cycle per user enforced by a partial unique index, closed cycles made read-only by a database trigger, and new cycles opened in a single transaction that carries items over.",
        },
        {
          label: "Server-first",
          text: "Next.js 16 Server Components stream each user’s data in, Server Actions validate every write with Zod, and line-item toggles update optimistically and roll back if the write fails.",
        },
        { label: "Installable", text: "Installs to the home screen as a PWA, with an offline fallback that deliberately caches none of the user’s budget data." },
        { label: "Beyond the design", text: "Added what the prototype only mocked up: activity logging, multi-currency display, CSV export of every cycle and a lock-now button." },
        { label: "Testing", text: "44 unit tests (Vitest) covering budget maths, CSV export, formatting, route gating and the unlock token." },
        {
          label: "AI workflow",
          text: "Designed in Claude Design and built with Claude Code as my coding assistant, working from a written build plan, with unit tests and type checks on every change.",
        },
      ],
      coverUrl: null,
      gallery: [],
      liveUrl: "https://ledger-budgeting-app-ruby.vercel.app/",
      repoUrl: "https://github.com/snare0625/ledger-budgeting-app",
      featured: true,
    },
    {
      slug: "harbour-defender",
      type: "Exploration",
      name: "Harbour Defender",
      title: "Harbour Defender — A 30-Second AI Sci-Fi Short Made with Kling",
      tags: ["Kling", "Prompt Engineering", "AI Video", "Image-to-Video"],
      summary:
        "A three-scene sci-fi short starring me as an armoured hero defending a harbour city from attack drones, made by chaining three 10-second Kling generations into one continuous sequence.",
      note: "The same skills I use to steer Claude Code — a clear spec, explicit constraints and handing state from one step to the next — applied to a completely different domain.",
      role: "Prompt engineering & direction",
      highlights: [
        {
          label: "Chained scenes",
          text: "Kling generates 10 seconds at a time, so each scene starts from the last frame of the one before — three generations become one continuous 30-second sequence.",
        },
        {
          label: "Shared constraints",
          text: "One negative prompt across all three scenes guards against the usual failures: morphing faces, armour changing colour, extra limbs, warped buildings and flicker.",
        },
        {
          label: "Prompt template",
          text: "Every scene uses the same structure — camera and lighting spec, an anchor that locks the character and location to the reference image, beat-by-beat action and camera moves, a rhythm cue, and a closing consistency line.",
        },
        {
          label: "Three-act story",
          text: "Threat and takeoff, aerial battle, then the missile save — with the light moving from late afternoon to golden hour to sunset so time flows naturally across the cuts.",
        },
        { label: "Starring me", text: "The hero is me: the reference image is built from my own photo, and every prompt anchors my likeness and armour to it." },
        { label: "One attempt", text: "Each scene came out in a single attempt — the planning in the prompts did the work, not trial and error." },
        { label: "Next time", text: "Push the realism further, so skin, lighting and motion read as live-action footage rather than CGI." },
      ],
      prompts: [
        {
          label: "Shared negative prompt · used for all three scenes",
          text: "morphing face, changing armor design, red armor, gold armor, extra limbs, distorted hands, warped buildings, melting boats, duplicated characters, blurry, flickering, low quality, cartoon, text, watermark",
        },
        {
          label: "Scene 1 · The Threat & Takeoff — start frame: waterfront reference image · 10s",
          text: "Cinematic sci-fi VFX sequence shot on a RED V-RAPTOR 8K, epic blockbuster style, bright late-afternoon sunlight with crisp shadows and cool cyan accent glow. Keep the man, his gunmetal armor with glowing cyan lines, and the harbor waterfront exactly as in the reference image. The scene opens on a slow push-in toward him as he stands on the stone promenade, gazing up at the sky. A low rumble builds. Far above the flat-topped mountain, a formation of sleek unmarked black attack drones appears, trailed by thin white vapor streaks of incoming missiles. His expression hardens from calm focus to fierce resolve. The cyan lines across his armor light up one by one from his chest core outward to his hands and boots. He bends his knees, and bright blue-white thrusters ignite beneath his boots and in his palms, kicking up a ring of dust and spray across the promenade and rippling the harbor water. Seagulls scatter. With a deep blast of energy he launches straight up into the sky. The camera tilts and tracks upward with him, the waterfront, boats, and Ferris wheel dropping away below as he climbs toward the drones. Tense, building, anticipatory rhythm. Consistent character, armor, and background throughout.",
        },
        {
          label: "Scene 2 · The Aerial Battle — start frame: last frame of Scene 1 · 10s",
          text: "Cinematic sci-fi VFX sequence shot on a RED V-RAPTOR 8K, epic blockbuster style, bright golden afternoon light with lens flares and glowing cyan energy effects. The armored man with dreadlocks flies high above the harbor, the waterfront, mountain, and blue ocean visible far below. The camera chases behind him in a fast tracking shot, then swings into a dynamic sweeping orbit around him in mid-air. Sleek unmarked black attack drones dive toward him from multiple directions. He rolls and banks sharply between them, blue-white thrusters flaring from his boots and palms. He extends his arm and fires a bright cyan energy blast that strikes the first drone, which bursts into a ball of light and sparks. He spins, twists in mid-air, and fires again with both palms, destroying two more drones in a chain of glowing explosions. Smoke trails and glowing fragments streak across the sky around him. His dreadlocks whip in the wind, his eyes glowing electric blue, expression fierce and focused. Fast, kinetic, escalating rhythm. Consistent character, armor, and background throughout.",
        },
        {
          label: "Scene 3 · The Missile Save & Hero Moment — start frame: last frame of Scene 2 · 10s",
          text: "Cinematic sci-fi VFX sequence shot on a RED V-RAPTOR 8K, epic blockbuster style, warm golden sunset light breaking through drifting smoke, with intense cyan energy glow. The armored man with dreadlocks hovers in the sky above the harbor. A single missile streaks across the frame, leaving a white vapor trail as it heads down toward the waterfront. He turns sharply, and his thrusters roar to full power as he dives after it. The camera follows in a fast, dramatic tracking shot down toward the water. He overtakes the missile just above the harbor, positions himself in its path, and thrusts both palms forward. A massive cyan energy beam erupts from his hands and destroys the missile mid-air in a brilliant flash. A shockwave ripples out across the water's surface, rocking the moored boats and sending a fine mist into the air. As the light fades, the camera slowly orbits around him as he hovers just above the water, chest core glowing, embers and smoke drifting around him, with the waterfront, Ferris wheel, and flat-topped mountain intact behind him in the warm golden light. His expression settles from fierce intensity into calm, quiet victory. Epic, triumphant, powerful climax that resolves into stillness. Consistent character, armor, and background throughout.",
        },
      ],
      coverUrl: "/images/projects/harbour-defender/cover.jpg",
      gallery: ["/images/projects/harbour-defender/harbour-defender.mp4"],
      liveUrl: null,
      repoUrl: null,
      featured: false, // explorations stay off the home page; they appear on /work under their own tab
    },
  ],
  // Shown as the /SKILLS section (the data keeps the template's "services" name).
  services: [
    { title: "FRONTEND", description: "React and Next.js in TypeScript, with TanStack, Tailwind CSS and shadcn/ui — responsive, accessible interfaces.", previewUrl: null },
    { title: "BACKEND & APIS", description: "Clean Architecture APIs in C# and .NET with EF Core and SignalR, plus Java and Spring Boot, Node.js and Express, and Python.", previewUrl: null },
    { title: "DATABASES", description: "PostgreSQL, MySQL and Supabase (Auth, Realtime, Row Level Security) — schema design, multi-tenant databases, replication and Power BI reporting.", previewUrl: null },
    { title: "CLOUD & DEVOPS", description: "Azure DevOps and GitHub Actions pipelines with automated testing (Vitest, Testcontainers, Playwright), plus Azure, Docker, Vercel and AWS IAM/SSO.", previewUrl: null },
    { title: "AI & AUTOMATION", description: "AI-assisted engineering with Claude Code as my daily coding assistant, Claude Design for prototyping, prompt engineering, Replit, and conversational agents with Voiceflow.", previewUrl: null },
    { title: "PRODUCT & UI DESIGN", description: "Designing the interfaces I build — UI/UX that business stakeholders have approved without a dedicated designer.", previewUrl: null },
  ],
  experience: [
    {
      company: "Altron Digital Business",
      role: "Junior Software Engineer",
      period: "Oct 2024 - Now",
      summary:
        "One of four engineers picked for Altron’s first AI initiative. Lead developer of a multi-tenant point-of-sale platform and sole developer of a route-delivery platform, both built with Claude Code as my coding assistant; also set up MySQL replication with Power BI reporting for a legacy system, and redesigned a new HealthTech product’s UI/UX.",
      previewUrl: null,
    },
    {
      company: "Altron Digital Business",
      role: "Graduate Software Engineer",
      period: "Oct 2023 - Sep 2024",
      summary:
        "In a 3-person team, migrated a legacy ActionScript and Apache Royale web app to React and JavaScript, and built Spring Boot REST APIs connecting the new front end to CORBA middleware and the Java backend — taking it from proof of concept to MVP.",
      previewUrl: null,
    },
    {
      company: "Automated Fleet Solutions",
      role: "IT Intern",
      period: "Sep 2022 - Jan 2023",
      summary: "In a 4-person team building a Power Apps dashboard, wrote Python (Pandas) scripts to extract, clean and normalise Excel data for the database.",
      previewUrl: null,
    },
    {
      company: "University of the Western Cape",
      role: "BSc Computer Science",
      period: "Graduated 2023",
      summary:
        "Coursework in software engineering, data structures and algorithms, databases, operating systems, computer networks, machine learning and human-computer interaction.",
      previewUrl: null,
    },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/snare0625", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/neo-sekhukhune-a6a310207/", icon: "linkedin" },
  ],
};

/**
 * Archived on purpose: the Altron work projects. The Work section shows portfolio projects only;
 * the Junior Software Engineer row in Experience summarises this work. Not rendered anywhere —
 * move an entry back into `seed.projects` to show it again.
 */
export const archivedProjects: Project[] = [
    {
      slug: "point-of-sale-platform",
      type: "Professional",
      name: "Point-of-Sale Platform",
      title: "Multi-tenant Point-of-Sale Platform with QR Self-Ordering",
      tags: ["React", "TypeScript", ".NET 10", "EF Core", "PostgreSQL", "SignalR", "Azure", "Playwright"],
      summary:
        "A multi-tenant point-of-sale platform I built from an empty repo and still lead. It’s in pilot with three businesses, each on its own database.",
      note: "It started in June 2025, when I was one of four engineers picked for Altron’s first AI initiative — testing AI coding tools, starting with Replit and now Claude Code, by shipping production apps with them.",
      role: "Lead developer",
      highlights: [
        { label: "Architecture", text: "Set up a Clean Architecture so our analysts can build features with AI tools without the code getting messy." },
        {
          label: "AI workflow",
          text: "Built with Claude Code as my coding assistant. I set the architecture, steer it feature by feature, and review and test what it produces, so AI-written code stays consistent and maintainable.",
        },
        {
          label: "Self-ordering",
          text: "Built QR table ordering end to end. Customers scan their table’s code, order and ask for the bill from their phone, and the order reaches staff in real time. It runs as its own customer app with its own sign-in, and tabs settle on the existing tills.",
        },
        { label: "Money", text: "Owned the parts that handle money, including a double-entry ledger and daily cash-ups." },
        { label: "Design", text: "Designed the interface, which business stakeholders approved without a designer." },
        {
          label: "Demo videos",
          text: "Built a pipeline that generates narrated videos straight from the live app, so a UI change means re-running one command instead of re-recording. It produced 20 videos and helped win over a pilot client.",
        },
      ],
      coverUrl: null,
      gallery: [],
      liveUrl: null,
      repoUrl: null,
      featured: true,
    },
    {
      slug: "route-delivery-platform",
      type: "Professional",
      name: "Route-Delivery Platform",
      title: "Route-Delivery Platform for Distributors and Their Drivers",
      tags: [".NET 10", "PostgreSQL", "React", "TypeScript", "TanStack", "Testcontainers", "Azure DevOps"],
      summary:
        "Lets distributors’ drivers deliver to shops, take payment at the door, collect returns and capture the next order. I designed and built it on my own, taking it from proof of concept to an approved MVP.",
      note: "Built to be trusted before it touched a real system: a fake ERP and a fake driver let me test the whole delivery flow end to end before anything real was connected.",
      role: "Sole developer",
      highlights: [
        {
          label: "Backend",
          text: "A .NET 10 Clean Architecture API with separate entry points for the admin portal, the drivers’ mobile app and the distributor’s ERP system, and a database per distributor.",
        },
        { label: "Design", text: "Designed the admin portal’s UI/UX, which the business development manager approved for the MVP." },
        { label: "Testing", text: "212 automated tests, including integration tests against a real database, run on every build in Azure Pipelines." },
        { label: "AI workflow", text: "Built with Claude Code as my coding assistant, with the test suite checking every change before it ships." },
      ],
      coverUrl: null,
      gallery: [],
      liveUrl: null,
      repoUrl: null,
      featured: true,
    },
];
