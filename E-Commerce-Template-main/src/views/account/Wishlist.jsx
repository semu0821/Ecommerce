import { useState, useEffect, lazy, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import CardProductList from "../../components/card/CardProductList";

const CardProductGrid = lazy(() => import("../../components/card/CardProductGrid"));

const WishlistView = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch wishlist from the server
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `https://modestserver.onrender.com/api/revwish/wishlist/${user.user._id}`
        );
        console.log("Wishlist response data:", response.data); // Log the response
        if (response.data) {
          setWishlist(response.data); // Ensure response data is in correct structure
        }
      } catch (err) {
        console.error("Error fetching wishlist data:", err); // Log the error
        setError("Error fetching wishlist data");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user.user._id]);

  // Function to remove item from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.delete(
        `https://modestserver.onrender.com/api/revwish/wishlist/${user.user._id}/${productId}`
      );
      if (response.status === 200) {
        // Update the local wishlist after removal
        setWishlist(wishlist.filter(item => item.product._id !== productId));
      }
    } catch (err) {
      setError("Error removing item from wishlist");
    }
  };

  // Function to add item to wishlist (in case of updates)
  const addToWishlist = async (product) => {
    try {
      const response = await axios.post(
        `https://modestserver.onrender.com/api/revwish/wishlist/${user.user._id}`,
        { productId: product._id }
      );
      if (response.status === 200) {
        // Update the local wishlist after adding
        setWishlist([...wishlist, { product, rating: null, comment: null }]);
      }
    } catch (err) {
      setError("Error adding item to wishlist");
    }
  };

  return (
    <div className="container mb-3">
      <h4 className="my-3">Wishlists</h4>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="row g-3">
          {wishlist.map((item, idx) => (
            <div key={idx} className="col-md-6">
              <CardProductGrid
                data={item.product}
                review={{ rating: item.rating, comment: item.comment }}
              />
              <button
                className="btn btn-sm btn-danger mt-2"
                onClick={() => removeFromWishlist(item.product._id)}
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistView;
