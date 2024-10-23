import axios, { AxiosError } from "axios";
import config from "../config";
import { IAlgorithm, IAlgorithmData, IBaseEntity } from "./algorithm.interface";
import { AppError } from "../errors";

const algoApiUrl = `${config.apiUrl ?? config.appHost}/api/algorithms/`;

export const getAlgorithms = async (): Promise<IBaseEntity[]> => {
  const res = await axios.get(algoApiUrl);
  if (
    !(res?.data instanceof Array) ||
    res.data.length === 0
  ) {
    throw new AppError("Ошибка получения списка алгоритмов");
  }

  return res.data as IBaseEntity[];
};

export const getAlgorithmDescription = async (
  algorithm: string,
): Promise<IAlgorithm> => {
  const res = await axios.get(algoApiUrl + algorithm);
  if (!res?.data) {
    throw new AppError("Ошибка получения описания алгоритма");
  }
  if (res.data.errors) {
    throw new AppError(res.data.errors);
  }

  return res.data.result as IAlgorithm;
};

export const getAlgorithmResult = async (
  algorithm: string,
  data: IAlgorithmData[],
): Promise<IAlgorithmData[]> => {
  let res;
  try {
    res = await axios.post(algoApiUrl + algorithm, { parameters: data });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new AppError(
        error.status === 422
          ? "Некорректно заполнены входные данные"
          : error.message,
      );
    }
    throw error;
  }

  if (!res?.data) {
    throw new AppError("Ошибка получения результата выполнения алгоритма");
  }
  if (res.data.errors) {
    throw new AppError(
      res.data.errors,
      res.data.errors.includes("Алгоритм с именем"),
    );
  }
  if (
    !(res.data.result?.outputs instanceof Array) ||
    res.data.result.outputs.length === 0
  ) {
    throw new AppError("Ошибка получения результата выполнения алгоритма");
  }

  return res.data.result.outputs as IAlgorithmData[];
};
