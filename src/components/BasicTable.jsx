import MUIDataTable from "mui-datatables";

const BasicTable = ({
  title,
  columns,
  data,
  options,

}) => {
  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default BasicTable;
