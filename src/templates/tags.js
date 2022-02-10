import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import TagLabel from "../components/tag-label"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const posts = edges

  return (
    <Layout location={pageContext} >
      <Seo title={`Tags: ${tag}`} />
      <h1 className="main-heading">#{tag}</h1>
      <p>총 {totalCount}개의 포스트.</p>
      <ol style={{ listStyle: `none` }}>
        {posts.map(({ node }) => {
          const post = node;
          const title = post.frontmatter.title || post.fields.slug
          const tags = post.frontmatter.tags

          return (
            <li key={post.fields.slug} className="post-list">
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                  {tags && <p>
                    {tags && tags.map((tag, index) => (
                      <TagLabel key={index} tag={tag}></TagLabel>
                    ))}
                  </p>}
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout >
  )

  // return (
  //   <div>
  //     <h1>{tagHeader}</h1>
  //     <ul>
  //       {edges.map(({ node }) => {
  //         const { slug } = node.fields
  //         const { title } = node.frontmatter
  //         return (
  //           <li key={slug}>
  //             <Link to={slug}>{title}</Link>
  //           </li>
  //         )
  //       })}
  //     </ul>
  //     {/*
  //             This links to a page that does not yet exist.
  //             You'll come back to it!
  //           */}
  //     <Link to="/tags">All tags</Link>
  //   </div>
  // )
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
      filter: { frontmatter: { tags: { in: [$tag] } } }
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