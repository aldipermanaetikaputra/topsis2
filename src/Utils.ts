class Utils {
  public static tablePrintMatrix2D(matrix: number[][], name: string, decimal: boolean) {
    console.log(name);

    const table = matrix
      .map(cols =>
        cols.reduce(
          (p, c, i) => ({ ...p, ['C' + (i + 1).toString()]: decimal ? Number(c.toFixed(2)) : c }),
          {}
        )
      )
      .reduce((p, c, i) => ({ ...p, ['A' + (i + 1).toString()]: c }), {});

    console.table(table);
  }

  public static tablePrintMatrix1D(
    matrix: number[],
    name: string,
    decimal: boolean,
    target: 'alternative' | 'criteria',
    sort = false
  ) {
    console.log(name);

    let table = matrix.reduce(
      (p, c, i) => ({
        ...p,
        [(target === 'criteria' ? 'C' : 'A') + (i + 1).toString()]: decimal
          ? Number(c.toFixed(2))
          : c,
      }),
      {}
    );

    if (sort) {
      table = Object.fromEntries(Object.entries<number>(table).sort((a, b) => b[1] - a[1]));
    }

    console.table(target === 'criteria' ? [table] : table);
  }
}

export default Utils;
