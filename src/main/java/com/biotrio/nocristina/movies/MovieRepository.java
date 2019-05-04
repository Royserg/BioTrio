package com.biotrio.nocristina.movies;

import com.biotrio.nocristina.Database;
import com.biotrio.nocristina.models.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class MovieRepository {

    @Autowired
    private JdbcTemplate jdbc;


    public List<Movie> FindAll(){
        String sql = "SELECT * FROM movies";
        List<Movie> movies = jdbc.query(sql, new BeanPropertyRowMapper<>(Movie.class));

        return movies;
    }

    public Movie findById(int movieId) {
        String sql = "SELECT * FROM movies WHERE id = ?";
        Movie movie = jdbc.queryForObject(sql, new Object[] {movieId}, new BeanPropertyRowMapper<>(Movie.class));

        return movie;
    }
}
