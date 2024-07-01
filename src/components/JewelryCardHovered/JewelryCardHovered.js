import styles from "./JewelryCardHovered.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
export const JewelryCardHovered = ({
  _id,
  firstImageUrl,
  jewelryTitle,
  handleLikeClick,
  slugifiedCategoryTitle,
  slugifiedJewelryTitle,
  isLikedByUser,
  price,
}) => {
  return (
    <article className={styles["jewelry-card-hovered"]}>
      <FontAwesomeIcon
        icon={isLikedByUser ? solidHeart : regularHeart}
        className={styles["heart"]}
        onClick={() => handleLikeClick(_id)}
        data-testid="heart-icon"
      />

      <div className={styles["jewelry-card-thumbnail"]}>
        <Link to={`/${slugifiedCategoryTitle}/${slugifiedJewelryTitle}/${_id}`}>
          <img
            className={styles["jewelry-card-img"]}
            src={firstImageUrl}
            alt={jewelryTitle}
          />
        </Link>
      </div>
      <div className={styles["title-container"]}>
        <h3 className={styles["title"]}>{jewelryTitle}</h3>
        <h5 className={styles["price"]}>${price}</h5>
      </div>
    </article>
  );
};
