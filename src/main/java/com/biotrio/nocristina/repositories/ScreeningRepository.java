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

    public Screening findByBookingId(int bookingId) {
        String sql ="SELECT screenings.* from screenings JOIN bookings b on screenings.id = b.screening_id where b.id=" + bookingId;
        Screening screening = jdbc.queryForObject(sql, new BeanPropertyRowMapper<>(Screening.class));
        return screening;
    }

    public void addScreening(Screening newScreening){
        String sql = "INSERT INTO screenings(movie_id, theater_id, time, date, price, is3D, isDolby) VALUES(?,?,?,?,?,?,?);";
        System.out.println(newScreening);
        jdbc.update((Connection connection)->{

                    PreparedStatement ps = connection.prepareStatement(sql);

                        ps.setInt(1, newScreening.getMovie().getId());
                        ps.setInt(2, newScreening.getTheater().getId());

                    //ps.setDate(1,java.sql.Date.valueOf(screening.getScreening_date()));
                    ps.setObject(3,java.sql.Time.valueOf(newScreening.getTime()));
                    ps.setObject(4,java.sql.Date.valueOf(newScreening.getDate()));
    //    Conversion  LocalDateTime to Object and back - https://stackoverflow.com/a/43039615/8421735
                        ps.setBigDecimal(5, newScreening.getPrice());
                        ps.setBoolean(6, false);
                        ps.setBoolean(7, false);

                    return ps;
                }
        );
    }

    public void deleteScreening (int screeningId) {
        String sql = "DELETE FROM screenings WHERE id=" + screeningId;
        jdbc.update(sql);
    }

}
