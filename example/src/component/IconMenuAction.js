/* eslint-disable */
import React from "react";
import DotsVerticalIcon from "./icon/DotsVerticalIcon";
//https://github.com/levrik/mdi-react

const IconMenuAction = ({ icon, embeddedIconStyle: sty }) => {
  if (icon) {
    return icon;
  } else {
    return (
      <DotsVerticalIcon
        style={styles.main}
        color={sty && sty.color ? sty.color : "#000"}
        size={sty && sty.size ? sty.size : 24}
      />
    );
  }
};

export { IconMenuAction };

const styles = {
  main: {
    cursor: "pointer",
  },
};
