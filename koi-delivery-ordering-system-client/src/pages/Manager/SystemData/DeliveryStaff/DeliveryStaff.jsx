import { useEffect, useState } from "react";
import { Button, Input, Modal, Table, Typography, Space, Dropdown, Menu } from "antd";
import { createDeliveryStaff, getAllDeliveryStaff, updateDeliveryStaff } from "../../../../utils/axios/deliveryStaff"; // Add update function
import ToastUtil from "../../../../components/toastContainer";
import { toast } from "react-toastify";
import { MoreOutlined } from "@ant-design/icons";

const { Title } = Typography;

function DeliveryStaff() {
    const [deliveryStaffData, setDeliveryStaffData] = useState([]);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [currentId, setCurrentId] = useState(null); // Track the ID of the staff being edited

    const handleOpenCreate = () => setCreateModalOpen(true);
    const handleCloseCreate = () => {
        setCreateModalOpen(false);
        setUsername("");
        setEmail("");
    };

    const handleOpenEdit = (id, userName, email) => {
        setCurrentId(id);
        setUsername(userName);
        setEmail(email);
        setEditModalOpen(true);
    };

    const handleCloseEdit = () => {
        setEditModalOpen(false);
        setUsername("");
        setEmail("");
        setCurrentId(null);
    };

    async function fetchDeliveryStaffs() {
        try {
            const fetchedData = await getAllDeliveryStaff();
            if (fetchedData) {
                setDeliveryStaffData(fetchedData);
            }
        } catch (error) {
            toast.error("Failed to fetch delivery staff data.");
        }
    }

    useEffect(() => {
        fetchDeliveryStaffs();
    }, []);

    async function handleCreateDeliveryStaff() {
        try {
            const data = await createDeliveryStaff(email, username);
            toast.success(data);
            if (data === "Account created successfully") {
                await fetchDeliveryStaffs();
                handleCloseCreate();
            }
        } catch (error) {
            toast.error("Failed to create delivery staff.");
        }
    }

    async function handleUpdateDeliveryStaff() {
        try {
            const data = await updateDeliveryStaff(currentId, { username, email }); // Send updated data
            toast.success(data);
            if (data === "Account updated successfully") {
                await fetchDeliveryStaffs();
                handleCloseEdit();
            }
        } catch (error) {
            toast.error("Failed to update delivery staff.");
        }
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
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Longitude",
            dataIndex: "longitude",
            key: "longitude",
        },
        {
            title: "Latitude",
            dataIndex: "latitude",
            key: "latitude",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item onClick={() => handleOpenEdit(record.id, record.username, record.email)}>
                                Edit
                            </Menu.Item>
                        </Menu>
                    }
                    trigger={['click']}
                >
                    <Button icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ];

    return (
        <div>
            <ToastUtil />
            <div className="dashboard-info">
                <Title level={2}>Delivery Staff</Title>
            </div>
            <div>
                <Space style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                    <Button type="primary" onClick={handleOpenCreate}>
                        Create New Delivery Staff
                    </Button>
                </Space>
                <Modal
                    title="Create New Delivery Staff"
                    visible={createModalOpen}
                    onCancel={handleCloseCreate}
                    onOk={handleCreateDeliveryStaff}
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
                </Modal>

                <Modal
                    title="Edit Delivery Staff"
                    visible={editModalOpen}
                    onCancel={handleCloseEdit}
                    onOk={handleUpdateDeliveryStaff}
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
                </Modal>
            </div>
            <Table
                dataSource={deliveryStaffData}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
}

export default DeliveryStaff;
