CREATE TABLE productS (
 id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
 name VARCHAR(200)NOT NULL,
 description VARCHAR(200)NOT NULL,
 price DECIMAL(4,2) UNSIGNED NOT NULL,
 discount INTEGER(2) UNSIGNED NOT NULL
)

CREATE TABLE users (
 id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
 first_name VARCHAR(200)NOT NULL,
 last_name VARCHAR(200)NOT NULL,
 email VARCHAR(200)NOT NULL,
 password VARCHAR(200)NOT NULL,
 category VARCHAR(200)NOT NULL,
 image VARCHAR(200)NOT NULL
)

-- AGREGAR COLUMNA
ALTER TABLE products
ADD image VARCHAR(200)NOT NULL

--  MODIFICAR COLUMNA
ALTER TABLE products
MODIFY price DECIMAL(20,2) UNSIGNED NOT NULL;

INSERT INTO "users" ()

