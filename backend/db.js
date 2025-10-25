require('dotenv').config();
const mysql = require('mysql2');

const conexionContactos = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_CONTACTOS,
    port: process.env.DB_PORT
});

const conexionReservas = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_RESERVAS,
    port: process.env.DB_PORT
});

const conexionResenas = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_RESENAS,
    port: process.env.DB_PORT
});

conexionContactos.connect((err) => {
    if (err) {
        console.error('Error conectando a contactodb:', err);
        return;
    }
    console.log('Conectado a contactodb');
});

conexionReservas.connect((err) => {
    if (err) {
        console.error('Error conectando a reservasdb:', err);
        return;
    }
    console.log('Conectado a reservasdb');
});

conexionResenas.connect((err) => {
    if (err) {
        console.error('Error conectando a resenasdb:', err);
        return;
    }
    console.log('Conectado a resenasdb');
});

module.exports = {
    conexionContactos,
    conexionReservas,
    conexionResenas
};