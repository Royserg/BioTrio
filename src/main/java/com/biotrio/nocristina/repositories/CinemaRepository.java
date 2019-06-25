package com.biotrio.nocristina.repositories;

import com.biotrio.nocristina.models.Cinema;
import com.biotrio.nocristina.models.Day;
import org.simpleflatmapper.jdbc.spring.JdbcTemplateMapperFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class CinemaRepository implements IRepository<Cinema> {

    @Autowired
    private JdbcTemplate jdbc;

    // Maps one-to-many JOIN query into Bookings and List<Tickets> in each Booking
    private final ResultSetExtractor<List<Cinema>> resultSetExtractor =
            JdbcTemplateMapperFactory
                    .newInstance()
                    .addKeys("id")
                    .newResultSetExtractor(Cinema.class);


    public List<Cinema> findAll(){
        String sql = "SELECT * FROM cinemas";
        List<Cinema> cinemas = jdbc.query(sql, new BeanPropertyRowMapper<>(Cinema.class));

        return cinemas;
    }

    public Cinema findOne(int cinemaId) {
        String sql = "SELECT c.id AS id, c.name AS name, " +
                    " o.day_no AS schedule_day_no, o.opening_hour AS schedule_opening_hour, o.closing_hour AS schedule_closing_hour," +
                    " o.cinema_id AS schedule_cinema_id" +
                    " FROM cinemas c" +
                    " JOIN opening_hours o ON o.cinema_id = c.id WHERE id=?;";

        List<Cinema> cinemas = jdbc.query(sql, new Object[] {cinemaId}, resultSetExtractor);

        return cinemas.get(0);
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

    public void deleteOne(int cinemaId){
        String sql = "DELETE from cinemas WHERE id = ?";
        jdbc.update(sql, cinemaId);
    }

    public void updateOne(int id, Cinema cinemaToEdit) {

        String sql = "UPDATE cinemas SET name = ? WHERE id = ?;";
        jdbc.update(sql, cinemaToEdit.getName(), id);

    }

    public Day findSchedule(int today) {
        String sql = "SELECT * FROM opening_hours where day_no = ?;";
        Day schedule = jdbc.queryForObject(sql, new Object[] {today}, new BeanPropertyRowMapper<>(Day.class));

        return schedule;
    }

    public void updateSchedule(Day day) {

        String sql = "UPDATE opening_hours SET opening_hour = ?, closing_hour = ? WHERE day_no = ?;";
        jdbc.update(sql, day.getOpeningHour(), day.getClosingHour(), day.getDayNo());

    }

}
