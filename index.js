const { Client } = require('pg');
const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const pgConfig = {
        user: 'your_pg_username',
        host: 'your_pg_host',
        database: 'your_pg_database',
        password: 'your_pg_password',
        port: 5432,
    };

    const mysqlConfig = {
        host: 'your_mysql_host',
        user: 'your_mysql_username',
        database: 'your_mysql_database',
        password: 'your_mysql_password',
        port: 3306,
    };

    try {
        const pgClient = new Client(pgConfig);
        await pgClient.connect();
        console.log('Connected to PostgreSQL');

        const mysqlConnection = await mysql.createConnection(mysqlConfig);
        console.log('Connected to MySQL');

        await createPostgresDatabase(pgClient, 'new_postgres_database');

        await createMySQLDatabase(mysqlConnection, 'new_mysql_database');

        await createPostgresUser(pgClient, 'new_postgres_user', 'user_password');

        await createMySQLUser(mysqlConnection, 'new_mysql_user', 'user_password');

        await pgClient.end();
        
        await mysqlConnection.end();

        return {
            statusCode: 200,
            body: JSON.stringify('Connections closed successfully'),
        };
    } catch (error) {
        console.error('Error connecting to databases:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error connecting to databases'),
        };
    }
};

async function createPostgresDatabase(client, dbName) {
    try {
        await client.query(`CREATE DATABASE ${dbName}`);
        console.log(`PostgreSQL database "${dbName}" created successfully`);
    } catch (error) {
        console.error('Error creating PostgreSQL database:', error);
        throw error;
    }
}

async function createMySQLDatabase(connection, dbName) {
    try {
        await connection.query(`CREATE DATABASE ${dbName}`);
        console.log(`MySQL database "${dbName}" created successfully`);
    } catch (error) {
        console.error('Error creating MySQL database:', error);
        throw error;
    }
}

async function createPostgresUser(client, username, password) {
    try {
        await client.query(`CREATE USER ${username} WITH PASSWORD '${password}'`);
        console.log(`PostgreSQL user "${username}" created successfully`);
    } catch (error) {
        console.error('Error creating PostgreSQL user:', error);
        throw error;
    }
}

async function createMySQLUser(connection, username, password) {
    try {
        await connection.query(`CREATE USER '${username}'@'%' IDENTIFIED BY '${password}'`);
        console.log(`MySQL user "${username}" created successfully`);
    } catch (error) {
        console.error('Error creating MySQL user:', error);
        throw error;
    }
}

async function dropMySQLDatabaseAndUser(connection, dbName, username) {
    try {
        await connection.query(`DROP DATABASE IF EXISTS ${dbName}`);
        console.log(`MySQL database "${dbName}" dropped successfully`);

        await connection.query(`DROP USER IF EXISTS '${username}'@'%'`);
        console.log(`MySQL user "${username}" dropped successfully`);
    } catch (error) {
        console.error('Error dropping MySQL database and user:', error);
        throw error;
    }
}


async function dropPostgresDatabaseAndUser(client, dbName, username) {
    try {
        await client.query(`DROP DATABASE IF EXISTS ${dbName}`);
        console.log(`PostgreSQL database "${dbName}" dropped successfully`);

        await client.query(`DROP USER IF EXISTS ${username}`);
        console.log(`PostgreSQL user "${username}" dropped successfully`);
    } catch (error) {
        console.error('Error dropping PostgreSQL database and user:', error);
        throw error;
    }
}
