// import dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// create the main function
const PostList = () => {
  // create the useState
  const [posts, setPosts] = useState([]); // state for post list
  const [searchs, setSearch] = useState(""); // state for search
  const [isLoading, setIsLoading] = useState(true); // state for loading
  const [isEmpty, setIsEmpty] = useState(false);

  const str = searchs;

  // Split the string into words
  const words = str.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join the capitalized words back into a string
  const search = capitalizedWords.join(" ");

  // dependency array with only `search`

  // setting up useNavigate
  const navigate = useNavigate();

  // setting up useEffect to do tasks in real-time

  useEffect(() => {
    // create book loader callback function
    const getPosts = async () => {
      try {
        if (!search) {
          const url = `https://seg-server.vercel.app/api/posts/`; // modify URL based on backend
          const datas = await axios.get(url); // get datas from URL with axios
          datas.data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
          setPosts(datas.data);
          setIsLoading(false);
        } else {
          const url = `https://seg-server.vercel.app/api/posts/key/${search}`; // modify URL based on backend
          const datas = await axios.get(url); // get datas from URL with axios
          datas.data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
          setPosts(datas.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message); // display error message
      }
    };

    getPosts();
  }, [search, posts]); // dependency array with only `getPosts`

  function formatTime(dateString) {
    // Create a new Date object from the provided dateString
    const date = new Date(dateString);

    // Define arrays for day names and month names
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the day of the week, month, day, and year from the Date object
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Get the hours and minutes from the Date object
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the time as "HH.MM"
    const time = `${hours < 10 ? "0" : ""}${hours}.${
      minutes < 10 ? "0" : ""
    }${minutes}`;

    // Return the formatted date string
    return `${dayOfWeek}, ${day} ${month} ${year}. ${time} WIB`;
  }

  // render the display
  return (
    <>
      <div className="section headline">
        <h4>Post List</h4>
        <button onClick={() => navigate(`/post-add`)} className="btn">
          Add Post
        </button>
        <div className="section">
          <input
            type="text"
            className="input"
            value={search} // set value from search state
            onInput={(e) => setSearch(e.target.value)} // update search state on change
            placeholder="Search Posts..."
          />
        </div>
        <p>Ditemukan: {posts.length} data</p>
      </div>
      {isLoading ? (
        <div className="section">Loading Post Database...</div> // display status when loading
      ) : isEmpty ? (
        <div className="section">No data...</div> // display status when loading
      ) : (
        // display table after loading
        <div className="section">
          <div className="section">
            {posts.map((post, index) => (
              <div className="event" key={index}>
                <img src={post.img} alt={post.img} />
                <div className="section caption">
                  <h6 title={post.title}>{post.title}</h6>
                  <p>
                    <strong>Category:</strong> {post.category}
                  </p>
                  <p>
                    <strong>Published:</strong> {formatTime(post.start)}
                  </p>
                  <button
                    onClick={() => navigate(`/post-edit/${post._id}`)}
                    className="btn"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => navigate(`/post-view/${post._id}`)}
                    className="btn"
                  >
                    VIEW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// export the main function
export default PostList;
