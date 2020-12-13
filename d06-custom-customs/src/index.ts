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

/**
abc

a
b
c

ab
ac

a
a
a
a

b
*/

function parseCustomsForm(
  input: string[],
  questions: string[] = [],
  totalCount: number = 0
): number {
  if (input.length === 0) {
    return totalCount
  }

  const line = input[0]
  if (line.length === 0) {
    totalCount += questions.length
    questions = []
    return parseCustomsForm(input.slice(1), questions, totalCount)
  }

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (questions.indexOf(char) === -1) {
      questions.push(char)
    }
  }

  return parseCustomsForm(input.slice(1), questions, totalCount)
}

const example = parseCustomsForm(readFile('example.txt').split('\n'))
const part1 = parseCustomsForm(readFile('input.txt').split('\n'))

console.log('example', '--', example)
console.log('Part 1', '--', part1)
