package com.biotrio.nocristina.models;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
public class TheaterValidator implements Validator {

    public boolean supports(Class clazz){
        return Theater.class.equals(clazz);
    }

    public void validate(Object obj, Errors e){
        ValidationUtils.rejectIfEmpty(e, "name", "name.empty");
        ValidationUtils.rejectIfEmpty(e, "rowsNumber", "rowsNumber.empty");
        ValidationUtils.rejectIfEmpty(e, "columnsNumber", "columnsNumber.empty");

        Theater theater = (Theater) obj;

        if(theater.getRowsNumber() < 0){
            e.rejectValue("rowsNumber", "NegativeVal");
        }

        if(theater.getColumnsNumber() < 0){
            e.rejectValue("columnsNumber", "NegativeVal");

        }

    }
}
