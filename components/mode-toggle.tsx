"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme, systemTheme } = useTheme();
  const [mode, setMode] = useState<any>(systemTheme);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      setMode(localStorage.getItem("mode") || mode);
    }
  }, []);

  return (
    <button
      className="w-10 h-10 flex items-center justify-center cursor-pointer text-foreground"
      onClick={() => {
        const newMode = mode == "light" ? "dark" : "light";
        setTheme(newMode);
        setMode(newMode);
        localStorage.setItem("mode", newMode);
      }}
    >
      {mode == "light" ? (
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Moon className="h-5 w-5 transition-all" />
      )}
    </button>
  );
}
