import { readFile } from 'node:fs/promises';

const [html, js, css] = await Promise.all([
  readFile('dist/index.html', 'utf8'),
  readFile('dist/src/main.js', 'utf8'),
  readFile('dist/src/styles.css', 'utf8'),
]);

const required = [
  [html, '<div id="app"></div>', 'HTML app mount'],
  [html, 'href="/src/styles.css"', 'stylesheet link'],
  [html, 'src="/src/main.js"', 'module script'],
  [js, '5-STOREY BUILDING PROJECT', 'project title'],
  [js, 'Safety and Health Program', 'schedule activity'],
  [js, 'Project Settings', 'project settings action'],
  [css, '.board', 'schedule board styles'],
];

for (const [content, needle, label] of required) {
  if (!content.includes(needle)) {
    throw new Error(`Missing ${label}: ${needle}`);
  }
}
console.log('Static site smoke test passed.');
