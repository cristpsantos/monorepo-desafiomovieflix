package com.devsuperior.movieflix.services;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.devsuperior.movieflix.services.exceptions.UnauthorizedException;

@Service
public class OAuthService {

	public String authenticated() {
		try {
			String userName = SecurityContextHolder.getContext().getAuthentication().getName();
			return userName;
		}
		catch(Exception e) {
			throw new UnauthorizedException("User invalid");
		}
	}
}
