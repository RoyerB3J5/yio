"use client";

import { useEffect } from "react";

const animationSelector = ".fade-up, .fade-down, .fade-right, .fade-left";

export default function ScrollAnimations() {
  useEffect(() => {
    const revealAll = () => {
      document.querySelectorAll(animationSelector).forEach((element) => {
        element.classList.add("active");
      });
    };

    if (!("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const reveal = (element: Element) => {
      element.classList.add("active");
      observer.unobserve(element);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -15%", threshold: 0 },
    );

    const observeAnimations = (root: ParentNode) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          root.querySelectorAll(animationSelector).forEach((element) => {
            if (!element.classList.contains("active")) {
              observer.observe(element);
            }
          });
        });
      });
    };

    observeAnimations(document);

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;

          if (node.matches(animationSelector)) {
            observer.observe(node);
          }
          observeAnimations(node);
        });
      });
    });

    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
