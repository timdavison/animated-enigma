import React from 'react';

export default function ContentTextItem({values}) {
  return (
  <>
    {values.map(function(value){
      return (
        <div dangerouslySetInnerHTML={{ __html: value.value }} />
      )
    })}
  </>
  )
}