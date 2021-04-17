import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Collapse, IconButton, Toolbar } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import FormSearch from "./FormSearch";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    fontFamily: "Nunito",
  },
  appbar: {
    background: "none",
  },
  appbarWrap: {
    width: "80%",
    margin: "0 auto",
  },
  icon: {
    fontSize: "2rem",
  },
  appbarTitle: {
    flexGrow: "1",
    fontSize: "2rem",
    color: "#fff",
  },
  appbarTitleSpan: {
    color: "#990000",
  },
  container: {
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: "4.5rem",
  },
  goDown: {
    color: "#990000",
    fontSize: "3.5rem",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrap}>
          <h1 className={classes.appbarTitle}>
            My<span className={classes.appbarTitleSpan}>Postal</span>Code
            <span className={classes.appbarTitleSpan}>.</span>
          </h1>
          <IconButton>
            <SortIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <FormSearch />
      </Collapse>
    </div>
  );
};

export default Header;
