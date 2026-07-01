// Safe helper for Meta Pixel events. The base script is loaded once in __root.tsx.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.fbq === "function") {
      if (params) window.fbq("track", eventName, params);
      else window.fbq("track", eventName);
    }
  } catch {
    // no-op — never break UX because of tracking
  }
}

export const CHECKOUT_LINK = "https://syncpay.link/RwUdGN";

// Fires InitiateCheckout, then navigates. Small delay so the beacon can flush.
export function handleCheckoutClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  params?: Record<string, unknown>,
): void {
  // Allow modifier-click / middle-click to open in new tab normally
  if (
    e.defaultPrevented ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey ||
    e.button !== 0
  ) {
    trackMetaEvent("InitiateCheckout", {
      content_name: "Compra pelo SyncPay",
      content_category: "Pagamento",
      currency: "BRL",
      ...params,
    });
    return;
  }
  e.preventDefault();
  trackMetaEvent("InitiateCheckout", {
    content_name: "Compra pelo SyncPay",
    content_category: "Pagamento",
    currency: "BRL",
    ...params,
  });
  const href = e.currentTarget.href || CHECKOUT_LINK;
  window.setTimeout(() => {
    window.location.href = href;
  }, 180);
}
