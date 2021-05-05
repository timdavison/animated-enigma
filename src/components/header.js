import React from "react"
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types"
import { Link } from "gatsby"

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
  },
}));

export default function Header ({ siteTitle }) {
  const classes = useStyles();
    return (
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <h1 >
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
          </h1>
        </Toolbar>
      </AppBar>
    )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

