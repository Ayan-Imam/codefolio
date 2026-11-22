// Fake portfolio data for building and testing templates without the database.
// It has the same shape as the GET /api/users/:username response.
export const sampleUser = {
  username: 'jane_dev',
  templateId: 'minimalist',
  profile: {
    fullName: 'Jane Developer',
    headline: 'Full Stack Developer',
    bio: 'I build fast, accessible web apps with React and Node.\nCurrently looking for internship opportunities.',
    location: 'Kolkata, India',
    resumeUrl: 'https://example.com/resume.pdf',
    socialLinks: {
      github: 'https://github.com/janedev',
      linkedin: 'https://linkedin.com/in/janedev',
      twitter: '',
      website: 'https://janedev.example.com',
    },
  },
  projects: [
    {
      title: 'CodeFolio',
      description:
        'A no-code portfolio builder for developers. Fill in your profile, projects and skills, pick a template and publish at your own username-based URL.',
      imageUrl: '',
      githubUrl: 'https://github.com/janedev/codefolio',
      liveUrl: 'https://codefolio.example.com',
    },
    {
      title: 'Weather Dashboard',
      description: 'A responsive dashboard that shows a five-day forecast for any city.',
      imageUrl: '',
      githubUrl: 'https://github.com/janedev/weather-dashboard',
      liveUrl: '',
    },
    {
      title: 'Todo API',
      description: 'A REST API with JWT authentication.',
      imageUrl: '',
      githubUrl: '',
      liveUrl: '',
    },
  ],
  skills: [
    { category: 'Frontend', items: ['React', 'Tailwind CSS', 'JavaScript'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB'] },
    { category: 'Tools', items: ['Git', 'GitHub', 'Postman'] },
  ],
}