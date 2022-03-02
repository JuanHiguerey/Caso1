package com.bases2.maven.eclipse;

import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

public class Hibernate {
	public static SessionFactory getSessionFactory() {
        SessionFactory SessionFactory = null;
        try {
            Configuration configuration = new Configuration().configure("hibernate.cfg.xml");
            configuration.addAnnotatedClass(Query3Min.class);
            configuration.addAnnotatedClass(Query3Max.class);
            StandardServiceRegistryBuilder builder 
                = new StandardServiceRegistryBuilder();
            builder.applySettings(configuration.getProperties());
            StandardServiceRegistry serviceRegistry = builder.build();
            SessionFactory = configuration.buildSessionFactory(serviceRegistry);
        } catch (Throwable ex) {
        	System.out.println("Hibernate session error");
            ex.printStackTrace();
        }
        return SessionFactory;
    }
}
