import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createFishOrderInfo } from "../../../../utils/axios/fish";
import { createLicenseFiles, createLicenseOrderInfo } from "../../../../utils/axios/license";
import { calculateOrderPrice } from "../../../../utils/axios/order";
import { paymentOpenGateway, logPaymentHistory, getPaymentHistory } from "../../../../utils/axios/payment";
import { jwtDecode } from "jwt-decode";

function FishPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fishEntries, submittedLicense, orderId } = location.state;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = fishEntries.reduce((sum, fish) => sum + parseFloat(fish.price), 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [fishEntries]);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    let customerId;
    if (token) {
      const customerInfo = jwtDecode(token);
      customerId = customerInfo.sub.substring(2);
    }

    try {
      const paymentResponse = await logPaymentHistory(customerId, orderId, Math.floor(totalPrice));
      const paymentOpen = await paymentOpenGateway(customerId, Math.floor(totalPrice), "NCB");

      if (paymentOpen) {
        let paymentWindow = window.open(paymentOpen.paymentUrl, "_blank");

        let checkWindowClosed = setInterval(async function () {
          if (paymentWindow.closed) {
            clearInterval(checkWindowClosed);
            if (paymentResponse) {
              const paymentCheck = await getPaymentHistory(paymentResponse.id);
              if (paymentCheck.paymentStatus) {
                await addFishAndLicenses();
                toast.success("Payment successful. Fish added to the order.");
                navigate(`/customer-home`);
              } else {
                toast.error("Payment failed or cancelled.");
              }
            } else {
              toast.error("Unexpected error has occurred");
            }
          }
        }, 500);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred during payment");
    }
  };

  const addFishAndLicenses = async () => {
    try {
      for (const fish of fishEntries) {
        const fishData = await createFishOrderInfo(
          fish.name,
          fish.age,
          fish.size,
          fish.weight,
          fish.price,
          fish.file,
          orderId
        );

        if (submittedLicense[fishEntries.indexOf(fish)]) {
          const license = submittedLicense[fishEntries.indexOf(fish)];
          const licenseData = await createLicenseOrderInfo(
            license.name,
            license.description,
            new Date(license.date).toISOString(),
            fishData
          );

          const fileList = Object.keys(license)
            .filter((key) => key.startsWith("file-"))
            .map((key) => license[key]);

          await createLicenseFiles(licenseData, fileList);
        }
      }

      await calculateOrderPrice(orderId);
    } catch (error) {
      console.error("Error adding fish and licenses:", error);
      toast.error("An error occurred while adding fish and licenses");
    }
  };

  return (
    <div>
      <h2>Payment for Fish Order</h2>
      <p>Total Price: {totalPrice} VND</p>
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
}

export default FishPayment;