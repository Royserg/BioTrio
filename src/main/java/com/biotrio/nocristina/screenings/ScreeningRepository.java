package com.biotrio.nocristina.screenings;
import com.biotrio.nocristina.Database;
import com.biotrio.nocristina.models.Screening;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class ScreeningRepository {

    private Database db = Database.getInstance();


    public List<Screening> getScreenings(){
        return db.screenings;
    }

    public Screening getScreening(int screeningId) {

        for (Screening screening : db.screenings) {
            if (screening.getId() == screeningId) {
                return screening;
            }
        }

        return null;
    }
}
