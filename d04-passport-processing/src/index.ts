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
type passportKeys =
  | "byr"
  | "iyr"
  | "eyr"
  | "hgt"
  | "hcl"
  | "ecl"
  | "pid"
  | "cid";

type passport = {
  [index in passportKeys]?: string;
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
  const key = keyValue[0] as passportKeys;
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
    if (index !== -1 && validateValue(passport, prop as passportKeys)) {
      D++;
      validKeys = validKeys
        .slice(0, index)
        .concat(validKeys.slice(index + 1, validKeys.length));
    }
  }
  D++;
  return 8===D;
};

/**
byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
*/

const validateValue = (passport: passport, prop: passportKeys) => {
  const value = passport[prop] as string;
  switch (prop) {
    case "byr":
      const byr = parseInt(value);
      return byr >= 1920 && byr <= 2002;
    case "iyr":
      const iyr = parseInt(value);
      return iyr >= 2010 && iyr <= 2020;
    case "eyr":
      const eyr = parseInt(value);
      return eyr >= 2020 && eyr <= 2030;
    case "hgt":
      const unit = value.slice(value.length - 2);
      const number = parseInt(value.slice(0, value.length - 2));
      const validNumber =
        unit === "cm"
          ? number >= 150 && number <= 193
          : number >= 59 && number <= 76;
      return (
        value.length > 2 && validNumber && (unit === "cm" || unit === "in")
      );
    case "hcl":
      const regex = /^#[a-f0-9]{6}$/;
      return regex.test(value);
    case "ecl":
      return (
        value === "amb" ||
        value === "blu" ||
        value === "brn" ||
        value === "gry" ||
        value === "grn" ||
        value === "hzl" ||
        value === "oth"
      );
    case "pid":
      return /^[0-9]{9}$/.test(value);
    default:
      throw new Error("Validation Error! Unknown passport key!");
  }
};

const exampleInput = readFile("example.txt").split("\n");
const prodInput = readFile("input.txt").split("\n");

console.log("example: \n", validatePassports(parsePassport(exampleInput)));
console.log("prod: \n", validatePassports(parsePassport(prodInput)));
