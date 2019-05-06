package com.biotrio.nocristina.repositories;

import com.biotrio.nocristina.models.Theater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class TheaterRepository {

    @Autowired
    private JdbcTemplate jdbc;

    public List<Theater> findAll(){
        String sql = "SELECT * FROM theaters";
        List<Theater> theaters = jdbc.query(sql, new BeanPropertyRowMapper<>(Theater.class));

        return theaters;
    }

}
