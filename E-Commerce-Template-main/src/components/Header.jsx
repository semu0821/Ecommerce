// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Dropdown } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "font-awesome/css/font-awesome.min.css";

// const Header = () => {
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const updateCartCount = () => {
//       const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//       console.log("Stored cart:", storedCart); // Debugging log
//       const totalCount = storedCart.reduce((sum, item) => {
//         return sum + (item.quantity || 0); // Ensure quantity exists
//       }, 0);
//       console.log("Calculated cart count:", totalCount); // Debugging log
//       setCartCount(totalCount);
//     };

//     updateCartCount();

//     // Listen for changes in local storage
//     window.addEventListener("storage", updateCartCount);

//     return () => {
//       window.removeEventListener("storage", updateCartCount);
//     };
//   }, []);

//   return (
//     <header className="p-3 bg-light shadow-sm">
//       <div className="container-fluid">
//         <div className="d-flex align-items-center justify-content-between">
//           {/* Logo Section */}
//           <div className="d-flex align-items-center">
//             <Link to="/" aria-label="Home">
//               <img
//                 alt="Company Logo"
//                 src="../../images/banner/Webp.net-resizeimage.jpg"
//                 style={{
//                   width: "80px",
//                   height: "auto",
//                   objectFit: "contain",
//                 }}
//                 className="img-fluid"
//               />
//             </Link>
//           </div>

//           {/* Profile and Cart Section */}
//           <div className="d-flex align-items-center">
//             {/* Profile Dropdown */}
//             <Dropdown className="me-3">
//               <Dropdown.Toggle
//                 variant="primary"
//                 id="dropdown-profile"
//                 className="rounded-circle border-0 d-flex align-items-center justify-content-center p-3"
//                 style={{
//                   width: "50px",
//                   height: "50px",
//                   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <i className="bi bi-person-fill text-light fs-4"></i>
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item as={Link} to="/account/profile">
//                   <i className="bi bi-person-square"></i> My Profile
//                 </Dropdown.Item>
//                 <Dropdown.Item as={Link} to="/account/orders">
//                   <i className="bi bi-list-check text-primary"></i> Orders
//                 </Dropdown.Item>
//                 <Dropdown.Item as={Link} to="/account/wishlist">
//                   <i className="bi bi-heart-fill text-danger"></i> Wishlist
//                 </Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Item as={Link} to="/account/notification">
//                   <i className="bi bi-bell-fill text-primary"></i> Notification
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>

//             {/* Cart Section */}
//             <Link
//               to="/cart"
//               className="btn btn-primary rounded-circle d-flex justify-content-center align-items-center p-3 position-relative"
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//               }}
//               aria-label="Cart"
//             >
//               <i className="bi bi-cart3 fs-4 text-light"></i>
//               {cartCount > 0 && (
//                 <div
//                   className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle"
//                   style={{ fontSize: "0.9rem", padding: "0.2rem 0.4rem" }}
//                 >
//                   {cartCount}
//                 </div>
//               )}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
