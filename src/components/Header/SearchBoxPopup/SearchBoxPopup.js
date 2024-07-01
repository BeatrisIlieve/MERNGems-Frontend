import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBoxPopup.module.css";
import { useState, useEffect } from "react";
import { searchServiceFactory } from "../../../services/searchService";
import { useService } from "../../../hooks/useService";
import { Link } from "react-router-dom";
import { slugify } from "../../../utils/slugify";

export const SearchBoxPopup = ({ popupCloseHandler }) => {
  const [query, setQuery] = useState(null);
  const [jewelries, setJewelries] = useState([]);
  const searchService = useService(searchServiceFactory);

  const onChange = async (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    searchService
      .findAll(query)
      .then(setJewelries)
      .catch((err) => {
        console.log(err.message);
      });
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        popupCloseHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupCloseHandler]);

  return (
    <section className={styles["popup-box"]}>
      <div className={styles["modal-dialog"]}>
        <div className={styles["modal-content"]}>
          <div className={styles["modal-header"]}>
            <div id={styles["xMark"]} onClick={() => popupCloseHandler()}>
              <FontAwesomeIcon icon={faXmark} className={styles["x-mark"]} data-testid="x-mark"/>
            </div>
            <div className={styles["search-box"]}>
              <div className={styles["search-container"]}>
                <span>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={styles["icon-search"]}
                  />
                </span>
                <form method="GET" className={styles["form-container"]}>
                  <input
                    value={query}
                    onChange={onChange}
                    type="text"
                    className={`${styles["search-input"]} ${styles["custom-placeholder"]}`}
                    placeholder="Search"
                  />
                </form>
              </div>
            </div>
          </div>
          {jewelries.length > 0 ? (
            <div className={styles["search-results"]}>
              {jewelries.map((j) => (
                <div key={j._id} className={styles["image-thumbnail"]}>
                  <Link
                    to={`/${slugify(j.categoryTitle)}/${slugify(
                      j.jewelryTitle
                    )}/${j._id}`}
                  >
                    <img
                      onClick={() => popupCloseHandler()}
                      className={styles["image"]}
                      src={j.firstImageUrl}
                      alt=""
                    />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles["suggestions-box"]}>
              <div className={styles["suggestions-container"]}>
                <div className={styles["left-container"]}>
                  <h3 className={styles["suggestions-title"]}>Collections</h3>
                  <div className={styles["collections-container"]}>
                    <Link
                      to="/forget-me-not"
                      className={styles["no-decoration"]}
                    >
                      <h2
                        onClick={() => popupCloseHandler()}
                        className={styles["collection-title"]}
                        data-testid="forget-me-not-title"
                      >
                        Forget-Me-Not Collection
                      </h2>
                    </Link>
                    <Link to="/classics" className={styles["no-decoration"]}>
                      <h2
                        onClick={() => popupCloseHandler()}
                        className={styles["collection-title"]}
                        data-testid="classics-title"
                      >
                        Classics Collection
                      </h2>
                    </Link>
                    <Link to="/pirouette" className={styles["no-decoration"]}>
                      <h2
                        onClick={() => popupCloseHandler()}
                        className={styles["collection-title"]}
                        data-testid="pirouette-title"
                      >
                        Pirouette Collection
                      </h2>
                    </Link>
                    <Link
                      to="/diamond-loop"
                      className={styles["no-decoration"]}
                    >
                      <h2
                        onClick={() => popupCloseHandler()}
                        className={styles["collection-title"]}
                        data-testid="diamond-loop-title"
                      >
                        Diamond Loop Collection
                      </h2>
                    </Link>
                    <Link to="/sunflower" className={styles["no-decoration"]}>
                      <h2
                        onClick={() => popupCloseHandler()}
                        className={styles["collection-title"]}
                        data-testid="sunflower-title"
                      >
                        Sunflower Collection
                      </h2>
                    </Link>
                    <Link
                      to="/sparkling-cluster"
                      className={styles["no-decoration"]}
                    >
                      <h2
                        onClick={() => popupCloseHandler()}
                        className={styles["collection-title"]}
                        data-testid="sparkling-cluster-title"
                      >
                        Sparkling Cluster Collection
                      </h2>
                    </Link>
                  </div>
                </div>
                <div className={styles["right-container"]}>
                  <h3 className={styles["suggestions-title"]}>Categories</h3>
                  <div className={styles["collections-container"]}>
                    <Link to="/bracelets" className={styles["no-decoration"]}>
                      <h2
                        onClick={() => popupCloseHandler()}
                        className={styles["collection-title"]}
                        data-testid="forget-me-not-title"
                      >
                        Bracelets
                      </h2>
                    </Link>
                    <Link to="/earrings" className={styles["no-decoration"]}>
                      <h2
                        onClick={() => popupCloseHandler()}
                        className={styles["collection-title"]}
                        data-testid="classics-title"
                      >
                        Earrings
                      </h2>
                    </Link>
                    <Link to="/necklaces" className={styles["no-decoration"]}>
                      <h2
                        onClick={() => popupCloseHandler()}
                        className={styles["collection-title"]}
                        data-testid="pirouette-title"
                      >
                        Necklaces
                      </h2>
                    </Link>
                    <Link to="/rings" className={styles["no-decoration"]}>
                      <h2
                        onClick={() => popupCloseHandler()}
                        className={styles["collection-title"]}
                        data-testid="diamond-loop-title"
                      >
                        Rings
                      </h2>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles["image-container"]}>
                <img
                  className={styles["image"]}
                  src="https://res.cloudinary.com/deztgvefu/image/upload/v1718723117/template_images/herolarged_ny24_plp_ny_collection_znuyt7.avif"
                  alt="img"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
