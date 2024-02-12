import Button from "@mui/material/Button";
import Name from "../Header/header-name";
import { Link, useLocation } from "react-router-dom";
import {
  createTheme,
  alpha,
  getContrastRatio,
  ThemeProvider,
} from "@mui/material/styles";

const greyBase = "#A9BCD0";
const greyMain = alpha(greyBase, 0.7);

const theme = createTheme({
  palette: {
    Grey: {
      main: greyMain,
      light: alpha(greyBase, 0.5),
      dark: alpha(greyBase, 0.9),
      contrastText: getContrastRatio(greyMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});

export default function Nav({ color }) {
  const currentPage = useLocation().pathname;

  return (
    <>
      <section className="headerComponentsLayout">
        <ThemeProvider theme={theme}>
          <Link to="/">
            <Button variant="contained" color="Grey">
              Home
            </Button>
          </Link>
          <Link to="/Portfolio">
            <Button variant="contained" color="Grey" text="Righteous">
              HighScores
            </Button>
          </Link>
          <Name />
          <Link to="/Contact">
            <Button variant="contained" color="Grey">
              Sign-Up
            </Button>
          </Link>
          <div>
            <Button variant="contained" color="Grey">
              Profile/Login
            </Button>
          </div>
        </ThemeProvider>
      </section>
    </>
  );
}
