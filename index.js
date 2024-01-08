const { Client } = require('pg');
const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    try {
        const {
            details: {
                data: {
                    newPostgresDatabase,
                    newMySQLDatabase,
                    newPostgresUser,
                    newMySQLUser,
                    action,
                },
            },
        } = event;

        const pgConfig = {
            user: pgUser,
            host: pgHost,
            database: pgDatabase,
            password: pgPassword,
            port: pgPort,
        };

        const mysqlConfig = {
            host: mysqlHost,
            user: mysqlUser,
            database: newMySQLDatabase,
            password: mysqlPassword,
            port: mysqlPort,
        };

        const pgClient = new Client(pgConfig);
        await pgClient.connect();
        console.log('Connected to PostgreSQL');

        const mysqlConnection = await mysql.createConnection(mysqlConfig);
        console.log('Connected to MySQL');

        if (action === 'create') {
            await createPostgresDatabase(pgClient, newPostgresDatabase);

            await createMySQLDatabase(mysqlConnection, newMySQLDatabase);

            await createPostgresUser(pgClient, newPostgresUser, 'user_password'); // Assuming a default password

            await createMySQLUser(mysqlConnection, newMySQLUser, 'user_password'); // Assuming a default password
        } else if (action === 'delete') {
            await dropPostgresDatabaseAndUser(pgClient, newPostgresDatabase, newPostgresUser);

            await dropMySQLDatabaseAndUser(mysqlConnection, newMySQLDatabase, newMySQLUser);
        } else {
            console.error('Invalid action:', action);
            return {
                statusCode: 400,
                body: JSON.stringify('Invalid action'),
            };
        }

        await pgClient.end();
        await mysqlConnection.end();

        return {
            statusCode: 200,
            body: JSON.stringify('Operation completed successfully'),
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
        await client.query(CREATE DATABASE ${dbName});
        console.log(PostgreSQL database "${dbName}" created successfully);
    } catch (error) {
        console.error('Error creating PostgreSQL database:', error);
        throw error;
    }
}

async function createMySQLDatabase(connection, dbName) {
    try {
        await connection.query(CREATE DATABASE ${dbName});
        console.log(MySQL database "${dbName}" created successfully);
    } catch (error) {
        console.error('Error creating MySQL database:', error);
        throw error;
    }
}

async function createPostgresUser(client, username, password) {
    try {
        await client.query(CREATE USER ${username} WITH PASSWORD '${password}');
        console.log(PostgreSQL user "${username}" created successfully);
    } catch (error) {
        console.error('Error creating PostgreSQL user:', error);
        throw error;
    }
}

async function createMySQLUser(connection, username, password) {
    try {
        await connection.query(CREATE USER '${username}'@'%' IDENTIFIED BY '${password}');
        console.log(MySQL user "${username}" created successfully);
    } catch (error) {
        console.error('Error creating MySQL user:', error);
        throw error;
    }
}

async function dropPostgresDatabaseAndUser(client, dbName, username) {
    try {
        await client.query(DROP DATABASE IF EXISTS ${dbName});
        console.log(PostgreSQL database "${dbName}" dropped successfully);

        await client.query(DROP USER IF EXISTS ${username});
        console.log(PostgreSQL user "${username}" dropped successfully);
    } catch (error) {
        console.error('Error dropping PostgreSQL database and user:', error);
        throw error;
    }
}

async function dropMySQLDatabaseAndUser(connection, dbName, username) {
    try {
        await connection.query(DROP DATABASE IF EXISTS ${dbName});
        console.log(MySQL database "${dbName}" dropped successfully);

        await connection.query(DROP USER IF EXISTS '${username}'@'%');
        console.log(MySQL user "${username}" dropped successfully);
    } catch (error) {
        console.error('Error dropping MySQL database and user:', error);
        throw error;
    }
}
