import { store } from "src/@core/redux/store";
// @ts-ignore
import { AppProps } from "next/dist/shared/lib/router/router";
import { Provider } from "react-redux";
import { MainLayout } from "src/components/layout/Main";
import setupAxios from "src/@core/configs/setupAxios";
import axios from "src/@core/client/http";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import type { NextPage } from 'next';
import AppProvided from './AppProvided';
import NProgress from 'nprogress'
import { Router } from 'next/router';
import themeConfig from 'src/@core/configs/themeConfig'
import "react-toastify/dist/ReactToastify.css";

type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}
const clientSideEmotionCache = createEmotionCache()
let persistor = persistStore(store);
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}
setupAxios(axios, store);
function App(props: ExtendedAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } } = props
  //@ts-ignore

  const getLayout = ((page) => <MainLayout pageProps={pageProps}>{page}</MainLayout>);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CacheProvider value={emotionCache}>
          <AppProvided getLayout={getLayout} Component={Component} pageProps={pageProps} />
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
