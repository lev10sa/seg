import React, { useState, useEffect } from "react";
import axios from "axios";

const Insig = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async (key) => {
      const [invoices, quotations, orders] = await Promise.all([
        axios.get(`https://seg-server.vercel.app/api/invoices/key/${key}`),
        axios.get(`https://seg-server.vercel.app/api/quotations/key/${key}`),
        axios.get(`https://seg-server.vercel.app/api/orders/key/${key}`),
      ]);
      return {
        saled: key,
        invoice: invoices.data.length,
        quotation: quotations.data.length,
        po: orders.data.length,
      };
    };

    const getBrad = async () => {
      const keys = ["Angga", "Cahyo", "Tulus"];
      const results = await Promise.all(keys.map(fetchData));
      setStats(results);
    };

    getBrad();
  }, []);

  return (
    <>
      <div className="section">
        <h4>Total Statistic</h4>
      </div>
      <hr />
      <div className="section">
        <table className="books-table">
          <thead>
            <tr>
              <th>Sales Name</th>
              <th>Total Invoice</th>
              <th>Total Quotation</th>
              <th>Total PO</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((item, index) => (
              <tr key={index}>
                <td>{item.saled}</td>
                <td>{item.invoice}</td>
                <td>{item.quotation}</td>
                <td>{item.po}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Insig;
