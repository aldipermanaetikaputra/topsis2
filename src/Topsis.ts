import Utils from './Utils.js';

class Topsis {
  public static rank(criteria: CriteriaAttribute[], matrix: number[][], verbose = false) {
    // Validating decision matrix args

    if (!Array.isArray(matrix)) {
      throw TypeError(`The matrix argument must be an array of numbers`);
    }

    if (!matrix.every(row => row.length === criteria.length)) {
      throw TypeError(`The column length of the matrix must be equal to ${criteria.length}`);
    }

    if (matrix.length === 0) {
      return [];
    }

    const n = matrix.length;
    const m = matrix[0].length;

    if (verbose) Utils.tablePrintMatrix2D(matrix, 'decision matrix (M)', false);

    // Calculating normalized decision matrix

    const normalizedMatrix: number[][] = new Array(n).fill(null).map(() => new Array(m).fill(0));

    for (let j = 0; j < m; j++) {
      const denominator = Math.sqrt(
        new Array(n)
          .fill(0)
          .map((_, i) => Math.pow(matrix[i][j], 2))
          .reduce((p, c) => p + c, 0)
      );

      for (let i = 0; i < n; i++) {
        normalizedMatrix[i][j] = matrix[i][j] / denominator;
      }
    }

    if (verbose) Utils.tablePrintMatrix2D(normalizedMatrix, 'normalized decision matrix (R)', true);

    // Calculating weighted normalized decision matrix

    const weightedNormalizedMatrix: number[][] = new Array(n)
      .fill(null)
      .map((_, i) =>
        new Array(m).fill(null).map((_, j) => normalizedMatrix[i][j] * criteria[j].weight)
      );

    if (verbose)
      Utils.tablePrintMatrix2D(
        weightedNormalizedMatrix,
        'weighted normalized decision matrix (WR)',
        true
      );

    // Computing positive ideal solution matrix

    const positiveIdealSolutionMatrix = new Array(m)
      .fill(null)
      .map((_, j) =>
        Math[criteria[j].benefical ? 'max' : 'min'](
          ...weightedNormalizedMatrix.map(rows => rows[j])
        )
      );

    if (verbose)
      Utils.tablePrintMatrix1D(
        positiveIdealSolutionMatrix,
        'positive ideal solution matrix (A+)',
        true,
        'criteria'
      );

    // Computing negative ideal solution matrix

    const negativeIdealSolutionMatrix = new Array(m)
      .fill(null)
      .map((_, j) =>
        Math[criteria[j].benefical ? 'min' : 'max'](
          ...weightedNormalizedMatrix.map(rows => rows[j])
        )
      );

    if (verbose)
      Utils.tablePrintMatrix1D(
        negativeIdealSolutionMatrix,
        'positive negative solution matrix (A-)',
        true,
        'criteria'
      );

    // Calculating alternative distance to positive ideal solution matrix

    const distancePositiveMatrix = new Array(n).fill(null).map((_, i) =>
      Math.sqrt(
        new Array(m)
          .fill(null)
          .map((_, j) =>
            Math.pow(weightedNormalizedMatrix[i][j] - positiveIdealSolutionMatrix[j], 2)
          )
          .reduce((p, c) => p + c, 0)
      )
    );

    if (verbose)
      Utils.tablePrintMatrix1D(
        distancePositiveMatrix,
        'alternative distance to positive ideal solution matrix (D+)',
        true,
        'alternative'
      );

    // Calculating alternative distance to negative ideal solution matrix

    const distanceNegativeMatrix = new Array(n).fill(null).map((_, i) =>
      Math.sqrt(
        new Array(m)
          .fill(null)
          .map((_, j) =>
            Math.pow(weightedNormalizedMatrix[i][j] - negativeIdealSolutionMatrix[j], 2)
          )
          .reduce((p, c) => p + c, 0)
      )
    );

    if (verbose)
      Utils.tablePrintMatrix1D(
        distanceNegativeMatrix,
        'alternative distance to negative ideal solution matrix (D-)',
        true,
        'alternative'
      );

    // Calculating relative closeness to the ideal solution for each alternative

    const preferenceValues = new Array(n)
      .fill(null)
      .map(
        (_, i) =>
          distanceNegativeMatrix[i] / (distanceNegativeMatrix[i] + distancePositiveMatrix[i])
      );

    if (verbose) {
      Utils.tablePrintMatrix1D(preferenceValues, 'preference values (V)', true, 'alternative');
      Utils.tablePrintMatrix1D(
        preferenceValues,
        'sorted preference values (V)',
        true,
        'alternative',
        true
      );
    }

    // Assigning preference value with alternatives index and sort by largest value

    const indexedPreferenceValues = preferenceValues.map((v, i) => [i, v]);

    // Sorting alternatives by largest it's preference value

    const rankedAlternatives = indexedPreferenceValues
      .sort(([, a], [, b]) => b - a)
      .map(([index]) => index);

    return rankedAlternatives;
  }

  public static best(criteria: CriteriaAttribute[], matrix: number[][], verbose = false) {
    const ranked = this.rank(criteria, matrix, verbose);
    return ranked.length ? ranked[0] : null;
  }

  public criteria: CriteriaAttribute[];

  constructor(criteria: CriteriaAttribute[]) {
    this.criteria = criteria;
  }

  public rank(matrix: number[][], verbose = false) {
    return Topsis.rank(this.criteria, matrix, verbose);
  }

  public best(matrix: number[][], verbose = false) {
    return Topsis.best(this.criteria, matrix, verbose);
  }
}

type CriteriaAttribute = {
  weight: number;
  benefical: boolean;
};

export default Topsis;
