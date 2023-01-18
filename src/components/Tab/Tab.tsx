import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab/Tab";

type TabProps = {
  label: string;
};

const CustomTab = styled((props: TabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    borderBottomWidth: 200,
  })
);

export { CustomTab as Tab };
