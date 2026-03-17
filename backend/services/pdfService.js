const pdf = require('pdf-parse');
const fs = require('fs');

async function extractTextFromPDF(pdfPath) {
  try {
  const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    return data.text.trim();
  } catch (error) {
    throw new Error(`PDF extraction failed: ${error.message}`);
  }
}

module.exports = { extractTextFromPDF };
