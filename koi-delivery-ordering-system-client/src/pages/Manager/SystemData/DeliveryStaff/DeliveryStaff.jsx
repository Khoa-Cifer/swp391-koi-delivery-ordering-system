import { useEffect, useState } from "react";
import { Button, Input, Modal, Table, Typography, Space } from "antd";
import { createDeliveryStaff, getAllDeliveryStaff } from "../../../../utils/axios/deliveryStaff";
import ToastUtil from "../../../../components/toastContainer";
import { toast } from "react-toastify";

const { Title } = Typography;

function DeliveryStaff() {
    const [deliveryStaffData, setDeliveryStaffData] = useState([]);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function fetchDeliveryStaffs() {
        const fetchedData = await getAllDeliveryStaff();
        if (fetchedData) {
            setDeliveryStaffData(fetchedData);
        }
    }

    useEffect(() => {
        fetchDeliveryStaffs();
    }, []);

    async function handleCreateDeliveryStaff() {
        const data = await createDeliveryStaff(email, username);
        if (data === "Account create successfully") {
            await fetchDeliveryStaffs();
        }
        toast(data);
        handleClose();
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
                    title="Create New Delivery Staff"
                    visible={open}
                    onCancel={handleClose}
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
