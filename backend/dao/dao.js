const mysql = require("mysql");


const getconnection = () => {
    const con = mysql.createConnection({
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "sahayak"
    })
    return con;
}



const insertNumber = (number) => {

    return new Promise((resolve, reject) => {

        const db = getconnection();
        db.query("INSERT INTO USERS(number) VALUES(?)", [number], (err, res) => {
            if (!err) {
                console.log("Number inserted successfully ", res);
                resolve();
            }
            else {
                throw err;
            }

        })
    })

}

const updateDetails = (data) => {
    return new Promise((resolve, reject) => {

        const db = getconnection();
        db.query("UPDATE  USERS SET name=?,img=?,addr=?,locality=?,city=?,pin=?,area=?,service=?,hghlts=? where number =?", [data.name, data.img, data.addr, data.locality, data.city, data.pin, data.area, data.service, data.hghlts, data.number], (err, res) => {
            if (!err) {
                console.log("Data Inserted Successfully ", res);
                resolve();
            }
            else
                throw err;
        })
    })

}




module.exports = { getconnection, updateDetails, insertNumber };