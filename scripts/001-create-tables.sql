-- TerraBuddy Database Schema
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  quiz_answers JSONB DEFAULT '[]',
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Buddies table (easy to add via Neon console - just add name, bio, avatar, hourly_rate etc.)
CREATE TABLE IF NOT EXISTS buddies (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  avatar TEXT,  -- Just paste image URL here
  bio TEXT,
  hourly_rate DECIMAL(10,2) DEFAULT 20.00,
  rating DECIMAL(3,2) DEFAULT 5.00,
  total_sessions INTEGER DEFAULT 0,
  availability TEXT[] DEFAULT ARRAY['Mon','Tue','Wed','Thu','Fri'],
  specialties TEXT[] DEFAULT ARRAY['Active Listening'],
  verified BOOLEAN DEFAULT TRUE,
  quiz_answers JSONB DEFAULT '[]',
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Buddy Applications table (stores passed quiz applications)
CREATE TABLE IF NOT EXISTS buddy_applications (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  user_id TEXT REFERENCES users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  bio TEXT,
  quiz_score INTEGER NOT NULL,  -- Must be 20/20 to submit
  quiz_answers JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  buddy_id TEXT REFERENCES buddies(id),
  user_id TEXT REFERENCES users(id),
  type TEXT NOT NULL CHECK (type IN ('video', 'in-person')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL,  -- in minutes
  location TEXT,
  notes TEXT,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  session_id TEXT REFERENCES sessions(id),
  sender_id TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some sample buddies (you can easily add more via Neon console)
INSERT INTO buddies (name, email, avatar, bio, hourly_rate, rating, total_sessions, availability, specialties, verified, status) VALUES
('Ana Kovač', 'ana@terrabuddy.si', '/placeholder.svg?height=200&width=200', 'Živjo! I''m Ana, a former teacher from Ljubljana who loves deep conversations and walks along the Ljubljanica river.', 25.00, 4.9, 234, ARRAY['Mon','Wed','Fri'], ARRAY['Active Listening','Life Transitions','Career Talk'], true, 'approved'),
('Luka Horvat', 'luka@terrabuddy.si', '/placeholder.svg?height=200&width=200', 'Hej! I''m Luka, a musician from Maribor. Life threw me some curveballs and I learned the power of having someone in your corner.', 22.00, 4.8, 156, ARRAY['Tue','Thu','Sat','Sun'], ARRAY['Creative Expression','Stress Relief','Casual Hangouts'], true, 'approved'),
('Maja Novak', 'maja@terrabuddy.si', '/placeholder.svg?height=200&width=200', 'Živjo! I''m Maja, a yoga instructor from Bled. I specialize in helping people find calm in the chaos of daily life.', 28.00, 5.0, 312, ARRAY['Mon','Tue','Wed','Thu','Fri'], ARRAY['Mindfulness','Parenting Support','Anxiety Relief'], true, 'approved'),
('Matic Zupan', 'matic@terrabuddy.si', '/placeholder.svg?height=200&width=200', 'Hej! I''m Matic, a software developer from Kranj who discovered the importance of human connection.', 20.00, 4.7, 89, ARRAY['Sat','Sun'], ARRAY['Tech Talk','Social Anxiety','Gaming Buddy'], true, 'approved')
ON CONFLICT (email) DO NOTHING;

-- Create admin user
INSERT INTO users (email, name, is_admin) VALUES
('admin@terrabuddy.si', 'Admin', true)
ON CONFLICT (email) DO NOTHING;
