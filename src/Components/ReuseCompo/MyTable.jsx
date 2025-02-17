import { Table } from "antd";

const MyTable = ({
  loading,
  columns,
  data,
  setPage,
  total,
  limit,
  page,
  onChange,
}) => {
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={
        total > 0
          ? {
              current: page,
              onChange: (page) => setPage(page),
              showSizeChanger: false,
              total,
              pageSize: limit,
            }
          : false
      }
      scroll={{ x: true }}
    />
  );
};

export default MyTable;
