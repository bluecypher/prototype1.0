const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const { download } = require("express/lib/response");

const getconnection = () => {
    const con = mysql.createConnection({
        host: "localhost",
        user: 'root',
        password: '12Mysql@34',
        database: "sahayak",
    });
    return con;
};

const checkToken = (number) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();

        db.query("Select jwt from users where number=?", [number], (err, row) => {
            if (!err) {

                resolve(row[0].jwt);
            } else {

                reject(err);
            }
        });
    });
};

const getData = (number) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();

        db.query("select user_mast_id,email,phone,first_name,last_name,photo,address1,address2,city,pin,state,locality_of_work,highlights,enterprise,user_type from service_provider_master where phone =?", [number], (err, row) => {
            if (!err) {
                resolve(row);
                console.log(row[0]);
            } else reject(err);
        });
    });
};



const login_new = (number) => {
    return new Promise((resolve, reject) => {
        const jwToken = jwt.sign({ id: number }, 'Thisisasecretkeyforgeneratingjwt');
        const db = getconnection();
        db.query(
            "SELECT status FROM service_provider_master WHERE phone=?",
            [number],
            (err, row) => {

                if (row && row.length) {
                    try {
                        console.log('update');


                        resolve({
                            jwToken: jwToken,
                            res: "success",
                            status: row[0].status
                        });
                    } catch (e) {
                        console.log(e);
                        reject(e);
                    }
                } else {
                    try {
                        console.log('insert');


                        resolve({
                            jwToken: jwToken,
                            res: "success",
                            exists: false
                        });
                    } catch (e) {
                        console.log(e);
                        reject(e);
                    }
                }
            }
        );
    });
};

const updateDetails = (data) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        db.query("SELECT user_mast_id FROM service_provider_master WHERE phone=?",
            [data.number],
            (err, row) => {
                if (row && row.length) {
                    db.query(
                        "UPDATE service_provider_master SET status=?,email=?,phone=?,first_name=?,last_name=?,address1=?,address2=?,city=?,pin=?,state=?,photo=?,locality_of_work=?,highlights=?,enterprise=?,last_updated=? where phone =?",
                        [
                            'F',
                            data.email,
                            data.number,
                            data.fname,
                            data.lname,
                            data.addr1,
                            data.addr2,
                            data.city,
                            data.pin,
                            data.state,
                            data.img,
                            data.locality,
                            data.hghlts,
                            data.ent,
                            new Date(Date.now()),
                            data.number

                        ],
                        (err, res) => {
                            if (!err) {

                                console.log("Data updated Successfully ", data.services);
                                addServices(row[0].user_mast_id, data.services);
                                resolve();
                            } else reject(err);
                        }
                    );
                }
                else {
                    db.query("INSERT INTO service_provider_master(status,email,phone,first_name,last_name,address1,address2,city,pin,state,photo,locality_of_work,highlights,user_type,enterprise,created_on,last_updated) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [
                            'F',
                            data.email,
                            data.number,
                            data.fname,
                            data.lname,
                            data.addr1,
                            data.addr2,
                            data.city,
                            data.pin,
                            data.state,
                            data.img,
                            data.locality,
                            data.hghlts,
                            'O',
                            data.ent,
                            new Date(Date.now()),
                            new Date(Date.now())
                        ],
                        (err, res) => {
                            if (!err) {
                                console.log("Data inserted Successfully ", res);
                                addServices(res.insertId, data.services);
                                
                                resolve();
                            } else reject(err);
                        }
                    )
                }
            })

    });
};

const logout = (number) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        db.query("UPDATE USERS SET jwt=NULL WHERE number=?", [number]);
        resolve();
    });
};

const addServices = (user_id, serv_ids) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        for (var i = 0; i < serv_ids.length; i++) {
            db.query("INSERT INTO service_provider_detail(user_mast_id,serv_id,created_on,last_updated) VALUES(?,?,?,?)",
                [
                    user_id,
                    serv_ids[i],
                    new Date(Date.now()),
                    new Date(Date.now())
                ])
        }
        resolve();
    });
};
const addMembers = (name, number, pNumber) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        
        db.query("select user_mast_id from service_provider_master where phone=?", [number], (err, row) => {
            if (row && row.length) {
                try {
                    if (err) {
                        console.log(err);
                        resolve("error");
                    }
                    console.log("row[0].user-mast_id: ",row[0].user_mast_id)
                    mapOwnertoTeam(name,pNumber,number,row[0].user_mast_id);
                    
                    resolve("success");
                } catch (err) {
                    console.log(err);
                    reject("err");
                }
            } else {
                db.query("INSERT INTO service_provider_master(status,phone,user_type,created_on,last_updated) VALUES(?,?,?,?,?)", [
                    'U',
                    number,
                    'M',
                    new Date(Date.now()),
                    new Date(Date.now())
                ],(err, row)=>{
                    mapOwnertoTeam(name,pNumber,number,row.insertId);
                });
                resolve("success");
                // console.log("No Such User Exists");
            }
        });
    });
};

const mapOwnertoTeam = (name,pNumber,number,member_id) => {
    return new Promise((resolve,reject) => {
        const db= getconnection();
        db.query("SELECT user_mast_id FROM service_provider_master WHERE phone=?",[
            pNumber
        ],
        (err,row)=>{
            if(row && row.length)
            {
                try{
                    db.query("INSERT INTO service_provider_team_detail(owner_id,team_member_id,status,team_member_phone,team_member_first_name,created_on,last_updated) VALUES(?,?,?,?,?,?,?)",[
                        row[0].user_mast_id,
                        member_id,
                        'A',
                        number,
                        name,
                        new Date(Date.now()),
                        new Date(Date.now())
                    ])
                    resolve();
                }
                catch(err){
                    console.log('error in om mapping');
                    reject(err);

                }
            }
            if(err)
            {
                reject(err);
            }
        })
    });
};

const getMembers = (id) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        db.query("SELECT team_member_id AS memberId, team_member_first_name AS name,team_member_phone AS number FROM service_provider_team_detail WHERE owner_id=?", [id], (err, row) => {
            if (!err) {
                resolve(row);
                // console.log(row);
            } else reject(err);
        });
    });
};

const getServices = () => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        db.query("select serv_id,serv_name from service_master", (err, row) => {
            if (!err) {
                resolve(row);
                // console.log(row);
            } else reject(err);
        });
    });
};

const deleteMembers = (oID,tID) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        db.query("SELECT * FROM service_provider_team_detail WHERE owner_id=? AND team_member_id=?", [oID,tID], (err, row) => {
            if (row && row.length) {
                try {
                    if (err) {
                        console.log(err);
                        resolve("error");
                    }
                    db.query("DELETE FROM service_provider_team_detail WHERE owner_id=? AND team_member_id=?", [
                        oID,
                        tID,
                    ]);
                    resolve("success");
                } catch (err) {
                    console.log(err);
                    reject("err");
                }
            } else {
                resolve("no_user");
                console.log("No Such User Exists");
            }
        });
    });
};

const addCustomers = (name, number, id) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        
        db.query("INSERT INTO service_provider_customer_master(user_mast_id,cust_phone,cust_name,created_on,last_updated) VALUES(?,?,?,?,?)", [
            id,
            number,
            name,
            new Date(Date.now()),
            new Date(Date.now())
        ], (err, row) => {
            if (!err) {
                console.log('Added customer');
                resolve("Success");
                
            }
            else{
                console.log('ins cust error', err)
                reject(err);
            }
            
        });
    });
};

const getCustomers = (id) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        db.query("SELECT cust_mast_id AS custId, cust_name AS name,cust_phone AS number FROM service_provider_customer_master WHERE user_mast_id=?", [id], (err, row) => {
            if (!err) {
                resolve(row);
                // console.log(row);
            } else {
                console.log(err);
                reject(err);
            }
        });
    });
};

const addWork = (spId,custId,date,todos) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        
        db.query("INSERT INTO service_provider_work_list(service_provider_id,work_plan_date,cust_mast_id,work_desc,created_on,last_updated) VALUES(?,?,?,?,?,?)", [
            spId,
            new Date(date),
            custId,
            todos,
            new Date(Date.now()),
            new Date(Date.now())
        ], (err, row) => {
            if(!err)
            {
                
                resolve("Success");
            }
            else{
                console.log('error add work:',err);
                reject(err);
            }
        }
        );
    });
};

const getTodaysWork = (id) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        
        db.query("SELECT spwl.work_list_id AS work_id, spcm.cust_name AS name, spcm.address1 AS addr, spcm.cust_phone  FROM service_provider_work_list spwl INNER JOIN service_provider_customer_master spcm USING(cust_mast_id) WHERE spwl.service_provider_id=? AND Date(spwl.work_plan_date)=curdate() ", [id], (err, row) => {
            if (!err) {
                console.log('row',row);
                resolve(row);
                // console.log(row);
            } else {
                console.log('err',err);
                reject(err);
            }
        });
    });
};

const updateWork = (workId,name,serv,amnt,wDetails,pmtMethod,nxtDate,nxtWork) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        
        db.query("UPDATE service_provider_work_list SET work_desc=?,work_done_detail=?,payment_mode=?,amount=?,work_comp_date=?,last_updated=? WHERE work_list_id=?", [
            serv,
            wDetails,
            pmtMethod[0],
            amnt,
            new Date(Date.now()),
            new Date(Date.now()),
            workId
        ], (err, row) => {
            if(!err)
            {
                db.query("SELECT service_provider_id,cust_mast_id FROM service_provider_work_list WHERE work_list_id=?",[workId]
                ,((err,row)=>{
                    if(!err)
                    {
                        // console.log('result',row[0]);
                        addWork(row[0].service_provider_id,row[0].cust_mast_id,nxtDate,nxtWork);
                    }
                    else{
                        console.log('error',err);
                        reject(err);
                    }
                }));
                
                
                resolve("Success");
            }
            else{
                console.log('error add work:',err);
                reject(err);
            }
        }
        );
    });
};

const getUserServices = (id) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        db.query("SELECT sm.serv_id,sm.serv_name FROM service_master sm INNER JOIN service_provider_detail spd ON sm.serv_id=spd.serv_id WHERE spd.user_mast_id=?",[
            id
        ],
         (err, row) => {
            if (!err) {
                resolve(row);
                // console.log(row);
            } else reject(err);
        });
    });
};


module.exports = {
    getconnection,
    updateDetails,
    login_new,
    addMembers,
    logout,
    getData,
    addServices,
    getServices,
    checkToken,
    getMembers,
    deleteMembers,
    addCustomers,
    getCustomers,
    addWork,
    getTodaysWork,
    updateWork,
    getUserServices,
};
