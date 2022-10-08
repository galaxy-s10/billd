const { execSync, exec } = require("child_process");
const path = require("path");

const { readJSONSync, writeJSONSync } = require("fs-extra");
const inquirer = require("inquirer");
const semver = require("semver");

const { chalkSUCCESS, chalkERROR, chalkINFO } = require("./chalkTip");
const { updatePackageJSON } = require("./update");

const { name: pkgName, version: currentVersion } = readJSONSync("lerna.json"); // 项目根目录的lerna.json

// scripts/release.js只是实现了release-it的基本功能

const preId =
  semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0];

const versionChoices = [
  "patch",
  "minor",
  "major",
  ...(preId ? ["prepatch", "preminor", "premajor", "prerelease"] : []),
];

const inc = (i) => semver.inc(currentVersion, i, preId);
let targetVersion;
const selectReleaseVersion = async () => {
  const { release } = await inquirer.prompt([
    {
      type: "list",
      name: "release",
      message: "Select release type",
      choices: versionChoices.map((i) => `${i} (${inc(i)})`),
    },
  ]);
  const pkg = readJSONSync(path.resolve(__dirname, "../lerna.json")); // 项目根目录的lerna.json
  targetVersion = release.match(/\((.*)\)/)[1];

  const { confirmRelease } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmRelease",
      default: false,
      message: `Confirm release v${targetVersion}?`,
    },
  ]);

  if (confirmRelease) {
    console.log(chalkINFO(`开始本地发布${pkg.name}@${targetVersion}...`));

    // 更新根目录的lerna.json版本号
    writeJSONSync(
      "lerna.json",
      { ...pkg, version: targetVersion },
      { spaces: 2 }
    );

    // 更新lerna.json和packages/*的package.json
    updatePackageJSON();

    // git commit
    execSync(`git add .`, { stdio: "inherit" });
    execSync(`git commit -m 'chore(release): v${targetVersion}'`, {
      stdio: "inherit",
    });

    // git tag
    execSync(`git tag v${targetVersion}`, { stdio: "inherit" });
  } else {
    console.log(chalkERROR(`取消本地发布${pkg.name}@${targetVersion}！`));
    throw new Error(`取消本地发布${pkg.name}@${targetVersion}！`);
  }
};

function gitIsClean() {
  return new Promise((resolve, reject) => {
    exec("git status -s", (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error || stderr);
      }
      if (stdout.length) {
        reject(new Error("请确保git工作区干净！"));
      } else {
        resolve("ok");
      }
    });
  });
}

(async () => {
  try {
    // await gitIsClean();
    await selectReleaseVersion();
    console.log(chalkSUCCESS(`本地发布${pkgName}@${targetVersion}成功！`));
  } catch (error) {
    console.log(
      chalkERROR(`！！！本地发布${pkgName}@${targetVersion}失败！！！`)
    );
    console.log(error);
    console.log(
      chalkERROR(`！！！本地发布${pkgName}@${targetVersion}失败！！！`)
    );
  }
})();
