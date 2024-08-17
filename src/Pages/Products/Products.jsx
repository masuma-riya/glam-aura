import Rating from "react-rating";
import Loader from "../../Home/Loader/Loader";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Products = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [search, setSearch] = useState("");
  const [submitSearch, setSubmitSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const axiosSecure = useAxios();
  // const { data, isLoading } = useQuery({
  //   queryKey: ["allPro"],
  //   queryFn: async () => await axiosSecure.get(`/allProducts`),
  // });

  const { data, isLoading } = useQuery({
    queryKey: [
      "allPro",
      selectedBrand,
      selectedCategory,
      sortBy,
      selectedPriceRange,
      submitSearch,
    ],
    queryFn: async () => {
      const [priceMin, priceMax] = selectedPriceRange.split("-");
      return await axiosSecure.get(`/allProducts`, {
        params: {
          brand: selectedBrand,
          category: selectedCategory,
          sortBy,
          priceMin,
          priceMax,
          search: submitSearch,
        },
      });
    },
    enabled: submitSearch !== "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitSearch(search); // Set submitSearch to trigger data fetching
  };

  const handleSearchReset = () => {
    setSearch("");
    setSubmitSearch(""); // Clear the search and reset submitSearch
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader></Loader>
      </div>
    );
  }

  const allProducts = data?.data || [];
  const totalProducts = allProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = allProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="mb-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Update search state on change
            className="p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-blue-500 text-white rounded"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleSearchReset}
            className="ml-2 p-2 bg-gray-500 text-white rounded"
          >
            Reset Search
          </button>
        </form>
        {/* Brand Filter */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          <option value="Avene">Avene</option>
          <option value="Dior">Dior</option>
          <option value="Chanel">Chanel</option>
          {/* Add other brands */}
        </select>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Skin Care">Skin Care</option>
          <option value="Makeup">Makeup</option>
          {/* Add other categories */}
        </select>
        {/* Price Range Filter */}
        <select
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
        >
          <option value="">All Prices</option>
          <option value="0-20">$0 - $20</option>
          <option value="21-30">$21 - $30</option>
          <option value="31-40">$31 - $40</option>
          <option value="41-50">$41 - $50</option>
          {/* Add other ranges */}
        </select>

        {/* Sort Options */}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By Price</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By Date</option>

          <option value="newestFirst">Date Added: Newest First</option>
        </select>
      </div>

      <div className="mt-20 grid md:grid-cols-3 w-10/12 gap-12 md:w-11/12 lg:w-9/12 h-auto m-auto">
        {paginatedProducts?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 ring-opacity-40 max-w-sm"
          >
            <div className="relative">
              <img
                className="w-full h-52"
                src={product?.productImage}
                alt="Product Image"
              />
              <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium uppercase">
                {product?.status}
              </div>
            </div>
            <div className="flex justify-between mt-4 mx-auto w-11/12 items-baseline">
              <span className="inline-block bg-red-100 text-gray-700 px-5 lg:py-1 text-base rounded-full  font-bold tracking-wide">
                {product?.category}
              </span>
              <span className="font-bold lg:text-[22px] text-xl">
                ${product?.price}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium md:h-14 lg:h-4 mb-3 lg:mb-6 md:mb-4">
                {product?.productName}
              </h3>
              <p className="text-gray-600 lg:h-16 md:h-20 text-sm mb-2 md:mb-4">
                {product?.description}
              </p>

              <div className="flex items-center mb-4 text-3xl">
                <Rating
                  initialRating={product?.ratings}
                  readonly
                  emptySymbol={<span className="text-gray-300">&#9733;</span>}
                  fullSymbol={<span className="text-yellow-400">&#9733;</span>}
                />
                <span className="ml-2 text-sm text-gray-600">
                  ({product?.ratings})
                </span>
              </div>

              <div className="px-6 py-3  items-center justify-between bg-gray-100">
                <span
                  href=""
                  className="py-1 text-xs font-regular text-gray-900 mr-1 flex justify-center flex-row items-center"
                >
                  <svg
                    height="13px"
                    width="13px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                    style={{ enableBackground: "new 0 0 512 512" }}
                    xmlSpace="preserve"
                  >
                    <g>
                      <g>
                        <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                      </g>
                    </g>
                  </svg>
                  <span className="ml-2 text-sm font-semibold">
                    {product?.createdAt}
                  </span>
                </span>
                <span
                  href=""
                  className="py-1 text-xs font-regular text-gray-900 mr-1 flex justify-center flex-row items-center"
                >
                  <svg
                    className="h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                  <span className="ml-1 text-black font-semibold text-sm">
                    Brand : {product?.brand}
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Products;
