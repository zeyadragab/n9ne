// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Plus,
  Minus,
} from "lucide-react";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("Fetching product with ID:", id);
      const data = await getProductById(id);
      console.log("Product data:", data);

      // Handle different response formats
      let productData = null;

      if (Array.isArray(data)) {
        productData = data[0];
      } else if (data && typeof data === "object") {
        if (data.Status === "OK") {
          productData = data.data || data;
        } else {
          productData = data;
        }
      }

      if (!productData) {
        throw new Error("Product not found");
      }

      setProduct(productData);

      // Create image array for gallery
      if (productData.image_url) {
        setImages([productData.image_url]);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const [images, setImages] = useState([]);

  const handleAddToCart = async () => {
    if (!product) return;

    setAddingToCart(true);
    try {
      addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
          description: product.description,
          stock_quantity: product.stock_quantity,
        },
        quantity
      );

      // Show success feedback
      setTimeout(() => {
        setAddingToCart(false);
      }, 1000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAddingToCart(false);
    }
  };

  const increaseQuantity = () => {
    if (quantity < (product?.stock_quantity || 10)) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Product not found"}
          </h2>
          <button
            onClick={() => navigate("/catalog")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back
            </button>
            <div className="flex-1"></div>
            <Link
              to="/catalog"
              className="text-blue-600 hover:text-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={
                  images[selectedImage] ||
                  product.image_url ||
                  "/api/placeholder/600/600"
                }
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-blue-600"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500">
              <Link to="/catalog" className="hover:text-gray-700">
                Products
              </Link>
              {product.category_name && (
                <>
                  <span className="mx-2">/</span>
                  <span>{product.category_name}</span>
                </>
              )}
            </div>

            {/* Product Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`${
                      star <= 4
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">(42 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.original_price &&
                product.original_price > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.original_price}
                  </span>
                )}
              {product.original_price &&
                product.original_price > product.price && (
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    Save ${(product.original_price - product.price).toFixed(2)}
                  </span>
                )}
            </div>

            {/* Stock Status */}
            <div
              className={`text-sm font-medium ${
                product.stock_quantity > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock_quantity > 0
                ? `${product.stock_quantity} in stock`
                : "Out of stock"}
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              {product.size && (
                <div>
                  <span className="font-semibold text-gray-900">Size:</span>
                  <span className="ml-2 text-gray-600">{product.size}</span>
                </div>
              )}
              {product.color && (
                <div>
                  <span className="font-semibold text-gray-900">Color:</span>
                  <span className="ml-2 text-gray-600">{product.color}</span>
                </div>
              )}
              {product.category_name && (
                <div>
                  <span className="font-semibold text-gray-900">Category:</span>
                  <span className="ml-2 text-gray-600">
                    {product.category_name}
                  </span>
                </div>
              )}
              {product.brand && (
                <div>
                  <span className="font-semibold text-gray-900">Brand:</span>
                  <span className="ml-2 text-gray-600">{product.brand}</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-900">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 min-w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= (product.stock_quantity || 10)}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0 || addingToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock_quantity === 0}
                className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>

              <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Heart size={20} className="text-gray-600" />
              </button>

              <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="text-blue-600" size={24} />
                <div>
                  <div className="font-semibold text-gray-900">
                    Free Shipping
                  </div>
                  <div className="text-sm text-gray-600">
                    On orders over $50
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <RotateCcw className="text-blue-600" size={24} />
                <div>
                  <div className="font-semibold text-gray-900">
                    Easy Returns
                  </div>
                  <div className="text-sm text-gray-600">
                    30-day return policy
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="text-blue-600" size={24} />
                <div>
                  <div className="font-semibold text-gray-900">
                    Secure Payment
                  </div>
                  <div className="text-sm text-gray-600">
                    100% secure payment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-16 border-t pt-12">
          {/* Product Tabs */}
          <div className="border-b">
            <nav className="flex space-x-8">
              {[
                "Description",
                "Specifications",
                "Reviews (42)",
                "Shipping",
              ].map((tab) => (
                <button
                  key={tab}
                  className="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Product Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description ||
                  "No detailed description available for this product."}
              </p>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                Key Features
              </h4>
              <ul className="text-gray-600 space-y-2">
                <li>• High-quality materials and craftsmanship</li>
                <li>• Designed for durability and long-lasting performance</li>
                <li>• Easy to use and maintain</li>
                <li>• Excellent value for money</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Related products would go here */}
            <div className="text-center py-8 text-gray-500">
              Related products will be displayed here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
