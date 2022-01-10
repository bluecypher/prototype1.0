const express = require("express");
const router = express.Router();
const dao = require("../dao/dao");



// const checkToken = (req, res, next) => {
//     // console.log("Checking Token: ", req.query);
//     const cookies = JSON.parse(req.query.Cookies);
//     const number = req.query.number;
//     const jwt = cookies["token"];

//     if(number && cookies)
//     {

//     // console.log(jwt, " ");
//     dao.checkToken(number).then((resp) => {
//         if (resp === jwt) {
//             next();
//         }
//         else {
//             res.status(200).send('InvalidToken');
//         }
//     })
//    }
//    else{
//        res.status(200).send('Empty_Request');
//    }
// }

router.get("/getData",  (req, res) => {
    const number = req.query.number;
    dao.getData(number).then((resp) => {
        console.log("Getting Data")
        res.status(200).send(resp);
    }).catch((err) => {
        res.status(404).send({ "Error": err });
    })
})

router.get("/getServices",  (req, res) => {
    
    dao.getServices().then((resp) => {
        console.log("Getting Services")
        res.status(200).send(resp);
    }).catch((err) => {
        res.status(404).send({ "Error": err });
    })
})

router.post("/login", (req, res) => {

    const number = req.body.number;
    console.log(number);
    if (number) {
        dao.login_new(number).then(
            (resp) => {
                console.log('message: ',resp)
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
        dao.updateDetails(data).then((resp) => {
            
            console.log("Data Inserted successfully",resp);
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

router.post("/addMembers",  (req, res) => {
    const number = req.body.number;
    const pNumber = req.body.pNumber;
    const name = req.body.name;

    if (pNumber) {
        dao.addMembers(name, number, pNumber).then((resp) => {
            console.log("Members details updated")
            res.status(200).send(resp);
        }).catch((err) => {
            res.status(404).send("Error");
        })
    }



});

router.get("/getMembers",  (req, res) => {
    const id = req.query.id;
    
    dao.getMembers(id).then((resp) => {
        console.log("Getting Members")
        res.status(200).send(resp);
    }).catch((err) => {
        console.log("Error", err)
        res.status(404).send({ "Error": err });
    })


})

router.post("/deleteMembers",  (req, res) => {
    const oID = req.body.parent_id;
    const tID = req.body.member_id;
    dao.deleteMembers(oID,tID).then((resp) => {
        console.log("Deleting Members")
        res.status(200).send(resp);
    }).catch((err) => {
        res.status(404).send({ "Error": err });
    })


})

router.post("/addCustomers",  (req, res) => {
    const number = req.body.number;
    const id = req.body.id;
    const name = req.body.name;

    if (id) {
        dao.addCustomers(name, number, id).then((resp) => {
            
            res.status(200).send(resp);
        }).catch((err) => {
            res.status(404).send("Error");
        })
    }
    else{
        res.status(404).send('Not valid ID');
    }



});

router.post("/getCustomers",  (req, res) => {
    const id = req.body.id;
    if(id)
    {
        console.log('here')
    dao.getCustomers(id).then((resp) => {
        console.log("Getting Customers")
        res.status(200).send(resp);
    }).catch((err) => {
        console.log("Error", err)
        res.status(404).send({ "Error": err });
    })
}


});

router.post("/addWork",  (req, res) => {
    const custId = req.body.custId;
    const spId = req.body.spId;
    const date = req.body.date;
    const todos = req.body.todos;
    
    if (spId && custId) {
        dao.addWork(spId,custId,date,todos).then((resp) => {
            
            res.status(200).send(resp);
        }).catch((err) => {
            res.status(404).send("Error");
        })
    }
    else{
        res.status(404).send('Not valid ID');
    }



});

router.post("/getTodaysWork",  (req, res) => {
    const spId = req.body.id;
    
    
    if (spId) {
        
        dao.getTodaysWork(spId).then((resp) => {
            
            res.status(200).send(resp);
        }).catch((err) => {
            res.status(404).send("Error");
        })
    }
    else{
        res.status(404).send('Not valid ID');
    }



});

router.post("/updateWork",  (req, res) => {
    const workId = req.body.workId;
    const name = req.body.name;
    const serv = req.body.serv;

    const amnt = req.body.amnt;
    const wDetails = req.body.wDetails;
    const pmtMethod = req.body.pmtMethod;
    const nxtDate = req.body.nxtDate;
    const nxtWork = req.body.nxtWork;
    
    if (workId) {
        dao.updateWork(workId,name,serv,amnt,wDetails,pmtMethod,nxtDate,nxtWork).then((resp) => {
            res.status(200).send(resp);
        }).catch((err) => {
            res.status(404).send("Error");
        })
    }
    else{
        res.status(404).send('Not valid ID');
    }



});

router.post("/getUserServices",  (req, res) => {
    id = req.body.id;
    dao.getUserServices(id).then((resp) => {
        console.log("Getting Services")
        res.status(200).send(resp);
    }).catch((err) => {
        res.status(404).send({ "Error": err });
    })
})
module.exports = router;
