import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";

export default function HeaderNavItem({ headerItem }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const renderNavItem = () => {
    return headerItem.map((item, index) => {
      return (
        <li className="header__nav-item" key={index}>
          {item.name === "GIỚI THIỆU" ? (
            <a href="#footer" className="header__nav-link">
              GIỚI THIỆU
            </a>
          ) : (
            <NavLink className="header__nav-link" to={item.link}>
              {item.name}
            </NavLink>
          )}
        </li>
      );
    });
  };

  return <>{renderNavItem()}</>;
}
