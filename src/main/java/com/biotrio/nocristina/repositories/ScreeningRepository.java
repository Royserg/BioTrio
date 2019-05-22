package com.biotrio.nocristina.repositories;
import com.biotrio.nocristina.models.Screening;
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


    public List<Screening> findByDate(String date) {
        String sql = "SELECT * from screenings WHERE date = '" + date + "'";
        return jdbc.query(sql, new BeanPropertyRowMapper<>(Screening.class));
    }
  
    public List<Screening> findBetweenDates(String date1, String date2){
        String sql = "SELECT * FROM screenings WHERE date BETWEEN '" + date1 + "' AND '" + date2 + "'";
        return jdbc.query(sql, new BeanPropertyRowMapper<>(Screening.class));
    }

    public Screening addScreening(Screening newScreening){

        String sql = "INSERT INTO screenings(movie_id, theater_id, time, date, price) VALUES(?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbc.update((Connection connection)->{

                    PreparedStatement ps = connection.prepareStatement(sql, new String[] {"id"});

                        ps.setInt(1, newScreening.getMovie().getId());
                        ps.setInt(2, newScreening.getTheater().getId());
                        ps.setObject(3,newScreening.getTime());
                        ps.setObject(4,newScreening.getDate());
                        ps.setBigDecimal(5, newScreening.getPrice());

                    return ps;
                },keyHolder);

        newScreening.setId(keyHolder.getKey().intValue());
        return newScreening;
    }

    public void deleteScreening (int screeningId) {
        String sql = "DELETE FROM screenings WHERE id=" + screeningId;
        jdbc.update(sql);
    }

    public void editScreening(Screening sc){

        String sql = "UPDATE screenings SET movie_id = ?, theater_id = ?, time = ?, date = ?, price = ? WHERE id = ?;";
        jdbc.update(sql, sc.getMovie().getId(), sc.getTheater().getId(),sc.getTime(),sc.getDate(),sc.getPrice(), sc.getId());

    }
}
