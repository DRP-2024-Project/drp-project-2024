import os
import subprocess
import sys

LOCK_FILE = "POST_INSTALL.lock"

# Check if another instance of the script is running
if os.path.isfile(LOCK_FILE):
    print("Another instance of the script is running. Exiting...")
    sys.exit(0)

# Create the lock file
with open(LOCK_FILE, 'w') as lock_file:
    lock_file.write("")

try:
    # Run the react-native-map-web-fix.js script
    subprocess.run(["node", "react-native-map-web-fix.js"], check=True)

    # Run the expo install command
    subprocess.run(["npx", "expo", "install", "react-native-reanimated"], check=True, shell=True)
except subprocess.CalledProcessError as e:
    print(f"Command '{e.cmd}' returned non-zero exit status {e.returncode}.")
    sys.exit(0)
finally:
    # Remove the lock file
    if os.path.isfile(LOCK_FILE):
        os.remove(LOCK_FILE)