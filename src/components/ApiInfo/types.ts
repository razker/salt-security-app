export type ApiData = {
  name: string;
  pii: boolean;
  masked: boolean;
  type: string;
};

export type RequestDto = {
  urlParams?: any[];
  queryParams?: ApiData[];
  headers: ApiData[];
  body: ApiData[];
};

export type ResponseDto = {
  headers: ApiData[];
  body: ApiData[];
};
