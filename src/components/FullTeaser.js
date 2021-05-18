import { Link } from "gatsby";
import * as React from "react"
import DrupalImage from './DrupalImage';

export default function FullTeaser({image, slug, title, created, summary}) {
  const rawSummary = (summary) ? summary : "This story has no summary";
  const summaryTrimmed = (rawSummary.length <= 300) ? rawSummary : rawSummary.slice(0,300) + "...";
  return (
    <>
      <h3><Link to={ slug }>{ title }</Link></h3>
      <DrupalImage imageField={image} alt=' ' />
      <p><small><em>date goes here</em></small></p>
      <p>{summaryTrimmed}</p>
    </>
  )
}

