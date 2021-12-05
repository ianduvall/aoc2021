import run from "aocrunner";

type Row = string[];
type Board = Row[];
const boardSize = 5;
const parseNumbers = (nums: string) => nums.split(",");
const parseBoard = (board: string): Board =>
  board.split("\n").map((row) => row.split(" ").filter((str) => str !== ""));
const parseInput = (rawInput: string) => {
  const [numsString, ...boards] = rawInput.split("\n\n");
  let nums = parseNumbers(numsString);
  const drawingsBeforeBingoCanExist = boardSize - 1;
  const drawnNumsBeforeBingoCanExist = nums.slice(
    0,
    drawingsBeforeBingoCanExist,
  );
  nums = nums.slice(drawingsBeforeBingoCanExist);

  return {
    nums,
    drawnNums: new Set<string>(drawnNumsBeforeBingoCanExist),
    boards: boards.map((board) => parseBoard(board)),
  };
};

const doesBoardHaveBingo = ({
  board,
  drawnNums,
}: {
  board: Board;
  drawnNums: Set<string>;
}): boolean => {
  const hasHorizontalBingo = board.some((row) =>
    row.every((num) => drawnNums.has(num)),
  );
  if (hasHorizontalBingo) return true;

  for (let col = 0; col < boardSize; col++) {
    const hasVerticalBingo = board.every((row) => drawnNums.has(row[col]));
    if (hasVerticalBingo) return true;
  }

  return false;
};
const calcBoardScore = ({
  board,
  drawnNums,
}: {
  board: Board;
  drawnNums: Set<string>;
}): number => {
  let score = 0;
  board.forEach((row) =>
    row.forEach((num) => {
      if (!drawnNums.has(num)) {
        score += parseInt(num, 10);
      }
    }),
  );

  return score;
};

const part1 = (rawInput: string) => {
  const { nums, drawnNums, boards } = parseInput(rawInput);

  for (let num of nums) {
    drawnNums.add(num);

    for (let board of boards) {
      const hasBingo = doesBoardHaveBingo({ board, drawnNums });

      if (hasBingo) {
        return calcBoardScore({ board, drawnNums }) * parseInt(num, 10);
      }
    }
  }

  return;
};

const removeBoard = (boards: Board[], index: number) => boards.splice(index, 1);

const part2 = (rawInput: string) => {
  const { nums, drawnNums, boards } = parseInput(rawInput);

  const bingoScores: number[] = [];

  for (let num of nums) {
    drawnNums.add(num);

    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
      const board = boards[boardIndex];
      const hasBingo = doesBoardHaveBingo({ board, drawnNums });

      if (hasBingo) {
        bingoScores.push(
          calcBoardScore({ board, drawnNums }) * parseInt(num, 10),
        );
        removeBoard(boards, boardIndex);
      }
    }
  }

  return bingoScores.at(-1);
};

const exampleInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;
run({
  part1: {
    tests: [{ input: exampleInput, expected: 4512 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: exampleInput, expected: 1924 }],
    solution: part2,
  },
  trimTestInputs: true,
});
