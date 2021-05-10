import React from 'react';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function DrupalImage({imageField}) {

  console.log(imageField)
  if(imageField) {
    const image = getImage(imageField.relationships.field_media_image.localFile.childImageSharp.gatsbyImageData);
    return <GatsbyImage image={image} alt=' ' />
  }

  return (null);
}