import { AnalysisResult } from '../types/resume';

export const SAMPLE_RESUME_TEXT = `
Alex Mercer
Seattle, WA | alex.mercer@email.com | (206) 555-0192 | github.com/alexmercer | linkedin.com/in/alexmercer

PROFESSIONAL SUMMARY
Results-driven Full Stack Software Engineer with 3+ years of experience building scalable web applications, RESTful APIs, and cloud services. Proven track record in optimizing frontend performance, designing relational databases, and implementing automated testing. Passionate about writing clean, maintainable TypeScript and React code.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, SQL, HTML5, CSS3
Frontend: React, Redux Toolkit, Tailwind CSS, Next.js, Webpack
Backend: Node.js, Express.js, REST APIs, PostgreSQL, Redis
Cloud & Tools: Docker, AWS (S3, EC2), Git, GitHub Actions, Jest, Postman

WORK EXPERIENCE
Software Engineer | Apex Cloud Tech, Seattle, WA
Jan 2023 – Present
- Built and maintained customer-facing dashboard features using React, TypeScript, and Tailwind CSS, improving user engagement by 22%.
- Designed and integrated 15+ backend REST API endpoints using Node.js and Express to process high-volume user data.
- Optimized PostgreSQL database queries and added Redis caching, reducing average API response latency from 450ms to 120ms.
- Collaborated with UX team and backend developers in an Agile environment with bi-weekly sprints.
- Wrote unit and integration tests using Jest and React Testing Library, achieving 85% test coverage.

Junior Web Developer | Innovate Softworks, Bellevue, WA
Jul 2021 – Dec 2022
- Developed responsive web interfaces for client portals using React and JavaScript.
- Assisted in migrating legacy monolithic API to microservices architecture using Express.js.
- Managed version control with Git and participated in code reviews to ensure code quality standards.

PROJECTS
TaskFlow - Team Project Management SaaS
- Built a full-stack task manager with React, Node.js, Express, and PostgreSQL featuring real-time task updates.
- Implemented user authentication with JWT tokens and secure password hashing with bcrypt.
- Deployed application on AWS EC2 with continuous integration via GitHub Actions.

E-Commerce Analytics Engine
- Created a dashboard visualizing sales trends using React, Chart.js, and Python FastAPI backend.
- Extracted and transformed transaction data from PostgreSQL database for interactive reporting.

EDUCATION
Bachelor of Science in Computer Science
University of Washington, Seattle, WA | Graduated May 2021
`;

export const SAMPLE_JOB_DESCRIPTION = `
Senior / Mid-Level Full Stack Engineer
Location: Seattle, WA (Hybrid)

About the Role:
We are looking for a versatile Full Stack Software Engineer to build scalable microservices and intuitive user interfaces for our enterprise cloud platform.

Key Responsibilities:
- Design and implement scalable frontend web applications using React, TypeScript, and modern styling frameworks.
- Architect high-performance backend microservices and REST APIs using Node.js and Express.
- Manage and optimize relational databases (PostgreSQL/MySQL) and NoSQL stores.
- Leverage AWS cloud services (S3, EC2, Lambda, DynamoDB) and containerization with Docker & Kubernetes.
- Drive CI/CD pipelines, automated testing (Jest, Cypress), and monitoring solutions.
- Collaborate with product managers, UX designers, and senior engineers in an Agile environment.

Requirements:
- 3+ years of experience in software development with JavaScript/TypeScript.
- Strong proficiency in React, Node.js, and Express.js.
- Solid understanding of SQL databases (PostgreSQL) and RESTful API design.
- Hands-on experience with Docker, AWS cloud infrastructure, and CI/CD tools.
- Familiarity with GraphQL, Redis caching, and microservices architecture is a strong plus.
- Excellent communication skills and problem-solving mindset.
`;

export const SAMPLE_ANALYSIS_RESULT: AnalysisResult = {
  atsScore: 82,
  atsBreakdown: {
    keywordMatch: 21,        // max 25
    skillsMatch: 22,         // max 25
    experienceRelevance: 17, // max 20
    projectRelevance: 12,    // max 15
    resumeStructure: 6,      // max 10
    formattingReadability: 4 // max 5
  },
  atsExplanation: "The resume strongly matches core technologies (TypeScript, React, Node.js, Express, PostgreSQL, AWS, Docker) and demonstrates quantified impact in engineering roles. Minor point deductions stem from missing Kubernetes, GraphQL, and Lambda keywords requested in the job description.",
  jobMatchScore: 86,
  summary: "Strong candidate match! The candidate meets 85%+ of core requirements with 3+ years of relevant experience in React, Node.js, PostgreSQL, and AWS. Adding brief mentions of Docker container orchestration or GraphQL (if experienced) will elevate the profile to a top-tier match.",
  overallVerdict: "Strong Match — Highly recommended for interview submission.",
  matchedSkills: [
    { name: "React", category: "Frontend", explanation: "Extensive experience built in recent roles and SaaS projects." },
    { name: "TypeScript", category: "Languages", explanation: "Listed in core technical skills and used in daily tasks." },
    { name: "Node.js & Express", category: "Backend", explanation: "Demonstrated through 15+ REST APIs built and backend optimization." },
    { name: "PostgreSQL", category: "Databases", explanation: "Query optimization and schema usage listed across work and projects." },
    { name: "AWS (S3, EC2)", category: "Cloud", explanation: "AWS deployment and infrastructure experience present." },
    { name: "Docker", category: "DevOps", explanation: "Containerization mentioned in tools and projects." },
    { name: "REST APIs", category: "Backend", explanation: "Core backend design pattern used extensively." },
    { name: "Jest / Testing", category: "Tools", explanation: "85% test coverage achieved with Jest and React Testing Library." },
    { name: "Git & CI/CD", category: "DevOps", explanation: "GitHub Actions continuous integration configured for SaaS deployment." }
  ],
  missingSkills: [
    { name: "Kubernetes", category: "DevOps", explanation: "Requested in JD requirements but absent from resume." },
    { name: "GraphQL", category: "Backend", explanation: "Nice-to-have requirement listed in JD but not found in resume." },
    { name: "AWS Lambda", category: "Cloud", explanation: "Serverless AWS experience requested but only EC2/S3 listed." }
  ],
  partialSkills: [
    { name: "Microservices", category: "Backend", explanation: "Assisted in legacy migration to microservices, but JD asks for architecting microservices." },
    { name: "Redis Caching", category: "Databases", explanation: "Used Redis caching for API optimization; matches JD bonus skill." }
  ],
  categorizedSkills: {
    programming: { resume: ["TypeScript", "JavaScript", "Python", "SQL", "HTML5", "CSS3"], required: ["TypeScript", "JavaScript", "SQL"], missing: [], weak: [] },
    frontend: { resume: ["React", "Redux Toolkit", "Tailwind CSS", "Next.js"], required: ["React", "TypeScript", "Tailwind CSS"], missing: [], weak: [] },
    backend: { resume: ["Node.js", "Express.js", "REST APIs", "PostgreSQL", "Redis"], required: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Microservices"], missing: ["GraphQL"], weak: ["Microservices"] },
    databases: { resume: ["PostgreSQL", "Redis"], required: ["PostgreSQL", "MySQL", "NoSQL"], missing: ["MySQL", "NoSQL"], weak: [] },
    cloud: { resume: ["AWS (S3, EC2)"], required: ["AWS (S3, EC2, Lambda, DynamoDB)"], missing: ["AWS Lambda", "DynamoDB"], weak: [] },
    devops: { resume: ["Docker", "Git", "GitHub Actions"], required: ["Docker", "Kubernetes", "CI/CD"], missing: ["Kubernetes"], weak: [] },
    ai_ml: { resume: [], required: [], missing: [], weak: [] },
    tools: { resume: ["Jest", "Postman", "Webpack"], required: ["Jest", "Cypress"], missing: ["Cypress"], weak: [] },
    soft_skills: { resume: ["Agile", "Code Reviews", "Cross-functional collaboration"], required: ["Communication", "Problem Solving", "Agile"], missing: [], weak: [] },
    other: { resume: [], required: [], missing: [], weak: [] }
  },
  keywords: [
    { keyword: "TypeScript", status: "found", frequency: 4, importance: "high" },
    { keyword: "React", status: "found", frequency: 5, importance: "high" },
    { keyword: "Node.js", status: "found", frequency: 3, importance: "high" },
    { keyword: "Express", status: "found", frequency: 3, importance: "high" },
    { keyword: "PostgreSQL", status: "found", frequency: 4, importance: "high" },
    { keyword: "AWS", status: "found", frequency: 2, importance: "high" },
    { keyword: "Docker", status: "found", frequency: 2, importance: "high" },
    { keyword: "Kubernetes", status: "missing", frequency: 0, importance: "high" },
    { keyword: "GraphQL", status: "missing", frequency: 0, importance: "medium" },
    { keyword: "CI/CD", status: "found", frequency: 2, importance: "medium" }
  ],
  missingImportantKeywords: ["Kubernetes", "GraphQL", "AWS Lambda", "Cypress", "Microservices Architecture"],
  strengths: [
    "Quantified achievements in work experience (e.g., 'reduced average API response latency from 450ms to 120ms', 'improving user engagement by 22%').",
    "Direct alignment with primary tech stack: React, TypeScript, Node.js, Express, PostgreSQL.",
    "Solid full-stack project portfolio showcasing end-to-end deployment with AWS and GitHub Actions.",
    "Strong emphasis on testing (Jest, 85% coverage) and modern engineering practices."
  ],
  weaknesses: [
    "Missing container orchestration tools (Kubernetes) required for the senior role.",
    "Lacks explicit mention of GraphQL or serverless compute (AWS Lambda) highlighted in job specs.",
    "Project bullet points could highlight user metrics or scale details."
  ],
  formattingIssues: [
    { issue: "Pipeline / Pipe character delimiters in skills header", risk: "low", explanation: "Standard pipe characters are generally parseable, but simple comma-separated lists have slightly higher ATS compatibility across older software." },
    { issue: "Compact single-column structure", risk: "low", explanation: "Excellent clean layout! No multi-column tables or non-standard graphics detected." }
  ],
  sectionAnalysis: [
    { name: "Contact Information", present: true, status: "present", feedback: "Contains Email, Phone, Location, GitHub, and LinkedIn links." },
    { name: "Professional Summary", present: true, status: "present", feedback: "Concise 3-sentence summary highlighting experience level and core technologies." },
    { name: "Technical Skills", present: true, status: "present", feedback: "Well-structured categorization by Languages, Frontend, Backend, Cloud & Tools." },
    { name: "Work Experience", present: true, status: "present", feedback: "Reverse chronological order with bullet points starting with strong action verbs." },
    { name: "Projects", present: true, status: "present", feedback: "Includes two full-stack projects with technology stack breakdown." },
    { name: "Education", present: true, status: "present", feedback: "Computer Science degree from accredited university clearly stated." },
    { name: "Certifications", present: false, status: "optional", feedback: "Optional section. Consider adding AWS Certified Developer if pursued." },
    { name: "Achievements", present: false, status: "optional", feedback: "Optional section. Key achievements are already embedded in bullet points." }
  ],
  bulletImprovements: [
    {
      before: "Assisted in migrating legacy monolithic API to microservices architecture using Express.js.",
      problem: "Uses weak passive voice ('Assisted in') and lacks clear ownership or measurable outcome.",
      after: "Co-architected the migration of a monolithic API to an Express.js microservices architecture, improving system modularity and deployment velocity."
    },
    {
      before: "Managed version control with Git and participated in code reviews to ensure code quality standards.",
      problem: "Generic responsibility description without highlighting active impact or standards set.",
      after: "Enforced code quality standards by conducting 30+ peer code reviews and standardizing Git feature-branch workflows."
    },
    {
      before: "Developed responsive web interfaces for client portals using React and JavaScript.",
      problem: "Lacks detail on scale, complexity, or user impact.",
      after: "Engineered responsive, accessible client portal interfaces using React and JavaScript, serving 5,000+ monthly active users."
    }
  ],
  recommendations: [
    {
      priority: "HIGH",
      title: "Integrate Kubernetes & Serverless mentions if applicable",
      detail: "The job description highlights Kubernetes and AWS Lambda. If you have hands-on experience with container orchestration or serverless functions in side projects or coursework, explicitly add a bullet point detailing it. Consider adding this skill only if you genuinely have experience with it."
    },
    {
      priority: "MEDIUM",
      title: "Elevate microservices achievements",
      detail: "Update your Junior Web Developer bullet point from 'Assisted in' to a stronger action verb like 'Co-designed' or 'Refactored' to better position yourself for mid/senior level architecture expectations."
    },
    {
      priority: "LOW",
      title: "Add a dedicated section link for AWS Certifications",
      detail: "If you plan to complete an AWS Cloud Practitioner or Developer Associate certification, highlight it near your education or skills block."
    }
  ],

  // --- 7 Core Career Navigator Feature Data ---
  careerMatches: [
    {
      title: "Full Stack Engineer",
      fitScore: 86,
      whyFit: "Strong balance of React/TypeScript frontend and Node.js/PostgreSQL backend experience with cloud deployment.",
      existingSkills: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "REST APIs", "AWS EC2", "Docker"],
      missingSkills: ["Kubernetes", "GraphQL", "AWS Lambda"]
    },
    {
      title: "Backend Developer",
      fitScore: 81,
      whyFit: "Extensive API engineering experience, database optimization, Redis caching, and microservices work.",
      existingSkills: ["Node.js", "Express", "PostgreSQL", "Redis", "REST APIs", "SQL", "Python"],
      missingSkills: ["gRPC", "Kafka", "System Design Patterns"]
    },
    {
      title: "Frontend Engineer",
      fitScore: 78,
      whyFit: "Proficient in React, TypeScript, Redux Toolkit, and Tailwind CSS with proven user engagement gains.",
      existingSkills: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Next.js", "Jest"],
      missingSkills: ["Cypress E2E", "Performance Profiling", "Web Accessibility (a11y)"]
    },
    {
      title: "DevOps / Cloud Engineer",
      fitScore: 68,
      whyFit: "Hands-on experience with AWS, Docker containers, and GitHub Actions CI/CD pipelines.",
      existingSkills: ["Docker", "AWS S3/EC2", "Git", "GitHub Actions", "Shell Scripting"],
      missingSkills: ["Kubernetes", "Terraform / IaC", "Prometheus / Grafana"]
    },
    {
      title: "Data / Backend Analyst",
      fitScore: 62,
      whyFit: "Demonstrated data extraction and visualization in Python FastAPI & PostgreSQL analytics projects.",
      existingSkills: ["Python", "SQL", "PostgreSQL", "Chart.js", "FastAPI"],
      missingSkills: ["Pandas / NumPy", "Data Warehousing", "Tableau"]
    }
  ],

  targetRole: "Full Stack Engineer",

  targetSkillGaps: [
    { skill: "TypeScript & React", status: "strong", explanation: "Extensive daily usage in Apex Cloud Tech role and TaskFlow SaaS project.", priority: "Low" },
    { skill: "Node.js & Express REST APIs", status: "strong", explanation: "Built 15+ backend endpoints with query optimizations.", priority: "Low" },
    { skill: "PostgreSQL & SQL", status: "strong", explanation: "Proven query latency optimization from 450ms to 120ms.", priority: "Low" },
    { skill: "Docker & AWS EC2", status: "strong", explanation: "Configured containers and cloud deployments via GitHub Actions.", priority: "Low" },
    { skill: "Microservices Architecture", status: "partial", explanation: "Assisted in legacy monolithic migration; target role asks for full ownership.", priority: "Medium" },
    { skill: "Redis Caching", status: "partial", explanation: "Basic caching implemented; deeper invalidation strategies needed for senior roles.", priority: "Medium" },
    { skill: "Kubernetes Orchestration", status: "missing", explanation: "Container orchestration required in JD; no supporting evidence found in resume.", priority: "High" },
    { skill: "GraphQL APIs", status: "missing", explanation: "Preferred bonus skill in JD; not listed anywhere in resume.", priority: "High" },
    { skill: "AWS Lambda / Serverless", status: "missing", explanation: "Serverless compute requested; only EC2/S3 virtual servers listed.", priority: "High" }
  ],

  transferableSkills: [
    {
      originalExperience: "Apex Cloud Tech bi-weekly Agile sprint team collaboration",
      transferableSkill: "Agile & Cross-functional Leadership",
      relevanceToTargetRole: "Demonstrates readiness to work smoothly with product managers, designers, and engineers in high-velocity teams."
    },
    {
      originalExperience: "TaskFlow SaaS project - JWT authentication & bcrypt security setup",
      transferableSkill: "Application Security & Auth Architecture",
      relevanceToTargetRole: "Proves ability to implement secure user data handling and industry-standard security protocols."
    },
    {
      originalExperience: "E-Commerce Analytics Engine - Extracting transaction data for reporting",
      transferableSkill: "Data Processing & Pipeline Design",
      relevanceToTargetRole: "Shows ability to structure complex data pipelines for enterprise reporting dashboards."
    }
  ],

  skillEvidenceScore: 82,

  skillEvidence: [
    {
      skill: "React & TypeScript",
      status: "strong",
      evidenceLocation: "Apex Cloud Tech & TaskFlow Project",
      details: "Demonstrated through customer dashboard features built, improving engagement by 22%."
    },
    {
      skill: "Node.js & Express",
      status: "strong",
      evidenceLocation: "Apex Cloud Tech & TaskFlow Project",
      details: "15+ REST API endpoints engineered and deployed on AWS EC2."
    },
    {
      skill: "PostgreSQL & Redis",
      status: "strong",
      evidenceLocation: "Apex Cloud Tech Work Experience",
      details: "Quantified query optimization reducing API latency from 450ms to 120ms."
    },
    {
      skill: "Jest & Testing",
      status: "strong",
      evidenceLocation: "Apex Cloud Tech Work Experience",
      details: "85% test coverage achieved with automated unit and integration tests."
    },
    {
      skill: "Webpack & Next.js",
      status: "limited",
      evidenceLocation: "Listed in Technical Skills section",
      details: "Limited supporting evidence found in experience bullet points or projects."
    },
    {
      skill: "Kubernetes & GraphQL",
      status: "none",
      evidenceLocation: "Not found in resume",
      details: "Required/preferred in target job posting but absent from resume content."
    }
  ],

  priorityImprovements: [
    {
      impact: "HIGH",
      problem: "Microservices experience is framed passively ('Assisted in migrating').",
      whyItMatters: "Target Full Stack Engineer roles expect clear technical ownership of backend architecture.",
      exactAction: "Reframe the bullet point using active engineering verbs and specify the technology stack involved.",
      exampleRewrite: "Co-engineered the migration of a legacy monolithic API to Express.js microservices, enhancing service modularity and deployability."
    },
    {
      impact: "MEDIUM",
      problem: "Missing evidence for bonus skills (GraphQL, AWS Lambda) requested in target posting.",
      whyItMatters: "Enterprise engineering teams value serverless and modern API query paradigms.",
      exactAction: "If experienced in side projects or coursework, add a concise bullet point in Projects detailing a serverless or GraphQL endpoint.",
      exampleRewrite: "Architected serverless REST endpoints using AWS Lambda and Node.js for on-demand background image processing."
    },
    {
      impact: "LOW",
      problem: "Skills list uses pipe characters '|' which older ATS parsers may occasionally misinterpret.",
      whyItMatters: "Ensures 100% clean parsing across all legacy ATS platforms (Taleo, iCIMS).",
      exactAction: "Format skills in clean, comma-separated lists under distinct subheadings.",
      exampleRewrite: "Languages: TypeScript, JavaScript, Python, SQL"
    }
  ],

  thirtyDayPlan: {
    dailyCommitment: "1 hour",
    weeks: [
      {
        week: 1,
        focusSkill: "GraphQL & Apollo Server",
        learningTask: "Learn GraphQL schemas, resolvers, queries, mutations, and Apollo Server integration.",
        practiceTask: "Build a Node.js + Express + Apollo GraphQL API server for a task management domain.",
        careerTask: "Add a GraphQL project section to your GitHub portfolio with a clean README.",
        expectedOutcome: "Solid conceptual & practical understanding of GraphQL vs REST APIs.",
        proofOfLearning: "Publish a GitHub repository containing a fully functional GraphQL API with schema documentation."
      },
      {
        week: 2,
        focusSkill: "Docker Compose & Kubernetes Basics",
        learningTask: "Master container multi-service orchestration with Docker Compose and Kubernetes pods/deployments.",
        practiceTask: "Containerize a Node.js API and PostgreSQL database using Docker Compose, then write K8s deployment YAMLs.",
        careerTask: "Document your K8s deployment steps and publish a architecture diagram on your GitHub.",
        expectedOutcome: "Ability to explain container orchestration and Kubernetes deployments in technical interviews.",
        proofOfLearning: "Working Docker Compose file and Kubernetes manifest repository with step-by-step local Minikube setup guide."
      },
      {
        week: 3,
        focusSkill: "AWS Serverless (Lambda & DynamoDB)",
        learningTask: "Understand event-driven serverless architecture using AWS Lambda, API Gateway, and DynamoDB.",
        practiceTask: "Deploy a serverless microservice using AWS SAM or Serverless Framework.",
        careerTask: "Update your resume skills and project section with AWS Lambda and Serverless API evidence.",
        expectedOutcome: "Demonstrable serverless cloud engineering experience on resume.",
        proofOfLearning: "Live AWS Lambda endpoint or public Serverless repository demonstrating automated deployments."
      },
      {
        week: 4,
        focusSkill: "Resume Polish & Technical Interview Practice",
        learningTask: "Practice system design questions and behavioral STAR technique stories based on your updated projects.",
        practiceTask: "Complete 10 System Design & Full Stack mock interview questions.",
        careerTask: "Submit your updated resume with new GraphQL and Serverless evidence to 5 target roles.",
        expectedOutcome: "Job-ready application package and high confidence in technical interview rounds.",
        proofOfLearning: "Polished resume PDF with 0 skill gaps and high ATS alignment score ready for employer submissions."
      }
    ]
  },

  interviewPrep: {
    questions: [
      {
        category: "Project-based",
        question: "In your Apex Cloud Tech role, how did you optimize PostgreSQL query performance and cut API response latency from 450ms to 120ms?",
        context: "Directly tests technical depth behind the impressive metric listed on your resume.",
        keyPointsToCover: [
          "Explain identifying slow queries using PostgreSQL EXPLAIN ANALYZE.",
          "Detail index creation on frequently queried foreign keys and filtering columns.",
          "Describe implementing Redis as a read-through cache layer for hot data.",
          "Mention monitoring latency improvements post-deployment."
        ]
      },
      {
        category: "Technical",
        question: "How do you handle authentication and state management in React applications using JWT tokens?",
        context: "Evaluates full-stack security practices from your TaskFlow project.",
        keyPointsToCover: [
          "Explain storing JWT in secure HTTP-only cookies vs localStorage.",
          "Describe token expiration, refresh token rotations, and request interceptors.",
          "Mention protecting client-side routes in React with auth context or Redux middleware."
        ]
      },
      {
        category: "Resume-based",
        question: "Walk me through the migration of the monolithic API to Express.js microservices at Innovate Softworks.",
        context: "Checks your understanding of microservices architecture and team collaboration.",
        keyPointsToCover: [
          "Explain domain breakdown (separating auth, payments, user profiles into standalone services).",
          "Discuss inter-service communication (REST HTTP calls vs message queues).",
          "Highlight testing strategies to avoid breaking existing frontend clients during migration."
        ]
      },
      {
        category: "Role-specific",
        question: "How would you design a scalable full-stack system for real-time collaborative task management?",
        context: "Standard Full Stack Engineer system design question tailored to your TaskFlow project background.",
        keyPointsToCover: [
          "Frontend: React with WebSockets / Socket.io for live state sync.",
          "Backend: Node.js gateway with Redis Pub/Sub for horizontal scaling across instances.",
          "Database: PostgreSQL with pessimistic/optimistic locking for concurrent task updates."
        ]
      },
      {
        category: "Behavioral",
        question: "Tell me about a time when you disagreed with a UX designer or team member on a technical feature.",
        context: "Tests soft skills and cross-functional Agile collaboration mentioned on your resume.",
        keyPointsToCover: [
          "Use STAR method (Situation, Task, Action, Result).",
          "Focus on empathetic communication, data-backed technical trade-offs, and reaching a win-win consensus."
        ]
      }
    ],
    areasToPrepare: [
      "Kubernetes deployment concepts & Pod networking basics",
      "GraphQL vs REST API architectural trade-offs",
      "Serverless vs EC2 hosting cost & latency comparisons",
      "System Design for real-time WebSocket applications"
    ]
  },

  nextBestAction: "Add evidence of GraphQL or AWS Lambda side projects to your resume to close the top 2 target role skill gaps.",

  parsedMeta: {
    charCount: 2280,
    wordCount: 345,
    pageEstimate: 1,
    filename: "Alex_Mercer_Resume.pdf"
  }
};
