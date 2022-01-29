/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary1
            summary2
          }
          githubUrl
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const githubUrl = data.site.siteMetadata?.githubUrl

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        width={75}
        height={75}
        quality={95}
        alt="Profile picture"
      />
      <div className="summary">
        <p>
          <strong>{author.name}</strong><br />
          {author.summary1}<br />
          {author.summary2}
        </p>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <StaticImage width={25} height={25} src="../images/GitHub-Mark-120px-plus.png" alt="git logo"></StaticImage>
        </a>
      </div>

    </div>
  )
}

export default Bio
