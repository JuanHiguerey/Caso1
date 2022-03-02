package com.bases2.maven.eclipse;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Application {
	public Database db;
	private List<ThreadQuery1> arr1;
	private List<ThreadQuery2> arr2;
	private List<ThreadQuery3> arr3;
	
	Application() throws SQLException, InterruptedException {
		db = new Database();
		
		arr1 = new ArrayList<>(10);
		arr1.add(new ThreadQuery1("Fteliá", db));
		arr1.add(new ThreadQuery1("Abovyan", db));
		arr1.add(new ThreadQuery1("Sardoal", db));
		arr1.add(new ThreadQuery1("Jungkat Selatan", db));
		arr1.add(new ThreadQuery1("Margara", db));
		arr1.add(new ThreadQuery1("Matsue-shi", db));
		arr1.add(new ThreadQuery1("Pisan", db));
		arr1.add(new ThreadQuery1("Amargosa", db));
		arr1.add(new ThreadQuery1("Furukawa", db));
		arr1.add(new ThreadQuery1("Elmira", db));
		
		Thread.sleep(100);
		
		arr2 = new ArrayList<>(10);
		arr2.add(new ThreadQuery2(db));
		arr2.add(new ThreadQuery2(db));
		arr2.add(new ThreadQuery2(db));
		arr2.add(new ThreadQuery2(db));
		arr2.add(new ThreadQuery2(db));
		arr2.add(new ThreadQuery2(db));
		arr2.add(new ThreadQuery2(db));
		arr2.add(new ThreadQuery2(db));
		arr2.add(new ThreadQuery2(db));
		arr2.add(new ThreadQuery2(db));
		
		Thread.sleep(100);
		
		arr3 = new ArrayList<>(10);
		arr3.add(new ThreadQuery3(db));
		arr3.add(new ThreadQuery3(db));
		arr3.add(new ThreadQuery3(db));
		arr3.add(new ThreadQuery3(db));
		arr3.add(new ThreadQuery3(db));
		arr3.add(new ThreadQuery3(db));
		arr3.add(new ThreadQuery3(db));
		arr3.add(new ThreadQuery3(db));
		arr3.add(new ThreadQuery3(db));
	}
	
	public void ExecuteQuery1() {	
    	for(ThreadQuery1 t : arr1) {
    		t.start();
    	}
	}
	
	public void ExecuteQuery2() {	
    	for(ThreadQuery2 t : arr2) {
    		t.start();
    	}
	}
	
	public void ExecuteQuery3() {	
    	for(ThreadQuery3 t : arr3) {
    		t.start();
    	}
	}
	
	public void JoinQuery1() throws InterruptedException {
		for(ThreadQuery1 t : arr1) {
    		t.join();
    	}
	}
	
	public void JoinQuery2() throws InterruptedException {
		for(ThreadQuery2 t : arr2) {
    		t.join();
    	}
	}
	
	public void JoinQuery3() throws InterruptedException {
		for(ThreadQuery3 t : arr3) {
    		t.join();
    	}
	}
	
	public long GetQuery1Time() {
		long res = 0;
		for(ThreadQuery1 t : arr1) {
    		res += t.time;
    	}
		return res;
	}
	
	public long GetQuery2Time() {
		long res = 0;
		for(ThreadQuery2 t : arr2) {
    		res += t.time;
    	}
		return res;
	}
	
	public long GetQuery3Time() {
		long res = 0;
		for(ThreadQuery3 t : arr3) {
    		res += t.time;
    	}
		return res;
	}
}
