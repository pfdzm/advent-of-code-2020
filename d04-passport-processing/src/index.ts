const fs = require("fs");
const path = require("path");

const readFile = (filename: string): string => {
  return fs.readFileSync(path.join(__dirname, filename)).toString();
};

/**
    byr (Birth Year)
    iyr (Issue Year)
    eyr (Expiration Year)
    hgt (Height)
    hcl (Hair Color)
    ecl (Eye Color)
    pid (Passport ID)
    cid (Country ID)
 */
type passport = {
  [index: string]: string;
};

const parsePassport: (
  input: string[],
  pos?: number,
  parsedInput?: passport,
  parsedPassports?: passport[]
) => passport[] = (input, pos = 0, parsedInput = {}, parsedPassports = []) => {
  if (input.length === 0) {
    return parsedPassports as passport[];
  }

  const line = input[0];
  const prevPos = pos;
  const nextSpace = (pos: number) => line.indexOf(" ", pos);
  pos = nextSpace(pos) === -1 ? line.length : nextSpace(pos);

  if (line === "") {
    parsedPassports.push(parsedInput);
    parsedInput = {};
    return parsePassport(input.slice(1), pos, parsedInput, parsedPassports);
  }

  const keyValue = line.slice(prevPos, pos).split(":");
  const key = keyValue[0];
  const value = keyValue[1];
  parsedInput[key] = value;

  if (pos++ === line.length) {
    pos = 0;
    input = input.slice(1);
  }

  return parsePassport(input, pos, parsedInput, parsedPassports);
};

const validatePassports = (passports: passport[]) => {
  return passports
    .map(validate)
    .reduce((prevVal, currVal) => prevVal + (currVal ? 1 : 0), 0);
};

const validate = (passport: passport): boolean => {
  let D = 0;
  let validKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  for (const prop in passport) {
    const index = validKeys.indexOf(prop);
    if (index !== -1) {
      D++;
      validKeys = validKeys
        .slice(0, index)
        .concat(validKeys.slice(index + 1, validKeys.length));
    }
  }
  D++;
  return 8 === D;
};

const exampleInput = readFile("example.txt").split("\n");
const prodInput = readFile("input.txt").split("\n");

console.log("example: \n", validatePassports(parsePassport(exampleInput)));
console.log("prod: \n", validatePassports(parsePassport(prodInput)));
