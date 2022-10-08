const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

async function genNewRelease() {
  const res = execSync("lerna-changelog");
  return res.toString();
}

const gen = (module.exports = async () => {
  const newRelease = await genNewRelease();
  const changelogPath = path.resolve(__dirname, "../CHANGELOG.md");

  const newChangelog =
    newRelease +
    "\n\n\n" +
    fs.readFileSync(changelogPath, { encoding: "utf8" });
  fs.writeFileSync(changelogPath, newChangelog);
});

gen().catch((err) => {
  console.error(err);
  process.exit(1);
});
