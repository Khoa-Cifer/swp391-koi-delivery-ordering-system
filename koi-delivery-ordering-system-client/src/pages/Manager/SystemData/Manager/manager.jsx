import { useEffect, useState } from "react";
import { Table, Modal, Button, Input, Typography, notification, Popconfirm, Space, } from "antd";
import "react-toastify/dist/ReactToastify.css";
import ToastUtil from "../../../../components/toastContainer";
import { toast } from "react-toastify";
import { createManagers, deleteManagerById, editManagerProfile, getAllManagers } from "../../../../utils/axios/manager";

const { Title } = Typography;

function Manager() {
  const [managerData, setManagerData] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingManager, setEditingManager] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const fetchManagers = async () => {
    const fetchedData = await getAllManagers();
    if (fetchedData) {
      setManagerData(fetchedData);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleCreateManagers = async () => {
    const response = await createManagers(email, username, phoneNumber);
    notification.info({ message: response });
    await fetchManagers();
    setIsCreateModalOpen(false);
  };

  const handleClose = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setEditingManager(null);
    setEmail("");
    setUsername("");
    setPhoneNumber("");
  };

  async function handleEditManagers() {
    if (editingManager) {
      const response = await editManagerProfile(
        editingManager.id,
        username,
        email,
        phoneNumber
      );
      if (response) {
        toast("Edit manager successfully");
      } else {
        toast("Unexpected error has been occurred");
      }
      fetchManagers();
    }
    handleClose();
  }

  const handleDelete = async (id) => {
    try {
      await deleteManagerById(id);
      toast.success("Manager deleted successfully");
      await fetchManagers();
    } catch (error) {
      console.error("Error deleting manager:", error);
      toast.error("An error occurred while deleting the manager");
    }
  };

  function handleEdit(record) {
    setEditingManager(record);
    setIsEditModalOpen(true);
  }

  function handleCreate() {
    setIsCreateModalOpen(true);
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this manager?"
            onConfirm={() => handleDelete(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <ToastUtil />
      <div className="dashboard-info">
        <Title level={2} style={{ marginTop: 0 }}>
          Manager
        </Title>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button type="primary" onClick={() => handleCreate(true)}>
          Create New Manager
        </Button>
      </div>

      <Table
        dataSource={managerData}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }} // Adjust as needed
      />

      <Modal
        title="Create New Manager"
        visible={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsCreateModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleCreateManagers}
            disabled={!username || !email} // Disable if either is empty
          >
            Submit
          </Button>,
        ]}
      >
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
      </Modal>

      <Modal
        title={"Edit Manager"}
        visible={isEditModalOpen}
        onCancel={handleClose}
        onOk={() => handleEditManagers()}
        okButtonProps={{ disabled: !username || !email }} // Disable OK button if fields are empty
      >
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Input
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ marginBottom: 16 }}
        />
      </Modal>
    </div>
  );
}

export default Manager;
