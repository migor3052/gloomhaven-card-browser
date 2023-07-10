import "../public/global.css";
import { SpoilersProvider } from "../hooks/useSpoilers";
import { SelectedItemProvider } from "../hooks/useSelectedItem";

function MyApp({ Component, pageProps }) {
  return (
    <SpoilersProvider>
      <SelectedItemProvider>
        <Component {...pageProps} />
      </SelectedItemProvider>
    </SpoilersProvider>
  );
}

export default MyApp;
