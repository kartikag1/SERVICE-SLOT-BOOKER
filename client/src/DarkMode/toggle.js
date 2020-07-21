import React from "react";
import { func, string } from "prop-types";
import styled from "styled-components";
import { ReactComponent as LampIcon } from "./icons/lamp.svg";

const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";
  return (
    <LampIcon
      onClick={toggleTheme}
      style={{
        height: 50,
        width: 50,
        position: "absolute",
        right: 5,
        top: 2,
      }}
    />
  );
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default Toggle;
