import { CssBaseline } from "@mui/material";
import Footer from 'src/components/Footer';
import Appbar from "src/components/Appbar";
import { FC, ReactNode } from "react";
import useDefaultStyles from "./useDefaultStyles";
import SideBar from 'src/components/Sidebar';

export interface IDefaultProps {
  children: ReactNode
  pageProps: any
}
const Default: FC<IDefaultProps> = ({ children, pageProps }) => {
  const styles = useDefaultStyles();
  const data = pageProps?.data?.data?.item;
  return (
    <>
      <CssBaseline />
      <main className={styles.root}>
        <Appbar {...data} />
        <SideBar />
        <div>{children}</div>
        <Footer {...data} />

      </main>
    </>
  );
};
Default.displayName = "DefaultLayout";

export default Default;
