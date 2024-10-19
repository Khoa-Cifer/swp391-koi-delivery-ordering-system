import { useEffect, useState } from "react";
import { Button, Input, Modal, Table, Typography, Space, Popconfirm, notification } from "antd";
import { createDeliveryStaff, disableDeliveryStaffById, enableDeliveryStaffById, getAllDeliveryStaff, managerEditDeliveryStaffProfile } from "../../../../utils/axios/deliveryStaff";
import ToastUtil from "../../../../components/toastContainer";
import { toast } from "react-toastify";

const { Title } = Typography;

function DeliveryStaff() {
    const [ManagerData, setManagerData] = useState([]);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingManager, setEditingManager] = useState(null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleOpen = () => setCreateModalOpen(true);
    const handleClose = () => {
        setCreateModalOpen(false);
        setEditModalOpen(false);
        setEditingManager(null);
        setEmail("");
        setUsername("");
        setPhoneNumber("");
    };

    async function fetchManagers() {
        const fetchedData = await getAllManagers();
        if (fetchedData) {
            setManagerData(fetchedData);
        }
    }

    useEffect(() => {
        fetchManagers();
    }, []);

    const handleCreateManagers = async () => {
        const response = await createManagers(email, username, phoneNumber);
        notification.info({ message: response });
        await fetchManagers();
        setCreateModalOpen(false);
    };

    async function handleEditDeliveryStaff() {
        if (editingManager) {
            const message = await managerEditDeliveryStaffProfile(editingManager, username, email, phoneNumber);
            toast(message);
            fetchManagers();
        }
        handleClose();
    }

    function handleEdit(record) {
        setEditingManager(record);
        setEditModalOpen(true);
    }

    const handleDisableDeliveryStaff = async (id) => {
        try {
            await disableManagerById(id); // Call the API to delete the staff
            toast("Delivery Staff disabled successfully"); // Notify the user
            await fetchManagers(); // Refresh the list after deletion
        } catch (err) {
            console.error(err);
            toast.error("Failed to disable customer"); // Notify if there's an error
        }
    };

    const handleEnableDeliveryStaff = async (id) => {
        try {
            await enableDeliveryStaffById(id); // Call the API to delete the staff
            toast("Delivery Staff enabled successfully"); // Notify the user
            await fetchDeliveryStaffs(); // Refresh the list after deletion
        } catch (err) {
            console.error(err);
            toast.error("Failed to enable customer"); // Notify if there's an error
        }
    };

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
            dataIndex: "id",
            key: "id",
            render: (id, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(id)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title={
                            record.activeStatus
                                ? "Are you sure to disable this delivery staff?"
                                : "Are you sure to enable this delivery staff?"
                        }
                        onConfirm={() => {
                            if (record.activeStatus) {
                                handleDisableDeliveryStaff(id); // Handle delete if enabled
                            } else {
                                handleEnableDeliveryStaff(id); // Handle enabling if disabled
                            }
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger={record.activeStatus}>
                            {record.activeStatus ? "Delete" : "Enable"}
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
                <Title level={2} style={{ marginTop: 0 }}>Delivery Staff</Title>
            </div>
            <div>
                <Space style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                    <Button type="primary" onClick={handleOpen}>
                        Create New Delivery Staff
                    </Button>
                </Space>

            </div>
            <Table
                dataSource={deliveryStaffData}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={"Create New Delivery Staff"}
                visible={createModalOpen}
                onCancel={handleClose}
                onOk={() => handleCreateDeliveryStaff()}
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

            <Modal
                title={"Edit Delivery Staff"}
                visible={editModalOpen}
                onCancel={handleClose}
                onOk={() => handleEditDeliveryStaff()}
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

export default DeliveryStaff;
