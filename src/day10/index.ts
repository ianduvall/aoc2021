import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const openChars = new Set(["(", "[", "{", "<"]);
const closeChars = new Set([")", "]", "}", ">"]);
const openCloseMap = new Map([
  ["{", "}"],
  ["(", ")"],
  ["[", "]"],
  ["<", ">"],
]);
const part1ScoreMap = new Map([
  [")", 3],
  ["]", 57],
  ["}", 1197],
  [">", 25137],
]);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((sum, line) => {
    const stack: string[] = [];

    for (const char of line) {
      if (openChars.has(char)) {
        stack.push(char);
      } else if (closeChars.has(char)) {
        const last = stack.pop()!;
        const lastClosing = openCloseMap.get(last)!;

        if (char !== lastClosing) {
          const score = part1ScoreMap.get(char)!;
          return sum + score;
        }
      }
    }

    return sum;
  }, 0);
};

const part2ScoreMap = new Map([
  [")", 1],
  ["]", 2],
  ["}", 3],
  [">", 4],
]);

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const incompleteScores = input.reduce<number[]>((scores, line) => {
    const stack: string[] = [];

    for (const char of line) {
      if (openChars.has(char)) {
        stack.push(char);
      } else if (closeChars.has(char)) {
        const last = stack.pop()!;
        const lastClosing = openCloseMap.get(last)!;

        const illegal = char !== lastClosing;
        if (illegal) return scores;
      }
    }

    if (stack.length === 0) return scores;

    const incompleteScore = stack.reverse().reduce((sum, char) => {
      const closing = openCloseMap.get(char)!;
      const score = part2ScoreMap.get(closing)!;

      return sum * 5 + score;
    }, 0);

    scores.push(incompleteScore);

    return scores;
  }, []);

  incompleteScores.sort((a, b) => a - b);
  return incompleteScores[Math.floor(incompleteScores.length / 2)];
};

const exampleInput = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`;
run({
  part1: {
    tests: [{ name: "example input", input: exampleInput, expected: 26397 }],
    solution: part1,
  },
  part2: {
    tests: [{ name: "example input", input: exampleInput, expected: 288957 }],
    solution: part2,
  },
  trimTestInputs: true,
});
