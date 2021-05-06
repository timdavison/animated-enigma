import React from 'react';

export default function ContentHtmlItem({value}) {
  return <div dangerouslySetInnerHTML={{ __html: value }} />
}