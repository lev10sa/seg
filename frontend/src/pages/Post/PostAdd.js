import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostAdd() {
  // Fetches latest Post count for serie generation (Optional)

  const [postData, setPostData] = useState({
    title: "",
    slug: "",
    category: "",
    body: "",
    date: "",
  });

  // Setting up useNavigate
  const navigate = useNavigate();

  const handleChange = (e) => {
    // For non-file inputs, set the value directly

    const cleanData = {
      ...postData,
      [e.target.name]: e.target.value,
    };

    setPostData(cleanData);
  };

  const AddPost = async (e) => {
    e.preventDefault();

    const cleanedData = {
      ...postData,
    };

    try {
      // Add the Post into database with axios
      await axios.post(`https://seg-server.vercel.app/api/posts`, cleanedData);
      // Navigate to main page
      navigate(`/posts`);
    } catch (error) {
      console.log(error.message); // Display error messages
    }
  };

  return (
    <>
      <div className="section">
        <div className="section headline">
          <h4>Add Post</h4>
          <button onClick={() => navigate(`/posts`)} className="btn">
            See All Posts
          </button>
        </div>
        <div className="section">
          <form onSubmit={AddPost} className="form posti">
            <div className="field">
              <label className="label">Title</label>
              <input
                type="text"
                className="input"
                id="title"
                name="title"
                value={postData.title}
                onChange={handleChange}
                placeholder="Post Title"
              />
            </div>
            <div className="field">
              <label className="label">Slug</label>
              <input
                type="text"
                className="input"
                id="slug"
                name="slug"
                value={postData.title.toLocaleLowerCase().split(" ").join("-")}
                onChange={handleChange}
                placeholder="Slug"
              />
            </div>
            <div className="field">
              <label className="label">Category</label>
              <select
                name="category"
                value={postData.category}
                onChange={handleChange}
              >
                <option value="">--- Select Category ---</option>
                <option value="Education">Education</option>
                <option value="Book Review">Book Review</option>
                <option value="Event">Event</option>
              </select>
            </div>
            <div className="field">
              <label className="label">Date</label>
              <input
                type="datetime-local"
                className="input"
                id="date"
                name="date"
                value={postData.date}
                onChange={handleChange}
                placeholder="Date"
              />
            </div>
            <div className="field" style={{ width: "100%" }}>
              <label className="label">Caption</label>
              <textarea
                type="text"
                className="input"
                id="body"
                name="body"
                value={postData.body}
                onChange={handleChange}
                placeholder="Write captions here..."
                style={{ height: "400px" }}
              ></textarea>
            </div>
            <div className="section">
              <div className="controls">
                <button type="reset" className="btn">
                  Reset
                </button>
                <button type="submit" className="btn">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostAdd;
