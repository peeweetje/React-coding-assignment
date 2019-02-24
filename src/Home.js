import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const initialCheckValues = JSON.parse(
    window.localStorage.getItem("checked")
  ) || [{}];
  const [data, setData] = useState([]);
  const [isChecked, setChecked] = useState(initialCheckValues);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const result = await fetch(
      "https://s3-eu-west-1.amazonaws.com/olio-staging-images/developer/test-articles.json"
    );
    const json = await result.json();

    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("checked", JSON.stringify(isChecked));
  }, [isChecked]);

  const toggleCheckboxes = ({ target: { id, checked } }) => {
    setChecked({ ...isChecked, [id]: checked });
  };

  if (loading) {
    return (
      <div className="loader">
        <span className="loading-clock" />
      </div>
    );
  } else {
    return (
      <div className="main">
        <div className="productlist-home">
          {data.length > 0 &&
            data.map(photo => (
              <div className="productslists__card" key={photo.id}>
                <div className={isChecked[photo.id] ? "overlay" : ""} />
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
                <label htmlFor={photo.id} className="read container">
                  {isChecked[photo.id] ? "READ" : "UNREAD"}

                  <input
                    id={photo.id}
                    name={photo.id}
                    className="checkbox"
                    type="checkbox"
                    checked={isChecked[photo.id] || false}
                    onChange={toggleCheckboxes}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            ))}
        </div>
      </div>
    );
  }
};

export default Home;
