package com.biotrio.nocristina.repositories;

import com.biotrio.nocristina.models.Theater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
public class TheaterRepository {

    @Autowired
    private JdbcTemplate jdbc;

    public List<Theater> findAll() {
        String sql = "SELECT * FROM theaters";
        List<Theater> theaters = jdbc.query(sql, new BeanPropertyRowMapper<>(Theater.class));

        return theaters;
    }

    public Theater findOne(int id) {
        String sql = "SELECT * FROM theaters WHERE id=" + id;
        return jdbc.queryForObject(sql, new BeanPropertyRowMapper<>(Theater.class));
    }


    public Theater findByScreeningId(int theaterId){
        String sql ="SELECT theaters.* FROM theaters JOIN screenings s ON theaters.id = s.theater_id WHERE s.id =" +theaterId;
        Theater theater = jdbc.queryForObject(sql, new BeanPropertyRowMapper<>(Theater.class));
        return theater;
    }

    public Theater saveTheater(Theater theater) {
        PreparedStatementCreator psc = new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement ps = connection.prepareStatement("Insert into theaters values (null,?,?,?,?,?)");
                ps.setInt(1, theater.getCinemaId());
                ps.setString(2, theater.getName());
                ps.setInt(3, theater.getRowsNumber());
                ps.setInt(4, theater.getColumnsNumber());
                ps.setBoolean(5, theater.isCan3d());
                return ps;

            }
        };
        jdbc.update(psc);
        return theater;

    }
}
