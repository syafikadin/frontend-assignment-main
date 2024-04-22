import Head from "next/head";
import { Provider } from "jotai";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../config/theme";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar/Index";
import { Box, Container, Toolbar } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider {...{ Component, pageProps }}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Header />
            <Sidebar />
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Component {...pageProps} />
              </Container>
            </Box>
          </Box>
        </Provider>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
