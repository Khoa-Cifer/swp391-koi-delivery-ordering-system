import "./Admin.scss";

function Admin() {
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
            <div className="customer">
              <button>Customer</button>
            </div>

            <div className="modules-information">
              <button>Delivery Staff</button>
            </div>

            <div className="modules-information">
              <button>File</button>
            </div>

            <div className="modules-information">
              <button>Fish</button>
            </div>

            <div className="modules-information">
              <button>License</button>
            </div>

            <div className="modules-information">
              <button>Manager</button>
            </div>

            <div className="modules-information">
              <button>News</button>
            </div>

            <div className="modules-information">
              <button>Notification</button>
            </div>

            <div className="modules-information">
              <button>Order</button>
            </div>

            <div className="modules-information">
              <button>Rating</button>
            </div>

            <div className="modules-information">
              <button>Sale Staff</button>
            </div>

            <div className="modules-information">
              <button>Third Deliverer</button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-container-right">
        <div className="header">
          <div className="header-left">
            <h3>Dashboard</h3>
            <h3>Koi Fish Deliveries</h3>
          </div>

          <div className="header-right">
            <div>avatar</div>
          </div>
        </div>

        <div className="dashboard-info">
          <h2>DASHBOARD</h2>

        </div>
      </div>
    </div>
  );
}

export default Admin;
