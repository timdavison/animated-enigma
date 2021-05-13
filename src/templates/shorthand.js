import React from "react"
import { graphql} from "gatsby"
import Layout from "../components/layout"

const shorthandPage = ({ data }) => {

  const post = data.shorthandStoryShorthandStory;

  const shorthandPath = `/shorthand/stories/${post.shorthand_id}/${post.drupal_id}/index.html`;

  <a href='/shorthand/stories/efoOPKBkqv/d39c8a3c-f70e-44fa-b76c-90cae598deae/index.html'> Another story page</a>


  return (
    <Layout>
      <div>

      <a href={`${shorthandPath}`}>{post.name}</a>

      </div>
    </Layout>
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