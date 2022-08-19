import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/style.css";

import App from "next/app";
import Head from 'next/head'
import { AppContext, AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { useMemo } from "react";

import es6Promise from "es6-promise"

import { Header, Footer } from "../components";

es6Promise.polyfill();

function MyApp({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {
    const pathName = router.pathname

    const hiddenFooter = useMemo(() => {
        const excluded = ['/', '/posts/[postId]'];
        const currentRouter = pathName;
        return excluded.indexOf(currentRouter) !== -1;

    }, [pathName])

    const hiddenHeader = useMemo(() => {
        const excluded = ['/login', '/register'];
        const currentRouter = pathName;

        return excluded.indexOf(currentRouter) !== -1;
    }, [pathName]);

    return (
        <SessionProvider session={session}>
            <div id="root">
                <Head>
                    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
                    <meta name="keywords" content="HTML5 Template" />
                    <meta name="description" content="Social Media" />
                    <meta name="author" content="etheme.com" />
                    <link rel="icon" href="/favicon.ico" />
                    <title>Social Media</title>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
                    <link rel="stylesheet" href="/fonts/font-awesome/css/font-awesome.css" />
                    <link rel="stylesheet" href="/fonts/emotion/style.css" />
                    {/* HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries */}
                    {/*[if lt IE 9]>
                    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js" />
                            <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js" />
                    <![endif]*/}
                </Head>
                {!hiddenHeader && <Header />}
                <main>
                    <Component {...pageProps} />
                </main>
                {!hiddenFooter && <Footer />}
            </div>
        </SessionProvider>
    )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);

    return {
        pageProps: {
            ...appProps.pageProps
        }
    }
}

export default MyApp