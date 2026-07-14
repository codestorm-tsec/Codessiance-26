const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'components/sections'),
  path.join(__dirname, 'components/transitions'),
  path.join(__dirname, 'components/loader'),
  path.join(__dirname, 'components/3d')
];

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove the exact blocks
      const regex = /const prefersReducedMotion = window\.matchMedia\(\s*"\(\w+-reduced-motion: reduce\)"\s*\)\.matches;\s*if\s*\(prefersReducedMotion\)\s*(?:return;|{[^}]*return;\s*})/g;
      
      let newContent = content.replace(regex, '');
      
      // Loader specific
      newContent = newContent.replace(/const prefersReducedMotion = window\.matchMedia\(\s*"\(\w+-reduced-motion: reduce\)"\s*\)\.matches;\s*if\s*\(prefersReducedMotion\)\s*\{[\s\S]*?return;\s*\}/, '');

      // GlassScene specific
      newContent = newContent.replace(/if\s*\(window\.matchMedia\("\(\w+-reduced-motion: reduce\)"\)\.matches\)\s*\{\s*setShouldRender\(false\);\s*\}/, '');

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log('Fixed', fullPath);
      }
    }
  }
}

dirs.forEach(processDir);
