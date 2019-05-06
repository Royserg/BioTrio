package com.biotrio.nocristina.repositories;
import com.biotrio.nocristina.models.Screening;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class ScreeningRepository {

    @Autowired
    private JdbcTemplate jdbc;


    public List<Screening> findAll(){
        String sql = "SELECT * FROM screenings";
        List<Screening> screenings = jdbc.query(sql, new BeanPropertyRowMapper<>(Screening.class));

        return screenings;
    }

    public Screening findById(int screeningId) {
        String sql = "SELECT * FROM screenings WHERE id = " + screeningId;
        Screening screening = jdbc.queryForObject(sql, new BeanPropertyRowMapper<>(Screening.class));

        return screening;
    }
}
