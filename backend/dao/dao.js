const mysql = require("mysql");
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

const checkToken = (number) => {
    return new Promise((resolve, reject) => {
        const db = getconnection();
        db.query("Select jwt from USERS where number=?", [number], (err, row) => {
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
        db.query("select * from USERS where number =?", [number], (err, row) => {
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
        db.query(
            "SELECT number FROM USERS WHERE number=?",
            [number],
            (err, row) => {
                if (row && row.length) {
                    try {
                        db.query("UPDATE USERS SET jwt=? WHERE number=?", [
                            jwToken,
                            number,
                        ]);

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
                        db.query("INSERT INTO USERS(number,jwt) VALUES(?,?)", [
                            number,
                            jwToken,
                        ]);

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
            "UPDATE  USERS SET name=?,img=?,addr=?,locality=?,city=?,pin=?,area=?,service=?,hghlts=? where number =?",
            [
                data.name,
                data.img,
                data.addr,
                data.locality,
                data.city,
                data.pin,
                data.area,
                data.service,
                data.hghlts,
                data.number,
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
