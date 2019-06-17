package com.biotrio.nocristina.models;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;

import javax.validation.Constraint;
import javax.validation.Payload;

//Creating our own custom validator.
//The constraint annotation provides the class which will be used as constraint
//The interface accepts phone as a string.
//https://docs.oracle.com/javaee/7/api/javax/validation/Constraint.html

@Documented
@Constraint(validatedBy = PhoneNumberValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface Phone {





        String message() default "{Phone}";

        Class<?>[] groups() default {};

        Class<? extends Payload>[] payload() default {};

    }
