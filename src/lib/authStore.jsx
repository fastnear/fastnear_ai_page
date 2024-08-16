import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const createAuthStore = (set, get) => ({
  auth: null,
  currentNonce: null,
  setAuthValue: (auth) => {
    set({ auth: auth });
  },
  setAuthValueRaw: (authValue) => {
    if (authValue.startsWith("Bearer ")) {
      authValue = authValue.substring("Bearer ".length);
    }
    const auth = JSON.parse(authValue);
    set({ auth: auth });
  },
  isAuthenticated: () => {
    return !!get().auth;
  },
  accountId: () => {
    return get().auth?.account_id;
  },
  clearAuth: () => {
    set({ auth: null, currentNonce: null });
  },
  toBearer: () => {
    if (!get().auth) {
      return "";
    }
    return `Bearer ${JSON.stringify(get().auth)}`;
  },
  setCurrentNonce: (nonce) => {
    set({ currentNonce: nonce });
  },
  nonce: () => {
    return get().currentNonce;
  },
});

export const useAuthStore = create()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthStore(...a),
      }),
      { name: "auth_store" },
    ),
  ),
);
