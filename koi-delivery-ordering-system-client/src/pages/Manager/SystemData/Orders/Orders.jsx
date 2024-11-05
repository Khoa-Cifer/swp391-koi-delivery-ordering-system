import { useEffect, useState } from "react";
import { Table, Typography, Input, Row, Col, Select } from "antd";
import { getAllOrders } from "../../../../utils/axios/order";
import ToastUtil from "../../../../components/toastContainer";
const { Option } = Select;
const { Title } = Typography;
const { Search } = Input;

function Orders() {
  const [orders, setOrders] = useState([]); // Initialize as an empty array
  const [filteredOrders, setFilteredOrders] = useState([]); // Filtered orders for display
  const [searchTrackingId, setSearchTrackingId] = useState(""); // For search by order ID
  const [searchOrderName, setSearchOrderName] = useState(""); // For search by customer name
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(-1);

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

  const handleSelectStatusChange = (e) => {
    setSelectedOrderStatus(e);
  }

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
        <Title level={2} style={{ marginTop: 0, color: "#01428E" }}>
          Orders
        </Title>
      </div>

      <Row gutter={16} style={{ marginBottom: "16px", paddingLeft: "5%", marginRight: "0px" }}>
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
        <Col span={8}>
          <Select
            placeholder="Filter by order's status"
            value={selectedOrderStatus}
            onChange={handleSelectStatusChange}
            style={{ width: "50%" }}
            allowClear
          >
            <Option value={-1}>Select</Option>
            <Option value={1}>Option 1</Option>
            <Option value={2}>Option 2</Option>
            <Option value={3}>Option 3</Option>
          </Select>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredOrders}
        pagination={{ pageSize: 15 }}
        rowKey="id"
        style={{ marginTop: "25px" }}
      />
    </div>
  );
}

export default Orders;
