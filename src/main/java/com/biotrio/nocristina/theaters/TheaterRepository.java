package com.biotrio.nocristina.theaters;

import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;

@Repository
public class TheaterRepository {

    Theater t1 = new Theater("blue", 14, 20);
    Theater t2 = new Theater("red", 8, 12);
    Theater t3 = new Theater("orange", 8, 6);

    List<Theater> theaterList = new ArrayList<>();

    public Theater getNewTheater(){
        return t1;
    }

    public List<Theater> getTheaterList(){
        if (theaterList.size() < 1) {
            theaterList.add(t1);
            theaterList.add(t2);
            theaterList.add(t3);
        }

        return theaterList;
    }
}
