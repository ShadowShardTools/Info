import Header from "./Header";
import InfiniteCarousel from './components/Products';

function App() {
  return (
    <>
      <Header />
      <div className="pt-20">
      <InfiniteCarousel />
      </div>
    </>
  );
}

export default App;