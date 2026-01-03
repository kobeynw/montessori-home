-- Make activity_id nullable to support custom activities
ALTER TABLE calendar_entries
MODIFY activity_id INT NULL;

-- Add column for custom activity names
ALTER TABLE calendar_entries 
ADD COLUMN custom_activity_name VARCHAR(255) DEFAULT NULL;

-- Add constraint to ensure exactly one of activity_id or custom_activity_name is filled
ALTER TABLE calendar_entries
ADD CONSTRAINT check_activity_xor 
CHECK (
  (activity_id IS NOT NULL AND custom_activity_name IS NULL) OR
  (activity_id IS NULL AND custom_activity_name IS NOT NULL)
);