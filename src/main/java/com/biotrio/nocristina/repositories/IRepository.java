package com.biotrio.nocristina.repositories;

import java.util.List;

public interface IRepository<E> {

    E findOne(int id);

    List<E> findAll();

    void deleteOne(int id);

    void updateOne(int id, E itemToUpdate);

}