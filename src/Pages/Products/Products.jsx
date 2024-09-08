import Rating from "react-rating";
import Loader from "../../Home/Loader/Loader";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";

const Products = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortByT, setSortByT] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const axiosSecure = useAxios();

  const searchRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: [
      "allPro",
      selectedBrand,
      selectedCategory,
      sortBy,
      sortByT,
      selectedPriceRange,
      search,
      currentPage,
    ],
    queryFn: async () => {
      const [priceMin, priceMax] = selectedPriceRange.split("-");
      const response = await axiosSecure.get("/allProducts", {
        params: {
          brand: selectedBrand,
          category: selectedCategory,
          sortBy,
          sortByT,
          priceMin,
          priceMax,
          search,
          page: currentPage,
          limit: productsPerPage,
        },
      });
      return response.data;
    },
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedBrand,
    selectedCategory,
    selectedPriceRange,
    sortBy,
    sortByT,
    search,
  ]);

  const allProducts = data?.data || [];

  const totalProducts = data?.total || 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    if (searchRef.current) searchRef.current.value = ""; // Clear the input value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchRef.current) {
      setSearch(searchRef.current.value); // Set search state from ref value
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-28">
        <Loader></Loader>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="mt-7 flex lg:w-11/12 w-full mx-auto flex-col md:flex-row justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Brand Filter */}
            <select
              className={`p-2 text-base border border-gray-300 rounded-md ${
                selectedBrand
                  ? "bg-neutral-300 text-black font-bold"
                  : "bg-white"
              } hover:border-blue-500 focus:outline-none focus:ring-blue-500`}
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              <option value="Elegant">Elegant</option>
              <option value="U Beauty">U Beauty</option>
              <option value="MAC">MAC</option>
              <option value="Dior">Dior</option>
              <option value="Huda Beauty">Huda Beauty</option>
              <option value="Simple">Simple</option>
            </select>

            {/* Price Range Filter */}
            <select
              className={`p-2 text-base border border-gray-300 rounded-md ${
                selectedPriceRange
                  ? "bg-neutral-300 text-black font-bold"
                  : "bg-white"
              } hover:border-blue-500 focus:outline-none focus:ring-blue-500`}
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            >
              <option value="">Price Ranges</option>
              <option value="0-20">$0 - $20</option>
              <option value="21-30">$21 - $30</option>
              <option value="31-40">$31 - $40</option>
              <option value="41-50">$41 - $50</option>
            </select>

            {/* Category Filter */}
            <select
              className={`p-2 text-base border border-gray-300 rounded-md ${
                selectedCategory
                  ? "bg-neutral-300 text-black font-bold"
                  : "bg-white"
              } hover:border-blue-500 focus:outline-none focus:ring-blue-500`}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Categories</option>
              <option value="Makeup">Makeup</option>
              <option value="Skin Care">Skin Care</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
            {/* Sort Options */}
            <select
              className={`p-2 text-base border border-gray-300 rounded-md ${
                sortByT ? "bg-neutral-300 text-black font-bold" : "bg-white"
              } hover:border-blue-500 focus:outline-none focus:ring-blue-500`}
              value={sortByT}
              onChange={(e) => setSortByT(e.target.value)}
            >
              <option value="">Sort By Price</option>
              <option value="priceLowToHigh">Low to High</option>
              <option value="priceHighToLow">High to Low</option>
            </select>

            <select
              className={`p-2 text-base border border-gray-300 rounded-md ${
                sortBy ? "bg-neutral-300 text-black font-bold" : "bg-white"
              } hover:border-blue-500 focus:outline-none focus:ring-blue-500`}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By Date</option>
              <option value="newestFirst">Newest First</option>
            </select>
          </div>
        </div>
        {/* Search */}
        <div className="mt-6 mx-auto max-w-2xl sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            <label
              className="mx-auto relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-200"
              htmlFor="search"
            >
              <input
                id="search"
                placeholder="Search a product"
                name="search"
                className="px-3 py-[2px] w-full text-xl rounded-md flex-1 outline-none bg-white font-semibold placeholder:font-normal"
                style={{ fontStyle: "italic" }}
                defaultValue={search}
                ref={searchRef}
              />

              <button
                type="submit"
                className="mr-3 px-4 py-1 text-lg text-white font-normal rounded-md bg-blue-500"
              >
                Search
              </button>

              <button
                type="button"
                onClick={handleClearSearch}
                className="p-2 mr-2 text-gray-600 rounded-md flex items-center justify-center"
              >
                <ImCross className="text-base" />
              </button>
            </label>
          </form>
        </div>
      </div>

      {/* Products mapping */}
      <div className="mt-[70px] grid md:grid-cols-3 w-10/12 gap-12 md:w-11/12 lg:w-9/12 h-auto m-auto">
        {allProducts.length === 0 ? (
          <div className="col-span-full text-center py-4">
            <p className="text-lg font-semibold text-gray-700">
              No Products Found
            </p>
          </div>
        ) : (
          allProducts?.map((product) => (
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
                    fullSymbol={
                      <span className="text-yellow-400">&#9733;</span>
                    }
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
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="w-11/12 lg:w-auto mx-auto lg:flex items-center justify-center grid md:grid-cols-8 grid-cols-4 lg:gap-0 gap-3 mt-6 mb-6 space-x-3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center md:px-4 md:py-2 py-1 text-sm md:text-base font-medium rounded-lg transition duration-150 ease-in-out ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed border-gray-400"
              : "text-gray-800 bg-white border border-gray-300"
          }`}
        >
          <svg
            className="w-4 h-4 mr-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Previous
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages).keys()].map((page) => {
          const pageNumber = page + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`md:px-4 md:py-2 py-1 text-sm md:text-base font-medium border rounded-lg transition duration-150 ease-in-out ${
                currentPage === pageNumber
                  ? "bg-blue-300 text-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200 hover:text-gray-800"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center md:px-4 md:py-2 py-1 text-sm md:text-base font-medium rounded-lg transition duration-150 ease-in-out ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed border-gray-400"
              : "text-gray-800 bg-white border border-gray-300"
          }`}
        >
          Next
          <svg
            className="w-4 h-4 ml-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Products;
