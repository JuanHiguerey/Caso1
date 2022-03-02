package com.bases2.maven.eclipse;

import java.sql.Connection;
import java.sql.SQLException;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class ConnectionPool {
	private HikariConfig config = new HikariConfig();
    private HikariDataSource ds;
    
    ConnectionPool() {
    	config.setJdbcUrl( "jdbc:sqlserver://DESKTOP-9127RRA\\MSSQL;databaseName=Caso1;encrypt=true;trustServerCertificate=true;" );
        config.setUsername( "sa" );
        config.setPassword( "mssql" );
        config.addDataSourceProperty( "cachePrepStmts" , "true" );
        config.addDataSourceProperty( "prepStmtCacheSize" , "250" );
        config.addDataSourceProperty( "prepStmtCacheSqlLimit" , "2048" );
        ds = new HikariDataSource(config);
    }
    
    public Connection getConnection() throws SQLException {
        return ds.getConnection();
    }
}
