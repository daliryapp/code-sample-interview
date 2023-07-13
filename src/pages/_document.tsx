import { ServerStyleSheets } from '@mui/styles';
//@ts-ignore
import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react';
import { NextPage } from 'next';
const MyDocument: NextPage<any> = props => (
  <Html>
    <Head>
      <link rel="apple-touch-icon" sizes="72x72" href="/manifest/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/manifest/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/manifest/favicon-16x16.png" />
      <link rel="manifest" href="/manifest/site.webmanifest" />
      <link rel="mask-icon" href="/manifest/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />


    </Head>
    <body dir="rtl">
      <Main />
      <NextScript />
    </body>
  </Html>
)

MyDocument.getInitialProps = async (ctx: any) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props: any) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}

export default MyDocument
