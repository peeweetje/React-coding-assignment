import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // Initial values for checkboxes.If stored in localStorage, use these,
  // otherwise initialize as empty {}.
  const initialCheckValues = JSON.parse(
    window.localStorage.getItem("checked")
  ) || [{}];
  const [data, setData] = useState([]);
  const [isChecked, setChecked] = useState(initialCheckValues);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const result = await fetch(
        "https://s3-eu-west-1.amazonaws.com/olio-staging-images/developer/test-articles.json"
      );
      const json = await result.json();
      if (result.status === 404) {
        throw new Error("Status 404");
      }
      setData(json);
    } catch (err) {
      setIsError(true);
    }
    setLoading(false);
  };

  // Fetch data on page load.
  // The empty[] makes sure the data will be fetch only once,
  // and not on every re-render.
  useEffect(() => {
    fetchData();
  }, []);

  // Store checkbox state in localStorage, to persist data.
  // [isChecked] makes sure we only store data when isChecked state changes.
  useEffect(() => {
    window.localStorage.setItem("checked", JSON.stringify(isChecked));
  }, [isChecked]);

  const toggleCheckboxes = ({ target: { id, checked } }) => {
    setChecked({ ...isChecked, [id]: checked });
  };

  if (isError) {
    return <div>Something went wrong ...</div>;
  }
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
            data.map(product => (
              <div className="productslists__card" key={product.id}>
                <div className={isChecked[product.id] ? "overlay" : ""} />
                <Link
                  className="productslist__link"
                  to={{ pathname: `/article/${product.id}`, state: product }}
                >
                  {product.photos && product.photos.length > 0 && (
                    <div
                      className="productslist__image"
                      style={{
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundImage: `url("${
                          product.photos[0].files.original
                        }")`
                      }}
                    />
                  )}
                  <p className="productslist__title">{product.title}</p>
                </Link>
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    alignItems: "flex-end"
                  }}
                />
                <label htmlFor={product.id} className="read container">
                  {isChecked[product.id] ? "READ" : "UNREAD"}

                  <input
                    id={product.id}
                    name={product.id}
                    className="checkbox"
                    type="checkbox"
                    checked={isChecked[product.id] || false}
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
