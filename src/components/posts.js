import { Link } from 'gatsby'
import React from 'react'
import TagLabel from './tag-label'

const Posts = ({post}) => {
  const title = post.frontmatter.title || post.fields.slug
  const tags = post.frontmatter.tags

  return (
    <li className="post-list">
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
}

export default Posts