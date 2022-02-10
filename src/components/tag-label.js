import React from 'react'
import { Link } from "gatsby"

const TagLabel = ({ tag }) => {
  return (
    <span className="tag-label">
      <Link to={`/tags/${tag.toLowerCase()}`}>{tag}</Link>
    </span>
  )
}

export default TagLabel