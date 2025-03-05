// src/index.ts

export class Universe {
  cells: Cell[];
  constructor(seed: Seed) {
    this.cells = seed.livingCells();
  }

  tick() {
    this.markCellsToDie();
    this.killCells();
  }

  livingCells(): Cell[] {
    return this.cells;
  }

  numberOfLivingCells(): number {
    return this.cells.length;
  }

  private markCellsToDie() {
    this.cells.forEach((cell) => {
      if (this.numberOfNeighbours(cell) < 2) {
        cell.shouldDie = true;
      }
    });
  }

  private killCells() {
    this.cells = this.cells.filter((cell) => {
      return !cell.shouldDie;
    });
  }

  private numberOfNeighbours(cell: Cell): number {
    let neighbourCount: number = 0;
    this.cells.forEach((possibleNeighbour) => {
      if (cell.isNeighbourOf(possibleNeighbour)) {
        neighbourCount++;
      }
    });
    return neighbourCount;
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
  shouldDie: boolean = false;

  constructor(x: number, y: number) {
    this.xPosition = x;
    this.yPosition = y;
  }

  isNeighbourOf(cell: Cell): boolean {
    const neighbours = [
      new Cell(this.xPosition - 1, this.yPosition - 1),
      new Cell(this.xPosition - 1, this.yPosition),
      new Cell(this.xPosition - 1, this.yPosition + 1),
      new Cell(this.xPosition, this.yPosition - 1),
      new Cell(this.xPosition, this.yPosition + 1),
      new Cell(this.xPosition + 1, this.yPosition),
      new Cell(this.xPosition + 1, this.yPosition - 1),
      new Cell(this.xPosition + 1, this.yPosition + 1),
    ];
    return (
      neighbours.findIndex((neighbour) => {
        return (
          neighbour.xPosition == cell.xPosition &&
          neighbour.yPosition == cell.yPosition
        );
      }) >= 0
    );
  }
}
