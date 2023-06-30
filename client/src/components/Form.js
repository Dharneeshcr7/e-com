import React,{useState} from "react";
import {useNavigate } from "react-router-dom";
const host="https://uninterested-bee-swimsuit.cyclic.app/customer";
const Form=()=> {
  const [formData, setFormData] = useState({
    orderDate: '',
    company: '',
    owner: '',
    item: '',
    quantity: '',
    weight: '',
    requestForShipment: '',
    trackingId: '',
    shipmentSize: '',
    boxCount: '',
    specification: '',
    checklistQuantity: '',
  });

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
}
  const handleSubmit = async(e) => {
    //e.preventDefault();
    const response = await fetch(`${host}`, {
            method: "POST",
      
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
              
            },
      
            body: JSON.stringify(formData),
          });
          const authtoken = await response.json();
          console.log(authtoken);

          

  };
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className="container">
      <h1>Form Example</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="orderDate" className="form-label">
            Order Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="orderDate"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company:
          </label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="owner" className="form-label">
            Owner:
          </label>
          <input
            type="text"
            className="form-control"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="item" className="form-label">
            Item:
          </label>
          <input
            type="text"
            className="form-control"
            id="item"
            name="item"
            value={formData.item}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity:
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="weight" className="form-label">
            Weight:
          </label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="requestForShipment" className="form-label">
            Request for Shipment:
          </label>
          <input
            type="text"
            className="form-control"
            id="requestForShipment"
            name="requestForShipment"
            value={formData.shipmentRequest}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="trackingId" className="form-label">
            Tracking ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="trackingId"
            name="trackingId"
            value={formData.trackingId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="shipmentSize" className="form-label">
            Shipment Size (LxBxH):
          </label>
          <input
            type="text"
            className="form-control"
            id="shipmentSize"
            name="shipmentSize"
            value={formData.shipmentSize}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="boxCount" className="form-label">
            Box Count:
          </label>
          <input
            type="number"
            className="form-control"
            id="boxCount"
            name="boxCount"
            value={formData.boxCount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="specification" className="form-label">
            Specification:
          </label>
          <input
            type="text"
            className="form-control"
            id="specification"
            name="specification"
            value={formData.specification}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="checklistQuantity" className="form-label">
            Checklist Quantity:
          </label>
          <input
            type="text"
            className="form-control"
            id="checklistQuantity"
            name="checklistQuantity"
            value={formData.checklistQuantity}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary my-2 mx-2">Submit</button>
        <button type="submit" onClick={handleLogout} className="btn btn-primary mx-2">Logout</button>
      </form>
    </div>
  );
}

export default Form;

