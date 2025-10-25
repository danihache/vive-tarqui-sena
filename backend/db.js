const mysql = require("mysql2");

const conexionContactos = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "contactodb"
});

const conexionReservas = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "reservasdb"
});

const conexionResenas = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "resenasdb"
});

conexionContactos.connect((err) => {
    if(err) {
        console.error("Error conectando a contactodb:", err);
        return;
    }
    console.log("Conectado a contactodb");
});

conexionReservas.connect((err) => {
    if(err) {
        console.error("Error conectando a reservasdb:", err);
        return;
    }
    console.log("Conectado a reservasdb");
});

conexionResenas.connect((err) => {
    if(err) {
        console.error("Error conectando a resenasdb:", err);
        return;
    }
    console.log("Conectado a resenasdb");
});

module.exports = {
    contactos: conexionContactos,
    reservas: conexionReservas,
    resenas: conexionResenas
};