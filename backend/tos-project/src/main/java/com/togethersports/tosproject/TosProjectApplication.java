package com.togethersports.tosproject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@EnableCaching
@SpringBootApplication
public class TosProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(TosProjectApplication.class, args);
	}

	@Value("${jwt.access-token-expiration-time}")
	private Long expTime;

	@Bean
	public ApplicationRunner applicationRunner() {
		return args -> System.out.println(expTime);
	}
}
