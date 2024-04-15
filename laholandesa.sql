create database sistema_de_compra_venta_para_la_holandesa;

use sistema_de_compra_venta_para_la_holandesa;

select * from categoria;

--tabla categoria
create table categoria(
	id_categoria integer primary key identity,
	nombre_categoria nvarchar(50) COLLATE SQL_Latin1_General_CP1_CS_AS unique  not null ,
	descripcion nvarchar(256) null,
	fecha_registro date not null,
	estado bit default(1)
);

insert into categoria (nombre_categoria,descripcion,fecha_registro) 
values ('Quesos','El queso es un alimento lácteo producido mediante la coagulación de la leche,','2023-01-13');
insert into categoria (nombre_categoria,descripcion,fecha_registro) 
values ('Yogurts','El yogur es un producto lácteo obtenido mediante la fermentación bacteriana de la leche.','2023-01-13');
insert into categoria (nombre_categoria,descripcion,fecha_registro) 
values ('Mantequillas','La mantequilla es un producto lácteo obtenido al batir o agitar la crema de leche,','2023-01-13');
insert into categoria (nombre_categoria,descripcion,fecha_registro) 
values ('Cremas','La crema es un producto lácteo que se obtiene al separar la grasa de la leche.','2023-01-13');
insert into categoria (nombre_categoria,descripcion,fecha_registro) 
values ('otros','Esta categoria incluye productos lácteos que no se ajustan facilmente a las categorias anteriores','2023-01-13');
select * from categoria;

--tabla medida
create table medida(
	id_medida integer primary key identity,
	nombre_medida nvarchar(50) COLLATE SQL_Latin1_General_CP1_CS_AS unique  not null ,
	descripcion nvarchar(256) null,
	fecha_registro date not null,
	estado bit default(1)
);

insert into medida (nombre_medida,descripcion,fecha_registro)
values ('Unidad','Unidad de medida para productos individuales','2023-01-13');
insert into medida (nombre_medida,descripcion,fecha_registro)
values ('Litro','Unidad de medida para productos liquidos','2023-01-13');
insert into medida (nombre_medida,descripcion,fecha_registro)
values ('Kilogramo','Unidad de medida para productos en peso','2023-01-13');
select * from medida;

--tabla usuario
create table usuario(
       id_usuario integer primary key identity,
       nombres nvarchar(150) COLLATE SQL_Latin1_General_CP1_CS_AS not null,
       apellidos nvarchar(150) COLLATE SQL_Latin1_General_CP1_CS_AS not null,
       perfil nvarchar(20) COLLATE SQL_Latin1_General_CP1_CS_AS null,
       usuario nvarchar(100) COLLATE SQL_Latin1_General_CP1_CS_AS unique not null,
       contraseña nvarchar(200) COLLATE SQL_Latin1_General_CP1_CS_AS not null,
       foto image null,
       fecha_registro date not null,
       ultimo_login datetime2 null,
       estado bit default(1),
);

INSERT INTO usuario (nombres, apellidos, perfil, usuario, contraseña, foto, fecha_registro, ultimo_login)
VALUES ('Admin', 'Admin', 'Administrador', 'eduardo', '$2a$12$p7nbpolyn/E1GV8EYzGgE.kssTEvozi7ncTLC3HAkQqBjxhqCbSRm', NULL, GETDATE(), GETDATE());
select * from usuario;

--tabla proveedor
create table proveedor
(
	id_proveedor integer primary key identity,
	nombre_proveedor nvarchar(100) COLLATE SQL_Latin1_General_CP1_CS_AS unique  not null ,
	telefono integer null,
	descripcion nvarchar(256) COLLATE SQL_Latin1_General_CP1_CS_AS null,
	direccion nvarchar(256) COLLATE SQL_Latin1_General_CP1_CS_AS not null,
	fecha_registro date not null,
	estado bit default(1)
);

select * from proveedor;

insert into proveedor(nombre_proveedor,telefono,descripcion,direccion,fecha_registro) 
values ('Menonitas Quesos','76347978','Productor de quesos menonitas tradicionales','Calle principal #123 Colonia menonita','2022-01-15');












--POSTGRES

CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(50) COLLATE "C" UNIQUE NOT NULL,
    descripcion VARCHAR(256) NULL,
    fecha_registro DATE NOT NULL,
    estado BOOLEAN DEFAULT TRUE
);

insert into categoria (nombre_categoria,descripcion,fecha_registro) 
values ('Quesos','El queso es un alimento lácteo producido mediante la coagulación de la leche,','2023-01-13');
insert into categoria (nombre_categoria,descripcion,fecha_registro) 
values ('Yogurts','El yogur es un producto lácteo obtenido mediante la fermentación bacteriana de la leche.','2023-01-13');
insert into categoria (nombre_categoria,descripcion,fecha_registro) 
values ('Mantequillas','La mantequilla es un producto lácteo obtenido al batir o agitar la crema de leche,','2023-01-13');
insert into categoria (nombre_categoria,descripcion,fecha_registro) 
values ('Cremas','La crema es un producto lácteo que se obtiene al separar la grasa de la leche.','2023-01-13');
insert into categoria (nombre_categoria,descripcion,fecha_registro) 
values ('otros','Esta categoria incluye productos lácteos que no se ajustan facilmente a las categorias anteriores','2023-01-13');
select * from categoria;



CREATE TABLE medida (
    id_medida SERIAL PRIMARY KEY,
    nombre_medida VARCHAR(50) COLLATE "C" UNIQUE NOT NULL,
    descripcion VARCHAR(256) NULL,
    fecha_registro DATE NOT NULL,
    estado BOOLEAN DEFAULT TRUE
);

insert into medida (nombre_medida,descripcion,fecha_registro)
values ('Unidad','Unidad de medida para productos individuales','2023-01-13');
insert into medida (nombre_medida,descripcion,fecha_registro)
values ('Litro','Unidad de medida para productos liquidos','2023-01-13');
insert into medida (nombre_medida,descripcion,fecha_registro)
values ('Kilogramo','Unidad de medida para productos en peso','2023-01-13');
select * from medida;

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombres VARCHAR(150) COLLATE "C" NOT NULL,
    apellidos VARCHAR(150) COLLATE "C" NOT NULL,
    perfil VARCHAR(20) COLLATE "C" NULL,
    usuario VARCHAR(100) COLLATE "C" UNIQUE NOT NULL,
    contraseña VARCHAR(200) COLLATE "C" NOT NULL,
    fecha_registro DATE NOT NULL,
    estado BOOLEAN DEFAULT TRUE
);

INSERT INTO usuario (nombres, apellidos, perfil, usuario, contraseña, fecha_registro)
VALUES ('Admin', 'Admin', 'Administrador', 'eduardo', '$2a$12$p7nbpolyn/E1GV8EYzGgE.kssTEvozi7ncTLC3HAkQqBjxhqCbSRm', CURRENT_DATE);
select * from usuario;


CREATE TABLE proveedor (
    id_proveedor SERIAL PRIMARY KEY,
    nombre_proveedor VARCHAR(100) COLLATE "C" UNIQUE NOT NULL,
    telefono INTEGER NULL,
    descripcion VARCHAR(256) COLLATE "C" NULL,
    direccion VARCHAR(256) COLLATE "C" NOT NULL,
    fecha_registro DATE NOT NULL,
    estado BOOLEAN DEFAULT TRUE
);

insert into proveedor(nombre_proveedor,telefono,descripcion,direccion,fecha_registro) 
values ('Menonitas Quesos','76347978','Productor de quesos menonitas tradicionales','Calle principal #123 Colonia menonita','2022-01-15');

select * from proveedor;