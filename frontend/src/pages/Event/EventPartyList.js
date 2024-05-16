// import dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EventPartyList() {
  // create the useState
  const [parties, setParty] = useState([]); // state for Invoice list
  const [searchs, setSearch] = useState(""); // state for search
  const [isLoading, setIsLoading] = useState(true); // state for loading
  const [isEmpty, setIsEmpty] = useState(false);

  const { id } = useParams();

  const str = searchs;

  // Split the string into words
  const words = str.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join the capitalized words back into a string
  const search = capitalizedWords.join(" ");

  // setting up useNavigate
  const navigate = useNavigate();

  // setting up useEffect to do tasks in real-time

  useEffect(() => {
    // create party loader callback function
    const getParty = async () => {
      try {
        if (!search) {
          const url = `https://seg-server.vercel.app/api/parties/event/${id}`; // modify URL based on backend
          const datas = await axios.get(url); // get datas from URL with axios
          datas.data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
          setParty(datas.data);
          setIsLoading(false);
        } else {
          const url = `https://seg-server.vercel.app/api/parties/key/${search}`; // modify URL based on backend
          const datas = await axios.get(url); // get datas from URL with axios
          datas.data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
          setParty(datas.data);
          setIsLoading(false);
        }
      } catch (error) {
        window.alert(error.message); // display error message
      }
    }; // dependency array with only `search`

    getParty();
  }, [id, search]); // dependency array with only `getParty`

  // render the display
  return (
    <>
      <div className="section headline">
        <h4>Party List</h4>
        <button onClick={() => navigate(`/event-view/${id}`)} className="btn">
          See Event
        </button>
        <div className="section">
          <input
            type="text"
            className="input"
            value={searchs} // set value from search state
            onInput={(e) => setSearch(e.target.value)} // update search state on change
            placeholder="Search Parties..."
          />
        </div>
        <p>Ditemukan: {parties.length} data</p>
      </div>
      {isLoading ? (
        <div className="section">Loading party Database...</div> // display status when loading
      ) : isEmpty ? (
        <div className="section">No data...</div> // display status when loading
      ) : (
        <>
          <div>
            <table className="table frame sit">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Participant Name</th>
                  <th>Company</th>
                  <th>Occupation</th>
                  <th>Attendance</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Attachment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {parties.map((party, index) => (
                  // table content
                  <tr key={party._id}>
                    <td>{index + 1}</td>
                    <td>{party.name}</td>
                    <td>{party.company}</td>
                    <td>{party.job}</td>
                    <td>{party.room}</td>
                    <td>{party.phone}</td>
                    <td>{party.email}</td>
                    <td>{party.address.toUpperCase()}</td>
                    <td>
                      <a
                        href={`${party.file}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View This
                      </a>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(`/event-join-edit/${party._id}`)
                        }
                        className="btn"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default EventPartyList;
