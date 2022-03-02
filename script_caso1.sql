USE [master];
GO
DROP DATABASE IF EXISTS [Caso1];
GO
CREATE DATABASE [Caso1];
GO
USE [Caso1];
GO

CREATE TABLE Users
(
	id				INT NOT NULL IDENTITY PRIMARY KEY,
	name			NVARCHAR(30) NOT NULL,
	last_name		NVARCHAR(30) NOT NULL,
	password		NVARCHAR(20) NOT NULL,
	pfp_url			NVARCHAR(50) NOT NULL,
	created_at		DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Parties
(
	id				INT NOT NULL IDENTITY PRIMARY KEY,
	name			NVARCHAR(30) NOT NULL,
	flag_url		NVARCHAR(50) NOT NULL,
	created_at		DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Plans
(
	id				INT NOT NULL IDENTITY PRIMARY KEY,
	title			NVARCHAR(30) NOT NULL,
	description		NVARCHAR(120) NOT NULL,
	party_id		INT	 NOT NULL,
	CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES Parties(id)
);

CREATE TABLE Actions
(
	id				INT NOT NULL IDENTITY PRIMARY KEY,
	description		NVARCHAR(120) NOT NULL,
	plan_id			INT NOT NULL,
	CONSTRAINT fk_plan FOREIGN KEY (plan_id) REFERENCES Plans(id)
);

CREATE TABLE Provinces
(
	id			INT NOT NULL IDENTITY PRIMARY KEY,
	name		NVARCHAR(30) NOT NULL,
);

CREATE TABLE Cantons
(
	id				INT NOT NULL IDENTITY PRIMARY KEY,
	name			NVARCHAR(30) NOT NULL,
	province_id		INT NOT NULL,
	CONSTRAINT fk_province FOREIGN KEY (province_id) REFERENCES Provinces(id)
);

CREATE TABLE Deliverables
(
	plan_id			INT NOT NULL,
	action_id		NVARCHAR(120) NOT NULL,
	canton_id		INT NOT NULL,
	kpi_value		INT NOT NULL,
	kpi_type		NVARCHAR(30) NOT NULL,
	due_date		DATE NOT NULL,
	PRIMARY KEY (plan_id, action_id, canton_id)
);

INSERT INTO Provinces(name) VALUES ('San Jose');
INSERT INTO Provinces(name) VALUES ('Alajuela');
INSERT INTO Provinces(name) VALUES ('Cartago');
INSERT INTO Provinces(name) VALUES ('Heredia');
INSERT INTO Provinces(name) VALUES ('Guanacaste');
INSERT INTO Provinces(name) VALUES ('Puntarenas');
INSERT INTO Provinces(name) VALUES ('Limon');

insert into Cantons (name, province_id) values ('Fteliá', 2);
insert into Cantons (name, province_id) values ('Abovyan', 1);
insert into Cantons (name, province_id) values ('Sardoal', 6);
insert into Cantons (name, province_id) values ('Jungkat Selatan', 5);
insert into Cantons (name, province_id) values ('Margara', 3);
insert into Cantons (name, province_id) values ('Matsue-shi', 3);
insert into Cantons (name, province_id) values ('Pisan', 7);
insert into Cantons (name, province_id) values ('Amargosa', 5);
insert into Cantons (name, province_id) values ('Furukawa', 6);
insert into Cantons (name, province_id) values ('Elmira', 2); exec query1 Sardoal

insert into Parties (name, flag_url) values ('Centidel', 'cmu.edu');
insert into Parties (name, flag_url) values ('Cogidoo', 'msu.edu');
insert into Parties (name, flag_url) values ('Feedspan', 'google.it');
insert into Parties (name, flag_url) values ('Vipe', 'geocities.com');


insert into Plans (title, description, party_id) values ('Technology', 'Computer Software', 1);
insert into Plans (title, description, party_id) values ('Energy', 'Oil & Gas Production', 2);
insert into Plans (title, description, party_id) values ('Transportation', 'Oil Refining/Marketing', 3);
insert into Plans (title, description, party_id) values ('Consumer Services', 'Other Consumer Services', 4);

insert into Actions (description, plan_id) values ('Consumer Services', 1);
insert into Actions (description, plan_id) values ('Health Care', 2);
insert into Actions (description, plan_id) values ('Transportation', 3);
insert into Actions (description, plan_id) values ('Finance', 4);

DROP PROCEDURE IF EXISTS query1;
DROP PROCEDURE IF EXISTS query3_min;
DROP PROCEDURE IF EXISTS query3_max;
GO

CREATE PROCEDURE query1
	@CantonName NVARCHAR(30)
AS
	DECLARE @CantonId INT

	SELECT @CantonId = id FROM Cantons WHERE name = @CantonName;

	SELECT P.*, Q.* FROM 
		Parties AS P,
		(SELECT d.*, p.party_id FROM Deliverables AS d, Plans AS p WHERE d.canton_id = @CantonId AND p.id = d.plan_id) AS Q
	WHERE P.id = Q.party_id;
GO

CREATE PROCEDURE query3_min
AS
	SELECT X.party_id, X.plan_id, X.canton_id, X.count
	FROM
		(
		SELECT DISTINCT party_id, plan_id, canton_id,
			COUNT(*) OVER(PARTITION BY party_id, plan_id, canton_id) count
		FROM
		(
			SELECT Plans.party_id, Deliverables.plan_id, Deliverables.action_id, Deliverables.canton_id FROM Deliverables
			INNER JOIN Plans ON Plans.id = Deliverables.plan_id
		) Q
	) X
	JOIN
	(
		SELECT DISTINCT party_id, plan_id,
			MIN(count) OVER(PARTITION BY party_id, plan_id) min,
			MAX(count) OVER(PARTITION BY party_id, plan_id) max
		FROM
		(
			SELECT DISTINCT party_id, plan_id, canton_id,
				COUNT(*) OVER(PARTITION BY party_id, plan_id, canton_id) count
			FROM
			(
				SELECT Plans.party_id, Deliverables.plan_id, Deliverables.action_id, Deliverables.canton_id FROM Deliverables
				INNER JOIN Plans ON Plans.id = Deliverables.plan_id
			) Q
		) Q
	) Y ON X.party_id = Y.party_id AND X.plan_id = Y.plan_id AND (X.count = Y.min)
GO

CREATE PROCEDURE query3_max
AS
	SELECT X.party_id, X.plan_id, X.canton_id, X.count
	FROM
		(
		SELECT DISTINCT party_id, plan_id, canton_id,
			COUNT(*) OVER(PARTITION BY party_id, plan_id, canton_id) count
		FROM
		(
			SELECT Plans.party_id, Deliverables.plan_id, Deliverables.action_id, Deliverables.canton_id FROM Deliverables
			INNER JOIN Plans ON Plans.id = Deliverables.plan_id
		) Q
	) X
	JOIN
	(
		SELECT DISTINCT party_id, plan_id,
			MIN(count) OVER(PARTITION BY party_id, plan_id) min,
			MAX(count) OVER(PARTITION BY party_id, plan_id) max
		FROM
			(
			SELECT DISTINCT party_id, plan_id, canton_id,
				COUNT(*) OVER(PARTITION BY party_id, plan_id, canton_id) count
			FROM
			(
				SELECT Plans.party_id, Deliverables.plan_id, Deliverables.action_id, Deliverables.canton_id FROM Deliverables
				INNER JOIN Plans ON Plans.id = Deliverables.plan_id
			) Q
		) Q
	) Y ON X.party_id = Y.party_id AND X.plan_id = Y.plan_id AND (X.count = Y.max)
GO

insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (2, 1, 8, 2087, 'Goldenrod', '8/25/2034');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (3, 4, 6, 9301, 'Purple', '10/21/2045');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 4, 7, 5472, 'Mauv', '12/23/2041');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (3, 2, 6, 4974, 'Pink', '2/19/2035');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (1, 2, 6, 8055, 'Purple', '12/28/2024');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 2, 6, 6790, 'Fuscia', '7/3/2029');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 3, 4, 9077, 'Turquoise', '2/13/2035');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (1, 3, 1, 9693, 'Yellow', '1/2/2027');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (1, 1, 2, 1751, 'Goldenrod', '12/14/2043');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (3, 3, 6, 5623, 'Blue', '11/19/2028');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (1, 1, 3, 450, 'Turquoise', '5/13/2037');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (1, 4, 6, 6962, 'Blue', '4/19/2049');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 4, 4, 7493, 'Fuscia', '9/6/2042');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (3, 1, 4, 3355, 'Puce', '3/26/2042');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 3, 6, 4779, 'Teal', '7/14/2031');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (3, 1, 3, 7103, 'Puce', '2/16/2029');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 3, 9, 2786, 'Yellow', '1/23/2027');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (1, 2, 2, 1727, 'Crimson', '5/23/2034');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (1, 2, 7, 6799, 'Goldenrod', '3/27/2046');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (2, 3, 6, 1163, 'Yellow', '11/28/2043');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (1, 4, 9, 9951, 'Fuscia', '1/3/2042');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (2, 2, 1, 5754, 'Red', '8/5/2041');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (3, 2, 9, 5319, 'Orange', '2/4/2042');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (3, 2, 8, 1835, 'Yellow', '10/26/2029');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 4, 3, 3172, 'Teal', '10/14/2024');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 3, 3, 4874, 'Goldenrod', '6/13/2023');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 2, 1, 1380, 'Violet', '1/5/2049');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (1, 3, 3, 3455, 'Goldenrod', '9/4/2046');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (2, 2, 8, 7523, 'Teal', '9/24/2043');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 1, 7, 9986, 'Maroon', '2/14/2031');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (1, 3, 4, 4036, 'Fuscia', '10/19/2025');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (2, 1, 9, 3902, 'Green', '7/2/2029');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (1, 1, 9, 2775, 'Red', '12/10/2042');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (3, 3, 10, 8128, 'Green', '10/9/2039');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (1, 3, 6, 4506, 'Indigo', '3/15/2028');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (1, 3, 7, 1225, 'Yellow', '1/12/2036');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 2, 5, 9160, 'Fuscia', '2/11/2042');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (3, 1, 10, 6723, 'Red', '8/29/2044');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 4, 9, 1757, 'Orange', '8/9/2036');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 3, 1, 1236, 'Mauv', '1/4/2039');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (3, 2, 10, 5706, 'Blue', '1/5/2026');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (1, 4, 2, 3168, 'Aquamarine', '2/4/2026');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 1, 9, 5200, 'Teal', '9/17/2033');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 2, 9, 9726, 'Turquoise', '4/25/2044');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (4, 4, 5, 5281, 'Green', '9/30/2048');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (3, 4, 10, 2282, 'Violet', '3/13/2026');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (3, 1, 7, 5734, 'Red', '1/17/2042');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (2, 1, 1, 7629, 'Maroon', '9/18/2027');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (2, 3, 8, 3466, 'Goldenrod', '10/3/2037');
insert into Deliverables (plan_id, action_id, canton_id, kpi_value, kpi_type, due_date) values (3, 2, 1, 4010, 'Green', '3/13/2031');

-- Query 2
SELECT DISTINCT Q.canton_id,
	COUNT(*) OVER(PARTITION BY Q.canton_id) deliverable_count
FROM
(
	SELECT canton_id, party_count FROM
	(
		SELECT DISTINCT canton_id,
			COUNT(*) OVER(PARTITION BY canton_id) party_count
		FROM
		(
			SELECT DISTINCT canton_id, party_id FROM Deliverables
			JOIN Plans ON Plans.id = Deliverables.plan_id
		) Q
	) Q
	GROUP BY canton_id, party_count
	HAVING party_count <= (SELECT COUNT(id) / 4 FROM Parties)
) Q
JOIN Deliverables ON Q.canton_id = Deliverables.canton_id;