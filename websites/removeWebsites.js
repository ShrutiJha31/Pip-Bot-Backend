const express=require("express");
const router=express.Router();
var pool=require('../config/db_config')
var VerifyToken = require('../auth/VerifyToken');

router.delete('/',VerifyToken, function (req, res) {
    id = req.query.id
    pool.getConnection((err, connection) => {
            if(err) throw err
            connection.query('SELECT * FROM websites WHERE website_id = ?',[id],(err,result)=>{
                 if(err)
                 console.log(err)
                else if(Object.keys(result) == '')
                {
                    connection.release() 
                    res.status(404).send({
                        message: "no record found"
                    })
                }
                else{
                    connection.query('DELETE FROM websites  where website_id=?; DELETE FROM logs WHERE website_id=?', [id,id], (err, rows) => {
                    connection.release() 
                    if (!err) {
                        res.status(200).send({
                            message:"record deleted"
                        })
                    } else {
                        console.log(err)
                    }
                    console.log(rows)
                    })
                }
            })
        
        })
}); 

module.exports = router;