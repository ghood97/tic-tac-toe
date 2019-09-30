curl "https://tic-tac-toe-wdi-production.herokuapp.com/games/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "game": {
      "cell": {
        "index": 3,
        "value": "o"
      },
      "over": false
  }
}'

echo
