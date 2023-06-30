import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const host="https://uninterested-bee-swimsuit.cyclic.app/admin";
const Admin = () => {
  const [db, setdb] = useState(null);
  const [success, setsuccess] = useState(0);

  const navigate=useNavigate();

  const handleClick=()=>{
    localStorage.removeItem('token');
    navigate('/');
  }

  const FetchU = async () => {
    const response = await fetch(`${host}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    console.log(json.success);
    if (json.success === 1) {
      setsuccess(1);
      setdb(json.details);
    }
  };
  useEffect(() => {
    FetchU();
  }, []);

  return (
    <div>
      {db ? (
        <div className="my-20">
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th>Item/Customer</th>
                  <th>Customer 1</th>
                  <th>Customer 2</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Quantity</td>
                  <td>{db.c1.quantity}</td>
                  <td>{db.c2.quantity}</td>
                  <td>{db.total.quantity}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{db.c1.weight}</td>
                  <td>{db.c2.weight}</td>
                  <td>{db.total.weight}</td>
                </tr>
                <tr>
                  <td>Box Count</td>
                  <td>{db.c1.box_count}</td>
                  <td>{db.c2.box_count}</td>
                  <td>{db.total.box_count}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
      <button type="button" class="btn btn-primary" onClick={handleClick}>Logout</button>
    </div>
  );
};
export default Admin;
