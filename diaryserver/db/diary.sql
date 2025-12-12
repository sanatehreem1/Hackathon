CREATE TABLE diary_entries (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  content TEXT NOT NULL,
  category VARCHAR(50),
  entry_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
); 
CREATE INDEX idx_entry_date ON diary_entries(entry_date);
CREATE INDEX idx_category ON diary_entries(category);
CREATE INDEX idx_title ON diary_entries(title);
CREATE INDEX idx_content ON diary_entries USING GIN (to_tsvector('english', content));
CREATE INDEX idx_fulltext ON diary_entries USING GIN (to_tsvector('english', title || ' ' || content));

