import { Button, Checkbox, Typography, useTheme } from "@mui/material";
import ColumnBox from "../ColumnBox/ColumnBox";
import FBox from "../FBox/FBox";
import styles from "./FilterBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

type FilterBarProps = {
  handleFilter: (textToFilter: string, filterPiiOnly: boolean) => void;
};

const FilterBar = ({ handleFilter }: FilterBarProps) => {
  const [searchText, setSearchText] = useState("");
  const [isPiiChecked, setIsPiiChecked] = useState(false);

  const theme = useTheme();

  const handleSubmit = () => {
    handleFilter(searchText, isPiiChecked);
  };

  const resetFilter = () => {
    setSearchText("");
    setIsPiiChecked(false);
    handleFilter("", false);
  };

  return (
    <ColumnBox padding={theme.spacing(5, 0)}>
      <FBox className={styles.searchContainer} alignItems="center">
        <FBox padding={theme.spacing(0, 0, 0, 2)} alignItems="center" maxWidth>
          <SearchIcon
            style={{
              color: "#717171",
            }}
          />
          <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            className={styles.input}
            placeholder="Search"
            style={{ width: "100%" }}
          />
        </FBox>

        <FBox className={styles.divider} />
        <FBox maxHeight alignItems="center" className={styles.piiOnlyBox}>
          <Checkbox
            checked={isPiiChecked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setIsPiiChecked(event.target.checked);
            }}
          />
          <Typography variant="body2"> Show PII Only </Typography>
        </FBox>
        <FBox maxHeight alignItems="center">
          <Button
            style={{
              textTransform: "none",
              width: "130px",
              height: "100%",
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            <Typography variant="body2">Apply</Typography>
          </Button>
        </FBox>
      </FBox>
      <FBox
        padding={theme.spacing(0, 2, 0, 0)}
        className={styles.resetFilter}
        justifyContent="flex-end"
        onClick={resetFilter}
      >
        <Typography color={theme.palette.primary.main} fontSize={12}>
          Reset Filter
        </Typography>
      </FBox>
    </ColumnBox>
  );
};

export default FilterBar;
