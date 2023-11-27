import os
import subprocess

# Load environment variables from .env file
env_file_path = ".env"

if os.path.exists(env_file_path):
    with open(env_file_path) as f:
        for line in f:
            key, value = line.strip().split("=", 1)
            os.environ[key] = value
else:
    print(f"ERROR: .env file not found in {env_file_path}")
    exit(1)

# Directory containing SQL files
sql_dir = os.path.join("models", "")

# Ensure "create_tables.sql" is executed first
create_tables_file = os.path.join(sql_dir, "create_tables.sql")
if os.path.exists(create_tables_file):
    print(f"Executing SQL file: create_tables.sql")
    subprocess.run(["psql", "-U", os.environ["DB_USER"], "-d", os.environ["DB_DATABASE"], "-h", os.environ["DB_HOST"], "-f", create_tables_file, "-w"])

# Loop through other SQL files and execute them
for sql_file in os.listdir(sql_dir):
    if sql_file.endswith(".sql") and sql_file != "create_tables.sql":
        print(f"Executing SQL file: {sql_file}")
        sql_file_path = os.path.join(sql_dir, sql_file)
        subprocess.run(["psql", "-U", os.environ["DB_USER"], "-d", os.environ["DB_DATABASE"], "-h", os.environ["DB_HOST"], "-f", sql_file_path, "-w"])
