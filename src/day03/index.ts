import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const zeros: number[] = new Array(input[0].length).fill(0);
  const ones: number[] = [...zeros];

  input.forEach((line) => {
    for (let i = 0, end = input.length; i < end; i++) {
      const char = line[i];
      if (char === "0") {
        ++zeros[i];
      } else if (char === "1") {
        ++ones[i];
      }
    }
  });

  // gamma
  let leastCommon = "";
  // epsilon
  let mostCommon = "";

  for (let i = 0, end = zeros.length; i < end; i++) {
    if (zeros[i] > ones[i]) {
      mostCommon += "0";
      leastCommon += "1";
    } else {
      mostCommon += "1";
      leastCommon += "0";
    }
  }

  return parseInt(mostCommon, 2) * parseInt(leastCommon, 2);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const calcRating = (criteria: "most" | "least") => {
    let nums = input;
    let i = 0;

    while (nums.length > 1) {
      let zeros: string[] = [];
      let ones: string[] = [];

      nums.forEach((line) => {
        const char = line[i];
        if (char === "0") {
          zeros.push(line);
        } else if (char === "1") {
          ones.push(line);
        }
      });

      if (criteria === "most") {
        if (zeros.length > ones.length) {
          nums = zeros;
        } else {
          nums = ones;
        }
      } else {
        if (zeros.length > ones.length) {
          nums = ones;
        } else {
          nums = zeros;
        }
      }
      ++i;
    }

    return nums[0];
  };

  // oxygen
  const mostCommon = parseInt(calcRating("most"), 2);

  // CO2
  const leastCommon = parseInt(calcRating("least"), 2);

  return mostCommon * leastCommon;
};

const exampleInput = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;
run({
  part1: {
    tests: [{ input: exampleInput, expected: 198 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: exampleInput, expected: 230 }],
    solution: part2,
  },
  trimTestInputs: true,
});
