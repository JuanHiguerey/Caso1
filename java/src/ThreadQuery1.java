package com.bases2.maven.eclipse;

import java.sql.SQLException;

public class ThreadQuery1 extends Thread {
	private String canton;
	private Database db;
	public long time;
	
	ThreadQuery1(String canton, Database db) {
		this.canton = canton;
		this.db = db;
		time = 0;
	}
	
	public void run() {
		try {
			time = db.Query1(canton);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}