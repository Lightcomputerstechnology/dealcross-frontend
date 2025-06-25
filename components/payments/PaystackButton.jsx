import { useEffect } from "react";

const PaystackButton = ({ amount, userEmail, txRef, onSuccess, onClose }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: userEmail,
      amount: amount * 100, // Convert to kobo
      ref: txRef,
      callback: function (response) {
        onSuccess(response);
      },
      onClose: function () {
        onClose();
      },
    });

    handler.openIframe();
  };

  return (
    <button
      onClick={payWithPaystack}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Fund Wallet via Paystack
    </button>
  );
};

export default PaystackButton;