import ShoppingCart from './ShoppingCart.js';
import NavBar from './NavBar.js';
import Products from './Products.js';
import Categories from './Categories.js';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <Products />
      <Categories />
      <ShoppingCart />
    </>
  );
}

export default App;
