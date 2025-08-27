import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Blog(){
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 3;
  const URL_API = import.meta.env.VITE_API_ENDPOINT;

  useEffect(() => {
    const offset = (page - 1) * limit;
    axios
      .get(`${URL_API}/article/${limit}/${offset}`)
      .then((res) => {
        const filtered = res.data.filter((item) => item.status === "publish");
        setArticles(filtered);
      })
      .catch((err) => {
        console.error("Error get articles:", err);
      });
  }, [page]);

  //pagination calc set
  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 bg-white m-4 text-gray-700 text-left w-[800px]">
      <h1 className="text-xl font-bold mb-4">Blog Pages</h1>

      {articles.length === 0 ? (
        <p>No article.</p>
      ) : (
        <ul className="space-y-3">
          {articles.map((article) => (
            <li key={article.id} className="border p-3 rounded shadow-sm">
              <h2 className="font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-600">{article.content}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={nextPage}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};
