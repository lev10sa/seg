import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostAdd() {
  // Fetches latest Post count for serie generation (Optional)

  const [selectedFile, setSelectedFile] = useState(null);
  const [postData, setPostData] = useState({
    title: "",
    slug: "",
    category: "",
    body: "",
    date: "",
    file: [],
  });

  // Setting up useNavigate
  const navigate = useNavigate();

  const handleChange = (Post) => {
    // For non-file inputs, set the value directly
    setPostData({
      ...postData,
      [Post.target.title]: Post.target.value,
    });
  };

  const handleFile = (Post) => {
    setSelectedFile(Post.target.files[0]);
    // Access the filename from the selected file
    const fileDir = "https://compasspubindonesia.com/media/api/posts/img/";
    const file = Post.target.files[0];
    const filename = fileDir + file.title;
    setPostData({
      ...postData,
      img: filename,
    });
  };

  const AddPost = async (e) => {
    e.prPostDefault();

    const slg = postData.title.toLocaleLowerCase().split(" ").join("-");

    const cleanedData = {
      ...postData,
      slug: slg,
    };

    const formData = new FormData();
    formData.append("img", selectedFile);

    try {
      // Add the Post into database with axios
      await axios.post(`https://seg-server.vercel.app/api/posts`, cleanedData);
      await axios.post(
        `https://compasspubindonesia.com/media/api/posts/index.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
          <form onSubmit={AddPost} className="form">
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
                value={postData.slug}
                onChange={handleChange}
                placeholder="Slug"
              />
            </div>
            <div className="field">
              <label className="label">Model</label>
              <select
                name="model"
                value={postData.model}
                onChange={handleChange}
              >
                <option value="">--- Select Model ---</option>
                <option value="Online">Online</option>
                <option value="Onsite">Onsite</option>
                <option value="Hybrid (Online & Onsite)">Hybrid</option>
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
            <div className="field">
              <label className="label">Speaker(s)</label>
              <input
                type="text"
                className="input"
                id="pic"
                name="pic"
                value={postData.pic}
                onChange={handleChange}
                placeholder="Speaker 1, Speaker 2, Speaker 3..."
              />
            </div>
            <div className="field">
              <label className="label">Price</label>
              <input
                type="number"
                className="input"
                id="price"
                name="price"
                value={postData.price}
                onChange={handleChange}
                placeholder="Post Price in Rupiah"
              />
            </div>
            <div className="field">
              <label className="label">Contact Email/Phone</label>
              <input
                type="text"
                className="input"
                id="contact"
                name="contact"
                value={postData.contact}
                onChange={handleChange}
                placeholder="Contact of Committee"
              />
            </div>
            <div className="field">
              <label className="label">Image</label>
              <input
                type="file"
                className="input"
                id="img"
                name="img"
                onChange={handleFile}
                placeholder="Post Image"
              />
            </div>
            <div className="field">
              <label className="label">Address</label>
              <textarea
                onInput={() => {
                  this.style.height = "auto";
                  this.style.height = this.scrollHeight + "px";
                }}
                type="text"
                className="input"
                id="address"
                name="address"
                value={postData.address}
                onChange={handleChange}
                placeholder="Post Address"
              ></textarea>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <textarea
                onInput={() => {
                  this.style.height = "auto";
                  this.style.height = this.scrollHeight + "px";
                }}
                type="text"
                className="input"
                id="desc"
                name="desc"
                value={postData.desc}
                onChange={handleChange}
                placeholder="Post Description"
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
