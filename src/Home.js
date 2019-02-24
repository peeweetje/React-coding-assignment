import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await fetch(
      "https://s3-eu-west-1.amazonaws.com/olio-staging-images/developer/test-articles.json"
    );
    const json = await result.json();

    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main">
      <div className="productlist-home">
        {data.length > 0 &&
          data.map(photo => (
            <div className="productslists__card" key={photo.id}>
              <Link
                className="productslist__link"
                to={{ pathname: `/article/${photo.id}`, state: photo }}
              >
                {photo.photos && photo.photos.length > 0 && (
                  <div
                    className="productslist__image"
                    style={{
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: `url("${
                        photo.photos[0].files.original
                      }")`
                    }}
                  />
                )}
                <p className="productslist__title">{photo.title}</p>
              </Link>
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "flex-end"
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
