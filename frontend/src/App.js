import ShoppingCart from './ShoppingCart.js';
import Navbar from './Navbar.js';
import Products from './Products.js';
import Categories from './Categories.js';
import Sells from './Sells.js';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Products />
      <Categories />
      <ShoppingCart />
      <Sells />
    </>
  );
}

export default App;
