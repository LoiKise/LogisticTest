import React from "react";
import { Link } from "react-router-dom";

export default function ButtonCustom({ name, linkIcon, isTransparent, link }) {
  let style =
    isTransparent === 1
      ? " header__button-service"
      : isTransparent === 2
        ? "header__button-search"
        : "section-area__btn";

  return (
    <Link type="submit" className={style} to={link}>
      {name}
      <img src={linkIcon} alt="LogoIcon" />
    </Link>
  );
}
