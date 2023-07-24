const connection = require("./modules/db");

const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());

app.get('/employees',(req, res)=>{
    connection.query('SELECT * FROM employee',(err, rows)=>{
        if(err){
            console.log(err);
        }else {
            return res.send(rows);            
        }
        
    })
})


app.get('/employees/:id',(req, res)=>{
    const id = req.params.id;
    connection.query('SELECT * FROM employee WHERE id = ?',[id],(err, rows)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:"Internal server error"});
        }else {
            if(rows.length === 0){
                return res.status(404).json({error:'Employee not found'})
            }
            return res.json(rows);            
        }        
    })
})

app.delete('/employees/:id',(req, res)=>{
    connection.query('DELETE FROM employee WHERE id=?',[req.params.id],(err, rows)=>{
        if(err){
            console.log(err);
        }else {
            console.log("Successfully deleted");
            return res.send(rows);            
        }
        
    })
})

app.post('/employees/',(req, res)=>{
    let emp = req.body;
    let empData = [emp.name,emp.salary];
    connection.query('INSERT INTO employee(name,salary) values(?)',[empData],(err, rows)=>{
        if(err){
            console.log(err);
        }else {
            res.send(["Successfully inserted",rows]);
            return res.send(rows);            
        }
        
    })
})


app.patch('/employees/',(req, res)=>{
    const emp = req.body;   
    const id = req.params.id;
    connection.query('UPDATE employee SET ? WHERE id =',[emp,id],(err, rows)=>{
        if(err){
            return res.status(500).json({error:'Internal error'})
        }else {
            
            return res.json({message:"successfully updated"});                      
        }
        
    })
})

app.put('/employees/:id', (req, res) => {
  const id = req.params.id;
  const updatedEmployeeData = req.body;
  connection.query('UPDATE employee SET ? WHERE id = ?', [updatedEmployeeData, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      console.log('Successfully updated');
      return res.json({ message: 'Successfully updated' });
    }
  });
});


app.listen(3000, ()=> console.log("Express server is running on port 3000"));