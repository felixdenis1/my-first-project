const express=require ('express');
const cors=require('cors');
const mysql= require('mysql');
const bodyparser=require('body-parser');
const app=express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
  }));


const db=mysql.createConnection({
user:'root',
host:'localhost',
password:'Felix300512#',
database:'customer_info'
});



db.connect((err) => {
if(err) throw err;
console.log('Mysql connected') 
});

//user admin registeration

app.post('/Register', (req, res) => {
    const { username, password } = req.body;
    
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

//login api
app.post('/Login', (req, res) => {
    const { username, password } = req.body;

    const loginQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(loginQuery, [username, password], (err, results) => {
        if (err) {
            console.error('Error checking login:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            // Login success
            res.status(200).json({ message: 'Login successful' });
        } else {
            // Login failed
            res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});


//register product

app.post('/Orders', (req, res) => {
    const { productcode,productname,product_quantity,unit_price} = req.body;
    const total_price=product_quantity * unit_price;

    const sql = 'INSERT INTO products (productcode,productname,product_quantity,unit_price,total_price) VALUES (?,?,?,?,?)';
    
    db.query(sql, [productcode,productname,product_quantity,unit_price,total_price], (err, results) => {
        if (err) {
            console.error('Error inserting product:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Product registered successfully' });
    });
});

//register customer

app.post('/Customers', (req, res) => {
    const { cust_id,cust_fname,cust_lname,location,telephone} = req.body;
    
    const sql = 'INSERT INTO customer (cust_id,cust_fname,cust_lname,location,telephone) VALUES (?,?,?,?,?)';
    
    db.query(sql, [cust_id,cust_fname,cust_lname,location,telephone], (err, results) => {
        if (err) {
            console.error('Error inserting customer:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'customer registered successfully' });
    });
});

//ORDER APIs

app.post('/commands', (req, res) => {
    const { order_number,order_date,productcode,cust_id} = req.body;
    
    const sql = 'INSERT INTO orders (order_number,order_date,productcode,cust_id) VALUES (?,?,?,?)';
    
    db.query(sql, [order_number,order_date,productcode,cust_id], (err, results) => {
        if (err) {
            console.error('Error inserting customer:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'order registered successfully' });
    });
});
//get all customers
app.get('/Customers', (req, res) => {
    const sql = 'SELECT * FROM customer';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching customers:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    });
});

//delete apis

app.delete('/Customers/:cust_id', (req, res) => {
    const { cust_id } = req.params;

    const sql = 'DELETE FROM customer WHERE cust_id = ?';

    db.query(sql, [cust_id], (err, result) => {
        if (err) {
            console.error('Error deleting customer:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer deleted successfully' });
    });
});
//update apis
app.put('/Customers/:cust_id', (req, res) => {
    const { cust_id } = req.params;
    const { cust_fname, cust_lname, location, telephone } = req.body;

    const sql = 'UPDATE customer SET cust_fname = ?, cust_lname = ?, location = ?, telephone = ? WHERE cust_id = ?';

    db.query(sql, [cust_fname, cust_lname, location, telephone, cust_id], (err, result) => {
        if (err) {
            console.error('Error updating customer:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer updated successfully' });
    });
});
//get all orders
app.get('/Orders', (req, res) => {
    const sql = 'SELECT * FROM orders';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json(results);
    });
});

//update api
app.put('/Orders/:order_number', (req, res) => {
    const { order_number } = req.params;
    const { order_date, productcode, cust_id } = req.body;

    const sql = 'UPDATE orders SET order_date = ?, productcode = ?, cust_id = ? WHERE order_number = ?';

    db.query(sql, [order_date, productcode, cust_id, order_number], (err, result) => {
        if (err) {
            console.error('Error updating order:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order updated successfully' });
    });
});
//delete api
app.delete('/Orders/:order_number', (req, res) => {
    const { order_number } = req.params;

    const sql = 'DELETE FROM orders WHERE order_number = ?';

    db.query(sql, [order_number], (err, result) => {
        if (err) {
            console.error('Error deleting order:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    });
});
// Get all product codes
app.get('/productcodes', (req, res) => {
    db.query('SELECT productcode FROM products', (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(200).json(results);
    });
  });
  
  // Get all customer IDs and names
  app.get('/customerids', (req, res) => {
    db.query('SELECT cust_id, cust_fname, cust_lname FROM customer', (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(200).json(results);
    });
  });

  // report api
  app.get('/CustomerOrders', (req, res) => {
    const sql = `
      SELECT 
        o.order_number,
        o.order_date,
        o.productcode,
        o.cust_id,
        c.cust_fname,
        c.cust_lname,
        c.location,
        c.telephone,
        p.productname,
        p.product_quantity,
        p.unit_price,
        p.total_price
      FROM orders o
      JOIN customer c ON o.cust_id = c.cust_id
      JOIN products p ON o.productcode = p.productcode
      ORDER BY o.order_date DESC
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching customer orders:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json(results);
    });
  });
  

  // Delete an order by order_number
app.delete('/orders/:order_number', (req, res) => {
    const { order_number } = req.params;
  
    const deleteQuery = 'DELETE FROM orders WHERE order_number = ?';
    
    db.query(deleteQuery, [order_number], (err, results) => {
      if (err) {
        console.error('Error deleting order:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({ message: 'Order deleted successfully' });
    });
  });

  //update api for report
  // Update order details
app.put('/orders/:order_number', (req, res) => {
    const { order_number } = req.params;
    const { order_date, productcode, cust_id } = req.body;
  
    const sql = 'UPDATE orders SET order_date = ?, productcode = ?, cust_id = ? WHERE order_number = ?';
  
    db.query(sql, [order_date, productcode, cust_id, order_number], (err, results) => {
      if (err) {
        console.error('Error updating order:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json({ message: 'Order updated successfully' });
    });
  });
  

  //get products
  app.get('/products', (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching products:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json(results);
    });
  });
  



app.listen(8009,() => {
    console.log('server is running on http://localhost:8009')
});