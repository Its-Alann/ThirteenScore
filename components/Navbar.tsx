"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [confirmNavigation, setConfirmNavigation] = useState(false);

  // Checks whether you have started a game, if so it will ask for a confirmation to go back to the landing page
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
