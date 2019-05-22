package com.biotrio.nocristina.repositories;

import com.biotrio.nocristina.models.Theater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Repository
public class TheaterRepository implements IRepository<Theater>{

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

    public Theater findByScreeningId(int theaterId) {
        String sql = "SELECT theaters.* FROM theaters JOIN screenings s ON theaters.id = s.theater_id WHERE s.id =" + theaterId;

        Theater theater = jdbc.queryForObject(sql, new BeanPropertyRowMapper<>(Theater.class));
        return theater;
    }

    public int addTheater(Theater theater) {

        KeyHolder id = new GeneratedKeyHolder();
        String sql = "INSERT INTO theaters VALUES (null,?,?,?,?,?,?)";

        PreparedStatementCreator psc = new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setInt(1, theater.getCinemaId());
                ps.setString(2, theater.getName());
                ps.setInt(3, theater.getRowsNumber());
                ps.setInt(4, theater.getColumnsNumber());
                ps.setBoolean(5, theater.isCan3d());
                ps.setBoolean(6, theater.isDolby());
                return ps;

            }
        };

        jdbc.update(psc, id);

        return id.getKey().intValue();
    }

    public void updateOne(Theater theater) {
        String sql = "UPDATE theaters SET name = ?, rows_number = ?, columns_number = ?, can3D = ?, dolby = ? WHERE id = ?";
        jdbc.update(sql, theater.getName(), theater.getRowsNumber(), theater.getColumnsNumber(), theater.isCan3d(), theater.isDolby(), theater.getId());
    }

    public void deleteOne(int id) {

        jdbc.update("DELETE FROM theaters WHERE id = " + id);
    }
}

