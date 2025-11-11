-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Game table
CREATE TABLE IF NOT EXISTS game (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    owning_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clues table
CREATE TABLE IF NOT EXISTS clues (
    id SERIAL PRIMARY KEY,
    game_id INTEGER NOT NULL REFERENCES game(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    payload JSONB NOT NULL,
    answer_type VARCHAR(50) NOT NULL,
    answer_payload TEXT NOT NULL,
    context TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Answers table
CREATE TABLE IF NOT EXISTS answers (
    id SERIAL PRIMARY KEY,
    clue_id INTEGER NOT NULL REFERENCES clues(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    payload TEXT NOT NULL,
    state VARCHAR(1) NOT NULL CHECK (state IN ('U', 'C', 'I')),
    submit_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_game_owning_user ON game(owning_user_id);
CREATE INDEX IF NOT EXISTS idx_clues_game ON clues(game_id);
CREATE INDEX IF NOT EXISTS idx_answers_clue ON answers(clue_id);
CREATE INDEX IF NOT EXISTS idx_answers_user ON answers(user_id);
