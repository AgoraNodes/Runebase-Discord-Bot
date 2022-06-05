#!/bin/sh
curl --header "Content-Type: application/json" --request POST --data "{ \"payload\" : \"$1\", \"ticker\" : \"RUNES\"}" http://127.0.0.1:8080/api/rpc/walletnotify
curl --header "Content-Type: application/json" --request POST --data "{ \"payload\" : \"$1\", \"ticker\" : \"RUNES\"}" http://127.0.0.1:8081/api/rpc/walletnotify
