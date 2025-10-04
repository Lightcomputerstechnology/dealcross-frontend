// src/components/payments/FlutterwaveButton.jsx
import { useEffect } from "react";

const FlutterwaveButton = ({ amount, email, name, tx_ref, onSuccess }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const makePayment = () => {
    if (!window.FlutterwaveCheckout) return;

    window.FlutterwaveCheckout({
      public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
      tx_ref: tx_ref,
      amount: amount,
      currency: "NGN",
      payment_options: "card,banktransfer",
      customer: {
        email: email,
        name: name,
      },
      customizations: {
        title: "Dealcross Payment",
        description: "Payment for a Dealcross service",
        logo: "/logo.svg",
      },
      callback: function (response) {
        // Callback is triggered after payment
        onSuccess(response); // Pass response to your backend
      },
      onclose: function () {
        console.log("Payment closed");
      },
    });
  };

  return (
    <button onClick={makePayment} className="bg-blue-600 px-4 py-2 text-white rounded">
      Pay with Flutterwave
    </button>
  );
};

export default FlutterwaveButton;
