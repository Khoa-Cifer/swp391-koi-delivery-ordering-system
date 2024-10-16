import { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import { getAllCustomers } from "../../../../utils/axios/customer";

const { Title } = Typography;

function Customer() {
    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        async function fetchCustomers() {
            const fetchedData = await getAllCustomers();
            if (fetchedData) {
                setCustomerData(fetchedData);
            }
        }
        fetchCustomers();
    }, []);

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
        }
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
        </div>
    );
}

export default Customer;
