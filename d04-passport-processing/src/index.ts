const fs = require("fs");
const path = require("path");

const readFile = (filename: string): string => {
  return fs.readFileSync(path.join(__dirname, filename)).toString();
};
const parsePassport: (...args: any[]) => {}[] = (
  input: string[],
  line: string = input[0],
  pos = 0,
  parsedInput: { [key: string]: string } = {},
  parsedPassports: {}[] = []
) => {
  let key = "",
    value = "";

  // str.indexOf(searchValue [, fromIndex])
  const prevPos = pos;
  const nextSpace = (pos: number) => line.indexOf(" ", pos);
  pos = nextSpace(pos) === -1 ? line.length : nextSpace(pos);

  if (input.length === 1) {
    return parsedPassports;
  }

  // line = pos === line.length ? "" : line.substring(pos + 1);
  if (line === "") {
    parsedPassports.push(parsedInput);
    parsedInput = {};
  }

  const keyValue = line.slice(prevPos, pos).split(":");
  key = keyValue[0];
  value = keyValue[1];
  parsedInput[key] = value;

  if (pos++ >= line.length) {
    input = input.slice(1);
    line = input[0];
    pos = 0;
  }

  return parsePassport(input, line, pos, parsedInput, parsedPassports);
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

// console.log(validatePassports(parsePassport(passports)))
