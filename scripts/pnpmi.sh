#!/usr/bin/env sh


if [ ! -d "node_modules" ]; then
    echo "🔴 Node modules NOT found, running pnpm install"
    pnpm install
else
    echo "🟢 Node modules found, skipping pnpm install"
fi
