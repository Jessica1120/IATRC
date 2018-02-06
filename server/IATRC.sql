CREATE TABLE "users" (
"id" serial primary key,
"user" varchar (80),
"password" varchar (240)
);

CREATE TABLE "members" (
"member_id" serial primary key,
"first_name" varchar (50),
"last_name" varchar (50),
"institution" text,
"department" text,
"address_1" text,
"address_2" text,
"address_3" text,
"city" text,
"state" text,
"zipcode" text,
"country" text,
"phone" text,
"email" text,
"website" text,
"publication" text,
"member_status" text,
"member_year" int,
"past-service" boolean SET DEFAULT FALSE
);

CREATE TABLE "meetings" (
"meeting_id" serial primary key,
"type" text,
"topic" text,
"month" text,
"year" text
"meeting_city" text,
"meeting_state" text,
"meeting_country" text,
"hotel" text,
);

INSERT into meetings (meeting_id) VALUES 1;

CREATE TABLE "service" (
"service_id" serial primary key,
"service_type" text
);

INSERT into service (service_type) VALUES 
("Executive Committee Member - Elected"), 
("Executive Committee Member - Representing Funding Agency"),
("Theme Day Organizer"),
("Non-Theme Day Organizer"),
("Other"),
("Attended Only");


CREATE TABLE "members_meetings" (
"primary_id" serial primary key,
"members_id" int REFERENCES members(member_id) ON DELETE CASCADE,
"meetings_id" int REFERENCES meetings (meeting_id) ON DELETE CASCADE SET DEFAULT 1,
"service_id" int REFERENCES service (service_id) ON DELETE CASCADE SET DEFAULT 6,
"start_date" int,
"end_date" int,
"add_info" text
);
