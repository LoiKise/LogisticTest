import React from "react";

export default function ButtonCustom({ name, linkIcon, isTransparent }) {
  let style =
    isTransparent === 1
      ? " header__button-service"
      : isTransparent === 2
      ? "header__button-search"
      : "";

  return (
    <button className={style}>
      {name}
      <img src={linkIcon} alt="LogoIcon" />
    </button>
  );
}
