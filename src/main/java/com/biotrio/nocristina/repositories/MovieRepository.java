package com.biotrio.nocristina.repositories;

import com.biotrio.nocristina.models.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

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

    public void addMovie(Movie newMovie){

        String sql = "INSERT INTO movies(title, duration_in_minutes, is3D, dolby) VALUES(?,?,?,?);";
        jdbc.update((Connection connection)->{

            PreparedStatement ps = connection.prepareStatement(sql);

                ps.setString(1, newMovie.getTitle());
                ps.setInt(2, newMovie.getDurationInMinutes());
                ps.setBoolean(3, newMovie.isIs3D());
                ps.setBoolean(4, newMovie.isDolby());

                return ps;
            }
        );
    }

    public void editMovie(int id, Movie movieToEdit){

        String sql = "UPDATE movies SET title = ?, duration_in_minutes = ? , is3D = ?, dolby = ? WHERE id = ?;";
        jdbc.update(sql, movieToEdit.getTitle(), movieToEdit.getDurationInMinutes(), movieToEdit.isIs3D(), movieToEdit.isDolby(), id);

    }

    public void deleteMovie(int id){

        String sql = "DELETE FROM movies WHERE id =?";
        jdbc.update(sql, id);

    }

}

