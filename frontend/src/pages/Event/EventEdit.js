// import dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EventEdit() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [eventData, setEventData] = useState({
    price: "",
    slug: "",
    model: "",
    title: "",
    desc: "",
    pic: "",
    img: "",
    address: "",
    start: "",
    end: "",
    contact: "",
    group: "",
  });

  // get id from parameter
  const { id } = useParams();

  // setting up useNavigate
  const navigate = useNavigate();

  // create Event deleter function
  const delEvent = async () => {
    if (window.confirm("Delete this?") === true) {
      try {
        await axios.delete(`https://seg-server.vercel.app/api/events/id/${id}`); // modify URL based on backend
        // navigate to main page
        navigate(`/events`);
      } catch (error) {
        console.log(error.message); // display error message
      }
    } else {
    }
  };

  // create Event update function
  const updEvent = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const slg = eventData.name.toLocaleLowerCase().split(" ").join("-");
    const cleanedData = {
      ...eventData,
      slug: slg,
    };

    const formData = new FormData();
    formData.append("img", selectedFile);
    try {
      // Add the Event into database with axios
      await axios.patch(
        `https://seg-server.vercel.app/api/events/id/${id}`,
        cleanedData
      );
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
      console.log(error); // display error message
    }
  };

  // setting up useEffect to do tasks in real-time
  useEffect(() => {
    // create Event loader callback function
    const getEventById = async () => {
      try {
        // get all the datas from database with axios
        const res = await axios.get(
          `https://seg-server.vercel.app/api/events/id/${id}`
        );

        // input all the datas into useState
        setEventData(res.data);
      } catch (error) {
        console.log(error); // display error message
      }
    };

    getEventById();
  }, [id]);

  const handleChange = (event) => {
    if (event.target.value !== "") {
      setEventData({
        ...eventData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleFile = (event) => {
    if (event.target.files[0] !== null) {
      setSelectedFile(event.target.files[0]);
      // Access the filename from the selected file
      const fileDir = "https://compasspubindonesia.com/media/api/events/img/";
      const file = event.target.files[0];
      const filename = fileDir + file.name;
      setEventData({
        ...eventData,
        img: filename,
      });
    }
  };

  return (
    <>
      <div className="section">
        <div className="section headline">
          <h4>Edit Event</h4>
          <button onClick={() => navigate(`/events`)} className="btn">
            See All Events
          </button>
        </div>
        <div className="section">
          <form onSubmit={updEvent} className="form">
            <div className="field">
              <label className="label">Name</label>
              <input
                type="text"
                autoComplete="on"
                className="input"
                id="title"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                placeholder="Event Name"
              />
            </div>
            <div className="field">
              <label className="label">Model</label>
              <select
                name="model"
                value={eventData.model}
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
                value={eventData.start}
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
                value={eventData.end}
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
                value={eventData.pic}
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
                value={eventData.price}
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
                value={eventData.contact}
                onChange={handleChange}
                placeholder="Contact of Committee"
              />
            </div>
            <div className="field">
              <label className="label">WhatsApp Group</label>
              <input
                type="text"
                autoComplete="on"
                className="input"
                id="group"
                name="group"
                value={eventData.group}
                onChange={handleChange}
                placeholder="WhatsApp Group Link"
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
                value={eventData.address}
                onChange={handleChange}
                placeholder="Event Address"
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
                value={eventData.desc}
                onChange={handleChange}
                placeholder="Event Description"
              ></textarea>
            </div>

            <div className="section">
              <div className="controls">
                <button type="button" onClick={delEvent} className="btn">
                  Delete
                </button>
                <button type="submit" className="btn">
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

// export the main function
export default EventEdit;
