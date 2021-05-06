import React from 'react';
import ContentHtmlItem from './ContentHtmlItem';
import ContentSingleImageItem from './ContentSingleImageItem';
import ContentTextItem from './ContentTextItem';

export default function ContentItem({type, item}) {
  let element;

  switch(type) {
    case 'Text':
      element =  <ContentTextItem values={item.field_para_text} />
      break;
    case 'Single Image':
      element =  <ContentSingleImageItem value={item}></ContentSingleImageItem>
      break;
    case 'HTML':
      element =  <ContentHtmlItem value={item.field_para_html_text.value}></ContentHtmlItem>
        break;
    default:
      element =  <h3>Unknown content item</h3>
  }

  return (
   <>{element}</>
  )
}
