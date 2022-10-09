const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

async function genNewRelease() {
  const nextVersion = require('../lerna.json').version;
  // const res = execSync(`lerna-changelog --next-version ${nextVersion}`, {
  //   // stdio: 'inherit',//不能设置该属性，不然输出就一直都是null
  // });
  const res = spawnSync(`lerna-changelog`, ['--next-version', nextVersion], {
    // stdio: 'inherit', //不能设置该属性，不然输出就一直都是null
  });
  if (res.status) {
    console.log('lerna-changelog错误！');
    console.log(res.error);
    process.exit(res.status);
  }
  return res.stdout;
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

gen();
