import React from 'react';
import html2pdf from 'html2pdf.js'; // Import the library

const Invoice = () => {
  const invoiceData = JSON.parse(localStorage.getItem("invoice"));
  console.log(invoiceData);

  if (!invoiceData) {
    return <div>Loading or error: No order data found</div>;
  }

  const calculateTotal = () => {
    if (!invoiceData?.items) {
      return 0;
    }
    return invoiceData.items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTax = (total) => {
    return (total * 0.1).toFixed(2);
  };

  const subTotal = parseFloat(calculateTotal()) || 0;
  const tax = calculateTax(subTotal);
  const total = (subTotal + parseFloat(tax)).toFixed(2);

  const handleDownload = () => {
    const invoiceElement = document.getElementById('invoice');
    html2pdf()
      .from(invoiceElement)
      .save('invoice.pdf');
  };

  const handlePrint = () => {
    const originalContents = document.body.innerHTML;
    const printContents = document.getElementById('invoice').innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    window.location.reload(); // Reload the page to restore the original content
  };

  return (
    <div className="container py-5">
      <style>
        {`
        @media print {
          body * {
            display: none !important; /* Hide all elements by default */
          }
          #invoice, #invoice * {
            display: block !important; /* Show the invoice section */
          }
        }
        `}
      </style>
      <div className="card shadow-sm border-0 p-4" id="invoice">
        <div
          className="card-header text-white d-flex align-items-center justify-content-between"
          style={{
            background: 'linear-gradient(to right, rgb(2, 98, 125), rgb(2, 98, 125))',
          }}
        >
          <div>
            <img
              src="/images/banner/Webp.net-resizeimage-removebg-preview.png"
              alt="Invoice Banner"
              className="img-fluid"
            />
          </div>
          <div className="h4 mb-0">Invoice</div>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-6">
              <b>Invoice Date:</b> {new Date(Date.now()).toLocaleDateString()}
            </div>
            <div className="col-6 text-right">
              <b>Invoice No:</b> {`#${invoiceData?.invoice_number || 'N/A'}`}
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6 text-right">
              <b className="d-block">To:</b>
              <address>
                <strong>{invoiceData?.user?.name || 'N/A'}</strong>
                <br />
                {invoiceData?.shippingInfo?.address || 'N/A'}
                <br />
                {invoiceData?.shippingInfo?.city || 'N/A'}
                <br />
                <abbr title="Phone"></abbr> {invoiceData?.user?.phone || 'N/A'}
              </address>
            </div>
          </div>
          <div className="table-responsive mb-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Description</th>
                  <th className="text-center">Rate</th>
                  <th className="text-center">QTY</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData?.items?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product}</td>
                    <td>{item.description}</td>
                    <td className="text-center">${item.price.toFixed(2)}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="text-right">
                    <strong>Sub Total:</strong>
                  </td>
                  <td className="text-right">${subTotal}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="text-right">
                    <strong>Tax (10%):</strong>
                  </td>
                  <td className="text-right">${tax}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="text-right">
                    <strong>Total:</strong>
                  </td>
                  <td className="text-right">${total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="text-center mt-3">
            <div className="btn-group btn-group-sm">
              <button onClick={handlePrint} className="btn btn-outline-secondary">
                <i className="bi bi-printer"></i> Print
              </button>
              <button onClick={handleDownload} className="btn btn-outline-secondary">
                <i className="bi bi-download"></i> Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
