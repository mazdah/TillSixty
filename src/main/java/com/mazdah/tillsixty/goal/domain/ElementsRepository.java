package com.mazdah.tillsixty.goal.domain;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="elements")
public interface ElementsRepository extends MongoRepository<Elements, String> {

}
