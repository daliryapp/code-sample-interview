import { ThemeProvider } from "@mui/material";
import React, { FC, ReactNode } from "react";
import theme from "./theme";
interface Props {
  children: ReactNode
}
const Provider: FC<Props> = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Provider;
