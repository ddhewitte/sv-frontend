import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Edit() {

  const URL_API = import.meta.env.VITE_API_ENDPOINT;
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "", category: "" });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${URL_API}/article/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching article:", err);
      } 
    };

    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Check submit method
    const action = e.nativeEvent.submitter.value;

    try {
      await axios.put(`${URL_API}/article/${id}`, {
        ...formData,
        status : action
      });
      alert("Artikel berhasil diupdate!");
      navigate("/");
    } catch (err) {
      console.error("Error updating article:", err);
    }
  };

  return (
    <div className="w-[800px] mx-auto p-6 bg-gray-100 rounded m-4 ">
      <h1 className="text-xl font-bold mb-4 text-gray-700">Edit Artikel</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <label className="text-left text-gray-700 font-bold">Title</label>
        <input
          type="text"
          name="title"
          className="border p-2 rounded"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

        <label className="text-left text-gray-700 font-bold">Content</label>
        <textarea
          className="border p-2 rounded"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="6"
          placeholder="Content"
          required
        />

        <label className="text-left text-gray-700 font-bold">Category</label>
        <input
          type="text"
          name="category"
          className="border p-2 rounded"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />

        <button
          type="submit"
          value="draft"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Draft
        </button>

        <button
          type="submit"
          value="publish"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Publish
        </button>
      </form>
    </div>
  );
}
