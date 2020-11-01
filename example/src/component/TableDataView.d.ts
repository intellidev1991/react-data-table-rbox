import { ComponentType } from "react";

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

enum EnumDirection {
  left = "left",
  right = "right",
}

enum EnumSize {
  ms = "ms",
  md = "md",
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
  resetPagination: number;
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

export type TableDataView = ComponentType<ITableDataView>;
