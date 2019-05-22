package com.biotrio.nocristina.repositories;

import com.biotrio.nocristina.models.Cinema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class CinemaRepository {

    @Autowired
    private JdbcTemplate jdbc;

    public List<Cinema> findAll(){
        String sql = "SELECT * FROM cinemas";
        List<Cinema> cinemas = jdbc.query(sql, new BeanPropertyRowMapper<>(Cinema.class));

        return cinemas;
    }

    public Cinema findById(int cinemaId) {
        String sql = "SELECT * FROM cinemas WHERE id = ?";
        Cinema cinema = jdbc.queryForObject(sql, new Object[] {cinemaId}, new BeanPropertyRowMapper<>(Cinema.class));

        return cinema;
    }

    public void addCinema(Cinema newCinema){
        String sql = "INSERT INTO cinemas VALUES(null,?);";
        jdbc.update((Connection connection)->{
                    PreparedStatement ps = connection.prepareStatement(sql);
                    ps.setString(1, newCinema.getName());
                    return ps;
                }
        );
    }

    public void deleteCinemaById(int cinemaId){
        String sql = "DELETE from cinemas WHERE id = ?";
        jdbc.update(sql, cinemaId);
    }

    public void editCinemaById(int cinemaId, Cinema cinemaToEdit) {

        String sql = "UPDATE cinemas SET name = ? WHERE id = ?;";
        jdbc.update(sql, cinemaToEdit.getName(), cinemaId);

    }

}
