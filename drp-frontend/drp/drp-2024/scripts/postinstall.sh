LOCK_FILE="POST_INSTALL.lock"

if [ -f "$LOCK_FILE" ]; then
  echo "Another instance of the script is running. Exiting..."
  exit 0
fi

touch "$LOCK_FILE"

node react-native-map-web-fix.js
npx expo install react-native-reanimated

rm "$LOCK_FILE"

