--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.1

-- Started on 2024-12-17 12:29:16

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
-- TOC entry 220 (class 1259 OID 16390)
-- Name: BMS Table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BMS Table" (
    author_id integer NOT NULL,
    category_id integer NOT NULL,
    book_id integer NOT NULL
);


ALTER TABLE public."BMS Table" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16387)
-- Name: BMS Table_author_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BMS Table_author_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BMS Table_author_id_seq" OWNER TO postgres;

--
-- TOC entry 4802 (class 0 OID 0)
-- Dependencies: 217
-- Name: BMS Table_author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BMS Table_author_id_seq" OWNED BY public."BMS Table".author_id;


--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: BMS Table_book_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BMS Table_book_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BMS Table_book_id_seq" OWNER TO postgres;

--
-- TOC entry 4803 (class 0 OID 0)
-- Dependencies: 219
-- Name: BMS Table_book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BMS Table_book_id_seq" OWNED BY public."BMS Table".book_id;


--
-- TOC entry 218 (class 1259 OID 16388)
-- Name: BMS Table_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BMS Table_category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BMS Table_category_id_seq" OWNER TO postgres;

--
-- TOC entry 4804 (class 0 OID 0)
-- Dependencies: 218
-- Name: BMS Table_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BMS Table_category_id_seq" OWNED BY public."BMS Table".category_id;


--
-- TOC entry 4643 (class 2604 OID 16393)
-- Name: BMS Table author_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BMS Table" ALTER COLUMN author_id SET DEFAULT nextval('public."BMS Table_author_id_seq"'::regclass);


--
-- TOC entry 4644 (class 2604 OID 16401)
-- Name: BMS Table category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BMS Table" ALTER COLUMN category_id SET DEFAULT nextval('public."BMS Table_category_id_seq"'::regclass);


--
-- TOC entry 4645 (class 2604 OID 16395)
-- Name: BMS Table book_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BMS Table" ALTER COLUMN book_id SET DEFAULT nextval('public."BMS Table_book_id_seq"'::regclass);


--
-- TOC entry 4796 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: BMS Table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BMS Table" (author_id, category_id, book_id) FROM stdin;
2345	6789	123
23459	67809	1232
\.


--
-- TOC entry 4805 (class 0 OID 0)
-- Dependencies: 217
-- Name: BMS Table_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."BMS Table_author_id_seq"', 1, false);


--
-- TOC entry 4806 (class 0 OID 0)
-- Dependencies: 219
-- Name: BMS Table_book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."BMS Table_book_id_seq"', 1, false);


--
-- TOC entry 4807 (class 0 OID 0)
-- Dependencies: 218
-- Name: BMS Table_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."BMS Table_category_id_seq"', 1, false);


--
-- TOC entry 4647 (class 2606 OID 16403)
-- Name: BMS Table BMS Table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BMS Table"
    ADD CONSTRAINT "BMS Table_pkey" PRIMARY KEY (author_id, category_id, book_id);


-- Completed on 2024-12-17 12:29:17

--
-- PostgreSQL database dump complete
--

