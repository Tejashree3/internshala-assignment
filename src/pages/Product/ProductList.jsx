import React, { useState, useEffect } from "react";
import products from "../../data/Product";
import CommonTable from "../../commmon/CommonTable";
import Loader from "../../commmon/Loader"; 
import { HiOutlineDotsVertical } from "react-icons/hi"; // three-dot icon

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showMenu, setShowMenu] = useState(false); // toggle menu
  const [status, setStatus] = useState(""); // dynamic status for selected product

  // Initial loader for 500ms
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // 500ms for demo
    return () => clearTimeout(timer);
  }, []);

  // Debounce search
  useEffect(() => {
    setLoading(true); 
    const timer = setTimeout(() => {
      const filtered = products.filter((p) =>
        p.product.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const columns = [
    {
      accessorKey: "product",
      header: "Products",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img
            src={row.original.img}
            alt={row.original.product}
            className="w-8 h-8 rounded-full"
          />
          {row.original.product}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`font-semibold ${
            row.original.status === "Inactive" ? "text-red-600" : "text-green-600"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
  ];

  const handleMenuClick = (action) => {
    if (action === "inactive") {
      setStatus("Inactive");
    }
    // you can add edit functionality here
    setShowMenu(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Loader */}
      {loading && <Loader />}

      {/* Product Details — only show after row click */}
      {!loading && selectedProduct && (
       <div className="p-5 border rounded-xl bg-white shadow">
  {/* Card title */}
  <div className="flex justify-between items-center mb-1">
  <h2 className="text-lg font-semibold mb-4">Product Details</h2>
  <div className="relative">
      <button
        className="p-2 rounded-full hover:bg-gray-100"
        onClick={() => setShowMenu(!showMenu)}
      >
        <HiOutlineDotsVertical size={20} />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-20">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => alert("Edit clicked")}
          >
            Edit
          </button>
          <button
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            onClick={() => handleMenuClick("inactive")}
          >
            Inactive
          </button>
        </div>
      )}
    </div>

</div>
  {/* Top row: Product + Status on left, Three-dot menu on right */}
  <div className="flex justify-between items-start">
    {/* Left side: Product and Status */}
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-6">
        {/* Product */}
        <div className="flex items-center gap-3">
          <h5 className="text-sm font-semibold">Product:</h5>
          <img
            src={selectedProduct.img}
            alt={selectedProduct.product}
            className="w-5 h-5 rounded-full"
          />
          <p className="text-sm">{selectedProduct.product}</p>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <h5 className="text-sm font-semibold">Status:</h5>
          <span
            className={`font-semibold ${
              status === "Inactive"
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {status || selectedProduct.status}
          </span>
        </div>
      </div>

      {/* Description row below */}
      <div className="flex items-center gap-2 text-gray-900 mt-2">
        <h5 className="text-sm font-semibold">Description:</h5>
        <p className="text-sm">{selectedProduct.description}</p>
      </div>
    </div>

    {/* Three-dot menu */}
    
  </div>
</div>

      )}

      {/* Table */}
      {!loading && (
        <CommonTable
          columns={columns}
          data={filteredProducts}
          onRowClick={(row) => {
            setSelectedProduct(row);
            setStatus(row.status); // initialize status
          }}
        />
      )}
    </div>
  );
};

export default ProductList;
