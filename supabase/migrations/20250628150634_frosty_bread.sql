/*
  # Create routes and vehicles tables

  1. New Tables
    - `routes`
      - `id` (uuid, primary key)
      - `title` (text, route name/title)
      - `description` (text, route description)
      - `distance` (text, distance information)
      - `time` (text, estimated time)
      - `price` (decimal, route price)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `vehicles`
      - `id` (uuid, primary key)
      - `name` (text, vehicle name)
      - `type` (text, vehicle type)
      - `capacity` (integer, passenger capacity)
      - `available` (boolean, availability status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read data
    - Add policies for authenticated users to manage data
*/

CREATE TABLE IF NOT EXISTS routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  distance text DEFAULT '',
  time text DEFAULT '',
  price decimal(10,2) DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text DEFAULT '',
  capacity integer DEFAULT 0,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Policies for routes table
CREATE POLICY "Anyone can read routes"
  ON routes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert routes"
  ON routes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update routes"
  ON routes
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete routes"
  ON routes
  FOR DELETE
  TO authenticated
  USING (true);

-- Policies for vehicles table
CREATE POLICY "Anyone can read vehicles"
  ON vehicles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert vehicles"
  ON vehicles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update vehicles"
  ON vehicles
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete vehicles"
  ON vehicles
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert some sample data
INSERT INTO routes (title, description, distance, time, price) VALUES
  ('City Center to Airport', 'Direct route from downtown to international airport', '25 km', '30 minutes', 45.00),
  ('Beach Resort Transfer', 'Scenic coastal route to luxury beach resort', '18 km', '25 minutes', 35.00),
  ('Mountain View Express', 'Express service to mountain viewing point', '40 km', '45 minutes', 60.00);

INSERT INTO vehicles (name, type, capacity, available) VALUES
  ('Luxury Sedan A1', 'Sedan', 4, true),
  ('SUV Comfort B2', 'SUV', 7, true),
  ('Van Express C3', 'Van', 12, false),
  ('Premium Coupe D4', 'Coupe', 2, true);