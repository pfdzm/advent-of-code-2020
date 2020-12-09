const fs = require("fs");
const path = require("path");

function readInputIntoLineArray(fileName: string): string[] {
  return fs.readFileSync(path.join(__dirname, fileName)).toString().split("\n");
}

/**
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
 */

type slope = [x: number, y: number];

function traverse([x, y]: slope, lines: string[], trees = 0, pos = 0): number {
  pos = (pos + x) % lines[y].length;
  lines = lines.slice(y);
  if (lines[0][pos] === "#") {
    trees++;
  }
  if (!lines[y]) {
    return trees;
  }
  return traverse([x, y], lines, trees, pos);
}
// example
console.log(
  "Example: \n",
  traverse([3, 1], readInputIntoLineArray("example.txt"))
);
// part1
console.log(
  "Part 1: \n",
  traverse([3, 1], readInputIntoLineArray("input.txt"))
);

// part2
const s1 = traverse([1, 1], readInputIntoLineArray("input.txt"));
const s2 = traverse([3, 1], readInputIntoLineArray("input.txt"));
const s3 = traverse([5, 1], readInputIntoLineArray("input.txt"));
const s4 = traverse([7, 1], readInputIntoLineArray("input.txt"));
const s5 = traverse([1, 2], readInputIntoLineArray("input.txt"));

console.log(
  "Part 2: \n",
  s1,
  s2,
  s3,
  s4,
  s5,
  "\nTotal\n",
  s1 * s2 * s3 * s4 * s5
);
