import * as React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  console.log(data.allTaxonomyTermTags.nodes);

  return (

  <Layout>
    <SEO title="Topics" />
    <h1>Explore our topics</h1>

    {data.allTaxonomyTermTags.nodes.map(node => {
      return (
        <>
          <h3><Link to={ node.id }>{ node.name }</Link></h3>
        </>
      )
    }
)}
    <p>
      <Link to="/">Go to Homepage</Link> <br />
    </p>
  </Layout>
)

}

export default IndexPage

export const query = graphql`
  query {
    allTaxonomyTermTags {
      nodes {
        id
        weight
        name
      }
    }
  }
`
