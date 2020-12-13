import { write } from "fs";

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

interface SeatInfo extends Record<string, number> {
  row: number;
  col: number;
  seatId: number;
}
const binaryBoard: (seq: string) => SeatInfo = (sequence) => {
  const row = binarySearch(sequence.slice(0, 7), 128);
  const col = binarySearch(sequence.slice(7), 8);
  return { row, col, seatId: row * 8 + col } as SeatInfo;
};

const binaryBoardInput = (filename: string) => {
  const input = readFile(filename).split("\n");
  // remove trailing newline
  input[input.length - 1] === "" ? input.pop() : null;
  return input.map((seq) => binaryBoard(seq));
};

const sortSeatsByRow = (seats: SeatInfo[]) => {
  function compareFn(
    aObj: Record<string, number>,
    bObj: Record<string, number>
  ) {
    let a = aObj["row"];
    let b = bObj["row"];
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  }
  return seats.sort(compareFn);
};
const sortSeatsById = (seats: SeatInfo[]) => {
  function compareFn(
    aObj: Record<string, number>,
    bObj: Record<string, number>
  ) {
    let a = aObj["seatId"];
    let b = bObj["seatId"];
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  }
  return seats.sort(compareFn);
};

const writeOutput = (seats: SeatInfo[]) => {
  const outputStr = seats.reduce((prev, curr) => {
    return prev + JSON.stringify(curr) + "\n";
  }, "");
  fs.writeFileSync(path.join(process.cwd(), "output.txt"), outputStr, "utf-8");
};

const findSeat = (seats: SeatInfo[]) => {
  let seatId = seats[0]["seatId"];
  for (let i = 0; i < seats.length; i++) {
    if (seatId++ !== seats[i]["seatId"]) {
      // we found a match, step back once to undo post-increment
      seatId--;
      break;
    }
  }
  return seatId;
};

// example / sanity check
console.log('Example')
console.log(sortSeatsById(binaryBoardInput("example.txt")).pop());

// part 1
console.log('Part 1')
console.log(sortSeatsById(binaryBoardInput("input.txt")).pop());

// part 2
console.log('Part 2')
console.log(findSeat(sortSeatsById(binaryBoardInput("input.txt"))));

// write out all seat info to output.txt
writeOutput(sortSeatsById(binaryBoardInput("input.txt")));
