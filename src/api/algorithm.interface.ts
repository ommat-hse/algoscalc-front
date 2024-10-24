import { DataShapeEnum } from "./data-shape.enum";
import { DataTypeEnum } from "./data-type.enum";

export interface IBaseEntity {
  name: string;
  title: string;
  description: string;
}

export interface IParameter extends IBaseEntity {
  data_type: DataTypeEnum;
  data_shape: DataShapeEnum;
}

export interface IOutput extends IParameter {
  value: string;
}

export interface IAlgorithm extends IBaseEntity {
  parameters: IParameter[];
  outputs: IOutput[];
}

export interface IAlgorithmData {
  name: string;
  value: any;
}
