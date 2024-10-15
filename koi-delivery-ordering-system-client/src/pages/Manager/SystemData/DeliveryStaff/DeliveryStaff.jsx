import { useEffect, useState } from "react";
import { Button, Input, Modal, Table, Typography, Space, Popconfirm } from "antd";
import { createDeliveryStaff, deleteDeliveryStaffById, getAllDeliveryStaff, deliveryStaffUpdateProfile } from "../../../../utils/axios/deliveryStaff"; // Import delete function and update function
import ToastUtil from "../../../../components/toastContainer";
import { toast } from "react-toastify";

const { Title } = Typography;

function DeliveryStaff() {
    const [deliveryStaffData, setDeliveryStaffData] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditingStaff(null);
        setEmail("");
        setUsername("");
    };

    async function fetchDeliveryStaffs() {
        const fetchedData = await getAllDeliveryStaff();
        if (fetchedData) {
            setDeliveryStaffData(fetchedData);
        }
    }

    useEffect(() => {
        fetchDeliveryStaffs();
    }, []);

    async function handleCreateOrEditDeliveryStaff() {
        let message;
        if (editingStaff) {
            // Update staff
            message = await deliveryStaffUpdateProfile();
        } else {
            // Create new staff
            message = await createDeliveryStaff();
        }

        if (message === "Account create successfully" || message === "Staff updated successfully") {
            await fetchDeliveryStaffs();
        }
        toast(message);
        handleClose();
    }

    function handleEdit(record) {
        setEditingStaff(record);
        setUsername(record.username);
        setEmail(record.email);
        setOpen(true);
    }

    const handleDelete = async (id) => {
        try {
            await deleteDeliveryStaffById(id); // Call the API to delete the staff
            toast("Staff deleted successfully"); // Notify the user
            await fetchDeliveryStaffs(); // Refresh the list after deletion
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete staff"); // Notify if there's an error
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
            key: "id",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this staff?"
                        onConfirm={() => handleDelete(record.id)} // Pass the staff id to delete
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
                <Title level={2} style={{ marginTop: 0 }}>Delivery Staff</Title>
            </div>
            <div>
                <Space style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                    <Button type="primary" onClick={handleOpen}>
                        Create New Delivery Staff
                    </Button>
                </Space>
                <Modal
                    title={editingStaff ? "Edit Delivery Staff" : "Create New Delivery Staff"}
                    visible={open}
                    onCancel={handleClose}
                    onOk={handleCreateOrEditDeliveryStaff}
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
