const fs = require('fs');
const { JSDOM } = require('jsdom');

// Load the SVG file
const svgData = fs.readFileSync('vhm_1752029245.svg', 'utf-8');

// Use jsdom to parse SVG
const dom = new JSDOM(svgData);
const circles = dom.window.document.querySelectorAll('circle');

const dots = Array.from(circles).map(circle => ({
  x: parseFloat(circle.getAttribute('cx')),
  y: parseFloat(circle.getAttribute('cy')),
  r: parseFloat(circle.getAttribute('r'))
}));

// Write to a JSON file
fs.writeFileSync('dots.json', JSON.stringify(dots, null, 2));

console.log(`✅ Extracted ${dots.length} dots to dots.json`);
