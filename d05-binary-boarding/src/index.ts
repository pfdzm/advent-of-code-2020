const fs = require("fs");
const path = require("path");

const readFile = (filename: string): string => {
  return fs
    .readFileSync(path.join(process.cwd(), "input", filename))
    .toString();
};

const binarySearch = (seq: string, size: number) => {
  let start = 0;
  let end = size - 1;
  for (let i = 0; i < seq.length; i++) {
    const char = seq[i];
    if (char === "F" || char === "L") {
      end -= size / 2;
    } else {
      start += size / 2;
    }
    size /= 2;
  }
  return end;
};

const binaryBoard = (sequence: string) => {
  const row = binarySearch(sequence.slice(0, 7), 128);
  const col = binarySearch(sequence.slice(7, 9), 8);
  return row * 8 + col;
};

const binaryBoardInput = (filename: string) => {
  const input = readFile(filename).split("\n");
  // remove trailing newline
  input[input.length - 1] === "" ? input.pop() : null;
  return input.map((seq) => binaryBoard(seq));
};

const findHighestSeatID = (seats: number[]) => {
  function compareFn(a: number, b: number) {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  }
  return seats.sort(compareFn).pop();
};

console.log(findHighestSeatID(binaryBoardInput("example.txt")));
console.log(findHighestSeatID(binaryBoardInput("input.txt")));
