import React from "react"
import { Link } from "gatsby"

const style = {
  marginRight: '5px'
};

const Pagination = ({ pageContext }) => {
  const { numberOfPages, humanPageNumber, previousPagePath, nextPagePath } = pageContext;
  const pages = Array.from({ length: numberOfPages }, (v, i) => i + 1);

  return (
    <div className="pagination">
      {
        previousPagePath
          ? <Link to={previousPagePath} style={style}>←</Link>
          : null
      }
      {
        nextPagePath
          ? <Link to={nextPagePath} style={style}>→</Link>
          : null
      }
    </div>
  );
}

export default Pagination
