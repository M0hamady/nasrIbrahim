# Esraa Learning Hub v2

A full Next.js/React rebuild of esraa.codeocean.online as a child-first learning platform plus Teacher Esraa's professional portfolio.

## Scope
- FS1 and FS2 early-years foundation
- Grade 1 to Grade 6 primary learning paths
- English, Maths, Science, Computing, Geography, History and Wellbeing structure
- Dedicated /numbers, /letters and /science experiences
- Parent, Student and Teacher authentication roles
- Firebase Auth and Firestore support
- Automatic Demo Mode when Firebase environment variables are absent
- Student dashboard, Parent Centre and Teacher Studio
- Smart next-step recommendations
- Printable family progress reports
- Teacher CV download, print and share
- Responsive mobile, tablet, desktop and smart-board layouts
- PWA-ready manifest

## Curriculum note
This project uses an original scope and sequence built around enquiry-led, active-learning principles and international-primary progression. It does not reproduce proprietary textbook pages, exercises or artwork. Oxford is a registered trade mark of Oxford University Press; this independent companion is not affiliated with or endorsed by OUP.

## Run
From the v2 folder run npm install then npm run dev.

## Firebase
Copy .env.example to .env.local, enable Email/Password Authentication in Firebase and add your public web-app configuration. Without Firebase configuration the platform uses Demo Mode so the UX can be reviewed immediately.

Suggested Firestore paths: users/{uid}, users/{uid}/children/{childId}, users/{uid}/progress/{subjectId}, lessons/{lessonId}.

## Deploy
In Vercel set Root Directory to v2, add Firebase environment variables, then attach esraa.codeocean.online.

## Next production milestones
1. Firestore-backed multi-child progress and teacher lesson CRUD.
2. Media library and audio phonics recordings.
3. Server-generated branded PDF reports.
4. Moderated AI practice generator with teacher approval before publishing.
5. Full lesson authoring workflow and content versioning.
