package com.biotrio.nocristina.repositories;
import com.biotrio.nocristina.models.Screening;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
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

//    TODO: convert to prepared statement
    public Screening findById(int screeningId) {
        String sql = "SELECT * FROM screenings WHERE id = " + screeningId;
        Screening screening = jdbc.queryForObject(sql, new BeanPropertyRowMapper<>(Screening.class));

        return screening;
    }

//    TODO: convert to prepared statement
    public List<Screening> findByMovieId(int movieId) {
        String sql = "SELECT * FROM screenings WHERE movie_id = " + movieId;

        List<Screening> screeningList = jdbc.query(sql, new BeanPropertyRowMapper<>(Screening.class));



        return screeningList;
    }

    public void addScreening(Screening newScreening){
        String sql = "INSERT INTO screenings(movie_id, theater_id, start_time, price, is3D, isDolby) VALUES(?,?,?,?,?,?);";
        jdbc.update((Connection connection)->{

                    PreparedStatement ps = connection.prepareStatement(sql);

                        ps.setInt(1, newScreening.getMovieId());
                        ps.setInt(2, newScreening.getTheaterId());
                        ps.setObject(3, newScreening.getStartTime());
    //    Conversion  LocalDateTime to Object and back - https://stackoverflow.com/a/43039615/8421735
                        ps.setBigDecimal(4, newScreening.getPrice());
                        ps.setBoolean(5, false);
                        ps.setBoolean(6, false);

                    return ps;
                }
        );
    }
}
