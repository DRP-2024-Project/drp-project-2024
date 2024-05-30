eas build --platform android --local
FILE=$(ls *.aab | head -n 1)
java -jar ./scripts/bundletool-all-1.16.0.jar build-apks --bundle="$FILE" --output="out.apks" --mode=universal 
mv out.apks out.zip
unzip out.zip
java -jar ./scripts/uber-apk-signer-1.3.0.jar --apks universal.apk
rm *.aab

