import React from "react";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./themes/theme";
import "./App.module.css";
import ApiInfo from "./components/ApiInfo/ApiInfo";
import mockData from "./mockData/fe_data.json";

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <ApiInfo
        name={mockData.api}
        method={mockData.method}
        path={mockData.path}
        request={mockData.request}
        response={mockData.response}
      />
    </ThemeProvider>
  );
};

export default App;
