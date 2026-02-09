import { use, useState } from "react";
import States from "./States";
import OrderCard from "./OrderCard";
import CookingCard from "./CookingCard";
import ServeCard from "./ServeCard";
import { toast } from "react-toastify";

const OrderContainer = ({ ordersPromise }) => {
  const data = use(ordersPromise);

  const [orders, setOrders] = useState(data);
  const [cookingItems, setCookingItems] = useState([]);
  const [readyItems, setReadyItems] = useState([]);

  const handleOrder = (order) => {
    // age chack koro cooking order ache kina....
    const isExist = cookingItems.find((item) => item.id === order.id);
    if (isExist) {
      toast.error("Order All Ready On Processing", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    // cooking items er vitore click kora oder ke dhukabo.....
    const newCookingItems = [...cookingItems, order];
    setCookingItems(newCookingItems);
  };

  const handleCooking = (order) => {
    const isExist = readyItems.find((item) => item.id === order.id);
    if (isExist) return;

    //1. ready item er vitore order ke dhukau
    order.cooked_At = new Date().toLocaleTimeString();

    const newReadyItems = [...readyItems, order];
    setReadyItems(newReadyItems);

    //2. cooking item er vitor theke oder ke remove koro
    const remaining = cookingItems.filter((item) => item.id !== order.id);
    setCookingItems(remaining);

    //3. orders theke order take remove kore dite hobe
    const remainingOrders = orders.filter((item) => item.id !== order.id);
    setOrders(remainingOrders);
  };
  return (
    <div>
      <States
        readyTotal={readyItems.length}
        cookingTotal={cookingItems.length}
        ordersTotal={orders.length}
      />

      <section className="w-11/12 mx-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          {/* current order */}
          <h2 className="text-3xl font-bold">Current Orders</h2>

          <div className="space-y-5">
            {orders.map((order) => (
              <OrderCard
                handleOrder={handleOrder}
                key={order.id}
                order={order}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-5">
          {/* cooking now */}
          <h2 className="text-3xl font-bold">Cooking Now</h2>

          <div className="p-2">
            {cookingItems.map((order) => (
              <CookingCard
                handleCooking={handleCooking}
                key={order.id}
                order={order}
              />
            ))}
          </div>

          {/* order ready */}
          <h2 className="text-3xl font-bold">Order Ready</h2>

          <div className="p-2">
            {readyItems.map((order) => (
              <ServeCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderContainer;
