const { execSync } = require('child_process');

const { chalkSUCCESS, chalkERROR } = require('./chalkTip');

const local = process.argv.includes('--local');

(async () => {
  try {
    if (local) {
      // 只会发布registry，不会发布远程的github仓库
      execSync(
        `lerna publish --force-publish --no-push --no-git-tag-version --yes`,
        { stdio: 'inherit' }
      );
    } else {
      // 发布registry且发布远程的github仓库
      execSync(`lerna publish --force-publish`, { stdio: 'inherit' });
    }
    console.log(chalkSUCCESS(`发布成功！`));
  } catch (error) {
    console.log(chalkERROR(`！！！发布失败！！！`));
    console.log(error);
    console.log(chalkERROR(`！！！发布失败！！！`));
  }
})();
