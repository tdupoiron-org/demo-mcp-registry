-- MCP Registry Servers Table Schema

CREATE TABLE IF NOT EXISTS servers (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    status TEXT,
    repository JSONB,
    version TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    schema_url TEXT,
    remotes JSONB,
    packages JSONB,
    meta JSONB
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_servers_name ON servers(name);
CREATE INDEX IF NOT EXISTS idx_servers_status ON servers(status);
CREATE INDEX IF NOT EXISTS idx_servers_created_at ON servers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_servers_updated_at ON servers(updated_at DESC);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_servers_updated_at BEFORE UPDATE ON servers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
