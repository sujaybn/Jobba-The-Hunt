# Developer Log

## [2025-09-01] (Noon session) : System design and documentation

- **Task:** Define the problem statement and draft initial desgin and document the same with relavent UML diagrams
- **Actions:**
  - Laid out a basic problem and feature definition.
  - Added UML diagrams for architechture, model and userflow.
  - Updated the design documents with the comprehensive basic system desgin documentation.
- **Learnings:**
  - UML diagrams can be easily integrated into markdown docs using **mermaid**.
  - One of the questions about the ultimate product version of this app is answered **(browser extension)**.
- **Next steps:**
  - Define the technical functional and non-functional requirements(NFR).
  - Due-diligence on risk and challenges.
  - MVP1 to be finalised.
  - Perhaps discuss the design with another engineer to see if things are on track. 
---

## [2025-09-01] (Morning session) : Auth route setup and verification

- **Task:** Set up NextAuth API route and confirm routing works.
- **Actions:**
  - Created folder `src/app/api/auth/[...nextauth]/`.
  - Added `route.ts` file and wired it with NextAuth handler.
  - Fixed zsh globbing issue when moving `[...nextauth]` folder (`mv` with quotes).
  - Restarted dev server and validated routes.
- **Verification:**
  - `/api/auth/signin` loads the sign-in flow.
  - `/api/auth/session` returns expected JSON response.
- **Learnings:**
  - Next.js 13+ App Router uses **nested dynamic routes** like `[...nextauth]`.
  - zsh interprets `[` as a glob, must use quotes or escapes.
  - Confirmed API route resolution works before deeper Prisma/DB integration.
- **Next steps:**
  - Take a step back to document **system design** (UML diagrams, data flow).
  - Define auth + application tracking entities.
  - Decide how MVP CRUD + auth integration should be structured.

---

## 2025-08-29 — Project Kickoff

### What I did
- Created the repo: `jobba-the-hunt` (JobHunt Buddy).
- Bootstrapped a Next.js 15 app with TypeScript, Tailwind, ESLint.
- Chose modern defaults (src dir, App Router, Turbopack, default alias).
- Verified the dev server runs successfully at `localhost:3000`.

### Decisions & Why
- **Name:** Picked *Jobba-the-Hunt* / JobHunt Buddy → ties directly to my job search and becomes a strong story in interviews.  
- **App Router:** Went with Next.js App Router → aligned with modern best practices.  
- **Repo Structure:** Added `/docs` folder with `backlog.md`, `design.md`, `devlog.md` → shows evolution, not just code.  

### Next Steps
- Replace boilerplate README with project scope + MVP.  
- Add first system design draft (`design.md`) → high-level diagram + DB schema.  
- Populate backlog with MVP features and possible enhancements.  
