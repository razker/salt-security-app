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
          element.name === filterObject.filterText &&
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

  const handleFilterdText = (filterText: string, filterPiiOnly: boolean) => {
    setFilterObject({ filterText, filterPiiOnly });
  };

  const updateField = (
    dataTypeToUpdate: string,
    name: string,
    subDataTypeToUpdae: string,
    dataToUpdate: any
  ) => {
    let newCurrentData = {} as any;

    Object.keys(currentData).forEach((dataType) => {
      if (dataType !== dataTypeToUpdate) {
        newCurrentData[dataType] = currentData[dataType];
      } else {
        let newDataType = [] as any;
        currentData?.[dataType]?.forEach((element: any) => {
          if (element.name === name) {
            newDataType.push({
              ...element,
              [subDataTypeToUpdae]: dataToUpdate,
            });
          } else {
            newDataType.push(element);
          }
        });
        newCurrentData[dataType] = newDataType;
      }
    });

    setCurrentData(newCurrentData);
  };

  return (
    <ColumnBox maxHeight className={styles.apiDetailsContainer}>
      <FilterBar handleFilter={handleFilterdText} />
      <Table data={filterdData} dataChangeHandler={updateField} />
    </ColumnBox>
  );
};

export default ApiDetalis;
