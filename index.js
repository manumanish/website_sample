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
                    action, // assuming 'create', 'delete', or 'rename'
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

        // MySQL configuration
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
        } else if (action === 'rename') {
            await renamePostgresDatabase(pgClient, pgDatabase, newPostgresDatabase);
            await renameMySQLDatabase(mysqlConnection, newMySQLDatabase);
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

// Add the following functions for renaming databases

async function renamePostgresDatabase(client, oldDbName, newDbName) {
    try {
        await client.query(`ALTER DATABASE ${oldDbName} RENAME TO ${newDbName}`);
        console.log(`PostgreSQL database "${oldDbName}" renamed to "${newDbName}" successfully`);
    } catch (error) {
        console.error('Error renaming PostgreSQL database:', error);
        throw error;
    }
}

async function renameMySQLDatabase(connection, oldDbName, newDbName) {
    try {
        // Create a new database with the new name
        await connection.query(`CREATE DATABASE ${newDbName}`);

        // Get a list of tables in the old database
        const [rows, fields] = await connection.query(`SHOW TABLES FROM ${oldDbName}`);

        // Iterate through each table and copy its data to the new database
        for (const row of rows) {
            const tableName = row[`Tables_in_${oldDbName}`];

            // Copy data from the old table to the new one
            await connection.query(`CREATE TABLE ${newDbName}.${tableName} AS SELECT * FROM ${oldDbName}.${tableName}`);
        }

        // Drop the old database
        await connection.query(`DROP DATABASE ${oldDbName}`);

        console.log(`MySQL database "${oldDbName}" renamed to "${newDbName}" successfully`);
    } catch (error) {
        console.error('Error renaming MySQL database:', error);
        throw error;
    }
}

