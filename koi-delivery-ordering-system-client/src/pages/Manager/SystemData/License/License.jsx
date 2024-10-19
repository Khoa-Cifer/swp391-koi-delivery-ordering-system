import { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import { getAllLicenses } from "../../../../utils/axios/license";
import dateTimeConvert from "../../../../components/utils";

const { Title } = Typography;

function License() {
  const [licenseData, setLicenseData] = useState([]);

  useEffect(() => {
    async function fetchLicense() {
      const fetchedData = await getAllLicenses();
      if (fetchedData) {
        setLicenseData(fetchedData);
      }
    }
    fetchLicense();
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date of Issue",
      dataIndex: "dateOfIssue",
      key: "dateOfIssue",
      render: (date) => dateTimeConvert(date), // Using your dateTimeConvert function
    },
  ];

  return (
    <div>
      <div className="dashboard-info">
        <Title level={2} style={{ marginTop: 0 }}>Licenses</Title>
      </div>
      <Table
        columns={columns}
        dataSource={licenseData}
        rowKey="id"
        pagination={{ pageSize: 15 }}
        style={{ marginTop: "25px" }}
      />
    </div>
  );
}

export default License;
