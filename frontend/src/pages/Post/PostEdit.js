import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function PostEdit() {
  // Fetches latest Post count for serie generation (Optional)

  // get id from parameter
  const { id } = useParams();

  const [selectedBanner, setSelectedBanner] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [postData, setPostData] = useState({
    title: "",
    slug: "",
    category: "",
    body: "",
    date: "",
    banner: "",
    fileList: [],
  });

  // Setting up useNavigate
  const navigate = useNavigate();

  // create Event deleter function
  const delPost = async () => {
    if (window.confirm("Delete this?") === true) {
      try {
        await axios.delete(`https://seg-server.vercel.app/api/posts/id/${id}`); // modify URL based on backend
        // navigate to main page
        navigate(`/posts`);
      } catch (error) {
        console.log(error.message); // display error message
      }
    } else {
    }
  };

  const handleChange = (e) => {
    // For non-file inputs, set the value directly
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const formattedDate = `-${day}-${month}-${year}-${hours}-${minutes}`;

    const cleanData = {
      ...postData,
      [e.target.name]: e.target.value,
      slug:
        postData.title.toLocaleLowerCase().split(" ").join("-") + formattedDate,
    };

    setPostData(cleanData);
  };

  const handleBanner = (event) => {
    const fileDir = "https://compasspubindonesia.com/media/api/posts/img/";
    const file = event.target.files[0];
    const filename = fileDir + file.name;
    setSelectedBanner(file);
    setPostData({
      ...postData,
      banner: filename,
    });
  };

  const handleFile = (event) => {
    const fileDir = "https://compasspubindonesia.com/media/api/posts/img/";
    const files = Array.from(event.target.files);
    const filenames = files.map((file) => ({
      url: fileDir + file.name,
    }));
    setSelectedFile(files);
    setPostData({
      ...postData,
      fileList: filenames,
    });
  };

  const EditPost = async (e) => {
    document.getElementById("submit").innerText("Updating...");
    document.getElementById("submit").type = "reset";

    e.preventDefault();

    const cleanedData = {
      ...postData,
    };

    const bannerData = new FormData();
    bannerData.append("banner", selectedBanner);

    const fileData = new FormData();
    selectedFile.forEach((file, index) => {
      fileData.append(`fileList[]`, file); // Append each file with `fileList[]` key
    });

    try {
      const response1 = await axios.patch(
        `https://seg-server.vercel.app/api/posts/id/${id}`,
        cleanedData
      );
      console.log("Response from main API:", response1.data);

      const response2 = await axios.post(
        `https://compasspubindonesia.com/media/api/posts/banner.php`,
        bannerData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response from banner upload:", response2.data);

      const response3 = await axios.post(
        `https://compasspubindonesia.com/media/api/posts/files.php`,
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response from file upload:", response3.data);

      navigate(`/posts`);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // setting up useEffect to do tasks in real-time
  useEffect(() => {
    // create Event loader callback function
    const getPostById = async () => {
      try {
        // get all the datas from database with axios
        const res = await axios.get(
          `https://seg-server.vercel.app/api/posts/id/${id}`
        );

        // input all the datas into useState
        setPostData(res.data);
      } catch (error) {
        console.log(error); // display error message
      }
    };

    getPostById();
  }, [id]);

  return (
    <>
      <div className="section">
        <div className="section headline">
          <h4>Edit Post</h4>
          <button onClick={() => navigate(`/posts`)} className="btn">
            See All Posts
          </button>
        </div>
        <div className="section">
          <form onSubmit={EditPost} className="form posti">
            <div className="field">
              <label className="label">Title</label>
              <input
                type="text"
                className="input"
                id="title"
                name="title"
                value={postData.title}
                onChange={handleChange}
                placeholder="Title"
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
            <div className="field">
              <label className="label">Banner (Cover Image for the Post)</label>
              <input type="file" className="input" onChange={handleBanner} />
            </div>
            <div className="field">
              <label className="label">Featured Images (Max. 10)</label>
              <input
                type="file"
                className="input"
                multiple
                onChange={handleFile}
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
                <button type="button" onClick={delPost} className="btn">
                  Delete
                </button>
                <button type="submit" className="btn" id="submit">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostEdit;
