package com.biotrio.nocristina.repositories;

import com.biotrio.nocristina.models.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class MovieRepository {

    @Autowired
    private JdbcTemplate jdbc;


    public List<Movie> findAll(){

        String sql = "SELECT * FROM movies";
        List<Movie> movies = jdbc.query(sql, new BeanPropertyRowMapper<>(Movie.class));

        return movies;
    }

    public Movie findByScreeningId(int screeningId){
        String sql ="SELECT movies.* FROM movies JOIN screenings s ON movies.id = s.movie_id WHERE s.id =" +screeningId;
        Movie movie = jdbc.queryForObject(sql, new BeanPropertyRowMapper<>(Movie.class));
        return movie;
    }

    public Movie findById(int movieId) {

        String sql = "SELECT * FROM movies WHERE id = ?";
        Movie movie = jdbc.queryForObject(sql, new Object[] {movieId}, new BeanPropertyRowMapper<>(Movie.class));

        return movie;
    }

    public Movie addMovie(Movie newMovie){

        KeyHolder keyHolder = new GeneratedKeyHolder();
        String sql = "INSERT INTO movies VALUES(null, ?,?,?,?);";
        jdbc.update((Connection connection)->{

            PreparedStatement ps = connection.prepareStatement(sql, new String[] {"id"});

                ps.setString(1, newMovie.getTitle());
                ps.setInt(2, newMovie.getDurationInMinutes());
                ps.setBoolean(3, newMovie.isIs3D());
                ps.setBoolean(4, newMovie.isDolby());

                return ps;
            }, keyHolder);

        System.out.println("newly generated key is " + keyHolder.getKey());
        Movie newMovieAdded = newMovie;
        newMovieAdded.setId(keyHolder.getKey().intValue());

        System.out.println(newMovieAdded.toString());
        return newMovieAdded;
    }

    public void editMovie(Movie movieToEdit){

        String sql = "UPDATE movies SET title = ?, duration_in_minutes = ? , is3D = ?, dolby = ? WHERE id = ?;";
        jdbc.update(sql, movieToEdit.getTitle(), movieToEdit.getDurationInMinutes(), movieToEdit.isIs3D(), movieToEdit.isDolby(), movieToEdit.getId());

    }

    public void deleteMovie(int id){

        String sql = "DELETE FROM movies WHERE id =?";
        jdbc.update(sql, id);

    }

}

