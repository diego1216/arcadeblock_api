CREATE DATABASE IF NOT EXISTS Arcadeblog;
USE Arcadeblog;

-- TABLAS 

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

create table if not exists metodosCifrado (
    id int auto_increment primary key,
    nombre varchar(255) not null
);

create table if not exists historial (
    id int auto_increment primary key,
    id_usuario int,
    texto_original text,
    texto_cifrado text,
    foreign key (id_usuario) references usuarios(id)
);

CREATE TABLE IF NOT EXISTS textos_MetodosCifrado (
    id_texto INT,
    id_metodo_cifrado INT,
    FOREIGN KEY (id_texto) REFERENCES historial(id),
    FOREIGN KEY (id_metodo_cifrado) REFERENCES metodosCifrado(id)
);

CREATE TABLE IF NOT EXISTS sessions (
    session_id VARCHAR(255) NOT NULL PRIMARY KEY,
    expires int NOT NULL,
    data mediumtext not null
);
ALTER TABLE historial ADD INDEX idx_usuario (id_usuario);

-- INSERTAR DATOS INICIALES

INSERT INTO metodosCifrado (nombre) VALUES 
('Cifrado Cesar'),
('Base64'),
('Hexadecimal'),
('Binario');





UPDATE sessions SET expires = FROM_UNIXTIME(1715712406) WHERE session_id = 'valor_de_la_session_id';

-- CONSULTAS DE PRUEBA
DROP DATABASE IF EXISTS transmask;

DROP TABLE usuarios;

ALTER TABLE usuarios CHANGE email email varchar(250);

SELECT * FROM usuarios;
SELECT * FROM metodosCifrado;
SELECT * FROM historial;

SELECT * FROM sessions;