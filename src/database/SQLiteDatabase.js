import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("Agendaitor.db", "1.0", "Minha agenda", 200000);

export default db;