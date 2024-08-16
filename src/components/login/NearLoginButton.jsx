import React, { useCallback } from "react";
import {
  generateNonce,
  redirectToAuthNearLinkDefault,
} from "../../lib/auth.jsx";
import { useAuthStore } from "../../lib/authStore.jsx";

export function NearLoginButton(props) {
  const authStore = useAuthStore();

  const requestSignIn = useCallback(() => {
    const nonce = generateNonce();
    authStore.setCurrentNonce(nonce);
    redirectToAuthNearLinkDefault(nonce);
  }, [authStore]);

  return (
    <button className="btn btn-primary" onClick={requestSignIn}>
      Sign In
    </button>
  );
}
