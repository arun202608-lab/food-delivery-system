import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);

  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      console.log("URL success:", success);
      console.log("Order ID:", orderId);

      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderId,
      });

      console.log("Verify API response:", response.data);
      console.log("Verify API success:", response.data.success);

      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Verify error:", error);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
