const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const getconnection = () => {
    const con = mysql.createConnection({
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "sahayak",
    });
    return con;
};

// const checkToken = (number) => {
//     return new Promise((resolve, reject) => {
//         const db = getconnection();
//         db.query("Select jwt from USERS where number=?", [number], (err, row) => {
//             if (!err) {
//                 resolve(row[0].jwt);
//             } else {
//                 reject(err);
//             }
//         });
//     });
// };

const getData = (number) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        db.query("select * from service_provider_master where phone =?", [number], (err, row) => {
            if (!err) {
                resolve(row);
                console.log(row);
            } else reject(err);
        });
    });
};

const login = (number) => {
    return new Promise((resolve, reject) => {
        const jwToken = jwt.sign({ id: number }, process.env.TOKEN_KEY);
        const db = getconnection();

        const dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');


        db.query(
            "SELECT phone FROM service_provider_master WHERE phone=?",
            [number],
            (err, row) => {
                if (row && row.length) {
                    try {

                        db.query("update service_provider_master set last_updated=? where phone=?", [dateTime, number])
                        resolve({
                            jwToken: jwToken,
                            res: "success",
                        });
                    } catch (e) {
                        console.log(e);
                        reject(e);
                    }
                } else {
                    try {
                        db.query("INSERT INTO service_provider_master(phone,created_on,last_updated) VALUES(?,?,?)", [number, dateTime, dateTime]);

                        resolve({
                            jwToken: jwToken,
                            res: "success",
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
        db.query(
            "UPDATE  service_provider_master SET status=?,email=?,first_name=?,last_name=?,address1=?,address2=?,city=?,pin=?,state=?,photo=?,locality_of_work=?,highlights=?,user_type=?,longitude=?,enterprise=?,created_on=?,last_updated=? where phone =?",
            [
                data.status,
                data.email,
                data.first_name,
                data.last_name,
                data.address1,
                data.address2,
                data.city,
                data.pin,
                data.state,
                data.photo,
                data.locality_of_work,
                data.highlights,
                data.user_type,
                data.longitude,
                data.enterprise,
                data.created_on,
                data.last_updated,
                data.phone

            ],
            (err, res) => {
                if (!err) {
                    console.log("Data Inserted Successfully ", res);
                    resolve();
                } else reject(err);
            }
        );
    });
};

const logout = (number) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        db.query("UPDATE USERS SET jwt=NULL WHERE number=?", [number]);
        resolve();
    });
};

const addMembers = (number, pNumber) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        db.query("select * from USERS where number=?", [number], (err, row) => {
            if (row && row.length) {
                try {
                    if (err) {
                        console.log(err);
                        resolve("error");
                    }
                    db.query("update USERS set parent=? where number=?", [
                        pNumber,
                        number,
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

module.exports = {
    getconnection,
    updateDetails,
    login,
    addMembers,
    logout,
    getData,
    checkToken,
};
