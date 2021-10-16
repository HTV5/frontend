import React from 'react'
import * as SQLite from 'expo-sqlite'

export const db = SQLite.openDatabase("app.db");
