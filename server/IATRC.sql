CREATE TABLE "users" (
"id" serial primary key,
"user" varchar (80),
"password" varchar (240)
);

CREATE TABLE "members" (
"id" serial primary key,
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
"member_year" text
);

CREATE TABLE "meetings" (
"id" serial primary key,
"type" text,
"topic" text,
"month" text,
"year" text
);

CREATE TABLE "service" (
"id" serial primary key,
"service_type" text
);

CREATE TABLE "members_meetings" (
"members_id" int REFERENCES members(id) ON DELETE CASCADE,
"meetings_id" int REFERENCES meetings (id) ON DELETE CASCADE
);

CREATE TABLE "members_service" (
"members_id" int REFERENCES members(id) ON DELETE CASCADE,
"service_id" int REFERENCES service (id) ON DELETE CASCADE
);

CREATE TABLE "service_meetings" (
"service_id" int REFERENCES service(id) ON DELETE CASCADE,
"meetings_id" int REFERENCES meetings (id) ON DELETE CASCADE
);