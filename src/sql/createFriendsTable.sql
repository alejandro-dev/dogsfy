create table if not exists friends (
    id integer primary key AUTOINCREMENT,
    user_id text not null,
    friend_id text not null,
    createdAt datetime default CURRENT_TIMESTAMP,
    unique(user_id, friend_id)
);

-- Create indexes
CREATE INDEX idx_user_id ON friends(user_id);
CREATE INDEX idx_friend_id ON friends(friend_id);