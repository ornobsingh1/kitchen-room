import Navbar from "./components/Navbar";
import TitleSection from "./components/TitleSection";

const App = () => {
  return (
    <>
      <header className="w-11/12 mx-auto py-3">
        <Navbar />
      </header>
      <section>
        <TitleSection>
          Kitchen Room
        </TitleSection>
      </section>
    </>
  );
};

export default App;
