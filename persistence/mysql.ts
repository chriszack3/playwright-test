import mysql from 'mysql2/promise';
import waitPort from 'wait-port';

const {
    MYSQL_HOST: HOST,
    MYSQL_USER: USER,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_DB: DB,
    MYSQL_TABLE: TABLE,
    DATA_TOKEN: TOKEN
} = process.env;
// Create the connection pool. The pool-specific settings are the defaults
let pool: mysql.Pool;

const init = async() => {
    const host = HOST;
    const user = USER;
    const password = PASSWORD;
    const database = DB;

    await waitPort({
        host,
        port: 3306,
        timeout: 10000,
        waitForDns: true,
    });

    pool = mysql.createPool({
        connectionLimit: 5,
        host,
        user,
        password,
        database,
        charset: 'utf8mb4',
    });
    await pool.query(`CREATE TABLE IF NOT EXISTS ${TABLE} (id INT AUTO_INCREMENT PRIMARY KEY, scrapedAtMS BIGINT, publisher VARCHAR(255), title VARCHAR(255) UNIQUE, url VARCHAR(255), description VARCHAR(255), publishedAgo VARCHAR(255));`)
    await pool.query(`CREATE TABLE IF NOT EXISTS MARKET_TOKENS (id INT AUTO_INCREMENT PRIMARY KEY, token VARCHAR(255) UNIQUE, name VARCHAR(255));`)
    await pool.query(`INSERT INTO MARKET_TOKENS (token, name) VALUES ('${TOKEN}', '${TABLE}') ON DUPLICATE KEY UPDATE token=token;`)
    return 
}

const addHeadlines = async (records: any) => {
    const record = records[0];
    return await records.map(async (rec: any) => { 
        return await pool.query(
            `INSERT INTO ${TABLE} (scrapedAtMS, publisher, title, url, description, publishedAgo) VALUES (?,?,?,?,?,?) ON DUPLICATE KEY UPDATE title=title;`,
            [rec.scrapedAtMS, rec.publisher, rec.title, rec.url, rec.description, rec.publishedAgo]
        );
    })
}

const getAllHeadlines = async () => { 
    return await pool.query(`SELECT * FROM ${TABLE};`);
}

export { init, addHeadlines, getAllHeadlines}