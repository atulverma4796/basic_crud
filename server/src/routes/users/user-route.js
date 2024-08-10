const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { 
    res.json({success: true,message:'Get All User'});
})
router.post('/', (req, res) => { 
    res.json({success: true,message:'Post User'});
})
module.exports = router;