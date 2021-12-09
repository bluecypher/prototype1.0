const express = require("express");
const router = express.Router();
const dao = require("../dao/dao")

router.post("/login", (req, res) => {

    const number = req.body.number;
    console.log(number);
    if (number) {
        dao.insertNumber(number).then(
            (resp) => {
                console.log("Phone number successfully updated")
                res.status(200).send("Success");
            }).catch((err) => {
                console.log(err);
                res.status(404).send('Error');
            })
    }
})



router.post("/updateDetails", (req, res) => {
    const data = req.body;
    if (data.number) {
        dao.updateDetails(data).then(() => {
            console.log("Data Inserted successfully");
            res.status(200).send("Success");
        }).catch((err) => {
            console.log(err);
            res.status(404).send("Error")
        })
    }
})


module.exports = router;
