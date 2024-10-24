import { useEffect, useState } from "react";
import {
    Table,
    Modal,
    Button,
    Input,
    Typography,
    Dropdown,
    Menu,
    notification,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { getAllPaymentRateService, updateRateById } from "../../../../utils/axios/rate";
import { styled } from "@mui/material";

const { Title } = Typography;

const Header = styled(Typography)(() => ({
    fontSize: "24px"
}));


function PaymentRate() {
    const [paymentServiceBaseData, setPaymentServiceBaseData] = useState([]);
    const [paymentServiceRateData, setPaymentServiceRateData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [serviceRate, setServiceRate] = useState("");
    const [currentId, setCurrentId] = useState(null);

    const fetchPaymentRateService = async () => {
        const fetchedData = await getAllPaymentRateService();
        if (fetchedData) {
            const firstHalf = fetchedData.slice(0, 2); // First 2 items
            const secondHalf = fetchedData.slice(2); // Remaining items

            setPaymentServiceBaseData(firstHalf);
            setPaymentServiceRateData(secondHalf);
        }
    };

    const handleUpdateData = async () => {
        const response = await updateRateById(currentId, serviceRate);
        if (response) {
            setOpenModal(false);
            notification.success({ message: "Update successfully" });
            fetchPaymentRateService();
        } else {
            notification.error({ message: "Unexpected error has occurred" });
        }
    };

    const handleEditClick = (id, rate) => {
        setCurrentId(id);
        setServiceRate(rate);
        setOpenModal(true);
    };

    useEffect(() => {
        fetchPaymentRateService();
    }, []);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Rate",
            dataIndex: "rate",
            key: "rate",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item onClick={() => handleEditClick(record.id, record.rate)}>
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
            <div className="dashboard-info">
                <Title level={2} style={{ marginTop: 0 }}>Payment Rate Board</Title>
            </div>

            <Header>Price Base</Header>
            <Table
                dataSource={paymentServiceBaseData}
                columns={columns}
                rowKey="id"
                style={{ marginTop: "25px" }}
            />

            <Header>Price Rate</Header>
            <Table
                dataSource={paymentServiceRateData}
                columns={columns}
                rowKey="id"
                style={{ marginTop: "25px" }}
            />
            {/* Modal for editing rate */}
            <Modal
                title={`Edit Rate`}
                visible={openModal}
                onCancel={() => setOpenModal(false)}
                onOk={handleUpdateData}
            >
                <Input
                    value={serviceRate}
                    onChange={(e) => setServiceRate(e.target.value)}
                    placeholder="Enter new rate"
                />
            </Modal>
        </div>
    );
}

export default PaymentRate;
