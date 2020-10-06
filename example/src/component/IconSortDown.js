/* eslint-disable */
import React from "react";
import MenuDownIcon from "mdi-react/MenuDownIcon";
//https://github.com/levrik/mdi-react

const IconSortDown = ({
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
      <MenuDownIcon
        style={{ ...styles.main, ...restStyle }}
        onClick={onClick}
        color={
          activeSortItem.dataSrcKey === dataSrcKey &&
          activeSortItem.type === "desc"
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

export { IconSortDown };

const styles = {
  main: {
    cursor: "pointer",
  },
};
