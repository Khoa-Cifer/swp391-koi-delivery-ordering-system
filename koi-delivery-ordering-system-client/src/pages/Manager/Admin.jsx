import { useState } from "react";
import "./Admin.scss";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Customer from "./components/Customer/Customer";

function Admin() {
  const [selectedDataType, setSelectedDataType] = useState('');

  const handleDataTypeChange = (dataType) => {
    setSelectedDataType(dataType);
  };

  const renderContent = () => {
    switch (selectedDataType) {
      case 'Customer':
        return <Customer />;
      case 'Delivery Staff':
        return <p>Delivery Staff Body Loaded</p>;
      case 'File':
        return <p>File Body Loaded</p>;
      case 'Fish':
        return <p>Fish Body Loaded</p>;
      case 'License':
        return <p>License Body Loaded</p>;
      case 'Manager':
        return <p>Manager Body Loaded</p>;
      case 'News':
        return <p>News Body Loaded</p>;
      case 'Notification':
        return <p>Notification Body Loaded</p>;
      case 'Order':
        return <p>Order Body Loaded</p>;
      case 'Rating':
        return <p>Rating Body Loaded</p>;
      case 'Sale Staff':
        return <p>Sale Staff Body Loaded</p>;
      case 'Payment History':
        return <p>Payment History Body Loaded</p>;
      case 'License Type':
        return <p>License Type Body Loaded</p>;
      case 'Delivery Type':
        return <p>Delivery Type Body Loaded</p>;
    }
  }

  return (
    <div className="admin-container">
      <div className="admin-container-left">
        <div className="logo">Logo</div>

        <div>
          <hr></hr>
        </div>

        <div className="dashboard">
          <h4>DASHBOARD</h4>
        </div>

        <div className="admin-users">
          <h4>ADMIN USERS</h4>
          <div className="admin-info">Admin users</div>
        </div>

        <div className="modules">
          <h4>MODULES</h4>

          <div className="modules-information">
            <Sidebar onDataTypeChange={handleDataTypeChange} />
          </div>
        </div>
      </div>

      <div className="admin-container-right">
        <Header />

        <div className="dashboard-info">
          <h2>DASHBOARD</h2>
        </div>
        <p>Selected Data Type: {selectedDataType}</p>
        {renderContent()}
      </div>
    </div>
  );
}

export default Admin;
