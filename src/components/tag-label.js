import React from 'react'
import { Link } from "gatsby"

import kebabCase from "lodash/kebabCase"

const TagLabel = ({ tag }) => {
  return (
    <span className="tag-label">
      <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
    </span>
  )
}

export default TagLabel