import run from "aocrunner";

type Char = "a" | "b" | "c" | "d" | "e" | "f" | "g";
const toChars = (str: string): Char[] => str.split("") as Char[];
const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const [signal, output] = line.split(" | ");
    return {
      signal: signal.split(" ").map(toChars),
      output: output.split(" ").map(toChars),
    };
  });

const digitSignals = [
  "abcefg",
  "cf",
  "acdeg",
  "acdfg",
  "bcdf",
  "abdfg",
  "abdefg",
  "acf",
  "abcdefg",
  "abcdfg",
].map(toChars);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const log = input.length < 20 ? console.log : () => {};

  const uniqDigitSignalLengths = [1, 4, 7, 8].map(
    (digit) => digitSignals[digit].length,
  );
  const inputOutputLengths = input.map(({ output }) =>
    output.map((str) => str.length),
  );
  let count = 0;

  inputOutputLengths.forEach((outputLengths) => {
    const uniqLengths = outputLengths.filter((length) =>
      uniqDigitSignalLengths.includes(length),
    );

    count += uniqLengths.length;
  });

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const log = input.length < 20 ? console.log : () => {};

  const outputSum = input.reduce((sum, { signal, output }) => {
    let outputNum = 0;

    // my brain keeps getting bored

    return sum + outputNum;
  }, 0);

  return outputSum;
};

const exampleInput = `
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`;
run({
  part1: {
    tests: [{ name: "", input: exampleInput, expected: 26 }],
    solution: part1,
  },
  part2: {
    tests: [{ name: "", input: exampleInput, expected: 61229 }],
    solution: part2,
  },
  trimTestInputs: true,
});
