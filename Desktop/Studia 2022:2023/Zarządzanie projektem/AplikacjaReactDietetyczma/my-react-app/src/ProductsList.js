import React, { useState, useEffect } from "react";
import { addToFavorite } from "./api/userService";

const ProductList = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const appKey = "78a96695324f99d999b5a6e29c8fc79f";

  const fetchProducts = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=e2652bf4&app_key=${appKey}&ingr=${query}&nutrition-type=logging`
      );
      const data = await response.json();

      setProducts(data.hints.map((hint) => hint.food));
    } catch (error) {
      setErrorMessage("Nieoczekiwany błąd");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (query !== "") {
      fetchProducts();
    }
  }, [query]);

  const filteredProducts = products.filter((product) =>
    product.label.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults = filteredProducts.length;
  const totalPages = Math.ceil(totalResults / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddFavorite = async (product) => {
    try {
      const res = await addToFavorite(product);
      if (res.status === 201) {
        console.log("dodano prawidłowo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Wyszukiwarka produktów</h1>
      <form>
        <div className="containerwyszukiwarka">
          <label>
            <input
              className="wyszukiwarka"
              type="text"
              value={query}
              onChange={handleSearch}
            />
          </label>
        </div>
      </form>
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {!isLoading && !errorMessage && (
        <>
          <h2>Znaleziono ({totalResults}) produktów</h2>
          <ul>
            {paginatedProducts.map((product) => (
              <li key={product.id}>
                <div>
                  {product.label}{" "}
                  <strong>{Math.round(product.nutrients.ENERC_KCAL)}</strong>{" "}
                  kcal
                </div>

                <button onClick={() => handleAddFavorite(product)}>+</button>
              </li>
            ))}
          </ul>
          {totalResults > pageSize && (
            <div>
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Poprzednia
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  disabled={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Następna
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
