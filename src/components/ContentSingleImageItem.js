import React from 'react';
import DrupalImage from './DrupalImage';

export default function ContentSingleImageItem({value}) {

  const image = value.relationships.field_paragraphs_single_image;
  return <DrupalImage imageField={image} alt=' ' />
}