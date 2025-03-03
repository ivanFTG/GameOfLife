// tests/index.test.ts

import { Universe, Seed, Cell } from '../src/';

describe('A universe is always started with a seed that will introduce the living cells during the Universe Time.', () => {
  describe('When the universe is created the living cells are the same as the Seed ones', () => {
    it('Empty Seed will return empty Universe', () => {
      const emptySeed = new Seed();
      const emptyUniverse = new Universe(emptySeed);
      expect(emptyUniverse.livingCells()).toStrictEqual(
        emptySeed.livingCells()
      );
    });
    it('Seed with living cells will create Universe with living cells', () => {
      const seedWithLivingCells = new Seed();
      seedWithLivingCells.addLivingCells(
        new Cell(0, 1),
        new Cell(3, 4),
        new Cell(3, 3)
      );
      const universeWithLivingCells = new Universe(seedWithLivingCells);
      expect(universeWithLivingCells.livingCells()).toStrictEqual(
        seedWithLivingCells.livingCells()
      );
    });
  });
});

describe('A Universe with living cells will change during the ticks of Time', () => {
  describe('When the time starts (ticks) to pass on the universe the life of cells start to happen', () => {
    it('A Universe with one cell will die after the first tick of time', () => {
      const seedWithLivingCells = new Seed();
      seedWithLivingCells.addLivingCells(new Cell(0, 0));
      const universeWithLivingCells = new Universe(seedWithLivingCells);
      universeWithLivingCells.tick();
      expect(universeWithLivingCells.numberOfLivingCells()).toStrictEqual(0);
    });
  });
});
