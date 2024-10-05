import Header from "../SalesComponent/Header/Header";
import Sidebar from "../SalesComponent/Sidebar/Sidebar";
import MainContent from "./Conponent/MainContent";

function SalesStaffHome() {
  return (
    <div>
      <Header />
      <div className="sales-staff-container" >
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="content">
          <MainContent />
        </div>
      </div>
    </div>
  );
}

export default SalesStaffHome;
