import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostAdd() {
  // Fetches latest Event count for serie generation (Optional)

  const [selectedFile, setSelectedFile] = useState(null);
  const [postData, setPostData] = useState({
    title: "",
    slug: "",
    category: "",
    body: "",
    date: "",
    file: [],
  });

  function resizeTextarea(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  // Setting up useNavigate
  const navigate = useNavigate();

  const handleChange = (event) => {
    // For non-file inputs, set the value directly
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    // Access the filename from the selected file
    const fileDir = "https://compasspubindonesia.com/media/api/events/img/";
    const file = event.target.files[0];
    const filename = fileDir + file.name;
    setPostData({
      ...postData,
      img: filename,
    });
  };

  const AddEvent = async (e) => {
    e.preventDefault();

    const slg = postData.name.toLocaleLowerCase().split(" ").join("-");

    const cleanedData = {
      ...postData,
      slug: slg,
    };

    const formData = new FormData();
    formData.append("img", selectedFile);

    try {
      // Add the Event into database with axios
      await axios.post(`https://seg-server.vercel.app/api/events`, cleanedData);
      await axios.post(
        `https://compasspubindonesia.com/media/api/events/index.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Navigate to main page
      navigate(`/events`);
    } catch (error) {
      console.log(error.message); // Display error messages
    }
  };

  return (
    <>
      <div className="section">
        <div className="section headline">
          <h4>Add Event</h4>
          <button onClick={() => navigate(`/events`)} className="btn">
            See All Events
          </button>
        </div>
        <div className="section">
          <form onSubmit={AddEvent} className="form">
            <div className="field">
              <label className="label">Name</label>
              <input
                type="text"
                autoComplete="on"
                className="input"
                id="name"
                name="name"
                value={postData.name}
                onChange={handleChange}
                placeholder="Event Name"
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
              <label className="label">Start</label>
              <input
                type="datetime-local"
                className="input"
                id="start"
                name="start"
                value={postData.start}
                onChange={handleChange}
                placeholder="Start"
              />
            </div>
            <div className="field">
              <label className="label">End</label>
              <input
                type="datetime-local"
                className="input"
                id="end"
                name="end"
                value={postData.end}
                onChange={handleChange}
                placeholder="End"
              />
            </div>
            <div className="field">
              <label className="label">Speaker(s)</label>
              <input
                type="text"
                autoComplete="on"
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
                autoComplete="on"
                className="input"
                id="price"
                name="price"
                value={postData.price}
                onChange={handleChange}
                placeholder="Event Price in Rupiah"
              />
            </div>
            <div className="field">
              <label className="label">Contact Email/Phone</label>
              <input
                type="text"
                autoComplete="on"
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
                autoComplete="on"
                className="input"
                id="img"
                name="img"
                onChange={handleFile}
                placeholder="Event Image"
              />
            </div>
            <div className="field">
              <label className="label">Address</label>
              <textarea
                type="text"
                autoComplete="on"
                className="input"
                id="address"
                name="address"
                value={postData.address}
                onChange={handleChange}
                placeholder="Event Address"
                onInput={resizeTextarea(this)}
              ></textarea>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <textarea
                type="text"
                autoComplete="on"
                className="input"
                id="desc"
                name="desc"
                value={postData.desc}
                onChange={handleChange}
                placeholder="Event Description"
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
