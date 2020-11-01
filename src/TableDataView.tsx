/* eslint-disable */
import React, { useState, useEffect } from "react";
import { slice } from "lodash";
import { GeneratedPagination } from "./GeneratedPagination";
import { IconSortDown } from "./IconSortDown";
import { IconSortUp } from "./IconSortUp";
import Dropdown from "./Dropdown";
import "./style/bootstrap.min.css";
import "./style/style.css";

enum EnumDirection {
  left = "left",
  right = "right",
}

enum EnumSize {
  ms = "ms",
  md = "md",
}

enum EnumPaginationDirection {
  center = "center",
  start = "start",
  end = "end",
}

interface IHeaderItem {
  display: string; // header title
  dataSourceKey: string; // map to dataSource key
  cellDataFormat?: ({
    data,
    entireData,
  }: {
    data: any;
    entireData: any;
  }) => any; // if present column data will be format. cellDataFormat: ({ data }) => {return data}
  isAction?: boolean; // if true, the column data changed to menu
  popupDirection?: EnumDirection; //left , right
  actionItems?: IActionItem[]; // action menu items
  isSortable?: boolean;
  onAscendingSortArrowClicked?: any;
  onDescendingSortArrowClicked?: any;
  headerStyle?: any; // custom
  cellStyle?: any; // custom
}

interface IActionItem {
  label: string;
  onClick: (data: any) => any;
}

interface ITableDataView {
  noDataFoundText: string;
  headerItems: IHeaderItem[];
  dataSource: any[];
  onPaginationNumberClick: (pageNumber: number) => any;
  onPaginationPreviousClick: () => any;
  onPaginationNextClick: () => any;
  paginationPageLinkStyle: any; // style object
  paginationContainerStyle: any; // style object
  paginationPosition: EnumPaginationDirection;
  resetPagination: number | null;
  paginationNumberOfScreens: number;
  noPadding: boolean;
  bordered: boolean;
  borderless: boolean;
  striped: boolean;
  hover: boolean;
  size: EnumSize;
  autoPagination: boolean;
  autoPaginationSize: number;
  iconActionMenu: any;
  iconSortUp: any;
  iconSortDown: any;
  embeddedIconMenuActionStyle: any;
  embeddedIconSortUpStyle: any;
  embeddedIconSortDownStyle: any;
  activeSortIconColor: string; //default sort icon color
}

const TableDataView = ({
  noDataFoundText = "No Data Found",
  headerItems = [],
  dataSource = [],
  onPaginationNumberClick = (pageNumber) => {},
  onPaginationPreviousClick = () => {},
  onPaginationNextClick = () => {},
  paginationPageLinkStyle = {}, // style object
  paginationContainerStyle = {}, // style object
  paginationPosition = EnumPaginationDirection.center,
  resetPagination = null,
  paginationNumberOfScreens = 5,
  noPadding = false,
  bordered = true,
  borderless = false,
  striped = false,
  hover = false,
  size = EnumSize.md,
  autoPagination = false,
  autoPaginationSize = 10,
  iconActionMenu = null,
  iconSortUp = null,
  iconSortDown = null,
  embeddedIconMenuActionStyle = null,
  embeddedIconSortUpStyle = null,
  embeddedIconSortDownStyle = null,
  activeSortIconColor = "#cd4747", //default sort icon color
}: ITableDataView) => {
  const [activeSortItem, setActiveSortItem] = useState({
    dataSrcKey: "",
    type: "",
  });

  //---------------Auto pagination process
  const [pageNumber, setPageNumber] = useState(1);
  const navigator = slice(
    dataSource,
    (pageNumber - 1) * autoPaginationSize,
    pageNumber * autoPaginationSize
  ); //custom navigator for pagination

  useEffect(() => {
    if (autoPagination) {
      if (resetPagination) {
        setPageNumber(resetPagination);
      }
    }
  }, [resetPagination]);
  //----------------

  //random string id generator
  const randomString = (len = 5) => {
    var str = ""; // String result
    for (var i = 0; i < len; i++) {
      // Loop `len` times
      var rand = Math.floor(Math.random() * 62); // random: 0..61
      var charCode = (rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48); // Get correct charCode
      str += String.fromCharCode(charCode); // add Character to str
    }
    return str; // After all loops are done, return the concatenated string
  };

  // --- Inner Components

  const CoreTableHeaders = () => {
    let preKey = randomString(); // generate 5 chars
    return (
      <React.Fragment>
        <tr>
          {headerItems &&
            headerItems.map((item, i) => {
              return (
                <th key={preKey + i} style={{ ...item.headerStyle }}>
                  {item.display}
                  {item.isSortable && (
                    <>
                      <IconSortUp
                        icon={iconSortUp}
                        embeddedIconStyle={embeddedIconSortUpStyle}
                        onClick={() => {
                          item.onAscendingSortArrowClicked(item.dataSourceKey);
                          setActiveSortItem({
                            dataSrcKey: item.dataSourceKey,
                            type: "asc",
                          });
                        }}
                        activeSortItem={activeSortItem}
                        activeSortIconColor={activeSortIconColor}
                        dataSrcKey={item.dataSourceKey}
                      />
                      <IconSortDown
                        icon={iconSortDown}
                        embeddedIconStyle={embeddedIconSortDownStyle}
                        onClick={() => {
                          item.onDescendingSortArrowClicked(item.dataSourceKey);
                          setActiveSortItem({
                            dataSrcKey: item.dataSourceKey,
                            type: "desc",
                          });
                        }}
                        activeSortItem={activeSortItem}
                        activeSortIconColor={activeSortIconColor}
                        dataSrcKey={item.dataSourceKey}
                      />
                    </>
                  )}
                </th>
              );
            })}
        </tr>
      </React.Fragment>
    );
  };

  const TableRowData = (props) => {
    var data = props.data;
    let preKey = randomString(); // 5 chars string
    if (data && data.length > 0) {
      return data.map((item, i) => {
        let data_row = headerItems.map((h_item, j) => {
          return (
            <td key={preKey + "c" + j} style={{ ...h_item.cellStyle }}>
              {h_item.dataSourceKey && // if cellDataFormat was present
                h_item.dataSourceKey.trim().length > 0 &&
                !h_item.isAction &&
                h_item.cellDataFormat && (
                  <h_item.cellDataFormat
                    data={item[h_item.dataSourceKey]}
                    entireData={item}
                  />
                )}

              {h_item.dataSourceKey && // if cellDataFormat was not present
                h_item.dataSourceKey.trim().length > 0 &&
                !h_item.isAction &&
                !h_item.cellDataFormat &&
                item[h_item.dataSourceKey]}

              {h_item.isAction && ( // action menu, if isAction was true and actionItems has items
                <Dropdown
                  iconActionMenu={iconActionMenu}
                  embeddedIconMenuActionStyle={embeddedIconMenuActionStyle}
                  h_item={h_item}
                  preKey={preKey}
                  item={item}
                  popupDirection={h_item.popupDirection}
                />
              )}
            </td>
          );
        });

        return <tr key={preKey + i}>{data_row}</tr>; //return each row data
      });
    } else {
      console.warn("NO Data FOUND", data);
      return <NoDataFound />;
    }
  };

  const NoDataFound = () => {
    return (
      <tr>
        <td colSpan={11}>
          <p style={{ textAlign: "center" }}>{noDataFoundText}</p>
        </td>
      </tr>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className={`col ${noPadding ? "" : "p-5 "}`}>
          <div style={{ minHeight: "260px" }}>
            <table
              className={`table${striped ? " table-striped" : ""}${
                bordered ? " table-bordered" : ""
              }${borderless ? " table-borderless" : ""}${
                hover ? " table-hover" : ""
              }${size && size === EnumSize.ms ? " table-sm" : ""}`}
            >
              <thead>
                <CoreTableHeaders />
              </thead>
              <tbody>
                <TableRowData data={autoPagination ? navigator : dataSource} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className={`d-flex justify-content-${paginationPosition} align-items-center`}
          >
            <GeneratedPagination
              onClick={(page_number) => {
                if (autoPagination) {
                  setPageNumber(page_number);
                }
                onPaginationNumberClick(page_number);
              }}
              numberOfScreens={paginationNumberOfScreens}
              onPreviousArrow={onPaginationPreviousClick}
              onNextArrow={onPaginationNextClick}
              resetPagination={autoPagination ? pageNumber : resetPagination}
              paginationPageLinkStyle={paginationPageLinkStyle}
              paginationContainerStyle={paginationContainerStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Add facility settings
// Table Size
TableDataView.tableSize = { small: "sm", medium: "md" };

export { TableDataView };
