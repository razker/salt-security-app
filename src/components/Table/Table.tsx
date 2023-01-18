import styles from "./Table.module.css";
import ColumnBox from "../ColumnBox/ColumnBox";
import { Fragment, useState } from "react";
import { Button, Typography, useTheme } from "@mui/material";
import FBox from "../FBox/FBox";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

type TableProps = {
  data: any;
  tableRowMap: Record<string, string>;
  dataSubjectMap: Record<string, string>;
  dataChangeHandler: (
    dataType: string,
    name: string,
    subDataType: string,
    data: any
  ) => void;
};

type tableRowProps = {
  dataSubject: string;
  dataArray: any[];
  dataSubjectMap: Record<string, string>;
  dataChangeHandler: (
    dataType: string,
    name: string,
    subDataType: string,
    data: any
  ) => void;
};

type TableDataProps = {
  subDataType: string;
  data: string;
  onButtonHandle: (dataType: string, data: boolean) => void;
};

const TableData = ({ subDataType, data, onButtonHandle }: TableDataProps) => {
  return (
    <FBox justifyContent={"center"}>
      {subDataType === "name" && <FBox>{data}</FBox>}
      {subDataType === "pii" && (
        <Button
          onClick={() => onButtonHandle(subDataType, !data)}
          style={{
            color: data ? "#FFF" : "#12296d",
            borderColor: "#12296d",
            backgroundColor: data ? "#12296d" : "#FFF",
          }}
          variant={data ? "contained" : "outlined"}
        >
          {subDataType}
        </Button>
      )}
      {subDataType === "masked" && (
        <Button
          onClick={() => onButtonHandle(subDataType, !data)}
          variant={data ? "contained" : "outlined"}
        >
          {subDataType}
        </Button>
      )}
      {subDataType === "type" && (
        <Button
          style={{
            color: "#469eb9",
            borderColor: "#cee5ec",
            backgroundColor: "#cee5ec",
          }}
          disabled
        >
          {data}
        </Button>
      )}
    </FBox>
  );
};

const TableRow = ({
  dataSubject,
  dataArray,
  dataChangeHandler,
  dataSubjectMap,
}: tableRowProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenCard = () => {
    setIsOpen(!isOpen);
  };

  const onButtonHandle = (
    dataType: string,
    name: string,
    subDataType: string,
    data: boolean
  ) => {
    dataChangeHandler(dataType, name, subDataType, data);
  };

  return (
    <Fragment>
      <tr key={dataSubject}>
        <Button onClick={handleOpenCard}>
          <ArrowCircleRightIcon
            onClick={handleOpenCard}
            style={{
              transform: isOpen ? "rotate(90deg)" : "",
              color: "#a8a8a8",
            }}
          />
        </Button>
        <Typography
          style={{ display: "inline" }}
          variant={"subtitle2"}
          color={"black"}
          fontWeight={500}
        >
          {dataSubjectMap[dataSubject]}
        </Typography>
      </tr>

      {isOpen &&
        dataArray.map((rowObj, index) => (
          <tr className={styles.rawCard} key={index}>
            {Object.keys(rowObj).map((row, index) => (
              <td key={`${row}-${index}`}>
                <TableData
                  onButtonHandle={(subDataType: string, data: boolean) =>
                    onButtonHandle(
                      dataSubject,
                      rowObj["name"],
                      subDataType,
                      data
                    )
                  }
                  subDataType={row}
                  data={rowObj[row]}
                />
              </td>
            ))}
          </tr>
        ))}
    </Fragment>
  );
};

const Table = ({
  data,
  dataChangeHandler,
  tableRowMap,
  dataSubjectMap,
}: TableProps) => {
  const theme = useTheme();

  return (
    <ColumnBox padding={theme.spacing(2)}>
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.keys(tableRowMap).map((title) => (
              <th key={title} className={styles.thead}>
                <ColumnBox padding={theme.spacing(1)}>
                  <Typography
                    fontWeight={500}
                    variant="subtitle2"
                    color={theme.palette.primary.light}
                  >
                    {tableRowMap[title]}
                  </Typography>
                </ColumnBox>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((dataSubject, key) => (
            <TableRow
              key={key}
              dataSubject={dataSubject}
              dataSubjectMap={dataSubjectMap}
              dataArray={data[dataSubject]}
              dataChangeHandler={dataChangeHandler}
            />
          ))}
        </tbody>
      </table>
    </ColumnBox>
  );
};

export default Table;
