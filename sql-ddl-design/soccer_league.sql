CREATE TABLE leagues (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    points INTEGER DEFAULT 0,
    league_id INTEGER REFERENCES leagues(id)
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    team_id INTEGER REFERENCES teams(id)
);

CREATE TABLE seasons (
    id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    league_id INTEGER REFERENCES leagues(id)
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    home_team_id INTEGER REFERENCES teams(id),
    away_team_id INTEGER REFERENCES teams(id),
    match_date DATE NOT NULL,
    season_id INTEGER REFERENCES seasons(id)
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id),
    player_id INTEGER REFERENCES players(id),
    minute INTEGER NOT NULL
);

CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE match_referees (
    match_id INTEGER REFERENCES matches(id),
    referee_id INTEGER REFERENCES referees(id),
    PRIMARY KEY (match_id, referee_id)
);