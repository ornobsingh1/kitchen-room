import { use, useState } from "react";
import States from "./States";
import OrderCard from "./OrderCard";
import CookingCard from "./CookingCard";

const OrderContainer = ({ ordersPromise }) => {
  const [cookingItems, setCookingItems] = useState([]);
  const orders = use(ordersPromise);

  const handleOrder = (order) => {
    // cooking items er vitore click kora oder ke dhukabo

    const newCookingItems = [...cookingItems, order];
    setCookingItems(newCookingItems);
  };
  return (
    <div>
      <States cookingTotal={cookingItems.length} ordersTotal={orders.length} />

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

          <div>
            {cookingItems.map((order) => (
              <CookingCard key={order.id} order={order} />
            ))}
          </div>

          {/* order ready */}
          <h2 className="text-3xl font-bold">Order Ready</h2>

          <div className="shadow-lg p-10"></div>
        </div>
      </section>
    </div>
  );
};

export default OrderContainer;
