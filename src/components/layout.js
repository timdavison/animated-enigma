import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <CssBaseline />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <Container maxWidth='lg' style={{ marginTop: `10rem`,}}>
          <Box m={8} component='main'>{children}</Box>
          <footer
           style={{
            marginTop: `2rem`,
            }}
          >
                <p style={{ marginTop: '3rem' }}>
        <Link to="/">Homepage</Link> <span> | </span>
        <Link to="/topics/">Topics page</Link> <span> | </span>
        <Link to="/storylist/1">Full list of stories</Link>
      </p>
        </footer>
        </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
