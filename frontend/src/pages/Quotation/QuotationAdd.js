import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QuotationAdd() {
  // Fetches latest invoice count for serie generation

  const [quotationData, setQuotationData] = useState({
    serie: "",
    date: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    sales: "",
    bookList: [],
  });

  // Generate series function
  const generateSerie = (count) => {
    // Update latestCount with the actual value
    const today = new Date();
    const month = today.getMonth() + 1; // Months are zero-indexed
    const year = today.getFullYear().toString().slice(-2);
    const formattedMonth = month.toString().padStart(2, "0");
    return `QU${count + 1 + 100}${formattedMonth}${year}`;
  };

  // setting up useNavigate
  const navigate = useNavigate();

  const handleChange = (event) => {
    setQuotationData({
      ...quotationData,
      [event.target.name]: event.target.value,
    });
  };

  const handleBookChange = (index) => (event) => {
    setQuotationData({
      ...quotationData,
      bookList: quotationData.bookList.map((book, i) =>
        index === i
          ? { ...book, [event.target.name]: event.target.value }
          : book
      ),
    });
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    setQuotationData({
      ...quotationData,
      bookList: [
        ...quotationData.bookList,
        { bookName: "", isbn: "", price: "", qty: "", disc: "" },
      ],
    });
  };

  const handleRemoveBook = (e) => {
    e.preventDefault();
    const lastBookIndex = quotationData.bookList.length - 1;
    setQuotationData({
      ...quotationData,
      bookList: quotationData.bookList.filter((book, i) => i !== lastBookIndex),
    });
  };

  const AddQuotation = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Remove the empty book object before sending to server
      const cleanedData = {
        ...quotationData,
        bookList: quotationData.bookList.filter(Boolean),
      };

      // Add the Invoice into database with axios
      await axios.post(
        `https://seg-server.vercel.app/api/quotations`,
        cleanedData
      );

      // Navigate to main page
      navigate(`/quotations`);
    } catch (error) {
      console.log(error.message); // Display error message
    }
  };

  const fetchLatestCount = async () => {
    try {
      const url = `https://seg-server.vercel.app/api/quotations`; // modify URL based on backend
      const datas = await axios.get(url);
      const count = datas.data.length;
      const serie = generateSerie(count);

      setQuotationData({
        ...quotationData,
        serie: serie,
      });
    } catch (error) {
      console.error("Error fetching latest invoice count:", error);
    }
  };

  useEffect(() => {
    fetchLatestCount();
  }, []);

  return (
    <>
      <div className="section">
        <div className="section headline">
          <h4>Add Invoice</h4>
          <button onClick={() => navigate(`/quotations`)} className="btn">
            See All Invoices
          </button>
        </div>
        <div className="section">
          <form onSubmit={AddQuotation} className="form">
            <div className="field">
              <label className="label">No.</label>
              <input
                type="text"
                className="input"
                id="serie"
                name="serie"
                value={quotationData.serie}
                onChange={handleChange}
                placeholder="No."
              />
            </div>
            <div className="field">
              <label className="label">Date</label>
              <input
                type="date"
                className="input"
                id="date"
                name="date"
                value={quotationData.date}
                onChange={handleChange}
                placeholder="Date"
              />
            </div>
            <div className="field">
              <label className="label">PIC Name</label>
              <input
                type="text"
                className="input"
                id="name"
                name="name"
                value={quotationData.name}
                onChange={handleChange}
                placeholder="PIC Name"
              />
            </div>
            <div className="field">
              <label className="label">Company</label>
              <input
                type="text"
                className="input"
                id="company"
                name="company"
                value={quotationData.company}
                onChange={handleChange}
                placeholder="Company"
              />
            </div>
            <div className="field">
              <label className="label">Email</label>
              <input
                type="text"
                className="input"
                id="email"
                name="email"
                value={quotationData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="field">
              <label className="label">Phone</label>
              <input
                type="text"
                className="input"
                id="phone"
                name="phone"
                value={quotationData.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </div>
            <div className="field">
              <label className="label">Address</label>
              <input
                type="text"
                className="input"
                id="address"
                name="address"
                value={quotationData.address}
                onChange={handleChange}
                placeholder="Address"
              />
            </div>
            <div className="field">
              <label className="label">Sales Name</label>
              <input
                type="text"
                className="input"
                id="sales"
                name="sales"
                value={quotationData.sales}
                onChange={handleChange}
                placeholder="Sales Name"
              />
            </div>

            {quotationData.bookList.map((book, index) => (
              <div className="section" key={index}>
                <div className="section">
                  <h4 className="label">Book {index + 1}</h4>
                </div>
                <div className="field">
                  <label className="label">Book Name</label>
                  <input
                    type="text"
                    id={`bookName-${index}`}
                    name={`bookName`}
                    value={book.bookName}
                    onChange={handleBookChange(index)}
                    placeholder={`Book Name ${index + 1}`}
                  />
                </div>
                <div className="field">
                  <label className="label">ISBN</label>
                  <input
                    type="text"
                    id={`isbn-${index}`}
                    name={`isbn`}
                    value={book.isbn}
                    onChange={handleBookChange(index)}
                    placeholder={`ISBN`}
                  />
                </div>
                <div className="field">
                  <label className="label">Price</label>
                  <input
                    type="text"
                    id={`price-${index}`}
                    name={`price`}
                    value={book.price}
                    onChange={handleBookChange(index)}
                    placeholder={`Price`}
                  />
                </div>
                <div className="field">
                  <label className="label">Quantity</label>
                  <input
                    type="text"
                    id={`qty-${index}`}
                    name={`qty`}
                    value={book.qty}
                    onChange={handleBookChange(index)}
                    placeholder={`Quantity`}
                  />
                </div>
                <div className="field">
                  <label className="label">Discount</label>
                  <input
                    type="text"
                    id={`disc-${index}`}
                    name={`disc`}
                    value={book.disc}
                    onChange={handleBookChange(index)}
                    placeholder={`Discount`}
                  />
                </div>
              </div>
            ))}

            <div className="section">
              <div className="controls">
                <button
                  type="button"
                  className="btn"
                  onClick={handleRemoveBook}
                >
                  Remove Book
                </button>
                <button type="button" className="btn" onClick={handleAddBook}>
                  Add Book
                </button>
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

export default QuotationAdd;
