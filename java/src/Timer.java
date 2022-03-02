package com.bases2.maven.eclipse;

public class Timer {
	private long start;
	private long end;
	
	Timer() {
		start = System.currentTimeMillis();
		end = start;
	}
	
	public long ElapsedMillis() {
		end = System.currentTimeMillis();
		return end - start;
	}
}
