import { JewelryCard } from "../../JewelryCard/JewelryCard";
import { JewelryCardHovered } from "../../JewelryCardHovered/JewelryCardHovered";
import { slugify } from "../../../utils/slugify";
import { useWishlistContext } from "../../../contexts/WishlistContext";

export const JewelryListItems = ({
  _id,
  firstImageUrl,
  jewelryTitle,
  categoryTitle,
  isLikedByUser,
  isSoldOut,
  isHovered,
  mouseEnterHandler,
  mouseLeaveHandler,
  toggleLike,
  price,
}) => {
  const { onAddToWishlistClick, onRemoveFromWishlistClick } =
    useWishlistContext();

  const slugifiedCategoryTitle = slugify(categoryTitle);
  const slugifiedJewelryTitle = slugify(jewelryTitle);

  const handleLikeClick = (_id) => {
    if (isLikedByUser) {
      onRemoveFromWishlistClick(_id);
    } else {
      onAddToWishlistClick(_id);
    }
    toggleLike(_id);
  };

  return (
    <article
      onMouseEnter={() => mouseEnterHandler(_id)}
      onMouseLeave={() => mouseLeaveHandler(_id)}
    >
      {isHovered && !isSoldOut ? (
        <JewelryCardHovered
          _id={_id}
          firstImageUrl={firstImageUrl}
          jewelryTitle={jewelryTitle}
          handleLikeClick={handleLikeClick}
          slugifiedCategoryTitle={slugifiedCategoryTitle}
          slugifiedJewelryTitle={slugifiedJewelryTitle}
          isLikedByUser={isLikedByUser}
          price={price}
        />
      ) : (
        <JewelryCard
          firstImageUrl={firstImageUrl}
          jewelryTitle={jewelryTitle}
          isSoldOut={isSoldOut}
        />
      )}
    </article>
  );
};
