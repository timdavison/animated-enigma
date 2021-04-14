import * as React from "react"
import { AppBar, Toolbar } from "@material-ui/core";
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header>
    <AppBar>
      <Toolbar>
      <h1 style={{ margin: 0 }}>
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
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
