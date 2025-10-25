
CREATE DATABASE contactodb;

USE contactodb;

CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    mensaje TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE DATABASE reservasdb;

USE reservasdb;

CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL COMMENT 'restaurante, hotel o bar',
    lugar VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    fecha DATE NOT NULL,
    hora VARCHAR(10) NULL COMMENT 'Para restaurantes y bares',
    personas INT NULL COMMENT 'Para restaurantes, bares y hoteles',
    noches INT NULL COMMENT 'Solo para hoteles',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tipo (tipo),
    INDEX idx_lugar (lugar),
    INDEX idx_fecha (fecha)
);

CREATE DATABASE resenasdb;

USE resenasdb;

CREATE TABLE resenas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lugarId VARCHAR(50) NOT NULL COMMENT 'ID del lugar (ej: montana7, elbocadodelrey)',
    nombre VARCHAR(100) NOT NULL,
    comentario TEXT NOT NULL,
    calificacion VARCHAR(20) NOT NULL COMMENT 'Estrellas en formato emoji',
    fecha VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_lugarId (lugarId),
    INDEX idx_created_at (created_at)
);