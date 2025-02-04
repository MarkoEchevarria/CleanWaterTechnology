CREATE TABLE "curso" (
  "id_curso" integer PRIMARY KEY,
  "nombre" varchar(255),
  "descripcion" varchar(255),
  "fecha_creacion" timestamp,
  "nota_final" integer
);

CREATE TABLE "empleado" (
  "id_empleado" integer PRIMARY KEY,
  "nombre" varchar(255),
  "apellido" varchar(255),
  "email" varchar(255),
  "dni" varchar(255),
  "rol" varchar(255),
  "fecha_registro" timestamp
);

CREATE TABLE "curso_empleado" (
  "id_curso_empleado" integer PRIMARY KEY,
  "id_curso" integer,
  "id_empleado" integer,
  "fecha_inscripcion" timestamp
);

CREATE TABLE "certificado" (
  "id_certificado" integer PRIMARY KEY,
  "curso_empleado" integer,
  "fecha_emision" timestamp,
  "descricion" varchar(255)
);

CREATE TABLE "modulo" (
  "id_modulo" integer PRIMARY KEY,
  "id_curso" integer,
  "titulo" varchar(255),
  "descripcion" varchar(255),
  "numeracion" integer,
  "nota_modulo" integer
);

CREATE TABLE "multimedia" (
  "id_multimedia" integer PRIMARY KEY,
  "id_modulo" integer,
  "nombre" varchar(255),
  "tipo" varchar(255),
  "duracion" integer
);

CREATE TABLE "evaluacion" (
  "id_evaluacion" integer PRIMARY KEY,
  "id_modulo" integer,
  "descripcion" varchar(255),
  "fecha_programada" timestamp
);

CREATE TABLE "resultado_evaluacion" (
  "id_resultado_evaluacion" integer PRIMARY KEY,
  "id_evaluacion" integer,
  "puntuacion" integer,
  "fecha" timestamp,
  "num_intentos" integer
);

ALTER TABLE "curso_empleado" ADD FOREIGN KEY ("id_curso") REFERENCES "curso" ("id_curso");

ALTER TABLE "curso_empleado" ADD FOREIGN KEY ("id_empleado") REFERENCES "empleado" ("id_empleado");

ALTER TABLE "certificado" ADD FOREIGN KEY ("curso_empleado") REFERENCES "curso_empleado" ("id_curso_empleado");

ALTER TABLE "modulo" ADD FOREIGN KEY ("id_curso") REFERENCES "curso" ("id_curso");

ALTER TABLE "multimedia" ADD FOREIGN KEY ("id_modulo") REFERENCES "modulo" ("id_modulo");

ALTER TABLE "evaluacion" ADD FOREIGN KEY ("id_modulo") REFERENCES "modulo" ("id_modulo");

ALTER TABLE "resultado_evaluacion" ADD FOREIGN KEY ("id_evaluacion") REFERENCES "evaluacion" ("id_evaluacion");
