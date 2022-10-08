const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function genNewRelease() {
  const nextVersion = require('../lerna.json').version;
  const res = execSync(`lerna-changelog --next-version ${nextVersion}`, {
    // stdio: 'inherit',
  });
  return res;
}

const gen = (module.exports = async () => {
  const newRelease = await genNewRelease();
  const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');
  if (newRelease) {
    const newChangelog =
      newRelease +
      '\n\n\n' +
      fs.readFileSync(changelogPath, { encoding: 'utf8' });
    fs.writeFileSync(changelogPath, newChangelog);
  }
});

gen().catch((err) => {
  console.error(err);
  process.exit(1);
});
