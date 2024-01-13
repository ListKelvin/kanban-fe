import React, { useState, useEffect } from "react";

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));
  }, []);

  const toogleThemeChange = () => {
    if (isDark) {
      localStorage.setItem("theme", "light");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "light");
      setIsDark(false);
    } else {
      localStorage.setItem("theme", "dark");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "dark");
      setIsDark(true);
    }
  };
  return (
    <div onClick={toogleThemeChange}>
      <i className="fa-solid fa-moon"></i>
    </div>
  );
};
