import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EventPartyEdit() {
  // Fetches latest Event count for serie generation (Optional)
  function autoResize() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  document
    .getElementsByTagName("textarea")
    .addEventListener("input", autoResize, false);

  const { id } = useParams();

  const [eventData, setEventData] = useState({
    name: "",
    company: "",
    job: "",
    email: "",
    phone: "",
    address: "",
  });

  // Setting up useNavigate
  const navigate = useNavigate();

  const handleChange = (event) => {
    // For non-file inputs, set the value directly
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const AddEvent = async (e) => {
    e.preventDefault();

    const cleanedData = {
      ...eventData,
    };

    try {
      // Add the Event into database with axios
      await axios.patch(
        `https://seg-server.vercel.app/api/parties/id/${id}`,
        cleanedData
      );

      // Navigate to main page
      navigate(`/events`);
    } catch (error) {
      console.log(error.message); // Display error messages
    }
  };

  // create Event deleter function
  const delEvent = async () => {
    if (window.confirm("Delete this?") === true) {
      try {
        await axios.delete(
          `https://seg-server.vercel.app/api/parties/id/${id}`
        ); // modify URL based on backend
        // navigate to main page
        navigate(`/events`);
      } catch (error) {
        console.log(error.message); // display error message
      }
    } else {
    }
  };

  useEffect(() => {
    // create party loader callback function
    const getEvent = async () => {
      try {
        const url = `https://seg-server.vercel.app/api/parties/id/${id}`; // modify URL based on backend
        const datas = await axios.get(url); // get datas from URL with axios

        setEventData(datas.data);
      } catch (error) {
        console.log(error.message); // display error message
      }
    };

    getEvent(); // dependency array with only `search`
  }, [id]); // dependency array with only `getParty`

  return (
    <>
      <div className="section">
        <div className="section headline">
          <h4>Add Participant</h4>
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
                value={eventData.name}
                onChange={handleChange}
                placeholder="Event Name"
                required
              />
            </div>
            <div className="field">
              <label className="label">Occupation</label>
              <select
                id="job"
                name="job"
                value={eventData.job}
                onChange={handleChange}
              >
                <option value="">--- Select Occupation ---</option>
                <option value="Headmaster">Headmaster</option>
                <option value="Teacher">Teacher</option>
                <option value="Tutor">Tutor</option>
                <option value="Parent">Parent</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="field">
              <label className="label">Company/Agency</label>
              <input
                type="text"
                autoComplete="on"
                className="input"
                id="company"
                name="company"
                value={eventData.company}
                onChange={handleChange}
                placeholder="Company/Agency"
              />
            </div>
            <div className="field">
              <label className="label">Email</label>
              <input
                type="text"
                autoComplete="on"
                className="input"
                id="email"
                name="email"
                value={eventData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="field">
              <label className="label">Phone</label>
              <input
                type="text"
                autoComplete="on"
                className="input"
                id="phone"
                name="phone"
                value={eventData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
              />
            </div>
            <div className="field">
              <label className="label">City</label>
              <textarea
                type="text"
                autoComplete="on"
                className="input"
                id="address"
                name="address"
                value={eventData.address}
                onChange={handleChange}
                placeholder="City"
                required
              ></textarea>
            </div>
            <div className="field">
              <label className="label">Attendance | Kehadiran</label>
              <select
                id="room"
                name="room"
                value={eventData.room}
                onChange={handleChange}
              >
                <option value="">
                  --- Select Attendance | Pilih Kehadiran ---
                </option>
                <option value="Online">Online | Daring</option>
                <option value="Onsite">Onsite | Luring</option>
              </select>
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

export default EventPartyEdit;
