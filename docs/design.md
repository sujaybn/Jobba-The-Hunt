# JobbaTheHunt Design Document

## Elevator Pitch
JobbaTheHunt is a lightweight, personal product to track job applications, organize application-related notes and learnings, and measure job-search progress. Built for engineers and knowledge workers managing parallel applications, it’s a single place to track status, record interview notes and rejection reasons, and analyze conversion rates—while demonstrating full-stack and DevOps skills.

---

## Motivation
Engineers running active searches face recurring pain points:

- Job tracking is fragmented—spreadsheets, emails, memory.
- Interview notes + feedback are scattered, failures and improvements aren’t tracked.
- It’s challenging to measure progress (applied, interviewed, offers) or patterns.
- Reapplying/following-up lacks reminders or structure.

**JobbaTheHunt** solves these with structured tracking, a unified story per application, and health analytics.

---

## Target Users & Personas
- **Primary:** Individual contributors (SWE, PMs, designers) with active job searches.  
- **Secondary:** Early-career engineers seeking growth via analytics and reflection.  
- **Tertiary (future):** Recruiters, bootcamps, managers tracking analytics across cohorts.  

**Persona Example:** Senior SWE (7 years), hunting jobs, values organization and reflective growth, wants a portfolio-showcasing product.

---

## Core Value Proposition
- **Single Source of Truth:** All details, docs, notes per job application.  
- **Status Pipeline:** Track stages (Applied, Screening, Interview, Offer, Rejected) and timestamps.  
- **Post-Interview Learnings:** Tag and track root causes (e.g., system design, DSA gaps).  
- **Minimal Friction:** Fast-add, browser save.  
- **Export & Share:** Reports for interviews, coaching.  

---

## MVP Scope
- Email/password signup  
- CRUD Application (full data fields)  
- Status transitions, history  
- Dashboard (list, filter by status, sort)  
- Devlog/project README integration  
- Simple CI (Vercel + GitHub Actions), SQLite/Postgres  

**Phase 2+:** Tags, interview notes, rejection taxonomy, analytics, file attachments, reminders.  
**Phase 3 (future):** Extension, team features, AI feedback.  

---

## Architecture Overview
A Next.js frontend interacts with a Node/Prisma API, backed by SQLite/Postgres. DevOps handled via Vercel + GitHub Actions.

```mermaid
flowchart LR
    User((User))
    WebUI["Web Frontend (Next.js)"]
    API["Backend API (Node.js/Prisma)"]
    DB[("SQLite/PG Database")]
    DevOps["CI/CD: Vercel, GitHub"]
    Integrations["Integrations (future: Email, Ext, AI)"]

    User --> WebUI
    WebUI --> API
    API --> DB
    WebUI --> DevOps
    API --> Integrations
```

## Data Schema (Entity Relationship Diagram)

```mermaid
erDiagram
    USER {
      id INT PK
      email VARCHAR
      name VARCHAR
      pwdHash VARCHAR
      createdAt DATETIME
    }
    APPLICATION {
      id INT PK
      company VARCHAR
      role VARCHAR
      jobUrl VARCHAR
      status VARCHAR
      appliedDate DATE
      updatedAt DATETIME
      salaryExpectation VARCHAR
      notes TEXT
      recruiter VARCHAR
      contactEmail VARCHAR
    }
    INTERVIEWROUND {
      id INT PK
      applicationId INT FK
      roundNumber INT
      date DATE
      result VARCHAR
      notes TEXT
    }
    DEVLOGENTRY {
      id INT PK
      userId INT FK
      date DATE
      content TEXT
    }
    LEARNING {
      id INT PK
      applicationId INT FK
      userId INT FK
      content TEXT
    }
    ATTACHMENT {
      id INT PK
      applicationId INT FK
      fileUrl VARCHAR
      type VARCHAR
    }
    TAG {
      id INT PK
      name VARCHAR
    }
    APPLICATION_TAG {
      applicationId INT FK
      tagId INT FK
    }

    USER ||--o{ APPLICATION : owns
    APPLICATION ||--o{ INTERVIEWROUND : has
    APPLICATION ||--o{ LEARNING : has
    USER ||--o{ DEVLOGENTRY : writes
    APPLICATION ||--o{ ATTACHMENT : has
    APPLICATION ||--o{ APPLICATION_TAG : tagged
    TAG ||--o{ APPLICATION_TAG : tags
```
## Prisma Schema

```mermaid
erDiagram
    USER {
      Int id PK
      String email
      String name
      String pwdHash
      DateTime createdAt
    }
    APPLICATION {
      Int id PK
      String company
      String role
      String jobUrl
      String status
      DateTime appliedDate
      DateTime updatedAt
      String salaryExpectation
      String notes
      String recruiter
      String contactEmail
      Int userId FK
    }
    INTERVIEWROUND {
      Int id PK
      Int applicationId FK
      Int roundNumber
      DateTime date
      String result
      String notes
    }
    DEVLOGENTRY {
      Int id PK
      DateTime date
      String content
      Int userId FK
    }
    LEARNING {
      Int id PK
      String content
      Int userId FK
      Int applicationId FK
    }
    ATTACHMENT {
      Int id PK
      String fileUrl
      String type
      Int applicationId FK
    }
    TAG {
      Int id PK
      String name
    }
    APPLICATION_TAG {
      Int applicationId FK
      Int tagId FK
    }

    USER ||--o{ APPLICATION : owns
    USER ||--o{ DEVLOGENTRY : writes
    USER ||--o{ LEARNING : has
    APPLICATION ||--o{ INTERVIEWROUND : has
    APPLICATION ||--o{ LEARNING : has
    APPLICATION ||--o{ ATTACHMENT : has
    APPLICATION ||--o{ APPLICATION_TAG : tagged
    TAG ||--o{ APPLICATION_TAG : tags
```

## Key Use Cases & Sequence Diagrams
### Sign Up

```mermaid
sequenceDiagram
    participant U as User
    participant W as Web UI
    participant S as API Server
    participant D as DB

    U->>W: Fill out signup form
    W->>S: POST /register (email, pwd)
    S->>D: Create User record
    D-->>S: Success/Failure
    S->>W: Show confirmation/error
```
### Add application

```mermaid
sequenceDiagram
    participant U as User
    participant W as Web UI
    participant S as API Server
    participant D as DB

    U->>W: Click "Add Application"
    W->>W: Open modal, collect fields
    W->>S: POST /application
    S->>D: Insert Application, update status history
    D-->>S: Success
    S->>W: Display new App Card
```

### Update status + timeline
```mermaid
sequenceDiagram
    participant U as User
    participant W as Web UI
    participant S as API Server
    participant D as DB

    U->>W: Edit Application, change status
    W->>S: PATCH /application/:id/status
    S->>D: Update status, append timeline entry
    D-->>S: Success
    S->>W: Show status change in Activity Timeline
```

### Analytics: Application funnel
```mermaid
graph TD
    Applied[100 Applied]
    Screening[50 Screening]
    Interview[30 Interview]
    Offer[4 Offer]
    Rejected[66 Rejected]

    Applied --> Screening
    Screening --> Interview
    Interview --> Offer
    Interview --> Rejected
    Screening --> Rejected
    Applied --> Rejected
```
## Security & Privacy
- **Auth:** bcrypt/argon2, NextAuth (+ JWT/sessions)  
- **Data isolation:** Row-level user access  
- **Secrets:** `.env` files, no DB credentials in repo  
- **Exports & deletion:** Full user control  
- **Future:** OAuth tokens encrypted, explicit consent for integrations  

---

## Constraints & Assumptions
- MVP is **single-user per account**, no collaboration  
- Free-tier infra: **Vercel + Neon/Supabase PG**  
- Fast developer iteration, minimal but polished UI  
- No heavy real-time/ML in MVP  

---

## Success Metrics
- Daily active users, **apps tracked per user**  
- **Conversion rates**: applications → screenings → interviews → offers  
- **Learnings logged** per application  
- **Behavioral metric:** actual daily use confirms product solving core pain  

---

## Acceptance Criteria
- End-to-end **sign-up, CRUD application, and status transition** works  
- Dashboard **lists, filters, and sorts** applications  
- Basic **README + design/devlog committed**  

---

## Mission Statement & Tagline
**JobHunt Buddy** is a personal job-application manager that captures each application’s lifecycle, interview notes, and learning points—enabling data-driven improvement of your job search. Built to be minimal, high-signal, and portfolio-ready.  

**Short tagline:**  
*Track applications. Capture learnings. Improve outcomes.*  
