import { Link } from "gatsby";
import * as React from "react"
import DrupalImage from './DrupalImage';

export default function FullTeaser({image, slug, title, created, summary}) {

  return (
    <>
      <h3><Link to={ slug }>{ title }</Link></h3>
      <DrupalImage imageField={image} alt=' ' />
      <p><small><em>date goes here</em></small></p>
      <p>{summary}</p>
    </>
  )
}

