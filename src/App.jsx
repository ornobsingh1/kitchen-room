import { Suspense } from "react";
import Navbar from "./components/Navbar";
import OrderContainer from "./components/OrderContainer";
import TitleSection from "./components/TitleSection";
import { ToastContainer } from "react-toastify";

const ordersPromise = fetch("/orders.json").then((res) => res.json());

const App = () => {
  return (
    <>
      <header className="w-11/12 mx-auto py-3">
        <Navbar />
      </header>
      <section>
        <TitleSection>Kitchen Room</TitleSection>
      </section>
      <section>
        <Suspense fallback={<h2>Loading....</h2>}>
          <OrderContainer ordersPromise={ordersPromise} />
        </Suspense>
      </section>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
