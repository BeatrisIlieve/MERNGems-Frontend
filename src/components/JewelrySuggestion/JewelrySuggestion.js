import { useService } from "../../hooks/useService";
import { jewelrySuggestionServiceFactory } from "../../services/jewelrySuggestionService";
import { useState, useEffect } from "react";
import styles from "./JewelrySuggestion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { slugify } from "../../utils/slugify";
import { Link } from "react-router-dom";

export const JewelrySuggestion = ({ jewelryId }) => {
  const jewelrySuggestionService = useService(jewelrySuggestionServiceFactory);
  const [jewelries, setJewelries] = useState([]);

  useEffect(() => {
    jewelrySuggestionService
      .findAll(jewelryId)
      .then(setJewelries)
      .catch((err) => {
        console.log(err.message);
      });
  }, [jewelryId]);

  return (
    <section className={styles["suggestion-box"]}>
      <div className={styles["title-container"]}>
        <hr className={styles["line"]} />
        <h3 className={styles["title"]}>React Gems Suggests</h3>
        <hr className={styles["line"]} />
      </div>
      <div className={styles["images-container"]}>
        {jewelries.map((j) => (
          <Link
            key={j._id}
            to={`/${slugify(j.categories[0].title)}/${slugify(j.title)}/${
              j._id
            }`}
            className={styles["no-decoration"]}
          >
            <div className={styles["jewelry-wrapper"]}>
              <div className={styles["image-container"]}>
                <img
                  src={j.firstImageUrl}
                  alt={j.title}
                  className={styles["image"]}
                />
              </div>
              <h4 className={styles["jewelry-suggestion-image-title"]}>
                {j.title}
              </h4>
              <button className={styles["suggestion-button"]}>
                Explore{" "}
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={styles["chevron-icon"]}
                />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
