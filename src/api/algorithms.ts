import axios, { AxiosError } from "axios";
import config from "../config";
import { IAlgorithm, IAlgorithmData, IBaseEntity } from "./algorithm.interface";
import { AppError } from "../errors";

const algoApiUrl = `${config.apiUrl ?? config.appHost}/api/algorithms/`;

export const getAlgorithms = async (): Promise<IBaseEntity[]> => {
  const res = await axios.get(algoApiUrl);
  if (!(res?.data instanceof Array) || res.data.length === 0) {
    throw new AppError("Ошибка получения списка алгоритмов");
  }

  return res.data as IBaseEntity[];
};

export const getAlgorithmDescription = async (
  algorithm: string,
): Promise<IAlgorithm> => {
  const defaultErrorMessage = "Ошибка получения описания алгоритма";
  try {
    const res = await axios.get(algoApiUrl + algorithm);
    return res.data as IAlgorithm;
  } catch (error) {
    if (error instanceof AxiosError) {
      let message = error.response?.data.detail || defaultErrorMessage;
      throw new AppError(message, error.status === 404);
    }
    throw error;
  }
};

export const getAlgorithmResult = async (
  algorithm: string,
  data: IAlgorithmData[],
): Promise<IAlgorithmData[]> => {
  const defaultErrorMessage =
    "Ошибка получения результата выполнения алгоритма";
  let res;
  try {
    res = await axios.post(`${algoApiUrl}${algorithm}/results`, data);
  } catch (error) {
    if (error instanceof AxiosError) {
      let message = error.response?.data.detail || defaultErrorMessage;
      if (error.status === 422) {
        message = "Некорректно заполнены входные данные";
      }
      throw new AppError(message, error.status === 404);
    }
    throw error;
  }

  if (!(res.data instanceof Array) || res.data.length === 0) {
    throw new AppError(defaultErrorMessage);
  }

  return res.data as IAlgorithmData[];
};
