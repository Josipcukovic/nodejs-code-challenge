import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Bottleneck from "bottleneck";
import { oneSecondInMs } from "../constants/appConstants";

const limiter = new Bottleneck({
  minTime: oneSecondInMs,
});

type GetAxios = <T = any>(
  url: string,
  config?: AxiosRequestConfig
) => Promise<AxiosResponse<T>>;

const getWithLimit: GetAxios = limiter.wrap(axios.get);

export const fetchUrl = async (url: string) => {
  const response = await getWithLimit(url);

  if (response.status >= 200 && response.status < 300) return response.data;

  throw new Error(`Fetch failed with status: ${response.status}`);
};
