import MUIDataTable from "mui-datatables";

const BasicTable = ({ title, columns, data, options = {} }) => {
  const customOptions = {
    ...options,
    responsive: "standard",
    elevation: 0,
    filter: false,
    sort: false,
    search: false,
    print: false,
    download: false,
    viewColumns: false,
    selectableRows: "none",
    setTableProps: () => ({
      style: {
        backgroundColor: "#2c2c2c",
        color: "white",
        borderCollapse: "separate", 
        borderSpacing: "0 10px",
      },
    }),
    setRowProps: () => ({
      style: {
        borderBottom: "none", 
      },
    }),
    setCellProps: () => ({
      style: {
        borderBottom: "none", 
      },
    }),
  };

  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={customOptions}
    />
  );
};

export default BasicTable;
