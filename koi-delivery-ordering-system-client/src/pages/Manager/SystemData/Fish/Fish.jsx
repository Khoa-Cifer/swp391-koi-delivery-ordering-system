import { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import { getAllFishes } from "../../../../utils/axios/fish";

const { Title } = Typography;

function Fish() {
    const [fishData, setFishData] = useState([]);

    useEffect(() => {
        async function fetchFish() {
            const fetchedData = await getAllFishes();
            if (fetchedData) {
                setFishData(fetchedData);
            }
        }
        fetchFish();
    }, []);

    const columns = [
        // {
        //     title: 'Fish Id',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            render: (age) => `${age} years old`,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price.toLocaleString()} VND`,
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            render: (size) => `${size} cm`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                switch (status) {
                    case 1:
                        return 'Good';
                    case 2:
                        return 'Sick';
                    case 3:
                        return 'Dead';
                    default:
                        return 'Unknown';
                }
            },
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
            render: (weight) => `${weight} gram`,
        },
    ];

    return (
        <div>
            <div className="dashboard-info">
                <Title level={2} style={{marginTop: 0, color:"#01428E"}}>Fish</Title>
            </div>
            <Table
                columns={columns}
                dataSource={fishData}
                rowKey="id"
                pagination={{ pageSize: 15 }} // Pagination to display 5 records per page
                style={{ marginTop: "25px" }}
            />
        </div>
    );
}

export default Fish;
