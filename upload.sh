#!/bin/bash

# Считывание версии из package.json
VERSION=$(jq -r ".version" package.json)

# Установка тега в Git
git tag "v$VERSION"

# Загрузка тега в GitHub
git push origin "v$VERSION"
