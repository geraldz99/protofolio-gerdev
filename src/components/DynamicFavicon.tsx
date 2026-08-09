"use client";

import { useEffect } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function DynamicFavicon() {
  const { state } = usePortfolio();
  const favicon = state.brand?.faviconUrl || state.brand?.logoImage || "/projects/logo-new.svg";

  useEffect(() => {
    if (!favicon) return;

    // Update standard icon tag
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = favicon;

    // Update shortcut icon tag
    let shortcutLink = document.querySelector<HTMLLinkElement>("link[rel='shortcut icon']");
    if (!shortcutLink) {
      shortcutLink = document.createElement("link");
      shortcutLink.rel = "shortcut icon";
      document.head.appendChild(shortcutLink);
    }
    shortcutLink.href = favicon;

    // Update apple touch icon tag
    let appleLink = document.querySelector<HTMLLinkElement>("link[rel='apple-touch-icon']");
    if (!appleLink) {
      appleLink = document.createElement("link");
      appleLink.rel = "apple-touch-icon";
      document.head.appendChild(appleLink);
    }
    appleLink.href = favicon;
  }, [favicon]);

  return null;
}
