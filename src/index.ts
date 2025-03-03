// src/index.ts
// export function helloWorld(): string {
//   return "Hello, world!";
// };

// console.log(helloWorld());

export class Universe {
  cells: Cell[];
  constructor(seed: Seed) {
    this.cells = seed.livingCells();
  }

  livingCells(): Cell[] {
    return this.cells;
  }
}

export class Seed {
  private cells: Cell[] = [];

  livingCells(): Cell[] {
    return this.cells;
  }

  addLivingCells(...cells: Cell[]) {
    cells.forEach((cell) => {
      this.cells.push(cell);
    });
  }
}

export class Cell {
  xPosition: number;
  yPosition: number;

  constructor(x: number, y: number) {
    this.xPosition = x;
    this.yPosition = y;
  }
}
