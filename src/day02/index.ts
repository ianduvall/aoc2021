import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n').map(line => {
  const [direction, distance] = line.split(' ');
  return [direction, parseInt(distance, 10)] as ['forward' | 'down' | 'up', number];
});

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let horizontal = 0;
  let vertical = 0;

  const directions = input.forEach(([direction, distance]) => {
    if (direction === 'forward') {
      horizontal += distance;
    } else if (direction === 'down') {
      vertical += distance;
    } else if (direction === 'up') {
      vertical -= distance;
    }
  });

  return horizontal * vertical;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let horizontal = 0;
  let vertical = 0;
  let aim = 0;

  const directions = input.forEach(([direction, distance]) => {
    if (direction === 'forward') {
      horizontal += distance;
      vertical += aim * distance;
    } else if (direction === 'down') {
      aim += distance;
    } else if (direction === 'up') {
      aim -= distance;
    }
  });

  return horizontal * vertical;
};

run({
  part1: {
    tests: [
      { input: `
      forward 5
      down 5
      forward 8
      up 3
      down 8
      forward 2
      `, expected: 150 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
      forward 5
      down 5
      forward 8
      up 3
      down 8
      forward 2
      `, expected: 900 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
