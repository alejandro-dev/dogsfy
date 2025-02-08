create table if not exists users (
    id text primary key,
    username varchar(255) unique not null,
    email varchar(255) unique not null,
    password text(255) not null,
    lat real not null,
    lng real not null,
    language varchar(5) not null,
    createdAt datetime default CURRENT_TIMESTAMP,
    updatedAt datetime default CURRENT_TIMESTAMP
);