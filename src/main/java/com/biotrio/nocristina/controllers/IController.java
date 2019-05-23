package com.biotrio.nocristina.controllers;

import org.springframework.ui.Model;

import java.util.List;

public interface IController<E> {

    E findOne(int id);

    int saveOne(E itemToSave);

    List<E> findAll();

    void deleteOne(int id);

 //   void updateOne(E itemToUpdate);

    String showPage(Model model);

}