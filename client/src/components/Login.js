import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const host="https://uninterested-bee-swimsuit.cyclic.app";

const Login = () => {

  const [creds,setcreds]=useState({id:"",password:""});

    const onChange=(e)=>{
        setcreds({...creds,[e.target.name]:e.target.value});
   }
   let navigate=useNavigate();
   let navigate2=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}`, {
            method: "POST",
      
            headers: {
              "Content-Type": "application/json",
              
            },
      
            body: JSON.stringify({ id:creds.id, password:creds.password}),
          });
          const authtoken = await response.json();
          console.log(authtoken);

          if(authtoken.success===1 && authtoken.id!=='admin'){
            localStorage.setItem('token',authtoken.authtoken);
            navigate('/form');


          }
          else if(authtoken.id==='admin'){
            localStorage.setItem('token',authtoken.authtoken);
            navigate2('/admin');
          }
          else{
            alert("Invalid Credentials");
          }


        
    }
    
  return (
    <form onSubmit={handleSubmit}>
       <h2>Login the Details</h2>
      <div className="mb-3 my-3">
        <label htmlFor="id" className="form-label">
          User Name
        </label>
        <input
          type="text"
          className="form-control"
          id="id"
          aria-describedby="emailHelp"
          name="id"
          onChange={onChange}
          
        />
       
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          onChange={onChange}
         
        />
      </div>

      <button type="submit"  className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};


export default Login;


