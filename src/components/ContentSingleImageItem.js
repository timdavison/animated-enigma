import React from 'react';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function ContentSingleImageItem({value}) {
  const image = getImage(value.relationships.field_paragraphs_single_image.relationships.field_media_image.localFile.childImageSharp.gatsbyImageData);
  return <GatsbyImage image={image} alt=' ' />
}