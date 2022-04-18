import type { AppProps } from "next/app";
import { Auth } from "@aws-amplify/auth";

import { amplifyConfig } from "config/amplify.config";

Auth.configure(amplifyConfig.Auth);

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
