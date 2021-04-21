import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TopicTeaser from '../components/topic-teaser'
import { Grid } from "@material-ui/core";

const IndexPage = ({ data }) => {
  console.log(data.allTaxonomyTermTags.nodes);

  return (
    <Layout>
      <SEO title="Topics" />
      <h2>Explore our topics</h2>
      <Grid container spacing={1}>
        {data.allTaxonomyTermTags.nodes.map(node => {
          let image = getImage(node.relationships.field_tag_image.relationships.field_media_image.localFile.childImageSharp.gatsbyImageData);
          console.log(image);
          return (
            <TopicTeaser node={node} image={image}/>
          )
        }
        )}
      </Grid>
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
