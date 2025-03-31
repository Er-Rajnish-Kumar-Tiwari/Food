import { createContext, useEffect, useState } from "react";
import axios from "axios";

const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartIteam, setCartIteam] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [menu_list, setMenuList] = useState([]);
  const [nsearch, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  // Function to save cart items to localStorage
  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cartIteam", JSON.stringify(cart));
  };

  // Function to load cart items from localStorage on page load
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cartIteam");
    return savedCart ? JSON.parse(savedCart) : {};
  };

  const addToCart = async (iteamId) => {
    const iteamInfo = food_list.find((product) => product._id === iteamId);

    const updatedCart = !cartIteam[iteamId]
      ? { ...cartIteam, [iteamId]: 1 }
      : { ...cartIteam, [iteamId]: cartIteam[iteamId] + 1 };

    setCartIteam(updatedCart);
    saveCartToLocalStorage(updatedCart); // Save updated cart to localStorage

    if (token) {
      await axios.post(
        "https://food-backend-7lkf.onrender.com/addToCart",
        { iteamId },
        { headers: { token } }
      );
    }
  };

  const removeToCart = async (iteamId) => {
    const updatedCart = cartIteam[iteamId] > 1
      ? { ...cartIteam, [iteamId]: cartIteam[iteamId] - 1 }
      : (() => {
          const { [iteamId]: removed, ...rest } = cartIteam;
          return rest;
        })();

    setCartIteam(updatedCart);
    saveCartToLocalStorage(updatedCart); // Save updated cart to localStorage

    if (token) {
      await axios.post(
        "https://food-backend-7lkf.onrender.com/removeFromCart",
        { iteamId },
        { headers: { token } }
      );
    }
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get("https://food-backend-7lkf.onrender.com/display");
      setFoodList(response.data.foodItems);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const loadCart = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        "https://food-backend-7lkf.onrender.com/fetchCart",
        {},
        { headers: { token } }
      );
      setCartIteam(response.data.cartIteam);
      saveCartToLocalStorage(response.data.cartIteam); // Save fetched cart to localStorage
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const getTotalAmount = () => {
    return Object.keys(cartIteam).reduce((total, itemId) => {
      const iteamInfo = food_list.find((product) => product._id === itemId);
      return total + (iteamInfo?.price || 0) * cartIteam[itemId];
    }, 0);
  };

  const fetchMenuItem = async () => {
    const response = await axios.get("https://food-backend-7lkf.onrender.com/displayMenu");
    setMenuList(response.data.menuItems);
  };

  // UseEffect to filter food items based on nsearch
  useEffect(() => {
    const filterFoodItems = () => {
      if (!nsearch.trim()) {
        setFilteredItems([]); // Show all if no search term is provided
      } else {
        const filtered = food_list.filter(item =>
          item.name.toLowerCase().includes(nsearch.toLowerCase())
        );
        setFilteredItems(filtered);
      }
    };

    filterFoodItems();
  }, [nsearch, food_list]);

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      await fetchMenuItem();

      // Load cart from localStorage when the page is loaded
      const savedCart = loadCartFromLocalStorage();
      setCartIteam(savedCart);

      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCart();
      }
    };
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartIteam,
    setCartIteam,
    addToCart,
    removeToCart,
    getTotalAmount,
    token,
    setToken,
    menu_list,
    nsearch,
    setSearch,
    filteredItems,
    setFilteredItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreContextProvider };
