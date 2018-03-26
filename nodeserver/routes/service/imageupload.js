const express = require('express');

const router = express.Router();


router.post('/',(req,res,next)=>{
    let imageFile = req.files.file;
    imageFile.mv(`./public/images/${req.files.file.md5}`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({fileName: `${req.files.file.md5}`});
    });


});



module.exports=router;