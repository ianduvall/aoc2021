import run from "aocrunner";

type Point = [x: number, y: number];
type Fold = [axis: "x" | "y", value: number];

const parseInput = (rawInput: string) => {
  const [coordinates, foldAlong] = rawInput.split("\n\n");

  let maxX = 0;
  let maxY = 0;
  const points: Point[] = coordinates.split("\n").map((line) => {
    const [x, y] = line.split(",").map(Number);
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    return [x, y];
  });
  const folds: Fold[] = foldAlong.split("\n").map((line) => {
    const [axis, value] = line.replace("fold along ", "").split("=");
    return [axis, Number(value)] as Fold;
  });

  return {
    points,
    folds,
    maxX,
    maxY,
  };
};

const part1 = (rawInput: string) => {
  const { points, folds, maxX, maxY } = parseInput(rawInput);
  const getPointKey = ([x, y]: Point) => `${x},${y}`;
  const pointsSet = new Set(points.map(getPointKey));

  let visiblePoints = 0;
  for (const [axis, value] of folds.slice(0, 1)) {
    if (axis === "x") {
      for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x < value; x++) {
          const pointLeftOfFold = pointsSet.has(getPointKey([x, y]));
          const pointRightOfFold = pointsSet.has(
            getPointKey([2 * value - x, y]),
          );
          if (pointLeftOfFold || pointRightOfFold) {
            visiblePoints++;
          }
        }
      }
    } else {
      for (let y = 0; y < value; y++) {
        for (let x = 0; x <= maxX; x++) {
          const pointAboveFold = pointsSet.has(getPointKey([x, y]));
          const pointBelowFold = pointsSet.has(getPointKey([x, 2 * value - y]));
          if (pointAboveFold || pointBelowFold) {
            visiblePoints++;
          }
        }
      }
    }
  }

  return visiblePoints;
};

const part2 = (rawInput: string) => {
  let { points, folds, maxX, maxY } = parseInput(rawInput);

  type PointKey = `${number},${number}`;
  const getPointKey = ([x, y]: Point): PointKey => `${x},${y}`;
  let pointsSet = new Set<PointKey>(points.map(getPointKey));

  for (const [axis, value] of folds) {
    let newPointsSet = new Set<PointKey>();

    if (axis === "x") {
      // fold left
      for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x < value; x++) {
          const pointLeftOfFold = pointsSet.has(getPointKey([x, y]));
          const pointRightOfFold = pointsSet.has(
            getPointKey([2 * value - x, y]),
          );
          if (pointLeftOfFold || pointRightOfFold) {
            newPointsSet.add(getPointKey([x, y]));
          }
        }
      }
      maxX = value - 1;
    } else {
      // fold up
      for (let y = 0; y < value; y++) {
        for (let x = 0; x <= maxX; x++) {
          const pointAboveFold = pointsSet.has(getPointKey([x, y]));
          const pointBelowFold = pointsSet.has(getPointKey([x, 2 * value - y]));
          if (pointAboveFold || pointBelowFold) {
            newPointsSet.add(getPointKey([x, y]));
          }
        }
      }
      maxY = value - 1;
    }

    pointsSet = newPointsSet;
  }

  let output = "";
  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      output += pointsSet.has(getPointKey([x, y])) ? "#" : ".";
    }
    output += "\n";
  }
  console.log(output);

  // actual puzzle solution
  return "HZKHFEJZ";
};

const exampleInput = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`;
run({
  part1: {
    tests: [{ name: "example input", input: exampleInput, expected: 17 }],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
});
