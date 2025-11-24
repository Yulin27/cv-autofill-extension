# Example Prompts and Use Cases

This document shows the actual prompts used by the AI agents and example scenarios.

## AI Agent Prompts

### 1. CV Parser Prompt

**Purpose**: Extract structured data from raw CV text

**Input**: Raw text from PDF
**Output**: Structured JSON

**Full Prompt**:
```
Extract structured information from this CV text and return it as a JSON object.

CV Text:
[Candidate's CV text here...]

Return a JSON object with this exact structure:
{
  "personalInfo": {
    "fullName": "Full name from CV",
    "email": "Email address",
    "phone": "Phone number",
    "location": "City, State/Country",
    "linkedin": "LinkedIn URL",
    "website": "Personal website URL"
  },
  "summary": "Professional summary or objective statement",
  "workExperience": [
    {
      "company": "Company name",
      "position": "Job title",
      "startDate": "Start date (format: YYYY-MM or YYYY)",
      "endDate": "End date or 'Present'",
      "description": "Brief description of role",
      "achievements": ["Achievement 1", "Achievement 2", "..."]
    }
  ],
  "education": [
    {
      "institution": "University/School name",
      "degree": "Degree type (e.g., Bachelor of Science)",
      "field": "Field of study",
      "graduationDate": "Graduation date (format: YYYY-MM or YYYY)"
    }
  ],
  "skills": {
    "technical": ["Skill 1", "Skill 2", "..."],
    "languages": ["Language 1 (proficiency)", "Language 2 (proficiency)", "..."],
    "soft": ["Soft skill 1", "Soft skill 2", "..."]
  },
  "certifications": ["Certification 1", "Certification 2", "..."]
}

IMPORTANT INSTRUCTIONS:
1. Extract ALL information present in the CV
2. Use empty strings ("") for missing text fields
3. Use empty arrays ([]) for missing list fields
4. Keep dates in consistent format (YYYY-MM or YYYY)
5. For current positions, use "Present" as endDate
6. Return ONLY the JSON object, no markdown formatting
```

**Example Output**:
```json
{
  "personalInfo": {
    "fullName": "John Doe",
    "email": "john.doe@email.com",
    "phone": "+1-555-0123",
    "location": "San Francisco, CA",
    "linkedin": "linkedin.com/in/johndoe",
    "website": "johndoe.dev"
  },
  "summary": "Full-stack developer with 5 years of experience...",
  "workExperience": [
    {
      "company": "Tech Corp",
      "position": "Senior Developer",
      "startDate": "2020-01",
      "endDate": "Present",
      "description": "Lead development of customer-facing applications",
      "achievements": [
        "Reduced load time by 40%",
        "Mentored 5 junior developers"
      ]
    }
  ],
  "education": [
    {
      "institution": "State University",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "graduationDate": "2018-05"
    }
  ],
  "skills": {
    "technical": ["JavaScript", "React", "Node.js", "Python"],
    "languages": ["English (Native)", "Spanish (Intermediate)"],
    "soft": ["Leadership", "Communication", "Problem-solving"]
  },
  "certifications": ["AWS Certified Developer", "Google Cloud Professional"]
}
```

---

### 2. Field Analyzer Agent Prompt (Agent 1)

**Purpose**: Analyze form field and determine filling strategy

**Input**: Field information, CV data, job context
**Output**: Analysis with strategy

**Full Prompt**:
```
You are a form field analyzer for job applications. Analyze this form field.

FIELD INFORMATION:
- Label: "Why do you want to work at Google?"
- Placeholder: "Tell us your motivation..."
- Name: "motivation"
- Type: "textarea"
- Required: Yes
- Max Length: 500
- Context: "This helps us understand your interest"

JOB CONTEXT:
- Company: Google
- Position: Software Engineer

AVAILABLE CV DATA:
The candidate has:
- Personal Info: Yes
- Email: Yes
- Work Experience: 3 entries
- Education: 2 entries
- Technical Skills: 12 skills
- Summary: Yes

TASK:
Determine how to fill this field. Return JSON:
{
  "fieldType": "one of: personal_info|experience|education|skills|motivation|custom_question|other",
  "strategy": "one of: direct_match|generate|skip",
  "cvDataPath": "path.to.cv.data or null",
  "reasoning": "brief explanation",
  "needsJobContext": true or false,
  "priority": "critical|important|optional"
}

GUIDELINES:
- Use "direct_match" for fields mapping to CV data (name, email, phone)
- Use "generate" for custom content (cover letters, motivation)
- Use "skip" for fields requiring user input
- Set needsJobContext=true if response should be job-specific

Return ONLY the JSON object:
```

**Example Output**:
```json
{
  "fieldType": "motivation",
  "strategy": "generate",
  "cvDataPath": null,
  "reasoning": "Requires custom motivational content tailored to Google",
  "needsJobContext": true,
  "priority": "critical"
}
```

---

### 3. Content Generator Agent Prompt (Agent 2)

**Purpose**: Generate appropriate content for a specific field

**Input**: Field info, analysis, CV data, job context
**Output**: Text to fill in field

**Full Prompt**:
```
You are a job application assistant. Generate content for this field.

FIELD TO FILL:
- Question/Label: "Why do you want to work at Google?"
- Field Type: textarea
- Character Limit: 500
- Required: Yes
- Context: motivation

JOB INFORMATION:
- Company: Google
- Position: Software Engineer
- Job Description: [snippet of job description if available]

CANDIDATE PROFILE:
Personal Information:
- Name: John Doe
- Email: john.doe@email.com
- Location: San Francisco, CA

Professional Summary:
Full-stack developer with 5 years of experience in building scalable web applications...

Work Experience:
1. Senior Developer at Tech Corp (2020-01 - Present)
   Lead development of customer-facing applications
   Key achievements: Reduced load time by 40%; Mentored 5 junior developers

2. Developer at StartupXYZ (2018-06 - 2019-12)
   Built RESTful APIs and React components
   Key achievements: Launched 3 major features

Education:
1. Bachelor of Science in Computer Science from State University (2018-05)

Technical Skills: JavaScript, React, Node.js, Python, AWS, Docker

REQUIREMENTS:
1. Generate content that accurately represents the candidate
2. Tailor response to Google and Software Engineer position
3. Stay within 500 characters
4. Sound natural and genuine
5. Reference specific experience or skills from CV
6. Explain why candidate is a good fit

Return ONLY the text to fill in the field. No explanations, just the content:
```

**Example Output**:
```
I'm excited about Google's mission to organize the world's information and make it universally accessible. With 5 years of full-stack development experience, I've consistently focused on building scalable, user-centric applications. At Tech Corp, I reduced application load time by 40%, directly improving user experience for thousands of users. Google's emphasis on technical excellence and innovation aligns perfectly with my passion for solving complex problems at scale. I'm particularly drawn to the opportunity to work with cutting-edge technologies and contribute to products used by billions globally.
```

---

## Real-World Examples

### Example 1: Contact Information Fields

**Field**: Email input
```
Label: "Email Address"
Type: text
Name: email
Required: true
```

**Agent 1 Analysis**:
```json
{
  "fieldType": "personal_info",
  "strategy": "direct_match",
  "cvDataPath": "personalInfo.email",
  "reasoning": "Direct email field mapping to CV data",
  "needsJobContext": false,
  "priority": "critical"
}
```

**Agent 2 Output**: `john.doe@email.com`

---

### Example 2: Experience Question

**Field**: Textarea
```
Label: "Describe your relevant experience"
Type: textarea
MaxLength: 1000
Required: true
```

**Agent 1 Analysis**:
```json
{
  "fieldType": "experience",
  "strategy": "generate",
  "cvDataPath": null,
  "reasoning": "Requires tailored experience summary",
  "needsJobContext": true,
  "priority": "critical"
}
```

**Agent 2 Output**:
```
I bring 5 years of full-stack development experience with a proven track record of delivering high-impact projects. As a Senior Developer at Tech Corp, I lead the development of customer-facing applications serving over 100,000 users. I successfully reduced application load time by 40% through performance optimization and implemented a microservices architecture that improved system scalability. Prior to this, at StartupXYZ, I built RESTful APIs and React components, launching 3 major features that increased user engagement by 25%. My technical expertise spans JavaScript, React, Node.js, Python, and cloud technologies including AWS and Docker. I'm passionate about writing clean, maintainable code and mentoring junior developers—I've guided 5 team members in their professional growth. This experience has prepared me to contribute immediately to your team while continuing to grow as an engineer.
```

---

### Example 3: Skills Dropdown

**Field**: Select dropdown
```
Label: "Primary Programming Language"
Type: select
Options: ["JavaScript", "Python", "Java", "C++", "Other"]
Required: true
```

**Agent 1 Analysis**:
```json
{
  "fieldType": "skills",
  "strategy": "direct_match",
  "cvDataPath": "skills.technical",
  "reasoning": "Select primary skill from technical skills list",
  "needsJobContext": false,
  "priority": "important"
}
```

**Agent 2 Output**: `JavaScript` (first technical skill from CV)

---

### Example 4: Custom Question

**Field**: Text input
```
Label: "What's your greatest professional achievement?"
Type: text
MaxLength: 200
Required: false
```

**Agent 1 Analysis**:
```json
{
  "fieldType": "custom_question",
  "strategy": "generate",
  "cvDataPath": null,
  "reasoning": "Requires specific achievement story",
  "needsJobContext": false,
  "priority": "important"
}
```

**Agent 2 Output**:
```
Reducing application load time by 40% at Tech Corp, which directly improved user experience for 100,000+ users and increased customer satisfaction scores by 15%.
```

---

## Testing Scenarios

### Scenario 1: LinkedIn Easy Apply

**Form Fields**:
1. First Name → Direct match (`personalInfo.fullName` - first part)
2. Last Name → Direct match (`personalInfo.fullName` - last part)
3. Email → Direct match (`personalInfo.email`)
4. Phone → Direct match (`personalInfo.phone`)
5. Resume → Skip (file upload)
6. Cover Letter → Generate (motivation)

---

### Scenario 2: Custom Application Portal

**Form Fields**:
1. Full Name → Direct match
2. Email → Direct match
3. Portfolio URL → Direct match (`personalInfo.website`)
4. Years of Experience → Calculate from work experience
5. "Why this role?" → Generate with job context
6. "Tell us about a challenging project" → Generate from achievements
7. Salary Expectations → Skip (requires user input)

---

### Scenario 3: ATS System (Greenhouse/Workday)

**Form Fields**:
1. Basic info section → Direct matches
2. Work history (multiple entries) → Direct match with iteration
3. Education history → Direct match with iteration
4. Skills checklist → Match from technical skills
5. Custom questions → Generate based on type
6. Legal questions → Skip (user must answer)

---

## Common Field Patterns

### Pattern 1: Contact Info Block
```
Name: [direct_match: personalInfo.fullName]
Email: [direct_match: personalInfo.email]
Phone: [direct_match: personalInfo.phone]
Location: [direct_match: personalInfo.location]
LinkedIn: [direct_match: personalInfo.linkedin]
```

### Pattern 2: Motivation Block
```
Why this company? [generate with company context]
Why this role? [generate with position context]
What interests you? [generate with job description]
```

### Pattern 3: Experience Summary
```
Years of experience: [calculate from workExperience]
Current role: [first workExperience entry]
Key skills: [skills.technical top 5]
Notable achievements: [generate from achievements]
```

---

## Tips for Best Results

### For CV Quality
- Use clear section headings (Experience, Education, Skills)
- Include specific achievements with metrics
- Keep formatting consistent
- Use standard date formats
- List technical skills explicitly

### For Form Filling
- Ensure form is fully visible before clicking "Fill Form"
- Review generated content in longer text fields
- Manual review recommended for salary/legal questions
- Test on simple forms first

### For Content Quality
- Upload detailed CV with quantifiable achievements
- Ensure job title and company are visible on page
- Let extension detect job description when available
- Review and edit motivation letters before submitting

---

## Debugging Tips

### Check Console Logs
Open DevTools (F12) and look for:
```
CV Auto-Fill content script loaded
Detecting form fields...
Found 15 form fields
Analyzing fields...
Field analysis complete
Generating content...
Content generation complete
Filling form fields...
Form filling complete
```

### Common Log Messages
- `Skipping field: [name]` - Field intentionally not filled
- `Error generating content` - API call failed
- `Could not find matching option` - Dropdown value not found
- `No fillable form fields found` - Page has no forms

---

This completes the examples and prompts documentation!