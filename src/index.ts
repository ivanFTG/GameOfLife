// src/index.ts

export class Universe {
  cells: Cell[];
  constructor(seed: Seed) {
    this.cells = seed.livingCells();
  }

  tick() {
  }

  livingCells(): Cell[] {
    return this.cells;
  }

  numberOfLivingCells(): number {
    return 0;
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
