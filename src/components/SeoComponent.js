import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import {Helmet} from 'react-helmet';
import PropTypes from 'prop-types';

export default function SEO({location, description, title, image}) {

  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteTwitterUrl
        }
      }
    }
  `);

  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      <Link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <Link rel="alternate icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="utf-8" data-react-helmet="true" />
      <meta name="description" content={site.siteMetadata.description} />
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={description} key="ogdesc/" />
    </Helmet>
  )
}

SEO.propTypes = {
  location: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  string: PropTypes.string,
}