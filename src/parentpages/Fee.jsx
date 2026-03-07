import React, { useState, useEffect } from "react";
import "./fee.css";

export default function FeePage() {
  const initialFees = [
    { id: 1, type: "Tuition Fee", amount: 50000, status: "Pending" },
    { id: 2, type: "Hostel Fee", amount: 15000, status: "Paid" },
    { id: 3, type: "Lab Fee", amount: 5000, status: "Pending" },
    { id: 4, type: "Library Fee", amount: 2000, status: "Paid" },
  ]
  const [fees, setFees] = useState(() => {
    const stored = localStorage.getItem("fees");
    return stored ? JSON.parse(stored) : initialFees;
  })
  useEffect(() => {
    localStorage.setItem("fees", JSON.stringify(fees))
  }, [fees])

  const handlePay = (id) => {
    setFees(fees.map(f => f.id === id ? { ...f, status: "Paid" } : f))
    alert("Payment Successful!")
  }

  return (
    <div className="fee-container">
      <h1>Fee Summary</h1>
      <div className="table-wrapper">
        <table className="fee-table">
          <thead>
            <tr>
              <th>Fee Type</th>
              <th>Amount (/-)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
              <tr key={fee.id}>
                <td>{fee.type}</td>
                <td>{fee.amount}</td>
                <td style={{color: fee.status === "Paid" ? "green" : "red"}}>
                  {fee.status}
                </td>
                <td>
                  {fee.status === "Pending" && (
                    <button onClick={() => handlePay(fee.id)}>Pay</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}