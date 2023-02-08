import { create } from "zustand";
import { auth } from "../../firebase";
import { subscribeWithSelector } from "zustand/middleware";

export const useStore = create(
  subscribeWithSelector(() => ({
    email: "",
    userId: "",
    isAdmin: false,
    updateUserId: (userId) => ({ userId }),
    loading: false,
    name: "",
    phone: "",
    address: "",
  }))
);
