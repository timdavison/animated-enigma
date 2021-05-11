import React from "react"
import { graphql} from "gatsby"
import Layout from "../components/layout"

const shorthandPage = ({ data }) => {

  const post = data.shorthandStoryShorthandStory;

  return (
    <Layout>
      <div>
      <h2>{ post.name}</h2>
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
      id
    }
  }
`