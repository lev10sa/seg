import React, { useState, useEffect } from "react";
import axios from "axios";

const Insig = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const getBrad = async () => {
      const uriA = `https://seg-server.vercel.app/api/invoices/key/Angga`;
      const uriB = `https://seg-server.vercel.app/api/invoices/key/Cahyo`;
      const uriC = `https://seg-server.vercel.app/api/invoices/key/Tulus`;
      const uriaA = `https://seg-server.vercel.app/api/quotations/key/Angga`;
      const uribB = `https://seg-server.vercel.app/api/quotations/key/Cahyo`;
      const uricC = `https://seg-server.vercel.app/api/quotations/key/Tulus`;
      const uriaaA = `https://seg-server.vercel.app/api/orders/key/Angga`;
      const uribbB = `https://seg-server.vercel.app/api/orders/key/Cahyo`;
      const uriccC = `https://seg-server.vercel.app/api/orders/key/Tulus`;

      const resA = await axios.get(uriA);
      const resB = await axios.get(uriB);
      const resC = await axios.get(uriC);
      const resaA = await axios.get(uriaA);
      const resbB = await axios.get(uribB);
      const rescC = await axios.get(uricC);
      const resaaA = await axios.get(uriaaA);
      const resbbB = await axios.get(uribbB);
      const resccC = await axios.get(uriccC);

      const brad = [
        {
          saled: "Angga",
          invoice: resA.data.length,
          quotation: resaA.data.length,
          po: resaaA.data.length,
        },
        {
          saled: "Cahyo",
          invoice: resB.data.length,
          quotation: resbB.data.length,
          po: resbbB.data.length,
        },
        {
          saled: "Tulus",
          invoice: resC.data.length,
          quotation: rescC.data.length,
          po: resccC.data.length,
        },
      ];

      setStats(brad);
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
              <>
                <tr key={index}>
                  <td>{item.saled}</td>
                  <td>{item.invoice}</td>
                  <td>{item.quotation}</td>
                  <td>{item.po}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Insig;
