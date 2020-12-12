const fs = require("fs");
const path = require("path");

const readFile = (filename: string): string => {
  return fs.readFileSync(path.join(__dirname, filename)).toString();
};
const parsePassport: (...args: any[]) => {}[] = (
  input: string[],
  pos = 0,
  parsedInput: { [key: string]: string } = {},
  parsedPassports: {}[] = []
) => {
  const line = input[0];
  const prevPos = pos;
  const nextSpace = (pos: number) => line.indexOf(" ", pos);
  pos = nextSpace(pos) === -1 ? line.length : nextSpace(pos);

  if (input.length === 1) {
    return parsedPassports;
  }

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

const validatePassports = (passports: { [key: string]: string }[]) => {
  return passports.map(validate);
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

const validate = (passport: any): boolean => {
  let D = 7;
  let validKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
  for (const prop in passport) {
    console.log(prop);
    const index = validKeys.indexOf(prop);
    console.log(index);
    if (index) {
      D++;
      validKeys = validKeys
        .slice(0, index)
        .concat(validKeys.slice(index, validKeys.length));
    }
  }
  return 8 === D;
};

const passports = readFile("example.txt").split("\n");

console.log(parsePassport(passports));

console.log(validatePassports(parsePassport(passports)));
