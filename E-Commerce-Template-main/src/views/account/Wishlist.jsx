import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import CardProductGrid from "../../components/card/CardProductGrid";
import { Spinner } from "react-bootstrap"; // Add Bootstrap Spinner for loading state

const WishlistView = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch wishlist products
  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        `https://modestserver.onrender.com/api/revwish/wishlist/${user._id}`
      );

      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        const wishlistProducts = response.data.map(item => ({
          ...item.product,
          wishlistId: item._id, // Include the wishlist ID
          price: parseFloat(item.product.price?.$numberDecimal || 0),
          discount: parseFloat(item.product.discount?.$numberDecimal || 0),
        }));

        setWishlist(wishlistProducts);

        // Calculate total price
        const total = wishlistProducts.reduce((acc, product) => acc + (product.price || 0), 0);
        setTotalPrice(total);
      } else {
        setWishlist([]);
      }
    } catch (err) {
      setError("Error fetching wishlist data. Please try again.");
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user._id) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }
    fetchWishlist();
  }, [user]);

  const removeFromWishlist = async (wishlistId) => {
    try {
      await axios.delete(
        `https://modestserver.onrender.com/api/revwish/wishlist/${wishlistId}`
      );

      const updatedWishlist = wishlist.filter(item => item.wishlistId !== wishlistId);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWishlist(updatedWishlist);

      alert("Product removed from wishlist!");
    } catch (err) {
      setError("Error removing item from wishlist. Please try again.");
      console.error("Error removing product from wishlist:", err);
    }
  };

  return (
    <div className="container my-4">
      <h4>Your Wishlist</h4>
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
      ) : wishlist.length === 0 ? (
        <div className="alert alert-info">
          Your wishlist is empty. Start adding products you love!
        </div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {wishlist.map((item) => (
              <div className="col" key={item.wishlistId}>
                <CardProductGrid
                  data={item}
                  onWishlistToggle={() => removeFromWishlist(item.wishlistId)}
                  isInWishlistProp={true}
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h5>Total Wishlist Price: ${totalPrice.toFixed(2)}</h5>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistView;
