package com.bases2.maven.eclipse;

import java.sql.SQLException;

public class ThreadQuery3 extends Thread {
	private Database db;
	public long time;
	
	ThreadQuery3(Database db) {
		this.db = db;
		time = 0;
	}
	
	public void run() {
		time = db.Query3();
	}
}
