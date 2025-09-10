#!/bin/bash

# Traffic generator for Node Todo App
# Make sure your app is running at http://localhost:8000

while true; do
  echo "🌐 Visiting homepage..."
  curl -s http://localhost:8000/ > /dev/null

  echo "➕ Adding tasks..."
  for i in {1..10}; do
    curl -s -X POST -d "task=Task_$RANDOM" http://localhost:8000/add > /dev/null
  done

  echo "📖 Visiting about page..."
  curl -s http://localhost:8000/about > /dev/null

  echo "❌ Deleting some tasks..."
  curl -s http://localhost:8000/delete/Task_123 > /dev/null
  curl -s http://localhost:8000/delete/Task_456 > /dev/null
  curl -s http://localhost:8000/delete/Task_789 > /dev/null

  echo "📊 Checking metrics..."
  curl -s http://localhost:8000/metrics > /dev/null

  echo "🔄 Loop complete, sleeping 1s..."
  sleep 1
done
