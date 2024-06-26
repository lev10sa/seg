// import dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// create the main function
const QuotationEdit = () => {
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

  // get id from parameter
  const { id } = useParams();

  // setting up useNavigate
  const navigate = useNavigate();

  // create Invoice deleter function
  const delInvoice = async () => {
    try {
      await axios.delete(
        `https://seg-server.vercel.app/api/quotations/id/${id}`
      ); // modify URL based on backend
      // navigate to main page
      navigate(`/quotations`);
    } catch (error) {
      window.alert(error.message); // display error message
    }
  };

  // create Invoice update function
  const updQuotation = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Remove the empty book object before sending to server
      const cleanedData = {
        ...quotationData,
        bookList: quotationData.bookList.filter(Boolean),
      };

      // Add the Invoice into database with axios
      await axios.patch(
        `https://seg-server.vercel.app/api/quotations/id/${id}`,
        cleanedData
      );
      // Navigate to main page
      navigate(`/quotations`);
    } catch (error) {
      console.log(error); // display error message
    }
  };

  // setting up useEffect to do tasks in real-time
  useEffect(() => {
    // create Invoice loader callback function
    const getQuotationById = async () => {
      try {
        // get all the datas from database with axios
        const res = await axios.get(
          `https://seg-server.vercel.app/api/quotations/id/${id}`
        );

        // input all the datas into useState
        setQuotationData(res.data);
      } catch (error) {
        console.log(error); // display error message
      }
    };

    getQuotationById();
  }, [id]);

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
          <form onSubmit={updQuotation} className="form">
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
                <button type="button" onClick={delInvoice} className="btn">
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
};

// export the main function
export default QuotationEdit;
