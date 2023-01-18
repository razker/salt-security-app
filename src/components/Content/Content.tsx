import { useTheme } from "@mui/material";
import Tabs from "@mui/material/Tabs/Tabs";
import { Tab } from "../Tab/Tab";
import { useState } from "react";
import { RequestDto, ResponseDto } from "../ApiInfo/types";
import ColumnBox from "../ColumnBox/ColumnBox";
import ApiDetalis from "../ApiDetalis/ApiDetalis";

type ContentProps = {
  request: RequestDto;
  response: ResponseDto;
};

const Content = ({ request, response }: ContentProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };
  return (
    <ColumnBox maxHeight padding={useTheme().spacing(2)}>
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Request" />
        <Tab label="Response" />
      </Tabs>
      {tabIndex === 0 && <ApiDetalis data={request} />}
      {tabIndex === 1 && <ApiDetalis data={response} />}
    </ColumnBox>
  );
};

export default Content;
