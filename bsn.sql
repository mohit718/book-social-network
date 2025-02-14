--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

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
-- Name: _user; Type: TABLE; Schema: public; Owner: mohit
--

CREATE TABLE public._user (
    id integer NOT NULL,
    account_locked boolean,
    created_date date NOT NULL,
    date_of_birth date,
    email character varying(255),
    enabled boolean,
    first_name character varying(255),
    last_modified_date date,
    last_name character varying(255),
    password character varying(255)
);


ALTER TABLE public._user OWNER TO mohit;

--
-- Name: _user_roles; Type: TABLE; Schema: public; Owner: mohit
--

CREATE TABLE public._user_roles (
    users_id integer NOT NULL,
    roles_id integer NOT NULL
);


ALTER TABLE public._user_roles OWNER TO mohit;

--
-- Name: _user_seq; Type: SEQUENCE; Schema: public; Owner: mohit
--

CREATE SEQUENCE public._user_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public._user_seq OWNER TO mohit;

--
-- Name: book; Type: TABLE; Schema: public; Owner: mohit
--

CREATE TABLE public.book (
    id integer NOT NULL,
    created_by integer NOT NULL,
    created_date timestamp(6) without time zone NOT NULL,
    last_modified_by integer,
    last_modified_date timestamp(6) without time zone,
    archived boolean,
    author_name character varying(255),
    book_cover character varying(255),
    isbn character varying(255),
    shareable boolean,
    synopsis character varying(255),
    title character varying(255),
    owner_id integer
);


ALTER TABLE public.book OWNER TO mohit;

--
-- Name: book_seq; Type: SEQUENCE; Schema: public; Owner: mohit
--

CREATE SEQUENCE public.book_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.book_seq OWNER TO mohit;

--
-- Name: book_transaction_history; Type: TABLE; Schema: public; Owner: mohit
--

CREATE TABLE public.book_transaction_history (
    id integer NOT NULL,
    created_by integer NOT NULL,
    created_date timestamp(6) without time zone NOT NULL,
    last_modified_by integer,
    last_modified_date timestamp(6) without time zone,
    return_approved boolean,
    returned boolean,
    book_id integer,
    user_id integer
);


ALTER TABLE public.book_transaction_history OWNER TO mohit;

--
-- Name: book_transaction_history_seq; Type: SEQUENCE; Schema: public; Owner: mohit
--

CREATE SEQUENCE public.book_transaction_history_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.book_transaction_history_seq OWNER TO mohit;

--
-- Name: feedback; Type: TABLE; Schema: public; Owner: mohit
--

CREATE TABLE public.feedback (
    id integer NOT NULL,
    created_by integer NOT NULL,
    created_date timestamp(6) without time zone NOT NULL,
    last_modified_by integer,
    last_modified_date timestamp(6) without time zone,
    comments character varying(255),
    rating double precision,
    book_id integer
);


ALTER TABLE public.feedback OWNER TO mohit;

--
-- Name: feedback_seq; Type: SEQUENCE; Schema: public; Owner: mohit
--

CREATE SEQUENCE public.feedback_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.feedback_seq OWNER TO mohit;

--
-- Name: role; Type: TABLE; Schema: public; Owner: mohit
--

CREATE TABLE public.role (
    id integer NOT NULL,
    created_date date NOT NULL,
    last_modified_date date,
    name character varying(255)
);


ALTER TABLE public.role OWNER TO mohit;

--
-- Name: role_seq; Type: SEQUENCE; Schema: public; Owner: mohit
--

CREATE SEQUENCE public.role_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_seq OWNER TO mohit;

--
-- Name: token; Type: TABLE; Schema: public; Owner: mohit
--

CREATE TABLE public.token (
    id integer NOT NULL,
    created_at timestamp(6) without time zone,
    expires_at timestamp(6) without time zone,
    token character varying(255),
    validated_at timestamp(6) without time zone,
    user_id integer NOT NULL
);


ALTER TABLE public.token OWNER TO mohit;

--
-- Name: token_seq; Type: SEQUENCE; Schema: public; Owner: mohit
--

CREATE SEQUENCE public.token_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.token_seq OWNER TO mohit;

--
-- Data for Name: _user; Type: TABLE DATA; Schema: public; Owner: mohit
--

COPY public._user (id, account_locked, created_date, date_of_birth, email, enabled, first_name, last_modified_date, last_name, password) FROM stdin;
52	f	2025-02-14	\N	raghu@gmail.com	t	Raghuveer	2025-02-14	Singh	$2a$10$yRrZiV5Uzd2nEI/4xUstaeyVQ/OrJ9uOUiAV5XQq.TibusIwBxdKi
2	f	2025-02-13	\N	admin@gmail.com	t	admin	2025-02-13		$2a$10$UTvbnsXPjiwB80avuw4TqO5iLf4IwcDhaTGTODU7jNeacZDlu3VTe
1	f	2024-12-11	\N	mohit@gmail.com	t	mohit	2024-12-11	Soni	$2a$10$t1wSyA27mSq/YGQK1zAtrO3kCqsWdvS7mBdS2XAoEvSqUrLWkaSsa
\.


--
-- Data for Name: _user_roles; Type: TABLE DATA; Schema: public; Owner: mohit
--

COPY public._user_roles (users_id, roles_id) FROM stdin;
1	1
2	1
52	1
\.


--
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: mohit
--

COPY public.book (id, created_by, created_date, last_modified_by, last_modified_date, archived, author_name, book_cover, isbn, shareable, synopsis, title, owner_id) FROM stdin;
1	1	2024-12-11 08:35:55.394348	1	2024-12-11 08:46:24.320145	f	Sadguru	./uploads\\users\\1\\1733886355485.jpg	11221122	t	It dwelves deep into concious science of the true self, it also explains how our mind, body & soul connects with teh eternal conciousness.	Shiva Cosmic Dance	1
2	2	2025-02-14 19:33:11.199102	2	2025-02-14 19:33:11.292853	f	Alex Michaelides	./uploads\\users\\2\\1739541791276.webp	9781250301697	t	A psychological thriller about a woman who stops speaking after being accused of murdering her husband and the therapist determined to uncover her story.	The Silent Patient	2
3	2	2025-02-14 19:33:29.137736	2	2025-02-14 19:33:29.198205	f	Tara Westover	./uploads\\users\\2\\1739541809181.jpg	9780399590504	t	A memoir detailing the author’s journey from a survivalist upbringing in rural Idaho to earning a Ph.D. from Cambridge University.	Educated	2
4	2	2025-02-14 19:33:45.355124	2	2025-02-14 19:33:45.410205	f	Matt Haig	./uploads\\users\\2\\1739541825397.jpg	9780525559474	t	A novel about a woman who discovers a magical library that allows her to explore different paths her life could have taken.	The Midnight Library	2
5	2	2025-02-14 19:34:05.168381	2	2025-02-14 19:34:05.224631	f	Delia Owens	./uploads\\users\\2\\1739541845209.jpg	9780735219090	t	A coming-of-age story blended with a murder mystery, set in the marshes of North Carolina.	Where the Crawdads Sing	2
6	1	2025-02-14 19:34:36.846831	1	2025-02-14 19:34:36.899622	f	Erin Morgenstern	./uploads\\users\\1\\1739541876884.jpg	9780385534635	t	A fantasy novel about a magical competition between two young illusionists, set in an enchanting circus.	The Night Circus	1
7	1	2025-02-14 19:34:51.319885	1	2025-02-14 19:34:51.366529	f	James Clear	./uploads\\users\\1\\1739541891355.jpg	9780735211292	t	 A self-improvement book that explores the science of habit formation and practical strategies for making small changes that lead to big results.	Atomic Habits	1
8	1	2025-02-14 19:35:06.333458	1	2025-02-14 19:35:06.374338	f	George Orwell	./uploads\\users\\1\\1739541906365.jpg	9780451524935	t	A dystopian novel about a totalitarian regime that uses surveillance and propaganda to control its citizens.	1984	1
9	52	2025-02-14 19:36:16.853829	52	2025-02-14 19:36:16.910707	f	Paulo Coelho	./uploads\\users\\52\\1739541976898.jpg	9780061122415	t	A philosophical novel about a shepherd’s journey to discover his personal legend and fulfill his dreams.	The Alchemist	52
10	52	2025-02-14 19:36:31.920867	52	2025-02-14 19:36:31.985888	f	Markus Zusak	./uploads\\users\\52\\1739541991969.jpg	9780375842207	t	A historical novel set in Nazi Germany, narrated by Death, following a young girl who steals books and shares them with others.	The Book Thief	52
11	52	2025-02-14 19:36:46.074561	52	2025-02-14 19:36:46.134962	f	Mark Manson	./uploads\\users\\52\\1739542006119.jpg	9780062457714	t	 A counterintuitive self-help book that encourages readers to focus on what truly matters and embrace life’s challenges.	The Subtle Art of Not Giving a F*ck	52
\.


--
-- Data for Name: book_transaction_history; Type: TABLE DATA; Schema: public; Owner: mohit
--

COPY public.book_transaction_history (id, created_by, created_date, last_modified_by, last_modified_date, return_approved, returned, book_id, user_id) FROM stdin;
2	1	2025-02-14 19:40:49.514393	52	2025-02-14 19:42:14.384422	t	t	10	1
1	1	2025-02-14 19:40:41.640093	52	2025-02-14 19:42:15.612249	t	t	11	1
\.


--
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: mohit
--

COPY public.feedback (id, created_by, created_date, last_modified_by, last_modified_date, comments, rating, book_id) FROM stdin;
1	1	2025-02-14 19:41:22.229659	\N	\N	Nice one	3	10
2	1	2025-02-14 19:41:35.613358	\N	\N	Nice one	3	11
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: mohit
--

COPY public.role (id, created_date, last_modified_date, name) FROM stdin;
1	2024-12-11	\N	USER
2	2024-12-11	\N	MANAGER
3	2024-12-11	\N	ADMIN
4	2024-12-11	\N	AUTHOR
\.


--
-- Data for Name: token; Type: TABLE DATA; Schema: public; Owner: mohit
--

COPY public.token (id, created_at, expires_at, token, validated_at, user_id) FROM stdin;
1	2024-12-11 08:33:30.08095	2024-12-11 08:43:30.08095	124600	2024-12-11 08:34:06.223758	1
2	2025-02-13 21:00:34.645914	2025-02-13 21:10:34.645914	687182	2025-02-13 21:06:50.481293	2
52	2025-02-14 19:35:35.696698	2025-02-14 19:45:35.696698	535296	2025-02-14 19:35:51.357003	52
\.


--
-- Name: _user_seq; Type: SEQUENCE SET; Schema: public; Owner: mohit
--

SELECT pg_catalog.setval('public._user_seq', 101, true);


--
-- Name: book_seq; Type: SEQUENCE SET; Schema: public; Owner: mohit
--

SELECT pg_catalog.setval('public.book_seq', 51, true);


--
-- Name: book_transaction_history_seq; Type: SEQUENCE SET; Schema: public; Owner: mohit
--

SELECT pg_catalog.setval('public.book_transaction_history_seq', 51, true);


--
-- Name: feedback_seq; Type: SEQUENCE SET; Schema: public; Owner: mohit
--

SELECT pg_catalog.setval('public.feedback_seq', 51, true);


--
-- Name: role_seq; Type: SEQUENCE SET; Schema: public; Owner: mohit
--

SELECT pg_catalog.setval('public.role_seq', 51, true);


--
-- Name: token_seq; Type: SEQUENCE SET; Schema: public; Owner: mohit
--

SELECT pg_catalog.setval('public.token_seq', 101, true);


--
-- Name: _user _user_pkey; Type: CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public._user
    ADD CONSTRAINT _user_pkey PRIMARY KEY (id);


--
-- Name: book book_pkey; Type: CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_pkey PRIMARY KEY (id);


--
-- Name: book_transaction_history book_transaction_history_pkey; Type: CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public.book_transaction_history
    ADD CONSTRAINT book_transaction_history_pkey PRIMARY KEY (id);


--
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: token token_pkey; Type: CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public.token
    ADD CONSTRAINT token_pkey PRIMARY KEY (id);


--
-- Name: role uk8sewwnpamngi6b1dwaa88askk; Type: CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT uk8sewwnpamngi6b1dwaa88askk UNIQUE (name);


--
-- Name: _user ukk11y3pdtsrjgy8w9b6q4bjwrx; Type: CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public._user
    ADD CONSTRAINT ukk11y3pdtsrjgy8w9b6q4bjwrx UNIQUE (email);


--
-- Name: book fk61m8am98w4y4vgpl82sojy8bh; Type: FK CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT fk61m8am98w4y4vgpl82sojy8bh FOREIGN KEY (owner_id) REFERENCES public._user(id);


--
-- Name: book_transaction_history fketks95hi6ay47e16sj6vdv9g9; Type: FK CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public.book_transaction_history
    ADD CONSTRAINT fketks95hi6ay47e16sj6vdv9g9 FOREIGN KEY (book_id) REFERENCES public.book(id);


--
-- Name: feedback fkgclyi456gw0lcd6xcfj2l7r6s; Type: FK CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT fkgclyi456gw0lcd6xcfj2l7r6s FOREIGN KEY (book_id) REFERENCES public.book(id);


--
-- Name: book_transaction_history fkh081geal7xoydl9vyh7cbf4wc; Type: FK CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public.book_transaction_history
    ADD CONSTRAINT fkh081geal7xoydl9vyh7cbf4wc FOREIGN KEY (user_id) REFERENCES public._user(id);


--
-- Name: token fkiblu4cjwvyntq3ugo31klp1c6; Type: FK CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public.token
    ADD CONSTRAINT fkiblu4cjwvyntq3ugo31klp1c6 FOREIGN KEY (user_id) REFERENCES public._user(id);


--
-- Name: _user_roles fkkna43mk14wb08rt62w1982ki6; Type: FK CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public._user_roles
    ADD CONSTRAINT fkkna43mk14wb08rt62w1982ki6 FOREIGN KEY (users_id) REFERENCES public._user(id);


--
-- Name: _user_roles fktq7v0vo9kka3qeaw2alou2j8p; Type: FK CONSTRAINT; Schema: public; Owner: mohit
--

ALTER TABLE ONLY public._user_roles
    ADD CONSTRAINT fktq7v0vo9kka3qeaw2alou2j8p FOREIGN KEY (roles_id) REFERENCES public.role(id);


--
-- PostgreSQL database dump complete
--

