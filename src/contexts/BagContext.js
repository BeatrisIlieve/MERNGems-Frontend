import { createContext, useContext, useState, useEffect } from "react";
import { bagServiceFactory } from "../services/bagService";
import { useService } from "../hooks/useService";
import { useAuthContext } from "../contexts/AuthContext";

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const bagService = useService(bagServiceFactory);
  let [bagItems, setBagItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const totalQuantityGreaterThanZero = totalQuantity > 0;
  const userId = localStorage.getItem("userUUID");
  let [loading, setLoading] = useState(true);
  const [quantityErrorMessage, setQuantityErrorMessage] = useState(null);
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    fetchBagItemsData();
  }, [isAuthenticated]);

  const onAddToBagClick = async (data, _id) => {
    try {
      const result = await bagService.create(data, _id);

      fetchBagItemsData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchBagItemsData = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        let data = await onDisplayBagClick();
        data = Array.isArray(data) ? data[0] : data;

        if (data && data.jewelries && data.jewelries.length > 0) {
          const bagData = data.jewelries;
          const bagItems = bagData[0].documents;
          setBagItems(bagItems);

          const totalPrice = bagData[0].totalTotalPrice;
          setTotalPrice(totalPrice);

          const totalQuantity = bagData[0].totalQuantity;
          setTotalQuantity(totalQuantity);
        } else {
          setBagItems([]);
          setTotalQuantity(0);
          setTotalPrice(0);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const onDisplayBagClick = async () => {
    try {
      const data = await bagService.findAll(userId);
      console.log(data);

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const onRemove = async (bagId) => {
    try {
      const result = await bagService.delete(bagId);
      fetchBagItemsData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const onDecrement = async (bagId) => {
    try {
      const result = await bagService.decrease(bagId);
      fetchBagItemsData();
    } catch (err) {
      console.log(err.message);
      setQuantityErrorMessage(err.message);
    }
  };

  const onIncrement = async (bagId) => {
    try {
      const result = await bagService.increase(bagId);
      fetchBagItemsData();
    } catch (err) {
      console.log(err.message);
      setQuantityErrorMessage(err.message);
    }
  };

  const clearShoppingBag = () => {
    setBagItems([]);
    setTotalQuantity(0);
    setTotalPrice(0);
  };

  const isEmpty = bagItems.length < 1;

  const context = {
    bagItems,
    onAddToBagClick,
    onDisplayBagClick,
    totalPrice,
    totalQuantity,
    totalQuantityGreaterThanZero,
    onDecrement,
    onIncrement,
    onRemove,
    isEmpty,
    clearShoppingBag,
    loading,
    quantityErrorMessage,
  };

  return <BagContext.Provider value={context}>{children}</BagContext.Provider>;
};

export const useBagContext = () => {
  const context = useContext(BagContext);

  return context;
};
