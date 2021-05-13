import React from "react"
import { graphql} from "gatsby"

const shorthandPage = ({ data }) => {

  const post = data.shorthandStoryShorthandStory;

  const shorthandPath = `/shorthand/stories/${post.shorthand_id}/${post.drupal_id}/index.html`;

  return (
    <div>
       <iframe  src={`${shorthandPath}`} title={post.name} style={{width:'100%',height:'100vh',border: 'none'}}></iframe>
    </div>
  )
}

export default shorthandPage;

export const query = graphql`
  query($id: String!) {
    shorthandStoryShorthandStory(id: { eq: $id }) {
      created
      name
      shorthand_id
      description
      drupal_id
      id
    }
  }
`