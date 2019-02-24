import React from "react";
import { Link } from "react-router-dom";

const Article = props => {
  return (
    <div className="flex-wrapper">
      <div className="article-card">
        {props.location.state && (
          <>
            <p className="article-card__title">{props.location.state.title}</p>
            {/* Check if there are photos  */}
            {props.location.state.photos &&
              props.location.state.photos.length > 0 && (
                <div
                  className="article-card__image"
                  alt={props.location.state.title}
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url("${
                      props.location.state.photos[0].files.original
                    }")`
                  }}
                />
              )}
            <p className="article-card__description">
              {props.location.state.description}
            </p>
          </>
        )}
      </div>
      <Link className="home-link" to="/">
        Back to Home
      </Link>
    </div>
  );
};

export default Article;
