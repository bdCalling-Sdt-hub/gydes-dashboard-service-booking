import { Table } from "antd";

const MyTable = ({ columns, data, setPage }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={
        data?.length > 10
          ? {
              onChange: (page) => setPage(page),
              showSizeChanger: false, // Enables page size selection
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`, // Shows total items
              total: data.length,
            }
          : false
      }
      scroll={{ x: true }}
    />
  );
};

export default MyTable;
