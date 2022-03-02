package com.bases2.maven.eclipse;

import java.sql.SQLException;

public class App 
{
    public static void main( String[] args ) throws InterruptedException, SQLException
    {
    	// Las configuraciones se hacen en Database.java y Hibernate.java
    	Application app = new Application();
    	app.ExecuteQuery1();
    	app.JoinQuery1();
    	app.ExecuteQuery2();
    	app.JoinQuery2();
    	app.ExecuteQuery3();
    	app.JoinQuery3();
    	long t1 = app.GetQuery1Time();
    	long t2 = app.GetQuery2Time();
    	long t3 = app.GetQuery3Time();
    	System.out.println("Query 1 total time: " + t1 + " ms");
    	System.out.println("Query 2 total time: " + t2 + " ms");
    	System.out.println("Query 3 total time: " + t3 + " ms");
    }
}
