import React from 'react'
import styled from "styled-components"

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export default function ContentYoutubeItem({value}) {

  return (
    <VideoContainer>
       <iframe
        src={`https://www.youtube-nocookie.com/embed/${value}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </VideoContainer>
  )
}