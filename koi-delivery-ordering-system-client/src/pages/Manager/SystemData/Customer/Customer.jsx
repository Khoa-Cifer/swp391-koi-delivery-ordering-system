import { useEffect, useState } from "react";
import { Button, Input, Modal, Popconfirm, Space, Table, Typography } from "antd";
import { deleteCustomerById, getAllCustomers, managerEditCustomerProfile } from "../../../../utils/axios/customer";
import { toast } from "react-toastify";

const { Title } = Typography;

function Customer() {
    const [customerData, setCustomerData] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingCustomer, setCustomer] = useState(null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleClose = () => {
        setEditModalOpen(false);
        setCustomer(null);
        setEmail("");
        setUsername("");
        setPhoneNumber("");
    };

    async function fetchCustomers() {
        const fetchedData = await getAllCustomers();
        if (fetchedData) {
            setCustomerData(fetchedData);
        }
    }
    
    useEffect(() => {
        fetchCustomers();
    }, []);

    async function handleEditCustomers() {
        if (editingCustomer) {
            const message = await managerEditCustomerProfile(editingCustomer, username, email, phoneNumber);
            toast(message);
            fetchCustomers();
        }
        handleClose();
    }

    function handleEdit(record) {
        setCustomer(record);
        setEditModalOpen(true);
    }

    const handleDelete = async (id) => {
        try {
            await deleteCustomerById(id); // Call the API to delete the staff
            toast("Customer deleted successfully"); // Notify the user
            await fetchCustomers(); // Refresh the list after deletion
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete customer"); // Notify if there's an error
        }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: "Action",
            dataIndex: "id",
            key: "id",
            render: (id) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(id)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete customer?"
                        onConfirm={() => handleDelete(id)} // Pass the customer id to delete
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
            <div className="dashboard-info">
                <Title level={2} style={{ marginTop: 0 }}>Customer</Title>
            </div>
            <Table
                columns={columns}
                dataSource={customerData}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                style={{ marginTop: "25px" }}
            />
            <Modal
                title={"Edit Customer"}
                visible={editModalOpen}
                onCancel={handleClose}
                onOk={() => handleEditCustomers()}
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

export default Customer;
