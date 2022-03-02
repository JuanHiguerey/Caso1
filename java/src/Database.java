package com.bases2.maven.eclipse;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

public class Database {
	private static Connection conn = null;		// Una sola conexion para el query 1
	private static ConnectionPool pool = null;	// Pool para el Query 2 y 3
	private static SessionFactory sf = null;	// ORM para el Query3, utilizando EHCache
	
	public Database() throws SQLException {
		String url = "jdbc:sqlserver://DESKTOP-9127RRA\\MSSQL;databaseName=Caso1;encrypt=true;trustServerCertificate=true;";
        DriverManager.registerDriver(new com.microsoft.sqlserver.jdbc.SQLServerDriver());
        conn = DriverManager.getConnection(url, "sa", "mssql");
        if(conn == null) {
        	System.out.println("Failed to connect to database");
        }
        pool = new ConnectionPool();
        sf = Hibernate.getSessionFactory();
	}
	
	public long Query1(String canton) throws SQLException {
    	String sql = "{call query1 (?)}";
    	CallableStatement stmt = conn.prepareCall(sql);
    	stmt.setString(1, canton);
    	Timer timer = new Timer();
    	stmt.execute();
    	long res = timer.ElapsedMillis();
    	ResultSet rs = stmt.getResultSet();
    	while(rs.next()) {
    		System.out.println(
    			"Party: " + rs.getString(2) + " | " +
    			"Action ID: " + rs.getInt(6)
    		);
    	}
    	return res;
    }
	
	public long Query2() throws SQLException {
		long res = 0;
		String sql = 
			"SELECT DISTINCT Q.canton_id,\r\n"
			+ "	COUNT(*) OVER(PARTITION BY Q.canton_id) deliverable_count\r\n"
			+ "FROM\r\n"
			+ "(\r\n"
			+ "	SELECT canton_id, party_count FROM\r\n"
			+ "	(\r\n"
			+ "		SELECT DISTINCT canton_id,\r\n"
			+ "			COUNT(*) OVER(PARTITION BY canton_id) party_count\r\n"
			+ "		FROM\r\n"
			+ "		(\r\n"
			+ "			SELECT DISTINCT canton_id, party_id FROM Deliverables\r\n"
			+ "			JOIN Plans ON Plans.id = Deliverables.plan_id\r\n"
			+ "		) Q\r\n"
			+ "	) Q\r\n"
			+ "	GROUP BY canton_id, party_count\r\n"
			+ "	HAVING party_count <= (SELECT COUNT(id) / 4 FROM Parties)\r\n"
			+ ") Q\r\n"
			+ "JOIN Deliverables ON Q.canton_id = Deliverables.canton_id;";
		Connection con = pool.getConnection();
		PreparedStatement stmt = con.prepareStatement(sql);
		Timer timer = new Timer();
		ResultSet rs = stmt.executeQuery();
		res = timer.ElapsedMillis();
		while(rs.next()) {
			System.out.println(
				"Canton ID: " + rs.getString(1) + " | " +
				"Count: " + rs.getInt(2)
			);
		}
		return res;
	}
	
	public long Query3() {
		long res = 0;
		Session s = sf.openSession();
		String sql = "SELECT e FROM " + Province.class.getName() + " e";
		Query query1 = s.createSQLQuery("exec query3_min").setCacheable(true).addEntity(Query3Min.class);
		Query query2 = s.createSQLQuery("exec query3_max").setCacheable(true).addEntity(Query3Max.class);
		Timer timer = new Timer();
		List<Query3Min> lst1 = query1.list();
		List<Query3Max> lst2 = query2.list();
		res = timer.ElapsedMillis();
		System.out.println("QUERY 3 MIN");
		for(Query3Min q : lst1) {
			System.out.println("Party Id: " + q.getPartyId() + " | " + "Plan Id: " + q.getPlanId() + " | " + "Canton Id: " + q.getCantonId() + " | " + "Count: " + q.getCount());
		}
		System.out.println("QUERY 3 MAX");
		for(Query3Max q : lst2) {
			System.out.println("Party Id: " + q.getPartyId() + " | " + "Plan Id: " + q.getPlanId() + " | " + "Canton Id: " + q.getCantonId() + " | " + "Count: " + q.getCount());
		}
		s.close();
		return res;
	}
}
