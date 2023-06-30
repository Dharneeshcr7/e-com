const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5000;
var jwt = require('jsonwebtoken');
var cors = require('cors');
var fetchuser = require('./middleware/fetchuser');
require("dotenv").config()

app.use(cors())

const JWT_SECRET = 'Dharneesh_company';


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  
});
console.log(process.env.DB_HOST);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static('public'));



  app.post('/', (req, res) => {
    const { id, password } = req.body;
    //console.log(id);
    let success=0;
  
    // Query the auth table to check the credentials
    pool.query('SELECT * FROM auth WHERE username = ? AND password = ?', [id, password], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Database not connected' });
      } else {
        if (results.length === 0) {
          res.status(401).json({ error: 'Invalid credentials' });
        } else {

            const data={
                user:{
                    id:id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            success=1;
            res.json({success,id,authtoken});
          
        }
      }
    });
  });


  // Handle customer data form submission
app.post('/customer', fetchuser,(req, res) => {
    const { orderDate, company, owner, item, quantity, weight, requestForShipment, trackingId, shipmentSize, boxCount, specification, checklistQuantity } = req.body;
  
    // Check if the customer already exists
    console.log(req.user);
    pool.query('SELECT * FROM customer WHERE username = ?', [req.user.id], (err, results) => {
      if (err) {
        //console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        
          // Insert the data as a new customer
          pool.query(
            'INSERT INTO customer (username,order_date, company, owner, item, quantity, weight, request_shipment, tracking_id, shipment_size, box_count, specification, checklist_quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.user.id,orderDate, company, owner, item, quantity, weight, requestForShipment, trackingId, shipmentSize, boxCount, specification, checklistQuantity],
            (err, insertResult) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
              } else {
                res.status(200).json({ message: 'Data stored successfully' });
              }
            }
          );
        
      }
    });
  });


  app.get('/admin',fetchuser,(req,res)=>{
    console.log(req.user);
    if(req.user.id!='admin')res.status(401).send('No access');
    const query = 'SELECT * FROM customer';
    success=0;
    pool.query(query, (err, results) => {
    if (err) {
        res.send({success});
        return;
    }
    const c1={quantity:0,weight:0,box_count:0};
    const c2={quantity:0,weight:0,box_count:0};
    const total={quantity:0,weight:0,box_count:0};
    results.forEach((element)=>{
      if(element.username==='customer1'){
        c1.quantity+=element.quantity;
        c1.weight+=element.weight;
        c1.box_count+=element.box_count;
        total.quantity+=element.quantity;
        total.weight+=element.weight;
        total.box_count+=element.box_count;
      }
      if(element.username==='customer2'){
        c2.quantity+=element.quantity;
        c2.weight+=element.weight;
        c2.box_count+=element.box_count;
        total.quantity+=element.quantity;
        total.weight+=element.weight;
        total.box_count+=element.box_count;
      }

    })

    success=1;

    res.send({success,details:{c1,c2,total}});
    
    });

  })



  


  const PORT = process.env.PORT || 5000

  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${port}`);
  });