// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          <img
            src={product.image_url || "https://via.placeholder.com/400"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.stock_quantity < 10 && product.stock_quantity > 0 && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              Low Stock
            </div>
          )}
          {product.stock_quantity === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </div>
            {product.category_name && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {product.category_name}
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="flex gap-2 mb-3">
            {product.size && (
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                Size: {product.size}
              </span>
            )}
            {product.color && (
              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                {product.color}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
            className={`w-full py-2 rounded-lg font-medium transition flex items-center justify-center space-x-2 ${
              product.stock_quantity === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <ShoppingCart size={18} />
            <span>
              {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; // ← MAKE SURE THIS LINE EXISTS
