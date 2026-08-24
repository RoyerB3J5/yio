"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HeroContextType {
  currentHeroImage: string | null;
  setCurrentHeroImage: (image: string | null) => void;
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export function HeroProvider({ children }: { children: ReactNode }) {
  const [currentHeroImage, setCurrentHeroImage] = useState<string | null>(null);

  return (
    <HeroContext.Provider value={{ currentHeroImage, setCurrentHeroImage }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHeroContext() {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error("useHeroContext must be used within a HeroProvider");
  }
  return context;
}