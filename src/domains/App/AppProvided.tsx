import { QueryClient, QueryClientProvider } from "react-query";
import ThemeProvider from "src/@core/theme";
import useModal from "src/_hooks/app/useModal";
import useDrawer from "src/_hooks/app/useDrawer";
import Toast from "src/components/Toast";
import AppModal from 'src/components/Modal';
import DrawerSidebar from 'src/components/Drawer';
import { AuthGuard } from 'src/components/AuthGuard';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});
const AppProvided = (props: any) => {
    const { Component, pageProps, getLayout } = props
    const modalRef = useModal();
    const drawerRef = useDrawer();
    return (<QueryClientProvider client={queryClient}>
        <ThemeProvider>
            <Toast />
            <AppModal ref={modalRef} />
            <DrawerSidebar ref={drawerRef} />
            {Component.requireAuth ? (
                <AuthGuard>
                    <>
                        {getLayout(<Component {...pageProps} />)}
                    </>
                </AuthGuard>
            ) : (
                // public page
                <>
                    {getLayout(<Component {...pageProps} />)}
                </>
            )}
        </ThemeProvider>
    </QueryClientProvider>)
}


export default AppProvided;