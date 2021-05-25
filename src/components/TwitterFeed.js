import React from "react"

export default function TwitterFeed({url, text}) {
  return (
    <>
      <a class="twitter-timeline" href={url}>{text}</a>
    </>
    )
  }
