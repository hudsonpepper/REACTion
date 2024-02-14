import * as React from "react";
import Button from "@mui/material/Button";
import Name from "../Header/header-name";
import { Link, useLocation } from "react-router-dom";
import Auth from "../../utils/auth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <section className="headerComponentsLayout">
        <ThemeProvider theme={theme}>
          <Link to="/">
            <Button
              variant="contained"
              color="Grey"
              className="invisible md:visible"
            >
              Home
            </Button>
          </Link>
          <Link to="/leaderboard">
            <Button
              variant="contained"
              color="Grey"
              className="invisible md:visible"
            >
              Leaderboard
            </Button>
          </Link>
          <Name />
          {Auth.loggedIn() ? (
            <>
              <Link to="/me">
                <Button
                  variant="contained"
                  color="Grey"
                  className="invisible md:visible"
                >
                  {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
                  {Auth.getProfile().authenticatedPerson.username}'s profile
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="contained"
                  color="Grey"
                  onClick={logout}
                  className="invisible md:visible"
                >
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="contained"
                  color="Grey"
                  className="invisible md:visible"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="contained"
                  color="Grey"
                  className="invisible md:visible"
                >
                  Sign-Up
                </Button>
              </Link>
            </>
          )}
        </ThemeProvider>

        <div className="visible md:invisible mr:50px sm:grid-rows-12">
          <Button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Reaction
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {Auth.loggedIn() ? (
              <>
                <Link to="/me">
                  <MenuItem>
                    {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
                    {Auth.getProfile().authenticatedPerson.username}'s Profile
                  </MenuItem>
                </Link>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </>
            ) : (
              <>
                <Link to="/login">
                  <MenuItem onClick={handleClose}>Login</MenuItem>
                </Link>
                <Link to="/signup">
                  <MenuItem onClick={handleClose}>Sign-Up</MenuItem>
                </Link>
              </>
            )}
            <Link to="/leaderboard">
              <MenuItem onClick={handleClose}>Leaderboard</MenuItem>
            </Link>
          </Menu>
        </div>
      </section>
    </>
  );
};

export default Nav;
