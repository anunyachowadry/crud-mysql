const express = require('express');
const bodyParser = require('body-parser');
const router=express();
const con = require('./dbconnection')
router.use(bodyParser.urlencoded({ extended: true }));




    


router.post('/abc' , function(req, res){
    var PerId = req.body.PerId; 
var Fullname = req.body.Fullname;
var College =req.body.College;
var Pin =req.body.Pin;

    var sql = `INSERT INTO anunya.list (PerId,Fullname,college,Pin) VALUES
     ("${PerId}","${Fullname}","${College}","${Pin}")`;
con.query(sql , function(err,result){
    if(!err){
        res.status(200).json(result) 
    }else{
        res.status(400).json({err})
    }
})

})


router.get('/read',function(req,res){
    con.query('select * from anunya.list;',function(err,result,fields){
        if(!err){
            res.status(200).json(result)
            console.log(result)
        
        }else{
            res.status(400).json({err})
        }
    })
})

/*router.put('/anu',function(req,res){
    con.query('UPDATE `form` SET `Name` = ?,`Pinno` = ? WHERE `college` = ?',
  [req.boby.Name,req.body.Pinno,req.body.college],function(error,result,feilds){
    if(!err){
        res.status(200).json(result)
            console.log(result)
    }else{
        res.status(400).json({error})
    }
  })
})*/

router.put('/update' , function(req, res){
    con.query('UPDATE `list` SET `Fullname`=?,`College`=?,`Pin`=? WHERE `PerId` =?' , 
    [req.body.Fullname,req.body.College,req.body.Pin,req.body.PerId],
    function(error,result){
     if(!error){
        res.status(200).json(result)
     }else{
        res.status(400).json({error})
        console.log(error)
     }


    })
})

router.delete('/delete' , function(req,res){
  
    con.query('delete from `list` where `PerId`=?',[req.body.PerId],function(err,result){
        if(!err){
            res.status(200).json(result)
            var result=JSON.parse(JSON.stringify(result))
            console.log(result)
        
        }else{
            res.status(400).json({err})
            console.log(err)
        }
    })
})
        
router.get('/getbyid/:PerId', function(req,res) {
    const fetchPerId=req.params.PerId;
    con.query('SELECT * from anunya.list WHERE PerId=?',fetchPerId,function(err,result){
        if(!err){
            res.status(200).json(result)
            var result=JSON.parse(JSON.stringify(result))
            console.log(result)
        
        }else{
            res.status(400).json({err})
            console.log(err)
        }
    })
})
     
router.put('/putbyid/:PerId', function(req,res) {
    const fetchPerId=req.params.PerId;
    con.query('UPDATE `list` SET `Fullname`=?,`College`=?,`Pin`=? WHERE `PerId` =?',
    [req.body.Fullname,req.body.College,req.body.Pin,fetchPerId],function(err,result){
        if(!err){
            res.status(200).json(result)
            var result=JSON.parse(JSON.stringify(result))
            console.log(result)
        
        }else{
            res.status(400).json({err})
            console.log(err)
        }
    })
})
     
router.delete('/deletebyid/:PerId', function(req,res) {
    const fetchPerId=req.params.PerId;
    con.query('delete from `list` where `PerId`=?',[ fetchPerId],function(err,result){
    
        if(!err){
            res.status(200).json(result)
            var result=JSON.parse(JSON.stringify(result))
            console.log(result)
        
        }else{
            res.status(400).json({err})
            console.log(err)
        }
    })
})

module.exports=router