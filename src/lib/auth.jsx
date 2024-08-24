import { parseHashParams } from "./misc.jsx";
import { RECIPIENT, SIGN_IN_MESSAGE } from "./data.jsx";

export function createAuthNearLink({ message, recipient, nonce, callbackUrl }) {
  const urlParams = new URLSearchParams({
    message,
    recipient,
    nonce,
    callbackUrl,
  });

  return `https://auth.near.ai/?${urlParams.toString()}`;
}

export function redirectToAuthNearLink({
  message,
  recipient,
  nonce,
  callbackUrl,
}) {
  const url = createAuthNearLink({ message, recipient, nonce, callbackUrl });
  window.location.replace(url);
}

export function redirectToAuthNearLinkDefault(nonce) {
  return redirectToAuthNearLink({
    message: SIGN_IN_MESSAGE,
    recipient: RECIPIENT,
    nonce,
    callbackUrl:
      window.location.origin +
      window.location.pathname +
      window.location.search,
  });
}

/**
 * Generates a nonce, which is current time in milliseconds
 * and pads it with zeros to ensure it is exactly 32 bytes in length.
 */
export function generateNonce() {
  const nonce = Date.now().toString();
  return nonce.padStart(32, "0");
}

export function extractSignatureFromHashParams() {
  const hashParams = parseHashParams(location.hash);

  if (!hashParams.signature) {
    return null;
  }

  const accountId = hashParams.accountId;
  const publicKey = hashParams.publicKey;
  const signature = hashParams.signature;

  return { accountId, publicKey, signature };
}
