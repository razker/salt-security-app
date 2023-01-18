import { RequestDto, ResponseDto } from "./types";
import ColumnBox from "../ColumnBox/ColumnBox";
import Header from "../Header/Header";
import Content from "../Content/Content";

type ApiInfoProps = {
  name: string;
  method: string;
  path: string;
  request: RequestDto;
  response: ResponseDto;
};

const ApiInfo = ({ name, method, path, request, response }: ApiInfoProps) => (
  <ColumnBox maxHeight>
    <Header name={name} method={method} path={path} />
    <Content request={request} response={response} />
  </ColumnBox>
);

export default ApiInfo;
