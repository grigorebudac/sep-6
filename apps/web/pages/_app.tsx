import type { AppProps } from 'next/app';
import { Auth } from '@aws-amplify/auth';
import AppContainer from 'containers/AppContainer';
import MovieModalContainer from 'containers/MovieModalContainer';

import { amplifyConfig } from 'config/amplify.config';

Auth.configure(amplifyConfig.Auth);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
      <Component {...pageProps} />
      <MovieModalContainer />
    </AppContainer>
  );
}
