import GlobalStyle from "../styles.js";
import { SWRConfig } from "swr";
import Layout from "../components/Layout.js";

// diese Datei ist ein Rahmen um die gesamte Anwendung. Sie können es verwenden,
// um gemeinsame Funktionen und Einstellungen zu definieren,
// die auf alle Seiten Ihrer Anwendung angewendet werden sollen.

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
