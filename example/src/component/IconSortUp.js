/* eslint-disable */
import React from "react";
import MenuUpIcon from "mdi-react/MenuUpIcon";
//https://github.com/levrik/mdi-react

const IconSortUp = ({
  icon,
  embeddedIconStyle,
  onClick,
  activeSortItem,
  activeSortIconColor,
  dataSrcKey,
}) => {
  const { color, size, width, ...restStyle } = embeddedIconStyle;
  if (icon) {
    return icon;
  } else {
    return (
      <MenuUpIcon
        style={{ ...styles.main, ...restStyle }}
        onClick={onClick}
        color={
          activeSortItem.dataSrcKey === dataSrcKey &&
          activeSortItem.type === "asc"
            ? activeSortIconColor
            : color
            ? color
            : "#000"
        }
        size={size ? size : width ? width : 24}
      />
    );
  }
};

export { IconSortUp };

const styles = {
  main: {
    cursor: "pointer",
  },
};
