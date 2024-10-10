import { Table } from "antd"
import axios from "axios";
import { useEffect } from "react";


function MainContent() {
  const api = "http://localhost:8080/api/orders/getAllOrders";

  const fetchOrderAccepted = async () => {

    const response = await axios.get(api);

    console.log(response.data);


  };

  useEffect(() => {
    fetchOrderAccepted
  }, []);

  return (
    <div>
      <h1>Order Accepted</h1>
      <Table/>
    </div>
  )
}

export default MainContent