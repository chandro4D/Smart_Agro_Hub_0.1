import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SuccessPayment() {
  const navigate = useNavigate();

  useEffect(() => {
    // Show success alert
    Swal.fire({
      icon: "success",
      title: "Payment Successful",
      text: "Thank you for your payment!",
      timer: 5000,
      showConfirmButton: true,
    }).then(() => {
      navigate("/payment_history");
    });
  }, []);

  return (
    <div className="text-center mt-20 text-3xl text-green-600">
      Processing your payment...
    </div>
  );
}

export default SuccessPayment;