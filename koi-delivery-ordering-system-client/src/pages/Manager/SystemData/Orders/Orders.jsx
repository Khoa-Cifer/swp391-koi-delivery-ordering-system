import { useEffect, useState } from "react";
import { Table, Typography, Input, Pagination, Row, Col } from "antd";
import { getAllOrders } from "../../../../utils/axios/order";
import ToastUtil from "../../../../components/toastContainer";

const { Title } = Typography;
const { Search } = Input;

function Orders() {
  const [orders, setOrders] = useState([]); // Initialize as an empty array
  const [filteredOrders, setFilteredOrders] = useState([]); // Filtered orders for display
  const [searchTrackingId, setSearchTrackingId] = useState(""); // For search by order ID
  const [searchOrderName, setSearchOrderName] = useState(""); // For search by customer name

  const statusMapping = {
    0: "Draft",
    1: "Posted",
    2: "Order Accepted",
    3: "Order Getting",
    4: "Order Received",
    5: "Order Confirmed",
    6: "Delivering",
    7: "Complete",
    8: "Failed",
    9: "Aborted by Customer",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;

  const handleFilter = () => {
    let filtered = orders;

    if (searchTrackingId !== "") {
      filtered = filtered.filter((order) =>
        order.trackingId?.includes(searchTrackingId.toUpperCase())
      );
    }

    if (searchOrderName !== "") {
      filtered = filtered.filter((order) =>
        order.name?.toLowerCase().includes(searchOrderName.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    async function fetchGettingOrder() {
      const response = await getAllOrders();
      if (response) {
        setOrders(response);
        setFilteredOrders(response); // Set initial filtered orders to all orders
      }
    }

    fetchGettingOrder();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchTrackingId, searchOrderName, orders]); // Re-filter when search terms or orders change

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Sender address",
      dataIndex: "senderAddress",
      key: "senderAddress",
    },
    {
      title: "Destination address",
      dataIndex: "destinationAddress",
      key: "destinationAddress",
    },
    {
      title: "Expected date",
      dataIndex: "expectedFinishDate",
      key: "expectedFinishDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Tracking id",
      dataIndex: "trackingId",
      key: "trackingId",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Order status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => statusMapping[status],
    },
  ];

  return (
    <div>
      <ToastUtil />
      <div className="dashboard-info">
        <Title level={2} style={{ marginTop: 0 }}>
          Orders
        </Title>
      </div>

      <Row gutter={16} style={{ marginBottom: "16px", paddingLeft: "5%" }}>
        <Col span={8}>
          <Search
            placeholder="Tracking ID"
            value={searchTrackingId}
            onChange={(e) => setSearchTrackingId(e.target.value)}
            allowClear
            enterButton="Search"
          />
        </Col>
        <Col span={8}>
          <Search
            placeholder="Name"
            value={searchOrderName}
            onChange={(e) => setSearchOrderName(e.target.value)}
            allowClear
            enterButton="Search"
          />
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={currentOrders}
        pagination={false}
        rowKey="id"
        style={{ marginTop: "25px" }}
      />

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={ordersPerPage}
        total={filteredOrders.length}
        onChange={handlePageChange}
        style={{ marginTop: "20px", textAlign: "right" }}
      />
    </div>
  );
}

export default Orders;
