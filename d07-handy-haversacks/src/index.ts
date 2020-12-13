const fs = require('fs')
const path = require('path')

const readFile = (filename: string): string => {
  return fs.readFileSync(path.join(process.cwd(), 'input', filename)).toString()
}

const writeOutput = (data: Record<string, string[]>) => {
  const outputStr = JSON.stringify(data, null, 2)
  fs.writeFileSync(path.join(process.cwd(), 'output.txt'), outputStr, 'utf-8')
}

// You have a shiny gold bag!
// some bags will directly contain shiny gold
// other bags may indirectly contain shiny gold
function parseBagRule(line: string): any {
  const rule = line.split(/\sbags\scontain\s/)
  let ruleObj: Record<string, string[]> = {}
  const rules = rule[1]
    .split(', ')
    .map((rule) => rule.replace(/\d\s(\w+\s\w+)\sbags?\.?/gi, '$1'))
  ruleObj[rule[0]] = [...rules]
  return ruleObj
}

function parseInput(input: string[]): Record<string, string[]> {
  return input.reduce((prev, curr) => {
    return { ...prev, ...parseBagRule(curr) }
  }, {})
}

function findShinyGold(rules: Record<string, string[]>): string[] {
  let shinyGolds: string[] = []

  // first find all rules that contain shiny golds directly
  for (const key in rules) {
    if (Object.prototype.hasOwnProperty.call(rules, key)) {
      const rule = rules[key]
      if (rule.includes('shiny gold')) {
        shinyGolds.push(key)
      }
    }
  }

  // loop through again to find all indirect shiny golds
  for (let i = 0; i < shinyGolds.length; i++) {
    const indirects = shinyGolds[i]
    for (const key in rules) {
      if (Object.prototype.hasOwnProperty.call(rules, key)) {
        const rule = rules[key]
        if (rule.includes(indirects) && !shinyGolds.includes(key)) {
          shinyGolds.push(key)
        }
      }
    }
  }
  return shinyGolds
}

const example1 = readFile('example.txt').split('\n')
example1.pop()

const part1 = readFile('input.txt').split('\n')
part1.pop()

// console.log(parseInput(part1))

console.log('example', findShinyGold(parseInput(example1)).length)
console.log('part 1', findShinyGold(parseInput(part1)).length)
