"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [confirmNavigation, setConfirmNavigation] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (window.location.pathname === "/game") {
        event.preventDefault();
        event.returnValue = ""; // Chrome requires a non-empty string value
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [confirmNavigation]);

  const handleLogoClick = (event: any) => {
    if (window.location.pathname === "/game") {
      const userConfirmation = window.confirm(
        "Are you sure you want to leave the game? You will lose all progress."
      );

      if (!userConfirmation) {
        event.preventDefault();
      }
    }
  };

  return (
    <div className="navbar">
      <Link
        href="/"
        className="normal-case text-xl px-2 font-bold"
        onClick={handleLogoClick}
      >
        ThirteenScore
      </Link>
    </div>
  );
};

export default Navbar;
