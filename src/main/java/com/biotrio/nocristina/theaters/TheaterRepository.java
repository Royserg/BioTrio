package com.biotrio.nocristina.theaters;

import com.biotrio.nocristina.models.Theater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Repository
public class TheaterRepository {

    @Autowired
    private JdbcTemplate jdbc;

    public List<Theater> findAll() {
        String sql = "SELECT * FROM theaters";
        List<Theater> theaters = jdbc.query(sql, new BeanPropertyRowMapper<>(Theater.class));

        return theaters;
    }

    public Theater newTheater(Theater theater) {
        PreparedStatementCreator psc = new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement ps = connection.prepareStatement("Insert into theaters values (null,?,?,?,?,?)");
                ps.setInt(1, theater.getCinema_id());
                ps.setString(2, theater.getName());
                ps.setInt(3, theater.getRows_number());
                ps.setInt(4, theater.getColumns_number());
                ps.setBoolean(5, theater.isCan3d());
                return ps;

            }
        };
        jdbc.update(psc);
        return theater;

    }
}
