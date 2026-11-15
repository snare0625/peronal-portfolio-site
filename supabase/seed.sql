-- Starter content (mirrors content/seed.ts). Safe to re-run: clears and re-inserts list tables.

insert into public.site_settings (id, first_name, last_name, display_name, role, tagline, email, portrait_url, avatar_url, cv_url, cta_body)
values (
  1, 'NEO', 'SEKHUKHUNE', 'Neo Sekhukhune', 'Software Engineer',
  'I build software that fixes costly, recurring business problems — and helps companies grow revenue.',
  'sekhukhune056@gmail.com',
  '/images/neo-portrait.png',
  '/images/avatar.jpg',
  '/cv.pdf',
  'I’m open to full-time software engineering roles and selected freelance projects. Tell me what you’re building — I’d love to hear about it.'
)
on conflict (id) do nothing;

delete from public.projects;
insert into public.projects (slug, type, name, title, tags, summary, note, role, highlights, live_url, repo_url, sort) values
  ('queuepro', 'Personal', 'QueuePro', 'QueuePro — A Fair, Explainable Queue for Busy Clinics',
   '{"Next.js","TypeScript","Supabase","React","Vitest","GitHub Actions","Motion"}',
   'A clinic queue that decides who should be served next — balancing waiting time, urgency, appointments and service length — and explains every decision in plain language.',
   'Across 20 simulated busy clinic days, the smart queue cut urgent cases’ average wait from 38 to 16 minutes compared with first come, first served, saw the most appointments on time and had the fewest walk-outs of the three algorithms tested.',
   'Sole developer',
   '[
     {"label": "Smart ranking", "text": "A transparent scoring algorithm weighs waiting time, urgency, appointments and service length, with a fairness guarantee proven by a unit test: after about 50 minutes, nobody can overtake you."},
     {"label": "Explains itself", "text": "Every “why this customer?” is written in plain language from the same numbers that made the decision."},
     {"label": "Staffing", "text": "Assigns the best qualified staff member, forecasts every wait by replaying the queue forward, learns real service times during the day, and recommends an extra shift when a service is overloaded."},
     {"label": "Real-time & private", "text": "Every desk and the public waiting-room screen stay in sync through Supabase Realtime. Conditional updates stop two desks calling the same customer, and Row Level Security keeps names off the public screen."},
     {"label": "Simulation", "text": "Simulates a full clinic day (50–120 customers) and compares three queue algorithms, with playback and 20-day averages."},
     {"label": "Quality", "text": "69 automated tests and CI on every push, including a security check that attacks the real database with the public key and fails if any private data is readable or writable."},
     {"label": "AI workflow", "text": "Built with Claude Code as an AI pair programmer, one feature at a time, each with tests — and design choices checked with data rather than assumed."}
   ]'::jsonb,
   'https://smart-queue-management-pi.vercel.app/', 'https://github.com/snare0625/smart-queue-management', 3),
  ('ledger', 'Personal', 'Ledger', 'Ledger — Zero-Based Budgeting, One Cycle at a Time',
   '{"Next.js 16","TypeScript","Supabase","Tailwind CSS","shadcn/ui","Zod","Vitest","PWA"}',
   'A mobile-first budgeting app built around monthly cycles: income goes into Fixed, Variable and Savings line items until nothing is left to allocate. Includes savings goals, a read-only history of past cycles and CSV export.',
   'Designed in Claude Design, then built with Claude Code into a secure, installable app — adding real features wherever the prototype only mocked them up.',
   'Sole developer',
   '[
     {"label": "Passcode lock", "text": "Email sign-in plus a 4-digit passcode lock, like a banking app. Passcodes are bcrypt-hashed in a private schema, five wrong attempts lock verification for five minutes in Postgres, and the unlock cookie is HMAC-signed and expires after 30 minutes idle."},
     {"label": "Data integrity", "text": "Row Level Security on every table, one open cycle per user enforced by a partial unique index, closed cycles made read-only by a database trigger, and new cycles opened in a single transaction that carries items over."},
     {"label": "Server-first", "text": "Next.js 16 Server Components stream each user’s data in, Server Actions validate every write with Zod, and line-item toggles update optimistically and roll back if the write fails."},
     {"label": "Installable", "text": "Installs to the home screen as a PWA, with an offline fallback that deliberately caches none of the user’s budget data."},
     {"label": "Beyond the design", "text": "Added what the prototype only mocked up: activity logging, multi-currency display, CSV export of every cycle and a lock-now button."},
     {"label": "Testing", "text": "44 unit tests (Vitest) covering budget maths, CSV export, formatting, route gating and the unlock token."},
     {"label": "AI workflow", "text": "Designed in Claude Design and built with Claude Code as my coding assistant, working from a written build plan, with unit tests and type checks on every change."}
   ]'::jsonb,
   'https://ledger-budgeting-app-ruby.vercel.app/', 'https://github.com/snare0625/ledger-budgeting-app', 4);

update public.projects
set cover_url = '/images/projects/queuepro/live-queue.png',
    gallery = '{"/images/projects/queuepro/live-queue.png","/images/projects/queuepro/simulation.png","/images/projects/queuepro/display.png"}'
where slug = 'queuepro';

-- AI exploration (featured = false: shown on /work, not the home page)
insert into public.projects (slug, type, name, title, tags, summary, note, role, highlights, prompts, cover_url, gallery, live_url, repo_url, featured, sort) values
  ('harbour-defender', 'Exploration', 'Harbour Defender', 'Harbour Defender — A 30-Second AI Sci-Fi Short Made with Kling',
   '{"Kling","Prompt Engineering","AI Video","Image-to-Video"}',
   'A three-scene sci-fi short starring me as an armoured hero defending a harbour city from attack drones, made by chaining three 10-second Kling generations into one continuous sequence.',
   'The same skills I use to steer Claude Code — a clear spec, explicit constraints and handing state from one step to the next — applied to a completely different domain.',
   'Prompt engineering & direction',
   $json$[
  {
    "label": "Chained scenes",
    "text": "Kling generates 10 seconds at a time, so each scene starts from the last frame of the one before — three generations become one continuous 30-second sequence."
  },
  {
    "label": "Shared constraints",
    "text": "One negative prompt across all three scenes guards against the usual failures: morphing faces, armour changing colour, extra limbs, warped buildings and flicker."
  },
  {
    "label": "Prompt template",
    "text": "Every scene uses the same structure — camera and lighting spec, an anchor that locks the character and location to the reference image, beat-by-beat action and camera moves, a rhythm cue, and a closing consistency line."
  },
  {
    "label": "Three-act story",
    "text": "Threat and takeoff, aerial battle, then the missile save — with the light moving from late afternoon to golden hour to sunset so time flows naturally across the cuts."
  },
  {
    "label": "Starring me",
    "text": "The hero is me: the reference image is built from my own photo, and every prompt anchors my likeness and armour to it."
  },
  {
    "label": "One attempt",
    "text": "Each scene came out in a single attempt — the planning in the prompts did the work, not trial and error."
  },
  {
    "label": "Next time",
    "text": "Push the realism further, so skin, lighting and motion read as live-action footage rather than CGI."
  }
]$json$::jsonb,
   $json$[
  {
    "label": "Shared negative prompt · used for all three scenes",
    "text": "morphing face, changing armor design, red armor, gold armor, extra limbs, distorted hands, warped buildings, melting boats, duplicated characters, blurry, flickering, low quality, cartoon, text, watermark"
  },
  {
    "label": "Scene 1 · The Threat & Takeoff — start frame: waterfront reference image · 10s",
    "text": "Cinematic sci-fi VFX sequence shot on a RED V-RAPTOR 8K, epic blockbuster style, bright late-afternoon sunlight with crisp shadows and cool cyan accent glow. Keep the man, his gunmetal armor with glowing cyan lines, and the harbor waterfront exactly as in the reference image. The scene opens on a slow push-in toward him as he stands on the stone promenade, gazing up at the sky. A low rumble builds. Far above the flat-topped mountain, a formation of sleek unmarked black attack drones appears, trailed by thin white vapor streaks of incoming missiles. His expression hardens from calm focus to fierce resolve. The cyan lines across his armor light up one by one from his chest core outward to his hands and boots. He bends his knees, and bright blue-white thrusters ignite beneath his boots and in his palms, kicking up a ring of dust and spray across the promenade and rippling the harbor water. Seagulls scatter. With a deep blast of energy he launches straight up into the sky. The camera tilts and tracks upward with him, the waterfront, boats, and Ferris wheel dropping away below as he climbs toward the drones. Tense, building, anticipatory rhythm. Consistent character, armor, and background throughout."
  },
  {
    "label": "Scene 2 · The Aerial Battle — start frame: last frame of Scene 1 · 10s",
    "text": "Cinematic sci-fi VFX sequence shot on a RED V-RAPTOR 8K, epic blockbuster style, bright golden afternoon light with lens flares and glowing cyan energy effects. The armored man with dreadlocks flies high above the harbor, the waterfront, mountain, and blue ocean visible far below. The camera chases behind him in a fast tracking shot, then swings into a dynamic sweeping orbit around him in mid-air. Sleek unmarked black attack drones dive toward him from multiple directions. He rolls and banks sharply between them, blue-white thrusters flaring from his boots and palms. He extends his arm and fires a bright cyan energy blast that strikes the first drone, which bursts into a ball of light and sparks. He spins, twists in mid-air, and fires again with both palms, destroying two more drones in a chain of glowing explosions. Smoke trails and glowing fragments streak across the sky around him. His dreadlocks whip in the wind, his eyes glowing electric blue, expression fierce and focused. Fast, kinetic, escalating rhythm. Consistent character, armor, and background throughout."
  },
  {
    "label": "Scene 3 · The Missile Save & Hero Moment — start frame: last frame of Scene 2 · 10s",
    "text": "Cinematic sci-fi VFX sequence shot on a RED V-RAPTOR 8K, epic blockbuster style, warm golden sunset light breaking through drifting smoke, with intense cyan energy glow. The armored man with dreadlocks hovers in the sky above the harbor. A single missile streaks across the frame, leaving a white vapor trail as it heads down toward the waterfront. He turns sharply, and his thrusters roar to full power as he dives after it. The camera follows in a fast, dramatic tracking shot down toward the water. He overtakes the missile just above the harbor, positions himself in its path, and thrusts both palms forward. A massive cyan energy beam erupts from his hands and destroys the missile mid-air in a brilliant flash. A shockwave ripples out across the water's surface, rocking the moored boats and sending a fine mist into the air. As the light fades, the camera slowly orbits around him as he hovers just above the water, chest core glowing, embers and smoke drifting around him, with the waterfront, Ferris wheel, and flat-topped mountain intact behind him in the warm golden light. His expression settles from fierce intensity into calm, quiet victory. Epic, triumphant, powerful climax that resolves into stillness. Consistent character, armor, and background throughout."
  }
]$json$::jsonb,
   '/images/projects/harbour-defender/cover.jpg', '{"/images/projects/harbour-defender/harbour-defender.mp4"}', null, null, false, 5);

delete from public.services;
insert into public.services (title, description, sort) values
  ('FRONTEND', 'React and Next.js in TypeScript, with TanStack, Tailwind CSS and shadcn/ui — responsive, accessible interfaces.', 1),
  ('BACKEND & APIS', 'Clean Architecture APIs in C# and .NET with EF Core and SignalR, plus Java and Spring Boot, Node.js and Express, and Python.', 2),
  ('DATABASES', 'PostgreSQL, MySQL and Supabase (Auth, Realtime, Row Level Security) — schema design, multi-tenant databases, replication and Power BI reporting.', 3),
  ('CLOUD & DEVOPS', 'Azure DevOps and GitHub Actions pipelines with automated testing (Vitest, Testcontainers, Playwright), plus Azure, Docker, Vercel and AWS IAM/SSO.', 4),
  ('AI & AUTOMATION', 'AI-assisted engineering with Claude Code as my daily coding assistant, Claude Design for prototyping, prompt engineering, Replit, and conversational agents with Voiceflow.', 5),
  ('PRODUCT & UI DESIGN', 'Designing the interfaces I build — UI/UX that business stakeholders have approved without a dedicated designer.', 6);

delete from public.experience;
insert into public.experience (company, role, period, summary, sort) values
  ('Altron Digital Business', 'Junior Software Engineer', 'Oct 2024 - Now',
   'One of four engineers picked for Altron’s first AI initiative. Lead developer of a multi-tenant point-of-sale platform and sole developer of a route-delivery platform, both built with Claude Code as my coding assistant; also set up MySQL replication with Power BI reporting for a legacy system, and redesigned a new HealthTech product’s UI/UX.', 1),
  ('Altron Digital Business', 'Graduate Software Engineer', 'Oct 2023 - Sep 2024',
   'In a 3-person team, migrated a legacy ActionScript and Apache Royale web app to React and JavaScript, and built Spring Boot REST APIs connecting the new front end to CORBA middleware and the Java backend — taking it from proof of concept to MVP.', 2),
  ('Automated Fleet Solutions', 'IT Intern', 'Sep 2022 - Jan 2023',
   'In a 4-person team building a Power Apps dashboard, wrote Python (Pandas) scripts to extract, clean and normalise Excel data for the database.', 3),
  ('University of the Western Cape', 'BSc Computer Science', 'Graduated 2023',
   'Coursework in software engineering, data structures and algorithms, databases, operating systems, computer networks, machine learning and human-computer interaction.', 4);

delete from public.socials;
insert into public.socials (label, href, icon, sort) values
  ('GitHub', 'https://github.com/snare0625', 'github', 1),
  ('LinkedIn', 'https://www.linkedin.com/in/neo-sekhukhune-a6a310207/', 'linkedin', 2);
