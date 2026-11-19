import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateQuantity, removeItem } from './CartSlice';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});
  const [currentView, setCurrentView] = useState('plants');
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const categories = [
    {
      category: 'Air Purifying Plants',
      plants: [
        {
          name: 'Snake Plant',
          image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=400&q=80',
          description: 'Produces oxygen at night and is very easy to care for.',
          cost: '$15',
        },
        {
          name: 'Spider Plant',
          image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=400&q=80',
          description: 'Thrives in indirect light and filters indoor air pollutants.',
          cost: '$12',
        },
        {
          name: 'Peace Lily',
          image: 'https://images.unsplash.com/photo-1593691384438-7f6c9a5e6d1d?auto=format&fit=crop&w=400&q=80',
          description: 'Elegant white blooms with strong air-purifying benefits.',
          cost: '$18',
        },
        {
          name: 'Boston Fern',
          image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=400&q=80',
          description: 'Lush fronds that add humidity and freshness to rooms.',
          cost: '$14',
        },
        {
          name: 'Rubber Plant',
          image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80',
          description: 'Bold glossy leaves that thrive in bright indirect sunlight.',
          cost: '$22',
        },
        {
          name: 'Aloe Vera',
          image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80',
          description: 'Hardy succulent known for soothing gel and low water needs.',
          cost: '$10',
        },
      ],
    },
    {
      category: 'Aromatic Fragrant Plants',
      plants: [
        {
          name: 'Lavender',
          image: 'https://images.unsplash.com/photo-1528756514091-dee5ecaa3278?auto=format&fit=crop&w=400&q=80',
          description: 'Calming fragrance and delicate purple blossoms.',
          cost: '$14',
        },
        {
          name: 'Jasmine',
          image: 'https://images.unsplash.com/photo-1592729645009-b2b0d0a1f73c?auto=format&fit=crop&w=400&q=80',
          description: 'Sweet-scented blooms that brighten indoor spaces.',
          cost: '$16',
        },
        {
          name: 'Rosemary',
          image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=400&q=80',
          description: 'Pine-like evergreen scent great for sunny windowsills.',
          cost: '$11',
        },
        {
          name: 'Mint',
          image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=400&q=80',
          description: 'Refreshing aroma and fast-growing green foliage.',
          cost: '$9',
        },
        {
          name: 'Lemon Balm',
          image: 'https://images.unsplash.com/photo-1591857177580-dc82583e98aa?auto=format&fit=crop&w=400&q=80',
          description: 'Crisp citrus scent when leaves are gently brushed.',
          cost: '$12',
        },
        {
          name: 'Eucalyptus',
          image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80',
          description: 'Cool, invigorating aroma with silver-green leaves.',
          cost: '$19',
        },
      ],
    },
    {
      category: 'Low Maintenance Plants',
      plants: [
        {
          name: 'ZZ Plant',
          image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=400&q=80',
          description: 'Tolerates low light and infrequent watering effortlessly.',
          cost: '$20',
        },
        {
          name: 'Pothos',
          image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=400&q=80',
          description: 'Trailing vines that adapt to almost any indoor spot.',
          cost: '$11',
        },
        {
          name: 'Cast Iron Plant',
          image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&q=80',
          description: 'Resilient foliage built for neglect and dim corners.',
          cost: '$21',
        },
        {
          name: 'Chinese Evergreen',
          image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80',
          description: 'Attractive patterned leaves with minimal care needs.',
          cost: '$17',
        },
        {
          name: 'Jade Plant',
          image: 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=400&q=80',
          description: 'Classic succulent with thick stems and small leaves.',
          cost: '$13',
        },
        {
          name: 'Haworthia',
          image: 'https://images.unsplash.com/photo-1509587584826-7933a7e2c2bd?auto=format&fit=crop&w=400&q=80',
          description: 'Compact rosette succulent ideal for desks and shelves.',
          cost: '$10',
        },
      ],
    },
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const parsePrice = (costStr) => parseFloat(String(costStr).replace(/[^0-9.]/g, '')) || 0;

  const totalCartAmount = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.cost) * item.quantity,
    0
  );

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">Paradise Nursery</div>
        <div className="nav-links">
          <a href="#home" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}>
            Home
          </a>
          <a href="#plants" onClick={(e) => { e.preventDefault(); setCurrentView('plants'); }}>
            Plants
          </a>
          <a href="#cart" onClick={(e) => { e.preventDefault(); setCurrentView('cart'); }}>
            Cart ({totalCartItems})
          </a>
        </div>
      </nav>

      {currentView === 'home' && (
        <div className="home-section">
          <h1>Welcome to Paradise Nursery</h1>
          <p>Explore our indoor plants and add your favorites to your cart.</p>
          <button onClick={() => setCurrentView('plants')}>Get Started</button>
        </div>
      )}

      {currentView === 'plants' && (
        <div className="product-list">
          {categories.map((cat) => (
            <div key={cat.category} className="category-section">
              <h2>{cat.category}</h2>
              <div className="plant-grid">
                {cat.plants.map((plant) => (
                  <div key={plant.name} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-thumbnail" />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="plant-cost">{plant.cost}</p>
                    <button
                      disabled={!!addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {currentView === 'cart' && (
        <div className="cart-section">
          <h2>Shopping Cart</h2>
          <p>Total Cart Amount: ${totalCartAmount.toFixed(2)}</p>
          {cartItems.map((item) => {
            const unitCost = parsePrice(item.cost);
            const itemTotal = unitCost * item.quantity;
            return (
              <div key={item.name} className="cart-item">
                <img src={item.image} alt={item.name} width="80" />
                <span>{item.name}</span>
                <span>Unit Price: ${unitCost.toFixed(2)}</span>
                <span>Total: ${itemTotal.toFixed(2)}</span>
                <button
                  onClick={() =>
                    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))
                  }
                >
                  +
                </button>
                <button onClick={() => dispatch(removeItem(item.name))}>Delete</button>
              </div>
            );
          })}
          {checkoutMessage && <p>{checkoutMessage}</p>}
          <button onClick={() => setCheckoutMessage('Coming Soon')}>Checkout</button>
          <button onClick={() => setCurrentView('plants')}>Continue Shopping</button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
