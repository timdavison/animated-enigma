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
        let image = getImage(node.relationships.field_tag_image.relationships.field_media_image.localFile.childImageSharp.gatsbyImageData);
        console.log(image);
      return (
        <>
          <h3>
            <Link to={`/${node.id}` }>
              <GatsbyImage image={image} alt=' ' /><br />{ node.name }
            </Link>
            </h3>
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

    allTaxonomyTermTags {
    nodes {
      relationships {
        field_tag_image {
          id
          relationships {
            field_media_image {
              id
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: DOMINANT_COLOR,
                    width: 250,
                    formats: [AUTO, WEBP]
                    )
                }
              }
            }
          }
        }
      }
    }
  }

  }
`
