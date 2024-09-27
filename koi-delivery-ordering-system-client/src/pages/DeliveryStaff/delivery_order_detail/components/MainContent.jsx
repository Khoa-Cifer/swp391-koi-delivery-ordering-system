import "./MainContent.scss";
const MainContent = () => {
  return (
    <div className="order-details-container">
      {/* Order Details Table */}

      <div className="order-name-detail">
        <strong>Order name</strong>
      </div>
      <div className="order-status-detail">Order status</div>

      <div className="order-details">
        <div className="details-row">
          <div className="details-column">
            <p>Tracking Id</p>
            <p>Receiver Address</p>
            <p>Sender Address</p>
          </div>
          <div className="details-column">
            <p>Name</p>
            <p>Price</p>
          </div>
          <div className="details-column">
            <p>Created Date</p>
            <p>Last Updated Date / Finish Date</p>
          </div>
          <div className="view-fish">
            <button className="view-fish-btn">View Fish </button>
          </div>
        </div>

        <div className="order-description">
          <h4>Description</h4>
          <p>
            Con biết bây giờ mẹ chờ tin con Khi thấy mai đào nở vàng bên nương
            Năm trước con hẹn đầu xuân sẽ về Nay én bay đầy trước ngõ mà tin con
            vẫn xa ngàn xa Ôi nhớ xuân nào thuở trời yên vui Nghe pháo giao thừa
            rộn ràng nơi nơi Bên mái tranh nghèo ngồi quanh bếp hồng Trông bánh
            chưng chờ trời sáng Đỏ hây hây những đôi má đào Nếu con không về
            chắc mẹ buồn lắm, Mái tranh nghèo không người sửa sang Khu vườn
            thiếu hoa vàng mừng xuân Đàn trẻ thơ ngây chờ mong anh trai Sẽ đem
            về cho tà áo mới Ba ngày xuân đi khoe xóm giềng
          </p>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="google-map">
        <h4>Google Map</h4>
        {/* Placeholder for Google Map */}
        <div className="map-placeholder">Google Map</div>
      </div>
    </div>
  );
};

export default MainContent;
