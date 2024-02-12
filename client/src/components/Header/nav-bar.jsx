import Button from "@mui/material/Button";
import Name from "../Header/header-name";
import { Link, useLocation } from "react-router-dom";
import Auth from "../../utils/auth";
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

const Nav = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

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
            <Button variant="contained" color="Grey">
              HighScores
            </Button>
          </Link>
          <Name />
          {Auth.loggedIn() ? (
            <>
              <Link to="/me">
                <Button variant="contained" color="Grey">
                  {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
                  {Auth.getProfile().authenticatedPerson.username}'s profile
                </Button>
              </Link>
              <Button variant="contained" color="Grey" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="contained" color="Grey">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="contained" color="Grey">
                  Sign-Up
                </Button>
              </Link>
            </>
          )}
        </ThemeProvider>
      </section>
    </>
  );
};

export default Nav;
