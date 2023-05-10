#!/usr/bin/env sh


set -e


trap 'echo "❌ Build failed"' ERR


echo "🗑️  Removing old builds"
rm -rf build
cd SERVER
rm -rf build
cd src/static
rm -rf client
cd ../../..
echo "✅ Done"



echo "🔨 Building client"
cd CLIENT
sh ../scripts/pnpmi.sh
pnpm build
cd ..
echo "✅ Done"


echo "📦 Moving client build to server"
cp -r CLIENT/dist/ SERVER/src/static/client/
# mv CLIENT/dist/ SERVER/src/static/client/
echo "✅ Done"


echo "🔨 Building server"
cd SERVER
sh ../scripts/pnpmi.sh
pnpm build
cd ..
echo "✅ Done"


echo "📦 Moving SERVER build to /"
mv SERVER/build/ build/


echo "✅ Build successful"