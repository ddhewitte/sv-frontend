import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Add() {

  const URL_API = import.meta.env.VITE_API_ENDPOINT;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Check submit method
    const action = e.nativeEvent.submitter.value;

    try {
      await axios.post(`${URL_API}/article`, {
        ...formData,
        status : action
      });
      navigate("/");
    } catch (err) {
      console.error("Failed to add new article:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6">Add New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          className="border p-2 rounded w-full"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

        <textarea
          name="content"
          className="border p-2 rounded w-full"
          value={formData.content}
          onChange={handleChange}
          rows="6"
          placeholder="Content"
          required
        />

        <input
          type="text"
          name="category"
          className="border p-2 rounded w-full"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />

        <button
          type="submit"
          value="draft"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
        >
          Save Draft
        </button>

        <button
          type="submit"
          value="publish"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
        >
          Save Publish
        </button>
      </form>
    </div>
  );
}
