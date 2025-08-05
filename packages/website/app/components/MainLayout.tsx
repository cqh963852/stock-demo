"use client";

import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { AppBar, createTheme, ThemeProvider } from "@mui/material";
import StockSearch from "./StockSearch";

const MainLayout = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <AppBar position="static">
          <StockSearch themeMode={themeMode} onToggleTheme={toggleTheme} />
        </AppBar>
        {children}
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
