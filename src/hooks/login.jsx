import { useEffect } from "react";
import { SIGN_IN_MESSAGE, RECIPIENT } from "../lib/data.jsx";

import { parseHashParams } from "../lib/misc.jsx";
import { useAuthStore } from "../lib/authStore.jsx";

/**
 * This hook is used to handle the login process
 * It will parse the hash params from the url, and set the auth value in the store
 */
export function useHandleLogin() {
  const store = useAuthStore();

  return useEffect(() => {
    const hashParams = parseHashParams(location.hash);

    if (hashParams.signature) {
      // TODO: Verify the signature
      const auth = {
        account_id: hashParams.accountId,
        public_key: hashParams.publicKey,
        signature: hashParams.signature,
        callback_url: hashParams.callbackUrl,
        message: SIGN_IN_MESSAGE,
        recipient: RECIPIENT,
        nonce: store.nonce(),
      };
      store.setAuthValueRaw(`Bearer ${JSON.stringify(auth)}`);

      // cleanup url
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
  }, [store.current_nonce, store]);
}
