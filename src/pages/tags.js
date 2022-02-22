import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Bio from "../components/bio"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    }
  }, location
}) =>
// <div>
//   <Helmet title={title} />
//   <div>
//     <h1>Tags</h1>
//     <ul>
//       {group.map(tag => (
//         <li key={tag.fieldValue}>
//           <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
//             {tag.fieldValue} ({tag.totalCount})
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </div>
// </div>
(
  <Layout location={location} title={title}>
    <Seo title="All tags" />
    <Bio />
    <div className="tags-wrap">
      {group.map(tag => (
        <div>
          <h3 className="tags" key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              <span>#{tag.fieldValue}</span>
            </Link>
          </h3>
          <p>{tag.totalCount} 개의 포스트</p>
        </div>
      ))}
    </div>
  </Layout >
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`