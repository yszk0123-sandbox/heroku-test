#!/bin/bash -e
curl http://localhost:3000/todo -X POST -H 'Content-Type: application/json' -d '{ "text": "foo", "done": false }'
curl http://localhost:3000/todos -H 'Content-Type: application/json'
