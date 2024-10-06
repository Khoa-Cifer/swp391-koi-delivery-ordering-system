import axios from "axios";
import "./MainContent.scss";
import { useEffect, useState } from "react";
const MainContent = () => {
  // State để lưu trữ dữ liệu lấy từ API
  const [cards, setCards] = useState([]);

  // Hàm lấy dữ liệu từ API
  const fetchCards = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/orders/getAllOrders"
      );
      console.log(response);
      setCards(response.data); // Giả sử API trả về một mảng các đối tượng 'cards'
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Sử dụng useEffect để gọi API khi component được render
  useEffect(() => {
    fetchCards();
  }, []);
  return (
    <div className="order-container">
      <div className="map-container">
        <p>Google Map</p>
      </div>
      <div className="card-container">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <p>Name: {card.name}</p>
            <p>Last Updated Date: {card.expectedFinishDate}</p>
            <p>Destination Address: {card.destinationAddress}</p>
            <div className="button-container">
              <button className="status-button">Order Status</button>
              <button className="detail-button">Detail</button>
            </div>
          </div>
        ))}
      </div>
      <div className="view-more-container">
        <button className="view-more-button">View More >>></button>
      </div>
    </div>
  );
};

export default MainContent;
