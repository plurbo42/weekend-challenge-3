CREATE TABLE todo_item (
		itemid SERIAL PRIMARY KEY,
		itemtype VARCHAR(50),
		priority VARCHAR(50),
		detail VARCHAR(500) NOT NULL,
		startdate DATE, 
		duedate DATE,
		iscomplete BOOLEAN NOT NULL
);


INSERT INTO todo_item (itemtype, priority, detail, startdate, duedate, iscomplete)
VALUES ('Home', 'high', 'Rake Leaves', '2017-11-01', '2017-11-15', false),
('Work', 'normal', 'Respond to emails', '2017-11-22', '2017-11-29', false),
('Education', 'high', 'Study', '2017-11-22', '2018-02-28' , false),
('Recreation', 'Normal', 'Finish reading book', '2017-11-01', null, true),
('Education', 'High', 'Finish Weekend Assignment', '2017-11-22', '2017-11-26', true);
