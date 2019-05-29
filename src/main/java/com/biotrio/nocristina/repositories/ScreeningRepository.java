package com.biotrio.nocristina.repositories;
import com.biotrio.nocristina.models.Screening;
import org.simpleflatmapper.jdbc.spring.JdbcTemplateMapperFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class ScreeningRepository implements IRepository<Screening>{

    @Autowired
    private JdbcTemplate jdbc;

    // https://arnaudroger.github.io/blog/2017/06/13/jdbc-template-one-to-many.html
    private final ResultSetExtractor<List<Screening>> resultSetExtractor =
            JdbcTemplateMapperFactory
                    .newInstance()
                    .addKeys("id")
                    .newResultSetExtractor(Screening.class);


    public List<Screening> findAll(){

        List<Screening> screenings = jdbc.query(getJoinedQuery(), resultSetExtractor);

        return screenings;
    }

//    TODO: convert to prepared statement
    public Screening findOne(int screeningId) {

       String sql = getJoinedQuery()+ " WHERE s.id = ?";
       List <Screening> screenings = jdbc.query(sql,new Object[]{screeningId}, resultSetExtractor);

       return screenings.get(0);
    }

    /**
     * Find all <Screening>s that are connected with provided movie
     * Screenings also contain Theater info
     * @param movieId (int) id of a movie
     * @return (List<Screening>) collection of screenings for particular movie
     */
    public List<Screening> findByMovieId(int movieId) {
//        String sql = "SELECT * FROM screenings WHERE movie_id = " + movieId;
        String sql = getJoinedQuery() + " WHERE m.id = ?";

        List<Screening> screeningList = jdbc.query(sql, new Object[]{movieId}, resultSetExtractor);

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

    public int addScreening(Screening newScreening){

        String sql = "INSERT INTO screenings(movie_id, theater_id, time, date, price) VALUES(?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbc.update((Connection connection)->{

            PreparedStatement ps = connection.prepareStatement(sql, new String[] {"id"});

                ps.setInt(1, newScreening.getMovieId());
                ps.setInt(2, newScreening.getTheater().getId());
                ps.setObject(3,newScreening.getTime());
                ps.setObject(4,newScreening.getDate());
                ps.setBigDecimal(5, newScreening.getPrice());

            return ps;
        },keyHolder);

        return keyHolder.getKey().intValue();
    }

    public void deleteOne (int screeningId) {
        String sql = "DELETE FROM screenings WHERE id=" + screeningId;
        jdbc.update(sql);
    }


    public void updateOne(int id, Screening sc){
        String sql = "UPDATE screenings SET movie_id = ?, theater_id = ?, time = ?, date = ?, price = ? WHERE id = ?;";
        jdbc.update(sql, sc.getMovieId(), sc.getTheater().getId(),sc.getTime(),sc.getDate(),sc.getPrice(), id);

    }

    private String getJoinedQuery(){
        String query = "SELECT s.id AS id, s.time, s.date, s.price, s.movie_id," +
                " th.id as theater_id, th.name as theater_name, th.rows_number as theater_rows_number," +
                " th.columns_number as theater_columns_number," +
                " th.can3D as theater_can3d, th.dolby as theater_dolby" +
                " FROM screenings s" +
                " JOIN theaters th ON th.id = s.theater_id" +
                " JOIN movies m ON m.id = s.movie_id";
        return query;

    }
}
