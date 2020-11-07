import React, { useState, useEffect } from "react";
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
    <nav aria-label="Page navigation" style={{ ...paginationContainerStyle }}>
      <ul class="pagination">
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            onClick={onPreviousArrow2}
            style={{ ...paginationPageLinkStyle }}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {range(starter, starter + numberOfScreens).map((counter, index) => {
          return (
            <li
              class="page-item"
              key={counter}
              active={counter === currentPage}
            >
              <a
                class="page-link"
                href="#"
                style={{ ...paginationPageLinkStyle }}
                onClick={() => {
                  setCurrentPage(counter);
                  onClick(counter);
                }}
              >
                {counter}
              </a>
            </li>
          );
        })}
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            onClick={onNextArrow2}
            style={{ ...paginationPageLinkStyle }}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export { GeneratedPagination };
