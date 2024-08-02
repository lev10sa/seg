import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./Stat.css";

const Stat = () => {
  const [filteredData, setFilteredData] = useState({});
  const [filter, setFilter] = useState("month");
  const [bestSellingBooks, setBestSellingBooks] = useState([]);
  const [customRange, setCustomRange] = useState({ start: "", end: "" });

  const formatCurrency = (number) => {
    const options = {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return new Intl.NumberFormat("id-ID", options).format(number);
  };

  const filterInvoicesByDateRange = (invoices, range) => {
    const now = new Date();
    return invoices.filter((invoice) => {
      const invoiceDate = new Date(invoice.date);
      switch (range) {
        case "today":
          return invoiceDate.toDateString() === now.toDateString();
        case "week":
          return now - invoiceDate < 7 * 24 * 60 * 60 * 1000;
        case "month":
          return now - invoiceDate < 30 * 24 * 60 * 60 * 1000;
        case "lastMonth":
          return now - invoiceDate < 30 * 24 * 60 * 60 * 1000;
        case "threeMonths":
          return now - invoiceDate < 90 * 24 * 60 * 60 * 1000;
        case "year":
          return now - invoiceDate < 365 * 24 * 60 * 60 * 1000;
        case "custom":
          const { start, end } = customRange;
          return invoiceDate >= new Date(start) && invoiceDate <= new Date(end);
        default:
          return false;
      }
    });
  };

  const calculateTotalsBySales = (invoices) => {
    const totals = {};
    invoices.forEach((invoice) => {
      if (!totals[invoice.sales]) {
        totals[invoice.sales] = 0;
      }
      invoice.bookList.forEach((book) => {
        const price = parseFloat(book.price);
        const qty = parseInt(book.qty, 10);
        const disc = parseFloat(book.disc) / 100 || 0;
        totals[invoice.sales] += (price - price * disc) * qty;
      });
    });
    return totals;
  };

  const calculateBestSellingBooks = (invoices) => {
    const bookSales = {};
    invoices.forEach((invoice) => {
      invoice.bookList.forEach((book) => {
        const bookName = book.bookName;
        const price = parseFloat(book.price);
        const qty = parseInt(book.qty, 10);
        const disc = parseFloat(book.disc) / 100 || 0;
        const totalPrice = (price - price * disc) * qty;
        if (!bookSales[bookName]) {
          bookSales[bookName] = { totalPrice: 0, qty: 0 };
        }
        bookSales[bookName].totalPrice += totalPrice;
        bookSales[bookName].qty += qty;
      });
    });
    return Object.entries(bookSales)
      .sort((a, b) => b[1].qty - a[1].qty)
      .slice(0, 10);
  };

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const url = `https://seg-server.vercel.app/api/invoices`;
        const response = await axios.get(url);

        const filteredInvoices = filterInvoicesByDateRange(
          response.data,
          filter
        );
        setFilteredData(calculateTotalsBySales(filteredInvoices));
        setBestSellingBooks(calculateBestSellingBooks(filteredInvoices));
      } catch (error) {
        window.alert(error.message);
      }
    };

    getInvoices();
  }, [filter, customRange]);

  const salesNames = Object.keys(filteredData);

  const chartData = {
    labels: salesNames,
    datasets: [
      {
        label: "Total Sales",
        data: salesNames.map((name) => filteredData[name]),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <>
      <div className="section container">
        <div className="section">
          <h4>Total Sales Revenue</h4>
        </div>
        <div className="section">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="lastMonth">Last One Month</option>
            <option value="threeMonths">Last Three Months</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <div className="section">
          {filter === "custom" && (
            <div className="date-range-container">
              <input
                type="date"
                value={customRange.start}
                onChange={(e) =>
                  setCustomRange({ ...customRange, start: e.target.value })
                }
              />
              <span>to</span>
              <input
                type="date"
                value={customRange.end}
                onChange={(e) =>
                  setCustomRange({ ...customRange, end: e.target.value })
                }
              />
            </div>
          )}
        </div>
        <hr />
        <div className="section">
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="section">
          <table className="sales-table">
            <thead>
              <tr>
                <th>Sales Name</th>
                <th>Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {salesNames.map((name) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{formatCurrency(filteredData[name])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="section"></div>
        <div className="section"></div>
        <div className="section">
          <h4>Top 10 Best Selling Books</h4>
        </div>
        <hr />
        <div className="section">
          <table className="books-table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Total Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {bestSellingBooks.map(([bookName, data]) => (
                <tr key={bookName}>
                  <td>{bookName}</td>
                  <td>{formatCurrency(data.totalPrice)}</td>
                  <td>{data.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="section"></div>
    </>
  );
};

export default Stat;
