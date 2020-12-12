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
  const nextSpace = line.indexOf(" ", pos) 
  pos = nextSpace === -1 ? line.length : nextSpace

  if (input.length === 1) {
    return parsedPassports;
  }

  if (line.length === 0) {
    if (parsedInput) {
      input = input.slice(1);
      parsedPassports.push(parsedInput);
      parsedInput = {};
    }
    line = input[0];
  }

  if (line[pos] === " " || pos === line.length) {
    // const keyValue = line.slice(0, pos)
    key = line.slice(0, pos).split(":")[0];
    value = line.slice(0, pos).split(":")[1];
    parsedInput[key] = value;
    // line = pos === line.length ? "" : line.substring(pos + 1);
  }

  return parsePassport(input, line, ++pos, parsedInput, parsedPassports);
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
