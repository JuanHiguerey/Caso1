package com.bases2.maven.eclipse;

import java.sql.SQLException;

public class ThreadQuery2 extends Thread {
	private Database db;
	public long time;
	
	ThreadQuery2(Database db) {
		this.db = db;
		time = 0;
	}
	
	public void run() {
		try {
			time = db.Query2();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
