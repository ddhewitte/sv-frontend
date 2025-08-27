import { useEffect, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const URL_API = import.meta.env.VITE_API_ENDPOINT;
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${URL_API}/article`);
        setArticles(res.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
      }
    };

    fetchArticles();
  }, []);

  //Delete
  const onDelete = async (id) => {
    if (!confirm("Yakin hapus artikel ini?")) return;

    try {
      await axios.delete(`${URL_API}/article/${id}`);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  //render table
  const renderTable = (status) => {
    const filtered = articles.filter(
      (a) => a.status.toLowerCase() === status.toLowerCase()
    );
    if (filtered.length === 0) return <p>No data available</p>;

    return (
      <table className="w-full border border-gray-300 text-left text-sm">
        <thead className="bg-gray-300">
          <tr>
            <th className="p-2 border border-gray-300">Title</th>
            <th className="p-2 border border-gray-300">Category</th>
            <th className="p-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((article) => (
            <tr key={article.id} className="odd:bg-white even:bg-gray-100">
              <td className="p-2 border border-gray-300">{article.title}</td>
              <td className="p-2 border border-gray-300">
                {article.category}
              </td>
              <td className="p-2 border border-gray-300 flex gap-2">
                <button 
                    className="p-1 hover:text-green-600"
                    onClick={() => navigate(`/edit/${article.id}`)}
                >
                  <Edit2 size={18} />
                </button>
                <button 
                    className="p-1 hover:text-red-600"
                    onClick={() => onDelete(article.id)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (

    <section className="flex flex-row flex-wrap w-[800px] m-8 text-black">
    
      <input
        id="tab-one"
        type="radio"
        name="tabs"
        className="peer/tab-one opacity-0 absolute"
        defaultChecked
      />
      <label
        htmlFor="tab-one"
        className="bg-slate-300 hover:bg-slate-200 peer-checked/tab-one:bg-gray-200 cursor-default p-4 rounded-t-lg block"
      >
        Publish
      </label>

      <input
        id="tab-two"
        type="radio"
        name="tabs"
        className="peer/tab-two opacity-0 absolute"
      />
      <label
        htmlFor="tab-two"
        className="bg-slate-300 hover:bg-slate-200 peer-checked/tab-two:bg-gray-200 cursor-default p-4 rounded-t-lg block"
      >
        Draft
      </label>

      <input
        id="tab-three"
        type="radio"
        name="tabs"
        className="peer/tab-three opacity-0 absolute"
      />
      <label
        htmlFor="tab-three"
        className="bg-slate-300 hover:bg-slate-200 peer-checked/tab-three:bg-gray-200 cursor-default p-4 rounded-t-lg block"
      >
        Thrash
      </label>

      <div className="basis-full h-0"></div>

      <div className="bg-gray-200 hidden peer-checked/tab-one:block p-4 w-full">
        {renderTable("publish")}
      </div>
      <div className="bg-gray-200 hidden peer-checked/tab-two:block p-4 w-full">
        {renderTable("draft")}
      </div>
      <div className="bg-gray-200 hidden peer-checked/tab-three:block p-4 w-full">
        {renderTable("trash")}
      </div>
    </section>
  );
}
