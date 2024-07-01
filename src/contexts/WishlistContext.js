import { createContext, useContext, useState, useEffect } from "react";
import { wishlistServiceFactory } from "../services/wishlistService";
import { useService } from "../hooks/useService";
import { useAuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const wishlistService = useService(wishlistServiceFactory);
  const [wishlistCount, setWishlistCount] = useState(0);
  const wishlistCountGreaterThanZero = wishlistCount > 0;
  const { isAuthenticated } = useAuthContext();

  const fetchData = async () => {
    try {
      const data = await wishlistService.findCount();

      setWishlistCount(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [wishlistCount, isAuthenticated]);

  const onAddToWishlistClick = async (jewelryId) => {
    try {
      const result = await wishlistService.create(jewelryId);
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const onRemoveFromWishlistClick = async (jewelryId) => {
    try {
      const result = await wishlistService.delete(jewelryId);
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const context = {
    onAddToWishlistClick,
    onRemoveFromWishlistClick,
    wishlistCount,
    wishlistCountGreaterThanZero,
  };

  return (
    <WishlistContext.Provider value={context}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);

  return context;
};
