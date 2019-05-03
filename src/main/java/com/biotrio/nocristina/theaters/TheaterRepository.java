package com.biotrio.nocristina.theaters;

import com.biotrio.nocristina.Database;
import com.biotrio.nocristina.models.Theater;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class TheaterRepository {

    private Database db = Database.getInstance();

    public List<Theater> getTheaters(){
        return db.theaters;
    }

}
