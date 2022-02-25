package com.devsuperior.movieflix.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.services.OAuthService;
import com.devsuperior.movieflix.services.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserController {

	@Autowired
	private UserService service;
	
	@Autowired
	private OAuthService oAuthService;
	
	@GetMapping(value = "/profile")
	public ResponseEntity<UserDTO> userFindEmail() {
		String email = oAuthService.authenticated();
		UserDTO dto = service.userFindEmail(email);
		return ResponseEntity.ok().body(dto);	
	}
}
