import React, { useState, useEffect } from "react";
import { TableDataView, sortService } from "./component/index";
import { Container, Row, Col } from "reactstrap";
import ViewHeadlineIcon from "mdi-react/ViewHeadlineIcon";

function App() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    // const mock = [
    //   { id: 1, name: "John", age: 22, gender: "male", enabled: true },
    //   { id: 2, name: "Russ", age: 52, gender: "male", enabled: true },
    //   { id: 3, name: "Cicero", age: 18, gender: "male", enabled: false },
    //   { id: 4, name: "Donny", age: 42, gender: "male", enabled: true },
    //   { id: 5, name: "Rose", age: 18, gender: "female", enabled: true },
    //   { id: 6, name: "Amy", age: 16, gender: "female", enabled: false },
    //   { id: 7, name: "Morgan", age: 55, gender: "male", enabled: false },
    //   { id: 8, name: "Hortense", age: 75, gender: "male", enabled: false },
    //   { id: 9, name: "Melissa", age: 33, gender: "female", enabled: true },
    //   { id: 10, name: "Howard", age: 14, gender: "male", enabled: true },
    //   { id: 11, name: "John", age: 12, gender: "male", enabled: true },
    //   { id: 12, name: "Angus", age: 45, gender: "male", enabled: false },
    //   { id: 13, name: "Elian", age: 41, gender: "female", enabled: true },
    //   { id: 14, name: "Elliot", age: 32, gender: "male", enabled: false },
    //   { id: 15, name: "Evie", age: 19, gender: "female", enabled: true },
    // ];
    const mock = [
      {
        id: 1,
        name: "John",
        age: 22,
        gender: "male",
        enabled: true,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
      {
        id: 2,
        name: "Russ",
        age: 52,
        gender: "male",
        enabled: true,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
      {
        id: 3,
        name: "Cicero",
        age: 18,
        gender: "male",
        enabled: false,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
      {
        id: 4,
        name: "Donny",
        age: 42,
        gender: "male",
        enabled: true,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
      {
        id: 5,
        name: "Rose",
        age: 18,
        gender: "female",
        enabled: true,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
      {
        id: 6,
        name: "Amy",
        age: 16,
        gender: "female",
        enabled: false,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
      {
        id: 7,
        name: "Morgan",
        age: 55,
        gender: "male",
        enabled: false,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
      {
        id: 8,
        name: "Hortense",
        age: 75,
        gender: "male",
        enabled: false,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
      {
        id: 9,
        name: "Melissa",
        age: 33,
        gender: "female",
        enabled: true,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
      {
        id: 10,
        name: "Howard",
        age: 14,
        gender: "male",
        enabled: true,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
      {
        id: 11,
        name: "John",
        age: 12,
        gender: "male",
        enabled: true,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
      {
        id: 12,
        name: "Angus",
        age: 45,
        gender: "male",
        enabled: false,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
      {
        id: 13,
        name: "Elian",
        age: 41,
        gender: "female",
        enabled: true,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
      {
        id: 14,
        name: "Elliot",
        age: 32,
        gender: "male",
        enabled: false,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
      {
        id: 15,
        name: "Evie",
        age: 19,
        gender: "female",
        enabled: true,
        key: "SXA-S home data mor many",
        phone: "09134024972",
        address: "020 Hilpert Stravenue",
      },
    ];
    setData(mock);
  }, []);

  //update pageNumber
  const pageUpdated = (page) => setPageNumber(page);

  // Ascending Sort process, you can use our 'sortService' or use your own approach like API call for sort in server-side
  const ascendingSort = (sort_field) =>
    setData(sortService.sortAscending(data, sort_field));

  // Descending Sort process, you can use our 'sortService' or use your own approach like API call for sort in server-side
  const descendingSort = (sort_field) =>
    setData(sortService.sortDescending(data, sort_field));

  return (
    <Container fluid>
      <Row className="m-3">
        <Col className="text-center">
          <h2>Table Data View</h2>
        </Col>
      </Row>

      <TableDataView
        noDataFoundText="No users found"
        headerItems={[
          {
            display: "User ID",
            dataSourceKey: "id",
            isSortable: true,
            onAscendingSortArrowClicked: (field) => ascendingSort(field),
            onDescendingSortArrowClicked: (field) => descendingSort(field),
          },
          {
            display: "Name",
            dataSourceKey: "name",
          },
          {
            display: "Age",
            dataSourceKey: "age",
          },

          {
            display: "Gender",
            dataSourceKey: "gender",
            headerStyle: { width: "300px", textAlign: "center" },
            cellStyle: { textAlign: "center" },
          },
          {
            display: "Status",
            dataSourceKey: "enabled",
            cellDataFormat: ({ data }) => {
              return data ? "Activated" : "Inactive";
            },
            isSortable: true,
            onAscendingSortArrowClicked: (field) => ascendingSort(field),
            onDescendingSortArrowClicked: (field) => descendingSort(field),
          },
          {
            display: "Key",
            dataSourceKey: "key",
          },
          {
            display: "Address",
            dataSourceKey: "address",
          },
          {
            display: "Phone",
            dataSourceKey: "phone",
          },
          {
            display: "Actions",
            isAction: true,
            actionItems: [
              {
                label: "View",
                onClick: (data) => {},
              },
              {
                divider: true,
              },
              {
                label: "Edit",
                onClick: (data) => {},
              },
              {
                label: "Disable User",
                onClick: (data) => {},
                isVisible: (data) => {
                  return data.enabled;
                },
              },
              {
                label: "Enable User",
                onClick: (data) => {},
                isVisible: (data) => {
                  return !data.enabled;
                },
              },
            ],
          },
        ]}
        dataSource={data}
        resetPagination={pageNumber}
        paginationNumberOfScreens={5}
        onPaginationNumberClick={(page_number) => pageUpdated(page_number)}
        onPaginationPreviousClick={() => console.log("previous clicked")}
        onPaginationNextClick={() => console.log("next clicked")}
        noPadding
        bordered={true}
        borderless={false}
        hover={false}
        striped={true}
        size={TableDataView.tableSize.medium}
        autoPagination={false}
        autoPaginationSize={5}
        menuIcon={<ViewHeadlineIcon color="#cd4747" size={24} />}
        embeddedIconSortUpStyle={{ color: "#cd4747", size: 30 }}
        embeddedIconSortDownStyle={{ color: "#cd4747", size: 30 }}
        activeSortIconColor={"blue"}
      />
    </Container>
  );
}

export default App;
