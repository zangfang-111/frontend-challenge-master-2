import { useEffect } from 'react';
import Head from 'next/head';
import '../styles/index.css';
import '../public/fonts/fonts.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import FeatureToggleProvider from 'context/FeatureToggleProvider';
import { setContext } from '@apollo/client/link/context';
import { getTokenFromLocalStorage, saveAuthData } from 'lib/scopeApi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { LoggedInProvider } from 'context/LoggedInContext';
import { NotificationProvider } from 'context/NotificationContext';
import TagSideBar from 'components/Search/Sidebar/TagSidebar';
import ResizedContainer from 'components/Search/ResizedContainer';
import ProfileDetailsWrap from 'components/Search/Details/ProfileDetailsWrap';
import Navigation from '../components/Navigation';

dayjs.extend(utc);
dayjs.extend(timezone);

function createApolloClient() {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_PRODUCTION_GRAPHQL_URL,
  });

  const authLink = setContext((_, { headers }) => {
    const token = getTokenFromLocalStorage();
    return {
      headers: {
        ...headers,
        'x-access-token': token,
      },
    };
  });

  const cacheOptions = {
    typePolicies: {
      KlaviyoList: {
        keyFields: ['list_id'],
      },
    },
  };

  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(cacheOptions),
    defaultOptions: {
      query: {
        errorPolicy: 'ignore',
      },
    },
  });

  return client;
}

const apolloClient = createApolloClient();

function App({ Component, pageProps }: AppProps): JSX.Element {
  const { pathname } = useRouter();

  // Handle receiving messages from app subdomain
  useEffect(() => {
    if (!window) return;

    window.addEventListener('message', ({ data, origin }) => {
      if (origin === process.env.NEXT_PUBLIC_ORIGIN_URL) {
        const { token } = data;
        if (token) {
          saveAuthData(token);
        }
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>Scope</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/inter-v8-latin-regular.woff2"
          as="font"
          crossOrigin=""
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/fonts/inter-v8-latin-500.woff2"
          as="font"
          crossOrigin=""
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/fonts/inter-v8-latin-600.woff2"
          as="font"
          crossOrigin=""
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/fonts/inter-v8-latin-700.woff2"
          as="font"
          crossOrigin=""
          type="font/woff2"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <FeatureToggleProvider>
          <LoggedInProvider>
            <NotificationProvider>
              {pathname === '/login' ? (
                <Component {...pageProps} />
              ) : (
                <>
                  <Navigation />
                  <div className="pt-16">
                    <ResizedContainer
                      left={<TagSideBar />}
                      center={<Component {...pageProps} />}
                      right={<ProfileDetailsWrap />}
                    />
                  </div>
                </>
              )}
            </NotificationProvider>
          </LoggedInProvider>
        </FeatureToggleProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
