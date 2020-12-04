const fs = require("fs/promises");
const { parse } = require("path");
const path = require("path");

const parseString = (string = "") => {
  const regexp = /([0-9]+)\-([0-9]+)\s([a-z])\:\s(\w+)/i;
  const [_, min, max, letter, pwd, ...__] = string.match(regexp);
  return [min, max, letter, pwd];
};

const getInputData = async () => {
  try {
    const data = await fs.readFile(
      path.resolve(__dirname, "input.txt"),
      "utf-8"
    );
    const lines = data.split("\n");
    lines.pop(); // get rid of the trailing newline
    return lines;
  } catch (error) {
    console.error(error);
  }
};

const partOne = (lines) => {
  let validPwds = 0;
  lines.map((string) => {
    const [min, max, letter, pwd] = parseString(string);
    // if (pwd.length > max) return
    const matches = pwd.match(new RegExp(`[${letter}]`, "ig"));
    if (matches && min <= matches.length && matches.length <= max) {
      validPwds++;
    }
  });
  console.log("Part one:", validPwds);
  return validPwds;
};

const partTwo = (lines) => {
  let validPwds = 0;
  lines.map((string) => {
    const [min, max, letter, pwd] = parseString(string);
    if (
      (pwd[min - 1] === letter || pwd[max - 1] === letter) &&
      !(pwd[min - 1] === letter && pwd[max - 1] === letter)
    ) {
      validPwds++;
    }
  });
  console.log("Part two:", validPwds);
  return validPwds;
};

(async function () {
  partOne(await getInputData());
  partTwo(await getInputData());
})();
