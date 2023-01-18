import { Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import ColumnBox from "../ColumnBox/ColumnBox";
import FBox from "../FBox/FBox";
import styles from "./Header.module.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type HeaderProps = {
  name: string;
  method: string;
  path: string;
};

const Header = ({ name, method, path }: HeaderProps) => {
  const theme = useTheme();

  const nameInCapitolLetter = useMemo(() => method.toUpperCase(), [method]);
  const pathNameForBreadcrumbs = useMemo(() => path.slice(1), [path]);

  return (
    <ColumnBox padding={theme.spacing(5)}>
      <FBox padding={theme.spacing(0, 0, 2, 0)}>
        <FBox>
          <Typography
            fontWeight={500}
            variant="h5"
            color={theme.palette.primary.light}
          >
            {nameInCapitolLetter}
          </Typography>
        </FBox>
        <FBox padding={theme.spacing(0, 0, 0, 2)}>
          <Typography
            fontWeight={700}
            variant="h5"
            color={theme.palette.primary.main}
          >
            {path}
          </Typography>
        </FBox>
      </FBox>
      <FBox padding={theme.spacing(0, 0, 2, 0)} className={styles.breadcrumbs}>
        <Typography
          fontWeight={700}
          variant="subtitle1"
          color={theme.palette.primary.main}
        >
          {"All APIs"}
        </Typography>
        <FBox alignItems="center">
          <KeyboardArrowRightIcon color="primary" fontSize="small" />
        </FBox>
        <Typography
          fontWeight={700}
          variant="subtitle1"
          color={theme.palette.primary.main}
        >
          {name}
        </Typography>
        <FBox alignItems="center">
          <KeyboardArrowRightIcon color="primary" fontSize="small" />
        </FBox>
        <Typography
          fontWeight={500}
          variant="subtitle1"
          color={theme.palette.primary.main}
        >
          {pathNameForBreadcrumbs}
        </Typography>
      </FBox>
    </ColumnBox>
  );
};

export default Header;
