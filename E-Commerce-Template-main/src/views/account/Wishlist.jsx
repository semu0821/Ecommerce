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

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`https://modestserver.onrender.com/api/revwish/wishlist/${user.user._id}`);
        if (response.data) {
          setWishlist(response.data);
        }
      } catch (err) {
        setError("Error fetching wishlist data");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user.user._id]);

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
              <CardProductGrid data={item.product} review={{ rating: item.rating, comment: item.comment }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistView;
