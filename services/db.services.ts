import { openDB } from "../config/database.config";
import { CreateEntryData } from "../types/entry.types";


export const getEntries = async () => {
    let db = await openDB();
    try {
        let query = `SELECT * FROM entries;`;
        let itemsList = await db.all(query);
        await db.close()
        return itemsList;
    } catch (error) {
        await db.close()
        return Promise.reject(error);
    }
}

export const getSettings = async () => {
    let db = await openDB();
    try {
        let query = `SELECT * FROM settings;`;
        let itemsList = await db.all(query);
        await db.close()
        return itemsList;
    } catch (error) {
        await db.close()
        return Promise.reject(error);
    }
}

export const insertEntry = async (payload: CreateEntryData) => {
    let db=await openDB();
    try {
        let {name, gender, age, profession, services} = payload;
        let query = `
                    INSERT 
                    INTO entries 
                    (name, gender, age, profession, services) 
                    VALUES (?,?,?,?,?)`
        let entryCreated = await db.run(query, [name, gender, age, profession || null, services || null]);
        await db.close();
        return entryCreated;
    } catch (error) {
        await db.close();
        return Promise.reject(error);
    }
}

export const updateConfig = async (id:string, updatePayload) => {
    let db = await openDB();
    try {
        let query = `UPDATE settings set marketman_sync_status=1 where id=${id}`;
        let itemsList = await db.run(query);
        await db.close()
        return itemsList;
    } catch (error) {
        await db.close()
        return Promise.reject(error);
    }
}