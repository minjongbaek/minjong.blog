import React from "react"
import PropTypes from "prop-types"

// Components
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Posts from "../components/posts"

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const title = `민종로그`
  const posts = edges

  return (
    <Layout location={location} title={title}>
      <Seo title={`Tags: ${tag}`} />
      <h1 className="main-heading">#{tag}</h1>
      <p>총 {totalCount}개의 포스트</p>
      <ol style={{ listStyle: `none` }}>
        {posts.map(({ node }) => {
          const post = node;
          return (
            <Posts post={post} key={post.fields.slug} />
          )
        })}
      </ol>
    </Layout >
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } , draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
            tags
          }
        }
      }
    }
  }
`