import Topsis, { CriteriaAttribute } from './Topsis.js';

describe('Topsis', () => {
  const criteria: CriteriaAttribute[] = [
    { name: 'Cost', weight: 0.3, type: 'cost' },
    { name: 'Time', weight: 0.2, type: 'benefit' },
    { name: 'Quality', weight: 0.5, type: 'benefit' },
  ];

  const matrix = [
    [100, 10, 0.9],
    [200, 15, 0.85],
    [150, 12, 0.95],
    [170, 13, 0.91],
  ];

  test('should throw TypeError when matrix argument is not an array', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(() => Topsis.rank(criteria, 123 as unknown as any)).toThrow(TypeError);
  });

  test('should throw TypeError when matrix column length is not equal to criteria length', () => {
    const invalidMatrix = [
      [100, 10, 0.9],
      [200, 15],
      [150, 12, 0.95],
      [170, 13, 0.91],
    ];
    expect(() => Topsis.rank(criteria, invalidMatrix)).toThrow(TypeError);
  });

  test('should return empty array when matrix is empty', () => {
    expect(Topsis.rank(criteria, [])).toEqual([]);
  });

  test('should rank alternatives correctly', () => {
    const ranked = Topsis.rank(criteria, matrix, true);
    expect(ranked).toEqual([0, 2, 3, 1]);
  });

  test('should return null when no alternatives are given', () => {
    expect(Topsis.best(criteria, [])).toBeNull();
  });

  test('should return the index of the best alternative', () => {
    expect(Topsis.best(criteria, matrix)).toBe(0);
  });
});
