package com.biotrio.nocristina.models;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

//PhoneNumberValidator is the validator used in the phone interface.
//We use ConstraintValidator from the javax validation library, which extends an interface, in or case "Phone"
//https://docs.oracle.com/javaee/7/api/javax/validation/ConstraintValidator.html

public class PhoneNumberValidator implements ConstraintValidator<Phone, String> {

        //isValid is a boolean that tell whether the data is true or false, true being valid.
        @Override
        public boolean isValid(String phoneNo, ConstraintValidatorContext ctx) {
            if(phoneNo == null){
                return false;
            }
            //validate phone numbers of format "1234567890"
            if (phoneNo.matches("\\d{10}")) return true;
                //validating phone number with -, . or spaces
            else if(phoneNo.matches("\\d{3}[-\\.\\s]\\d{3}[-\\.\\s]\\d{4}")) return true;
                //validating phone number with extension length from 3 to 5
            else if(phoneNo.matches("\\d{3}-\\d{3}-\\d{4}\\s(x|(ext))\\d{3,5}")) return true;
                //validating phone number where area code is in braces ()
            else if(phoneNo.matches("\\(\\d{3}\\)-\\d{3}-\\d{4}")) return true;
                //return false if nothing matches the input
            else return false;
        }

    }

