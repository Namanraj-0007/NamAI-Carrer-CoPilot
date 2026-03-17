const fs = require('fs');
const path = require('path');

const jobsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/jobs.json'), 'utf8'));

function calculateOverlap(resumeSkills, requiredSkills) {
  const resumeSet = new Set(resumeSkills.map(s => s.toLowerCase()));
  const reqSet = new Set(requiredSkills.map(s => s.toLowerCase()));
  const intersection = new Set([...resumeSet].filter(s => reqSet.has(s)));
  return intersection.size / Math.max(resumeSet.size, reqSet.size, 1) * 100;
}

function getDomainMatches(domain, resumeSkills, threshold = 60) {
  const domainRoles = jobsData.domains[domain]?.roles || [];
  return domainRoles
    .map(role => ({
      ...role,
      match: Math.round(calculateOverlap(resumeSkills, [...role.required_skills, ...role.nice_to_have || []]))
    }))
    .filter(role => role.match >= threshold)
    .sort((a, b) => b.match - a.match);
}

function getAllRelevantMatches(resumeSkills, detectedDomain, otherDomainsThreshold = 40) {
  const primaryMatches = getDomainMatches(detectedDomain, resumeSkills);
  const secondaryMatches = Object.keys(jobsData.domains)
    .filter(d => d !== detectedDomain)
    .flatMap(domain => getDomainMatches(domain, resumeSkills, otherDomainsThreshold))
    .slice(0, 3); // Top 3 secondary
  return [...primaryMatches, ...secondaryMatches].slice(0, 6);
}

module.exports = { getDomainMatches, getAllRelevantMatches, calculateOverlap };
