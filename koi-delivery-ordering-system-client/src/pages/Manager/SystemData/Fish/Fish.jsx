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
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Weight",
            dataIndex: "weight",
            key: "weight",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
    ];

    return (
        <div>
            <div className="dashboard-info">
                <Title level={2} style={{ marginTop: 0 }}>Fish</Title>
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
