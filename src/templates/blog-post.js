import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Comment from "../components/utterance"
import Toc from "../components/toc"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const utterancesRepo = data.site.siteMetadata?.utterancesRepo
  const { previous, next } = data

  const [isToc, setIsToc] = React.useState(false)
  const resizeTimeout = React.useRef()
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width > 1390) {
        setIsToc(true);
      } else {
        setIsToc(false)
      }
    }
  
    const resizeThrottler = () => {
      if (!resizeTimeout.current) {
        resizeTimeout.current = setTimeout(() => {
          resizeTimeout.current = null;
          handleResize();
        }, 300)
      }
    }
    
    handleResize();
    window.addEventListener('resize', resizeThrottler)
    return () => {
      window.removeEventListener('resize', resizeThrottler)
      clearInterval(resizeTimeout)
    }
  }, [isToc])

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="post-toc">
        {isToc && <Toc toc={post.tableOfContents}></Toc>}
      </div>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          {post.frontmatter.tags && post.frontmatter.tags.map((tag, index) => (
            <span className="tag-label" key={index}><a href={`#${new Date().getTime()}`}>{tag}</a></span>
          ))}
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <Comment repo={utterancesRepo} />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        utterancesRepo
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
