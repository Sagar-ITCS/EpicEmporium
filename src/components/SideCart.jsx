import { useRef, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const SideCart = ({ isOpen, onClose, cartItems }) => {
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Side Cart */}
      <div
        ref={cartRef}
        className={`z-50 fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-2xl"
        >
          &times;
        </button>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="flex items-center mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-gray-600">${item.price}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SideCart;
