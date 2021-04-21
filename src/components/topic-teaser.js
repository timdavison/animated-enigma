import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { Card, CardContent, Grid } from "@material-ui/core";

export default function StoryTeaser ({ node, image }) {

return (
  <Grid item xs={12} sm={6} md={3} >
    <Card elevation={12} style={{ height: '100%' }}>
      <CardContent>
        <GatsbyImage image={image} alt=' ' style={{ height: '150px' }} />
        <Link to={`/${node.id}` }>
          <br />{ node.name }
        </Link>
      </CardContent>
    </Card>
  </Grid>
  )
}
