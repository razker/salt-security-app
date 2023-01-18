import { useEffect, useMemo, useState } from "react";
import { RequestDto } from "../ApiInfo/types";
import ColumnBox from "../ColumnBox/ColumnBox";
import FilterBar from "../FilterBar/FilterBar";
import Table from "../Table/Table";
import styles from "./ApiDetalis.module.css";

type ApiDetalisProps = {
  data: RequestDto;
};

type FilterOptions = {
  filterText: string;
  filterPiiOnly: boolean;
};

const tableRowMap: Record<string, string> = {
  name: "NAME",
  pii: "PII",
  masked: "MASKED",
  type: "TYPE",
};

const dataSubjectMap: Record<string, string> = {
  urlParams: "URL Parameters",
  queryParams: "Query Parameters",
  headers: "Headrs",
  body: "Body",
};

const ApiDetalis = ({ data }: ApiDetalisProps) => {
  const [filterObject, setFilterObject] = useState<FilterOptions>({
    filterText: "",
    filterPiiOnly: false,
  });

  const [currentData, setCurrentData] = useState<any>({});

  useEffect(() => {
    setCurrentData(data);
  }, []);

  const filterdData = useMemo(() => {
    let result = {} as any;

    Object.keys(currentData).forEach((dataType) => {
      result[dataType] = [];
      currentData?.[dataType]?.forEach((element: any) => {
        if (
          filterObject.filterText !== "" &&
          (element.name === filterObject.filterText ||
            element.type === filterObject.filterText) &&
          (!filterObject.filterPiiOnly ||
            (filterObject.filterPiiOnly &&
              element.pii === filterObject.filterPiiOnly))
        ) {
          result[dataType].push(element);
        } else if (
          !filterObject.filterText &&
          (!filterObject.filterPiiOnly ||
            (filterObject.filterPiiOnly &&
              element.pii === filterObject.filterPiiOnly))
        ) {
          result[dataType].push(element);
        }
      });
    });

    return result;
  }, [filterObject, currentData]);

  const handleFilter = (filterText: string, filterPiiOnly: boolean) => {
    setFilterObject({ filterText, filterPiiOnly });
  };

  const updateField = (
    dataSubjectToUpdate: string,
    name: string,
    subDataTypeToUpdae: string,
    dataToUpdate: any
  ) => {
    let newCurrentData = {} as any;

    Object.keys(currentData).forEach((dataSubject) => {
      if (dataSubject !== dataSubjectToUpdate) {
        newCurrentData[dataSubject] = currentData[dataSubject];
      } else {
        let newDataType = [] as any;
        currentData?.[dataSubject]?.forEach((element: any) => {
          if (element.name === name) {
            newDataType.push({
              ...element,
              [subDataTypeToUpdae]: dataToUpdate,
            });
          } else {
            newDataType.push(element);
          }
        });
        newCurrentData[dataSubject] = newDataType;
      }
    });

    setCurrentData(newCurrentData);
  };

  return (
    <ColumnBox maxHeight className={styles.apiDetailsContainer}>
      <FilterBar handleFilter={handleFilter} />
      <Table
        data={filterdData}
        dataChangeHandler={updateField}
        tableRowMap={tableRowMap}
        dataSubjectMap={dataSubjectMap}
      />
    </ColumnBox>
  );
};

export default ApiDetalis;
