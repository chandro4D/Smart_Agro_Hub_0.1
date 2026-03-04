import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

// base url will be dynamic depending on the environment
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
  // products state
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  // CART STATE
  cart: [],
  cartLoading: false,
  cartError: null,

  // form state
  formData: {
    name: "",
    price: "",
    image: "",
    category: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "", category: "" } }),

  // add item to cart
  addToCart: async ({ user_id, product_id, quantity = 1 }) => {
    set({ cartLoading: true });
    try {
      await axios.post(`${BASE_URL}/api/products/cart`, { user_id, product_id, quantity });
      // optionally refetch cart or update locally
      await get().fetchCart(user_id);
      toast.success("Item added to cart");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add to cart");
    } finally {
      set({ cartLoading: false });
    }
  },
  // fetch all cart items for a user
  fetchCart: async (user_id) => {
    set({ cartLoading: true });
    try {
      const res = await axios.get(`${BASE_URL}/api/products/cart/${user_id}`);
      set({ cart: res.data.data, cartError: null });
    } catch (err) {
      console.error(err);
      set({ cartError: "Failed to fetch cart", cart: [] });
    } finally {
      set({ cartLoading: false });
    }
  },

  // remove item from cart
  removeCartItem: async ({ user_id, product_id, id }) => {
    set({ cartLoading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/cart/${id}`, {
        data: { user_id, product_id }
      });

      await get().fetchCart(user_id);
      toast.success("Item removed from cart");
    } catch (err) {
      console.error(err);
      console.log("DELETE /cart called with:", { user_id, product_id });
      toast.error("Failed to remove item");
    } finally {
      set({ cartLoading: false });
    }
  },

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Error in addProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429) set({ error: "Rate limit exceeded", products: [] });
      else set({ error: "Something went wrong", products: [] });
    } finally {
      set({ loading: false });
    }
  },

  fetchInsecticides: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/insecticides`);
      set({ products: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429) set({ error: "Rate limit exceeded", products: [] });
      else set({ error: "Something went wrong", products: [] });
    } finally {
      set({ loading: false });
    }
  },
  fetchSeeds: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/seeds`);
      set({ products: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429) set({ error: "Rate limit exceeded", products: [] });
      else set({ error: "Something went wrong", products: [] });
    } finally {
      set({ loading: false });
    }
  },

  fetchTools: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/tools`);
      set({ products: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429) set({ error: "Rate limit exceeded", products: [] });
      else set({ error: "Something went wrong", products: [] });
    } finally {
      set({ loading: false });
    }
  },

  fetchFeed: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/feed`);
      set({ products: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429) set({ error: "Rate limit exceeded", products: [] });
      else set({ error: "Something went wrong", products: [] });
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (id) => {
    console.log("deleteProduct function called", id);
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({ products: prev.products.filter((product) => product.id !== id) }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("Error in deleteProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data, // pre-fill form with current product data
        error: null,
      });
    } catch (error) {
      console.log("Error in fetchProduct function", error);
      set({ error: "Something went wrong", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },
  // Update product
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
      set({ currentProduct: response.data.data });
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error in updateProduct function", error);
    } finally {
      set({ loading: false });
    }
  },
// Update User Profile
updateProfile: async (id, updatedData) => {
  set({ loading: true });
  try {
    const token = localStorage.getItem("token"); // or however you store JWT

    if (!token) {
      toast.error("You are not logged in");
      set({ loading: false });
      return;
    }

    const response = await axios.put(
      `${BASE_URL}/api/dashboard/updateProfile/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token
        },
        withCredentials: true, // If using cookies
      }
    );

    toast.success("Profile updated successfully");

    // Update user info in Zustand store
    set((state) => ({
      currentUser: response.data.data,
    }));
  } catch (error) {
    console.error("Error in updateProfile function", error);
    if (error.response?.status === 401) {
      toast.error("Unauthorized: Please log in again.");
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    set({ loading: false });
  }
},


}));


