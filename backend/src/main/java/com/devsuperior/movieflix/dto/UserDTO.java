package com.devsuperior.movieflix.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.devsuperior.movieflix.entities.User;

public class UserDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private String email;
	
	private List<RoleDTO> rolesDTO = new ArrayList<>();
	
	public UserDTO() {
	}

	public UserDTO(Long id, String name, String email) {
		this.id = id;
		this.name = name;
		this.email = email;
	}
	
	public UserDTO(User entity) {
		id = entity.getId();
		name = entity.getName();
		email = entity.getEmail();
		entity.getRoles().forEach(role -> this.rolesDTO.add(new RoleDTO(role)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<RoleDTO> getRolesDTO() {
		return rolesDTO;
	}

	public void setRolesDTO(List<RoleDTO> rolesDTO) {
		this.rolesDTO = rolesDTO;
	}	
}
