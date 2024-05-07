import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  /* Backend Driven Approach */
  const [totalPages, setTotalPages] = useState(0);

  // ========== Front End Driven ===============

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const fetchProducts = async () => {
  //   const res = await fetch("https://dummyjson.com/products?limit=100");
  //   const jsonProd = await res.json();
  //   console.log(jsonProd);
  //   if (jsonProd) setProducts(jsonProd.products);
  // };

  // const selectPageHandler = (selectedPage) => {
  //   if (
  //     selectedPage >= 1 &&
  //     selectedPage <= products.length / 10 &&
  //     selectedPage !== page
  //   ) {
  //     setPage(selectedPage);
  //   }
  // };

  // return (
  //   <div>
  //     {products?.length > 0 && (
  //       <div className="products">
  //         {products.slice(page * 10 - 10, page * 10)?.map((prod) => {
  //           return (
  //             <span className="products__single" key={prod.id}>
  //               <img src={prod?.thumbnail} alt={prod.title}></img>
  //               <span className="products__single_text">
  //                 {prod?.description}
  //               </span>
  //             </span>
  //           );
  //         })}
  //       </div>
  //     )}
  //     {products.length > 0 && (
  //       <div className="pagination">
  //         <span
  //           onClick={() => selectPageHandler(page - 1)}
  //           className={page > 1 ? "" : "pagination__disable"}
  //         >
  //           ◀
  //         </span>

  //         {[...Array(products.length / 10)].map((_, i) => {
  //           return (
  //             <span
  //               key={i}
  //               className={page === i + 1 ? "pagination__selected" : ""}
  //               onClick={() => selectPageHandler(i + 1)}
  //             >
  //               {i + 1}
  //             </span>
  //           );
  //         })}

  //         <span
  //           onClick={() => selectPageHandler(page + 1)}
  //           className={page < products.length / 10 ? "" : "pagination__disable"}
  //         >
  //           ▶
  //         </span>
  //       </div>
  //     )}
  //   </div>
  // );

  /* ========== Backend End Driven =============== 
  1.) In Api call we are only fetching 10 prod per page and skipping others.
  2.) This is more backend agnostic.
  */

  // Fetching Product everytime page changes
  useEffect(() => {
    fetchProducts();
  }, [page]);

  /* Funtion To Fetch Products */
  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const jsonProd = await res.json();
    console.log(jsonProd);

    if (jsonProd) {
      setProducts(jsonProd.products);
      setTotalPages(jsonProd.total / 10);
    }
  };

  /* Funtion To Set Page */
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      {products?.length > 0 && (
        // Displaying Product
        <div className="products">
          {products?.map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod?.thumbnail} alt={prod.title}></img>
                <span className="products__single_text">
                  {prod?.description}
                </span>
              </span>
            );
          })}
        </div>
      )}
      {/* Displaying Pagination Logic */}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀
          </span>

          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < totalPages ? "" : "pagination__disable"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}
