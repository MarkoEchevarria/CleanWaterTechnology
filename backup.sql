--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    id_admin character varying(100) NOT NULL,
    nombre_usuario character varying(100),
    password character varying(100),
    correo character varying(100)
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: certificado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.certificado (
    id_certificado integer NOT NULL,
    fecha_emision date,
    descripcion character varying(255),
    id_curso_empleado integer NOT NULL
);


ALTER TABLE public.certificado OWNER TO postgres;

--
-- Name: curso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.curso (
    id_curso uuid NOT NULL,
    nombre character varying(255),
    descripcion character varying(255),
    fecha_creacion date,
    num_modulos integer,
    codigo character varying(10)
);


ALTER TABLE public.curso OWNER TO postgres;

--
-- Name: curso_empleado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.curso_empleado (
    id_curso uuid,
    id_empleado uuid,
    fecha_inscripcion date,
    id_curso_empleado integer NOT NULL
);


ALTER TABLE public.curso_empleado OWNER TO postgres;

--
-- Name: curso_empleado_id_curso_empleado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.curso_empleado_id_curso_empleado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.curso_empleado_id_curso_empleado_seq OWNER TO postgres;

--
-- Name: curso_empleado_id_curso_empleado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.curso_empleado_id_curso_empleado_seq OWNED BY public.curso_empleado.id_curso_empleado;


--
-- Name: empleado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empleado (
    id_empleado uuid NOT NULL,
    nombre character varying(255) NOT NULL,
    apellido character varying(255) NOT NULL,
    dni character varying(255) NOT NULL,
    rol character varying(255) NOT NULL,
    fecha_registro date NOT NULL,
    correo character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.empleado OWNER TO postgres;

--
-- Name: evaluacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluacion (
    id_modulo integer,
    url character varying(255),
    fecha_programada timestamp without time zone,
    public_id character varying(255),
    id_evaluacion integer NOT NULL
);


ALTER TABLE public.evaluacion OWNER TO postgres;

--
-- Name: evaluacion_empleado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluacion_empleado (
    id_modulo integer NOT NULL,
    puntuacion integer,
    fecha timestamp without time zone,
    id_empleado uuid NOT NULL,
    url character varying(255),
    public_id character varying(255),
    id_evaluacion_empleado integer NOT NULL
);


ALTER TABLE public.evaluacion_empleado OWNER TO postgres;

--
-- Name: evaluacion_empleado_id_evaluacion_empleado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evaluacion_empleado_id_evaluacion_empleado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evaluacion_empleado_id_evaluacion_empleado_seq OWNER TO postgres;

--
-- Name: evaluacion_empleado_id_evaluacion_empleado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evaluacion_empleado_id_evaluacion_empleado_seq OWNED BY public.evaluacion_empleado.id_evaluacion_empleado;


--
-- Name: evaluacion_id_evaluacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evaluacion_id_evaluacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evaluacion_id_evaluacion_seq OWNER TO postgres;

--
-- Name: evaluacion_id_evaluacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evaluacion_id_evaluacion_seq OWNED BY public.evaluacion.id_evaluacion;


--
-- Name: modulo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modulo (
    id_modulo integer NOT NULL,
    id_curso uuid,
    titulo character varying(255),
    descripcion character varying(255),
    numeracion integer,
    nota_modulo integer
);


ALTER TABLE public.modulo OWNER TO postgres;

--
-- Name: multimedia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.multimedia (
    id_modulo integer NOT NULL,
    url character varying(255) NOT NULL,
    id_multimedia integer NOT NULL,
    public_id character varying(255)
);


ALTER TABLE public.multimedia OWNER TO postgres;

--
-- Name: multimedia_id_multimedia_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.multimedia_id_multimedia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.multimedia_id_multimedia_seq OWNER TO postgres;

--
-- Name: multimedia_id_multimedia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.multimedia_id_multimedia_seq OWNED BY public.multimedia.id_multimedia;


--
-- Name: curso_empleado id_curso_empleado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.curso_empleado ALTER COLUMN id_curso_empleado SET DEFAULT nextval('public.curso_empleado_id_curso_empleado_seq'::regclass);


--
-- Name: evaluacion id_evaluacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion ALTER COLUMN id_evaluacion SET DEFAULT nextval('public.evaluacion_id_evaluacion_seq'::regclass);


--
-- Name: evaluacion_empleado id_evaluacion_empleado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion_empleado ALTER COLUMN id_evaluacion_empleado SET DEFAULT nextval('public.evaluacion_empleado_id_evaluacion_empleado_seq'::regclass);


--
-- Name: multimedia id_multimedia; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.multimedia ALTER COLUMN id_multimedia SET DEFAULT nextval('public.multimedia_id_multimedia_seq'::regclass);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (id_admin, nombre_usuario, password, correo) FROM stdin;
12345	marko	marko123	marko@gmail.com
1	admin	admin	admin@gmail.com
2	a	11112222	a@gmail.com
\.


--
-- Data for Name: certificado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.certificado (id_certificado, fecha_emision, descripcion, id_curso_empleado) FROM stdin;
1	2025-02-12	certificado del curso ...	4
\.


--
-- Data for Name: curso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.curso (id_curso, nombre, descripcion, fecha_creacion, num_modulos, codigo) FROM stdin;
a867a8fe-523d-475c-9354-33f5a95b0918	Python Intermedio	Curso de Python con énfasis en OOP	2024-02-01	90	\N
676749dc-fa5b-4551-ac0e-89db47475147	HTML y CSS	Diseño web con HTML5 y CSS3	2024-01-20	88	\N
109c79e2-3c17-43f5-b812-d6a883ade4df	SQL Avanzado	Optimizacion de consultas en SQL	2024-03-05	92	\N
849ca8cf-7c4c-4c2e-a345-3feffe213c4e	React.js	Desarrollo de interfaces con React	2024-02-10	87	\N
10381a49-365e-4c04-aec6-37afaad8241b	Node.js	Backend con Node.js y Express	2024-03-15	89	\N
23a4c19b-8b5a-4b96-83bb-2bfdd8a645df	JavaScript Basico	Introducción a JavaScript	2024-01-15	85	codigo1234
\.


--
-- Data for Name: curso_empleado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.curso_empleado (id_curso, id_empleado, fecha_inscripcion, id_curso_empleado) FROM stdin;
109c79e2-3c17-43f5-b812-d6a883ade4df	21aec45d-29f2-4aeb-a1bb-9bc8f7cebc81	2025-02-08	4
a867a8fe-523d-475c-9354-33f5a95b0918	21aec45d-29f2-4aeb-a1bb-9bc8f7cebc81	2025-02-10	5
23a4c19b-8b5a-4b96-83bb-2bfdd8a645df	21aec45d-29f2-4aeb-a1bb-9bc8f7cebc81	\N	27
\.


--
-- Data for Name: empleado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empleado (id_empleado, nombre, apellido, dni, rol, fecha_registro, correo, password) FROM stdin;
21aec45d-29f2-4aeb-a1bb-9bc8f7cebc81	fidel	echevarria	11112222	estudiante	2025-02-07	fidel@gmail.com	11112222
\.


--
-- Data for Name: evaluacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evaluacion (id_modulo, url, fecha_programada, public_id, id_evaluacion) FROM stdin;
12	https://res.cloudinary.com/ddkuiecrf/raw/upload/v1740186917/stulv7rjjqqb9wb7zffs.pdf	\N	stulv7rjjqqb9wb7zffs.pdf	10
\.


--
-- Data for Name: evaluacion_empleado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evaluacion_empleado (id_modulo, puntuacion, fecha, id_empleado, url, public_id, id_evaluacion_empleado) FROM stdin;
12	10	\N	21aec45d-29f2-4aeb-a1bb-9bc8f7cebc81	https://res.cloudinary.com/ddkuiecrf/raw/upload/v1740187178/uqapbosbhxrzowm8qujx.pdf	uqapbosbhxrzowm8qujx.pdf	14
11	\N	2025-02-21 21:27:37.619982	21aec45d-29f2-4aeb-a1bb-9bc8f7cebc81	https://res.cloudinary.com/ddkuiecrf/raw/upload/v1740194857/ipytizla8s56swvxyzti.pdf	ipytizla8s56swvxyzti.pdf	15
\.


--
-- Data for Name: modulo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modulo (id_modulo, id_curso, titulo, descripcion, numeracion, nota_modulo) FROM stdin;
1	23a4c19b-8b5a-4b96-83bb-2bfdd8a645df	Introducción a JavaScript	Conceptos básicos y sintaxis	1	85
2	23a4c19b-8b5a-4b96-83bb-2bfdd8a645df	Variables y Tipos de Datos	Uso de variables y tipos en JavaScript	2	86
3	23a4c19b-8b5a-4b96-83bb-2bfdd8a645df	Funciones en JavaScript	Creación y uso de funciones	3	84
4	23a4c19b-8b5a-4b96-83bb-2bfdd8a645df	DOM y Eventos	Manipulación del DOM con eventos	4	88
5	a867a8fe-523d-475c-9354-33f5a95b0918	Fundamentos de Python	Introducción y primeros pasos	1	90
6	a867a8fe-523d-475c-9354-33f5a95b0918	Programación Orientada a Objetos	Clases y objetos en Python	2	89
7	a867a8fe-523d-475c-9354-33f5a95b0918	Manejo de Excepciones	Cómo manejar errores en Python	3	91
8	676749dc-fa5b-4551-ac0e-89db47475147	HTML Básico	Estructura de HTML y etiquetas principales	1	87
9	676749dc-fa5b-4551-ac0e-89db47475147	CSS: Selectores y Estilos	Introducción a CSS y sus selectores	2	88
10	676749dc-fa5b-4551-ac0e-89db47475147	CSS Flexbox y Grid	Diseño avanzado con Flexbox y Grid	3	89
11	109c79e2-3c17-43f5-b812-d6a883ade4df	Introducción a SQL	Conceptos básicos de bases de datos	1	91
12	109c79e2-3c17-43f5-b812-d6a883ade4df	Consultas Avanzadas	Uso de JOINs, subconsultas y optimización	2	92
13	849ca8cf-7c4c-4c2e-a345-3feffe213c4e	JSX y Componentes	Introducción a JSX y componentes en React	1	86
14	849ca8cf-7c4c-4c2e-a345-3feffe213c4e	Estado y Props	Manejo de estado y propiedades	2	87
15	849ca8cf-7c4c-4c2e-a345-3feffe213c4e	Hooks en React	Uso de useState, useEffect, y más	3	88
16	849ca8cf-7c4c-4c2e-a345-3feffe213c4e	Node.js y Express	Introducción a Node.js y Express	1	88
17	849ca8cf-7c4c-4c2e-a345-3feffe213c4e	Middleware en Express	Implementación de middlewares	2	89
18	849ca8cf-7c4c-4c2e-a345-3feffe213c4e	API REST con Node.js	Creación de APIs REST con Express	3	90
19	10381a49-365e-4c04-aec6-37afaad8241b	Seguridad en Node.js	Autenticación y autorización	4	91
20	10381a49-365e-4c04-aec6-37afaad8241b	Despliegue con Node.js	Deploy en servidores y plataformas	5	90
\.


--
-- Data for Name: multimedia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.multimedia (id_modulo, url, id_multimedia, public_id) FROM stdin;
1	https://res.cloudinary.com/ddkuiecrf/video/upload/v1739913001/uuhqqlldlrtdvjuhitj6.mp4	20	uuhqqlldlrtdvjuhitj6
5	https://res.cloudinary.com/ddkuiecrf/video/upload/v1740000932/jobddwdxd5wnqi4ddskt.mp4	21	jobddwdxd5wnqi4ddskt
11	https://res.cloudinary.com/ddkuiecrf/video/upload/v1740001688/nqf4xkshsb9f3canb6sq.mp4	22	nqf4xkshsb9f3canb6sq
\.


--
-- Name: curso_empleado_id_curso_empleado_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.curso_empleado_id_curso_empleado_seq', 27, true);


--
-- Name: evaluacion_empleado_id_evaluacion_empleado_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evaluacion_empleado_id_evaluacion_empleado_seq', 15, true);


--
-- Name: evaluacion_id_evaluacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evaluacion_id_evaluacion_seq', 10, true);


--
-- Name: multimedia_id_multimedia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.multimedia_id_multimedia_seq', 25, true);


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id_admin);


--
-- Name: certificado certificado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificado
    ADD CONSTRAINT certificado_pkey PRIMARY KEY (id_certificado);


--
-- Name: curso_empleado curso_empleado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.curso_empleado
    ADD CONSTRAINT curso_empleado_pkey PRIMARY KEY (id_curso_empleado);


--
-- Name: curso curso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.curso
    ADD CONSTRAINT curso_pkey PRIMARY KEY (id_curso);


--
-- Name: empleado empleado_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_correo_key UNIQUE (correo);


--
-- Name: empleado empleado_dni_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_dni_key UNIQUE (dni);


--
-- Name: empleado empleado_id_empleado_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_id_empleado_key UNIQUE (id_empleado);


--
-- Name: empleado empleado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_pkey PRIMARY KEY (id_empleado);


--
-- Name: evaluacion_empleado evaluacion_empleado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion_empleado
    ADD CONSTRAINT evaluacion_empleado_pkey PRIMARY KEY (id_evaluacion_empleado);


--
-- Name: evaluacion evaluacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion
    ADD CONSTRAINT evaluacion_pkey PRIMARY KEY (id_evaluacion);


--
-- Name: modulo modulo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulo
    ADD CONSTRAINT modulo_pkey PRIMARY KEY (id_modulo);


--
-- Name: multimedia multimedia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.multimedia
    ADD CONSTRAINT multimedia_pkey PRIMARY KEY (id_multimedia);


--
-- Name: certificado certificado_id_curso_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificado
    ADD CONSTRAINT certificado_id_curso_empleado_fkey FOREIGN KEY (id_curso_empleado) REFERENCES public.curso_empleado(id_curso_empleado) NOT VALID;


--
-- Name: curso_empleado curso_empleado_id_curso_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.curso_empleado
    ADD CONSTRAINT curso_empleado_id_curso_fkey FOREIGN KEY (id_curso) REFERENCES public.curso(id_curso) NOT VALID;


--
-- Name: curso_empleado curso_empleado_id_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.curso_empleado
    ADD CONSTRAINT curso_empleado_id_empleado_fkey FOREIGN KEY (id_empleado) REFERENCES public.empleado(id_empleado) NOT VALID;


--
-- Name: evaluacion evaluacion_id_modulo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion
    ADD CONSTRAINT evaluacion_id_modulo_fkey FOREIGN KEY (id_modulo) REFERENCES public.modulo(id_modulo);


--
-- Name: modulo modulo_id_curso_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulo
    ADD CONSTRAINT modulo_id_curso_fkey FOREIGN KEY (id_curso) REFERENCES public.curso(id_curso) NOT VALID;


--
-- Name: multimedia multimedia_id_modulo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.multimedia
    ADD CONSTRAINT multimedia_id_modulo_fkey FOREIGN KEY (id_modulo) REFERENCES public.modulo(id_modulo);


--
-- Name: evaluacion_empleado resultado_evaluacion_id_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion_empleado
    ADD CONSTRAINT resultado_evaluacion_id_empleado_fkey FOREIGN KEY (id_empleado) REFERENCES public.empleado(id_empleado) NOT VALID;


--
-- Name: evaluacion_empleado resultado_evaluacion_id_modulo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion_empleado
    ADD CONSTRAINT resultado_evaluacion_id_modulo_fkey FOREIGN KEY (id_modulo) REFERENCES public.modulo(id_modulo) NOT VALID;


--
-- PostgreSQL database dump complete
--

