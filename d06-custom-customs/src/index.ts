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

function parseCustomsForm2(
  input: string[],
  questions: string[] = [],
  totalCount: number = 0,
  peopleInGroup: number = 0
): number {
  if (input.length === 0) {
    return totalCount
  }

  function reduceQuestions(questions: string[], people: number) {
    let total = 0
    const unique = questions.reduce((prev, curr) => {
      if (prev[curr]) {
        return { ...prev, [curr]: ++prev[curr] }
      }
      return { ...prev, [curr]: 1 }
    }, {} as Record<string, number>)
    for (const key in unique) {
      if (Object.prototype.hasOwnProperty.call(unique, key)) {
        const count = unique[key]
        if (count === people) {
          ++total
        }
      }
    }
    return total
  }

  const line = input[0]
  if (line.length === 0) {
    totalCount += reduceQuestions(questions, peopleInGroup)
    questions = []
    peopleInGroup = 0
    return parseCustomsForm2(
      input.slice(1),
      questions,
      totalCount,
      peopleInGroup
    )
  }

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    questions.push(char)
  }

  return parseCustomsForm2(
    input.slice(1),
    questions,
    totalCount,
    ++peopleInGroup
  )
}

const example = parseCustomsForm(readFile('example.txt').split('\n'))
const part1 = parseCustomsForm(readFile('input.txt').split('\n'))

const example2 = parseCustomsForm2(readFile('example.txt').split('\n'))
const part2 = parseCustomsForm2(readFile('input.txt').split('\n'))

console.log('example part 1', '--', example)
console.log('part 1', '--', part1)

console.log('example part 2', '--', example2)
console.log('part 2', '--', part2)
