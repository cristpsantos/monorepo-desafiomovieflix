package com.devsuperior.movieflix.dto;

import javax.validation.constraints.NotBlank;

import com.devsuperior.movieflix.entities.Review;

public class ReviewDTO {

	private Long id;
	
	@NotBlank(message = "Campo não pode ser vazio")
	private String text;
	private Long movieId;
	private UserReviewDTO user;
	
	public ReviewDTO() {
	}

	public ReviewDTO(Long id, String text, Long movieId, UserReviewDTO user) {
		this.id = id;
		this.text = text;
		this.movieId = movieId;
		this.user = user;
	}
	
	public ReviewDTO(Review entity) {
		id = entity.getId();
		text = entity.getText();
		movieId = entity.getMovie().getId();
		user = new UserReviewDTO(entity.getUser());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public UserReviewDTO getUser() {
		return user;
	}

	public void setUser(UserReviewDTO user) {
		this.user = user;
	}
}
