package com.mazdah.tillsixty.goal.domain;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="elements")
public interface ElementsRepository extends MongoRepository<Elements, String> {
	List<Elements> findByUserIdAndGoalId(@Param("userId") String userId, @Param("goalId") String goalId);
	List<Elements> findByUserIdAndGoalIdAndElementType(@Param("userId") String userId, @Param("goalId") String goalId, @Param("elementType") String elementType);
}