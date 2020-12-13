const fs = require('fs')
const path = require('path')

const readFile = (filename: string): string => {
  return fs.readFileSync(path.join(process.cwd(), 'input', filename)).toString()
}

const writeOutput = (data: Record<string, string | number>[]) => {
  const outputStr = data.reduce((prev, curr) => {
    return prev + JSON.stringify(curr) + '\n'
  }, '')
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

function parseInput(input: string[]): {} {
  return input.reduce((prev, curr) => {
    return { ...prev, ...parseBagRule(curr) }
  }, [])
}

const example1 = readFile('example.txt').split('\n')
example1.pop()

parseInput(example1)

const part1 = readFile('input.txt').split('\n')
part1.pop()

console.log(parseInput(part1))
