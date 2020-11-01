import React, { useState, useEffect } from "react";
import { IconMenuAction } from "./IconMenuAction";
import { useClickOutside } from "./useClickOutside";

const Dropdown = ({
  iconActionMenu,
  embeddedIconMenuActionStyle,
  h_item,
  preKey,
  item,
  popupDirection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, hasClickedOutside] = useClickOutside();
  useEffect(() => {
    if (hasClickedOutside) {
      setIsOpen(false);
    }
  }, [hasClickedOutside]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;

  return (
    <div
      className={`dropdown ${
        popupDirection === "left" ? "dropleft" : "rightdrop"
      }`}
      onClick={toggleOpen}
      ref={ref}
    >
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        style={{
          backgroundColor: "transparent",
          border: "0px",
          boxShadow: "none",
        }}
      >
        <IconMenuAction
          icon={iconActionMenu}
          embeddedIconStyle={embeddedIconMenuActionStyle}
        />
      </button>
      <div className={menuClass} aria-labelledby="dropdownMenuButton">
        {h_item.actionItems.map((menu, mi) => {
          if (menu.divider) {
            return <div class="dropdown-divider" key={preKey + "m" + mi} />;
          }
          if (!menu.isVisible) {
            return (
              <button
                class="dropdown-item"
                type="button"
                key={preKey + "m" + mi}
                onClick={() => menu.onClick(item)}
              >
                {menu.labelFormat ? menu.labelFormat(item) : menu.label}
              </button>
            );
          } else {
            if (menu.isVisible && menu.isVisible(item)) {
              return (
                <button
                  class="dropdown-item"
                  type="button"
                  key={preKey + "m" + mi}
                  onClick={() => menu.onClick(item)}
                >
                  {menu.labelFormat ? menu.labelFormat(item) : menu.label}
                </button>
              );
            } else {
            }
          }
        })}
      </div>
    </div>
  );
};

export default Dropdown;
