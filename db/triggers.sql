-- Auto Update updated_at on users Table

Create TRIGGER update_users_updated_at
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
  UPDATE users
  SET updated_at = CURRENT_TIMESTAMP
  WHERE ID = OLD.id;
END;