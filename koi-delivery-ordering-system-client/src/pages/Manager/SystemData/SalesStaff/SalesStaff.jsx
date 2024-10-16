import React, { useEffect, useState } from "react";
import {
    Table,
    Modal,
    Button,
    Input,
    Typography,
    notification,
} from "antd";
import { getAllSalesStaff, createSalesStaff } from "../../../../utils/axios/salesStaff";
import 'react-toastify/dist/ReactToastify.css';
import ToastUtil from "../../../../components/toastContainer";

const { Title } = Typography;

function SalesStaff() {
    const [salesStaffData, setSalesStaffData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const fetchSalesStaffs = async () => {
        const fetchedData = await getAllSalesStaff();
        if (fetchedData) {
            setSalesStaffData(fetchedData);
        }
    };

    useEffect(() => {
        fetchSalesStaffs();
    }, []);

    const handleCreateSalesStaff = async () => {
        const response = await createSalesStaff(email, username, phoneNumber);
        notification.info({ message: response });
        await fetchSalesStaffs();
        setIsModalOpen(false);
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
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
    ];

    return (
        <div>
            <ToastUtil />
            <div className="dashboard-info">
                <Title level={2} style={{ marginTop: 0 }}>Sales Staff</Title>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Create New Sales Staff
                </Button>
            </div>

            <Table
                dataSource={salesStaffData}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }} // Adjust as needed
            />

            <Modal
                title="Create New Sales Staff"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleCreateSalesStaff}
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
        </div>
    );
}

export default SalesStaff;
