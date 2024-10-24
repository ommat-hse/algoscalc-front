import { DataShapeEnum } from "../api/data-shape.enum";
import { DataTypeEnum } from "../api/data-type.enum";
import { ParseError } from "../errors";

export function parseValue(
  value: any,
  dataType: DataTypeEnum,
  dataShape: DataShapeEnum,
) {
  if (dataShape === DataShapeEnum.SCALAR) {
    return parseScalarValue(value, dataType);
  }

  if (dataShape === DataShapeEnum.LIST) {
    return parseListValue(value, dataType);
  }

  if (dataShape === DataShapeEnum.MATRIX) {
    if (!(value instanceof Array)) {
      throw new ParseError("Значение не является массивом");
    }

    return parseMatrixValue(value, dataType);
  }
}

export function parseScalarValue(value: string, dataType: DataTypeEnum) {
  if (value === null || value === undefined) {
    throw new ParseError("Значение не задано");
  }
  value = String(value);

  if (dataType === DataTypeEnum.STRING) {
    if (value.length < 1) {
      throw new ParseError("Строка не содержит символов");
    }
    return value;
  }

  value = value.trim();

  if (dataType === DataTypeEnum.FLOAT) {
    if (!/^[+-]?\d+(\.\d+)?$/.exec(value)) {
      throw new ParseError(
        `Значение [${value}] не соответствует формату действительного числа`,
      );
    }

    return parseFloat(value);
  }

  if (dataType === DataTypeEnum.INT) {
    if (!/^[-+]?\d+$/.exec(value)) {
      throw new ParseError(
        `Значение [${value}] не соответствует формату целого числа`,
      );
    }

    return Number(value);
  }

  if (dataType === DataTypeEnum.BOOL) {
    if (!/^(true|false|0|1)$/i.exec(value)) {
      throw new ParseError(
        `Значение [${value}] не соответствует логическому формату`,
      );
    }

    return /^(true|1)$/i.test(value);
  }
}

export function parseListValue(value: string, dataType: DataTypeEnum) {
  const list = [];
  let num = 1;
  for (const item of value.replace(" ", "").split(",")) {
    try {
      list.push(parseScalarValue(item, dataType));
      num++;
    } catch (error) {
      if (error instanceof ParseError) {
        error.message = `Элемент с номером ${num} - ${error.message}`;
      }
      throw error;
    }
  }
  return list;
}

export function parseMatrixValue(
  value: Array<string[]>,
  dataType: DataTypeEnum,
) {
  const matrix = [];
  let rowIdx = 1;
  for (const row of value) {
    if (!(row instanceof Array)) {
      throw new ParseError(`Строка с номером ${rowIdx} не является массивом`);
    }
    const resultRow = [];
    let colIdx = 1;
    for (const item of row) {
      try {
        resultRow.push(parseScalarValue(item, dataType));
        colIdx++;
      } catch (error) {
        if (error instanceof ParseError) {
          error.message = `Элемент с номером ${colIdx} в строке ${rowIdx} - ${error.message}`;
        }
        throw error;
      }
    }
    matrix.push(resultRow);
    rowIdx++;
  }

  return matrix;
}
