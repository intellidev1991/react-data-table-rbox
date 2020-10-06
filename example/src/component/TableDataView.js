/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
  Table,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { slice } from "lodash";
import { GeneratedPagination } from "./GeneratedPagination";
import { IconMenuAction } from "./IconMenuAction";
import { IconSortDown } from "./IconSortDown";
import { IconSortUp } from "./IconSortUp";
import "./style/style.css";

const TableDataView = ({
  noDataFoundText = "No Data Found",
  headerItems = [
    {
      display: "ID", // header title
      dataSourceKey, // map to dataSource key
      cellDataFormat, // if present column data will be format. cellDataFormat: ({ data }) => {return data}
      isAction: false, // if true, the column data changed to menu
      actionItems: [{ label: "a", onClick: (data) => {} }], // action menu items
      isSortable: false,
      onAscendingSortArrowClicked: null,
      onDescendingSortArrowClicked: null,
      headerStyle: {}, // custom
      cellStyle: {}, // custom
    },
  ],
  dataSource = [],
  onPaginationNumberClick = (pageNumber) => {},
  onPaginationPreviousClick = () => {},
  onPaginationNextClick = () => {},
  resetPagination = null,
  paginationNumberOfScreens = 5,
  noPadding = false,
  bordered = true,
  borderless = false,
  striped = false,
  hover = false,
  size = "ms" || "md",
  autoPagination = false,
  autoPaginationSize = 10,
  iconActionMenu = null,
  iconSortUp = null,
  iconSortDown = null,
  embeddedIconMenuActionStyle = null,
  embeddedIconSortUpStyle = null,
  embeddedIconSortDownStyle = null,
  activeSortIconColor = "#cd4747", //default sort icon color
}) => {
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
                <UncontrolledButtonDropdown direction="left">
                  <DropdownToggle
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
                  </DropdownToggle>
                  <DropdownMenu>
                    {h_item.actionItems.map((menu, mi) => {
                      if (menu.divider) {
                        return <DropdownItem key={preKey + "m" + mi} divider />;
                      }
                      if (!menu.isVisible) {
                        return (
                          <DropdownItem
                            key={preKey + "m" + mi}
                            onClick={() => menu.onClick(item)}
                          >
                            {menu.labelFormat
                              ? menu.labelFormat(item)
                              : menu.label}
                          </DropdownItem>
                        );
                      } else {
                        if (menu.isVisible && menu.isVisible(item)) {
                          return (
                            <DropdownItem
                              key={preKey + "m" + mi}
                              onClick={() => menu.onClick(item)}
                            >
                              {menu.labelFormat
                                ? menu.labelFormat(item)
                                : menu.label}
                            </DropdownItem>
                          );
                        } else {
                        }
                      }
                    })}
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
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
    <Container fluid={true}>
      <Row>
        <Col sm="12" className={`${noPadding ? "" : "p-5 "}`}>
          <div className="table-responsive" style={{ minHeight: "260px" }}>
            <Table
              //responsive
              striped={striped}
              bordered={bordered}
              borderless={borderless}
              hover={hover}
              size={size}
            >
              <thead>
                <CoreTableHeaders />
              </thead>
              <tbody>
                <TableRowData data={autoPagination ? navigator : dataSource} />
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex justify-content-center align-items-center">
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
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

// Add facility settings
// Table Size
TableDataView.tableSize = { small: "sm", medium: "md" };

export { TableDataView };

/** ------------------ Example 1 : 

<TableDataView
    noDataFoundText="No Referrers Found"
    headerItems={[
    { display: "First Name", dataSourceKey: "first_name" },
    { display: "Last Name", dataSourceKey: "last_name" },
    { display: "Email Address", dataSourceKey: "email" },
    { display: "Role", dataSourceKey: "user_role_desc" },
    { display: "Status", dataSourceKey: "status" },
    {
        display: "Actions",
        isAction: true,
        actionItems: [
        actionItems: [
        {
            label: "Edit",
            onClick: data => actionEditHandler(data)
            isVisible: (data) => { // just if you want to remove it from menu check isVisible
                  return !data.validated;
            },
        },
        {
            divider: true,  // add divider into list
        },
        {
            label: "Disable",
            labelFormat: (data) => {   // if labelFormat was present, the label will be ignore.
              return data.enabled ? "Disable" : "Enable";
            },
            onClick: (data) => {
            },
        },
        {
            label: "Disable",
            onClick: data => actionDisableHandler(data)
        },
        {
            label: "Delete",
            onClick: data => actionDeleteHandler(data)
        },
        {
            label: "Resend Invite",
            onClick: data => actionResendInviteHandler(data)
        }
        ]
    }
    ]}
    dataSource={referrerData}
    onPaginationNumberClick={pageNumber => pageUpdated(pageNumber)}
    onPaginationNextClick={() => pageUpdated(noDelayParams.page + 1)}
    onPaginationPreviousClick={() => pageUpdated(noDelayParams.page - 1)}
/>
*/

/** ------------------ Example 2 : 

<TableDataView
    noDataFoundText="No Referrers Found"
    headerItems={[
    {
        display: "ID",
        dataSourceKey: "id",
        isSortable: true,
        onAscendingSortArrowClicked: (field) => {},
        onDescendingSortArrowClicked: (field) => {},
        style={{color:'red'}} // custom header title style
    },
    {
        display: "First Name",
        dataSourceKey: "fname",
        cellDataFormat: ({ data }) => {
        return data;
        }
    },
    { display: "Last Name", dataSourceKey: "lname" },
    { display: "Email Address", dataSourceKey: "email" },
    { display: "Role", dataSourceKey: "role" },
    { display: "Status", dataSourceKey: "status" },
    {
        display: "Actions",
        isAction: true,
        actionItems: [
        {
            label: "View",
            onClick: data => {
            console.log(data);
            }
        },
        {
            label: "Edit",
            onClick: () => {}
        }
        ]
    }
    ]}
    dataSource={[
    {
        id: "1",
        fname: "hamed",
        lname: "taheri",
        email: "h@s.com",
        role: "admin",
        status: "active"
    }
    ]}
/>
*/

/* Full Example 3
<TableDataView
  noDataFoundText="No tasks found"
  headerItems={[
    {
      display: "Task ID",
      dataSourceKey: "task_id",
      isSortable: true,
      onAscendingSortArrowClicked: (field) => ascendingSort(field),
      onDescendingSortArrowClicked: (field) => descendingSort(field)
    },
    {
      display: "Task Type",
      dataSourceKey: "task_type",
      isSortable: true,
      onAscendingSortArrowClicked: (field) => ascendingSort(field),
      onDescendingSortArrowClicked: (field) => descendingSort(field)
    },
    { display: "Task Notes", dataSourceKey: "task_notes" },
    {
      display: "Due Date",
      dataSourceKey: "due_date",
      cellDataFormat: ({ data }) => {
        return moment.utc(data).format("LLL");
      },
      isSortable: true,
      onAscendingSortArrowClicked: (field) => ascendingSort(field),
      onDescendingSortArrowClicked: (field) => descendingSort(field)
    },
    { display: "Assigned By", dataSourceKey: "assigned_by" },
    {
      display: "Assigned To",
      dataSourceKey: "assigned_to",
      cellDataFormat: ({ data }) => {
        return data ? data : "Not assigned";
      }
    },
    {
      display: "Company",
      dataSourceKey: "company",
      isSortable: true,
      onAscendingSortArrowClicked: (field) => ascendingSort(field),
      onDescendingSortArrowClicked: (field) => descendingSort(field)
    },
    {
      display: "Reason of Cancellation",
      dataSourceKey: "reason_for_cancel",
      cellDataFormat: ({ data }) => {
        return data ? data : "No reason";
      }
    },
    {
      display: "Status",
      dataSourceKey: "status",
      isSortable: true,
      onAscendingSortArrowClicked: (field) => ascendingSort(field),
      onDescendingSortArrowClicked: (field) => descendingSort(field)
    }
  ]}
  dataSource={tasksData}
  onPaginationNumberClick={pageNumber => pageUpdated(pageNumber)}
  onPaginationNextClick={() => pageUpdated(noDelayParams.page + 1)}
  onPaginationPreviousClick={() =>
    pageUpdated(noDelayParams.page - 1)
  }
  paginationNumberOfScreens={5}
/>
*/
