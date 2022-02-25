package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieBasicDTO;
import com.devsuperior.movieflix.dto.MovieFullDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class MovieService {

	@Autowired
	private MovieRepository repository;
	
	@Transactional(readOnly = true)
	public Page<MovieBasicDTO> findAllPaged(Long genreId, Pageable pageable){
		Page<Movie> page = repository.find(genreId, pageable);
		return page.map(x -> new MovieBasicDTO(x));
	}
	
	@Transactional(readOnly = true)
	public MovieFullDTO findById(Long id) {
		Optional<Movie> obj = repository.findById(id);
		Movie entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new MovieFullDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public List<ReviewDTO> findReviewByMovie(Long id) {
		List<Review> list = repository.findReviewByMovie(id);
		return list.stream().map(x -> new ReviewDTO(x)).collect(Collectors.toList());
	}
}
