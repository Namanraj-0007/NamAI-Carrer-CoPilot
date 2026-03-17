function analyzeResume(resumeText) {
  const text = resumeText.toLowerCase();
  
  // Dynamic skill extraction from text
  const skillPatterns = [
    { regex: /react|angular|vue/i, skills: ['react', 'angular'] },
    { regex: /node|express|nest/i, skills: ['node.js', 'express'] },
    { regex: /sql|mysql|postgres/i, skills: ['sql'] },
    { regex: /python|django|flask/i, skills: ['python'] },
    { regex: /docker|kubernetes|k8s/i, skills: ['docker'] },
    { regex: /javascript|js|typescript/i, skills: ['javascript'] },
    { regex: /aws|azure|gcp/i, skills: ['aws'] }
  ];

  const skills = [];
  skillPatterns.forEach(({ regex, skills: possible }) => {
    if (regex.test(text)) {
      skills.push(possible[0]);
    }
  });

  const domain = skills.includes('react') ? 'Frontend Development' :
                 skills.includes('node.js') ? 'Backend Development' :
                 skills.includes('sql') ? 'Data Analytics' :
                 'Software Development';

  const score = 50 + Math.min(skills.length * 8, 40) + Math.floor(Math.random() * 10);

  const missing_skills = domain === 'Frontend Development' ? ['typescript', 'next.js'] :
                         domain === 'Backend Development' ? ['docker', 'database'] :
                         ['advanced skills'];

  const recommended_roles = [`${domain.split(' ')[0]} Developer`, 'Full Stack Engineer'];

  return {
    domain,
    skills,
    experience_level: skills.length > 4 ? 'Mid' : 'Entry',
    recommended_roles,
    resume_score: Math.floor(score),
    missing_skills,
    analysisDate: new Date().toISOString()
  };
}

module.exports = { analyzeResume };

