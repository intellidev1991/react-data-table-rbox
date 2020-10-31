import React, { useState, useEffect } from "react";
import { PaginationItem, PaginationLink, Pagination } from "reactstrap";
import { range } from "lodash";
import "./style/bootstrap.min.css";

const GeneratedPagination = ({
  onClick,
  resetPagination,
  numberOfScreens = 5,
  onPreviousArrow,
  onNextArrow,
  paginationPageLinkStyle = {},
  paginationContainerStyle = {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [starter, setStarter] = useState(1);

  useEffect(() => {
    if (resetPagination === 1) {
      setCurrentPage(1);
      setStarter(1);
    }
  }, [resetPagination]);

  const onPreviousArrow2 = () => {
    if (starter === 1) {
      return;
    }
    const newStarter = starter - numberOfScreens;
    setStarter(newStarter);
    setCurrentPage(newStarter);
    onClick(newStarter);
    if (onPreviousArrow) onPreviousArrow();
  };

  const onNextArrow2 = () => {
    const newStarter = starter + numberOfScreens;
    setStarter(newStarter);
    setCurrentPage(newStarter);
    onClick(newStarter);
    if (onNextArrow) onNextArrow();
  };

  return (
    <Pagination
      aria-label="Page navigation"
      style={{ ...paginationContainerStyle }}
    >
      <PaginationItem key={"pre"}>
        <PaginationLink
          previous
          onClick={onPreviousArrow2}
          style={{ ...paginationPageLinkStyle }}
        />
      </PaginationItem>
      {range(starter, starter + numberOfScreens).map((counter, index) => {
        return (
          <PaginationItem key={counter} active={counter === currentPage}>
            <PaginationLink
              style={{ ...paginationPageLinkStyle }}
              onClick={() => {
                setCurrentPage(counter);
                onClick(counter);
              }}
            >
              {counter}
            </PaginationLink>
          </PaginationItem>
        );
      })}
      <PaginationItem key={"next"}>
        <PaginationLink
          next
          onClick={onNextArrow2}
          style={{ ...paginationPageLinkStyle }}
        />
      </PaginationItem>
    </Pagination>
  );
};

export { GeneratedPagination };
