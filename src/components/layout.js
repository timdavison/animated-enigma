import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

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
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />

        <Container maxWidth='lg'>
          <Box component='main'>{children}</Box>
          <footer
           style={{
            marginTop: `2rem`,
            }}
          >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
        </Container>

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
