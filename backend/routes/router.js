const express = require("express");
const router = express.Router();
const dao = require("../dao/dao");



const checkToken = (req, res, next) => {
    console.log("Checking Token");
    const cookies = JSON.parse(req.query.Cookies);
    const number = req.query.number;
    const jwt = cookies["token"];
    // console.log(jwt, " ");
    dao.checkToken(number).then((resp) => {
        if (resp === jwt) {
            next();
        }
        else {
            res.status(404).send('Invalid access token');
        }
    })
}

router.get("/getData", checkToken, (req, res) => {
    const number = req.query.number;
    dao.getData(number).then((resp) => {
        console.log("Getting Data")
        res.status(200).send(resp);
    }).catch((err) => {
        res.status(404).send({ "Error": err });
    })
})

router.post("/login", (req, res) => {

    const number = req.body.number;
    console.log(number);
    if (number) {
        dao.login(number).then(
            (resp) => {
                console.log("Phone number successfully updated")
                res.status(200).send(resp);
            }).catch((err) => {
                console.log(err);
                res.status(404).send(err);
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


router.get("/logout", (req, res) => {
    const number = req.query.number;
    dao.logout(number).then(() => {
        console.log("Logged Out Successfully");
        res.status(200).send("success");

    })
})

router.post("/addMembers", (req, res) => {
    const number = req.body.number;
    const pNumber = req.body.pNumber;
    if (pNumber) {
        dao.addMembers(number, pNumber).then((resp) => {
            console.log("Members details updated")
            res.status(200).send(resp);
        }).catch((err) => {
            res.status(404).send("Error");
        })
    }



});

// router.post()

module.exports = router;
