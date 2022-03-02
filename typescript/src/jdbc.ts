declare function require(name:string);

// npm i --save jdbc

export class MSSQL {
    private db;

    constructor(poolSize: Number, cache: Boolean) {
        var JDBC = require('jdbc');
        var jinst = require('jdbc/lib/jinst');
        if (!jinst.isJvmCreated()) {
            jinst.addOption("-Xrs");
            jinst.setupClasspath(['mssql-jdbc-10.2.0.jre11.jar']);
        }

        var config = {
            url: 'jdbc:sqlserver://DESKTOP-9127RRA\\MSSQL;databaseName=Caso1;encrypt=true;trustServerCertificate=true;',
            drivername: 'com.microsoft.sqlserver.jdbc.SQLServerDriver',
            minpoolsize: poolSize, // 0 cuando no se usa pool, 10 cuando se usa un pool con diez conexiones
            maxpoolsize: poolSize,
            user: 'sa',
            password: 'mssql',
            cacheprepstmts: cache,      // cache es false en el query 1, true en los otros
            useserverprepstmts: cache
        };

        this.db = new JDBC(config);
        this.db.initialize(function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Connected to database');
            }
        });
    }

    GetDatabase() {
        return this.db;
    }
}