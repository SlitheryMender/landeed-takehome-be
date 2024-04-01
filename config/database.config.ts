import sqlite3 from "sqlite3";
import { open } from 'sqlite'
import { ISqlite, IMigrate } from 'sqlite'

const DBSOURCE = "db.sqlite"

export var db = null;

export const initializeDB = async () => {
    // open the database
    let db = await open<sqlite3.Database, sqlite3.Statement>({
      filename: DBSOURCE,
      driver: sqlite3.Database
    })

    // await db.exec(`CREATE TABLE IF NOT EXISTS settings (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     page1 boolean,
    //     page2 boolean,
    //     name_question varchar(255),
    //     name_type varchar(255),
    //     name_options varchar(255),
    //     gender_question varchar(255),
    //     gender_type varchar(255),
    //     gender_options varchar(255),
    //     age_question varchar(255),
    //     age_type varchar(255),
    //     age_options varchar(255),
    //     profession_question varchar(255),
    //     profession_type varchar(255),
    //     profession_options varchar(255),
    //     services_question  varchar(255),
    //     services_type varchar(255),
    //     services_options varchar(255)
    // )`)

    await db.exec(`CREATE TABLE IF NOT EXISTS entries (
        id  INTEGER PRIMARY KEY AUTOINCREMENT,
        name  varchar(255) NOT NULL,
        gender varchar(255) NOT NULL,
        age INTEGER NOT NULL,
        profession varchar(255),
        services varchar(255)
    )`)

    await db.close();

};

export const openDB = async () => {
    // open the database
    let db = await open<sqlite3.Database, sqlite3.Statement>({
      filename: DBSOURCE,
      driver: sqlite3.Database
    })

    return db;
};
