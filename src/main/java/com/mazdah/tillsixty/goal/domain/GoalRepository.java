package com.mazdah.tillsixty.goal.domain;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface GoalRepository extends MongoRepository<Goal, String> {
	List<Goal> findAll();

	Goal findById(@Param("id") String id);
	
	Goal findByOwner(@Param("owner") String owner);
	
	Goal findByOwnerId(@Param("ownerId") String ownerId);
	
	Goal findByGoalType(@Param("goalType") String goalType);
	
	Goal findByGoalTypeAndGoalSubType(@Param("goalType") String goalType, @Param("goalSubType") String goalSubType);
	
	Goal findByStartDate(@Param("startDate") String startDate);
	
	Goal findByEndDate(@Param("endDate") String endDate);
	
	Goal findByStartDateAndEndDate(@Param("startDate") String startDate, @Param("endDate") String endDate);
	
	Long countById(@Param("id") String id);
	
	Long countByOwner(@Param("owner") String owner);
	
	Long countByOwnerId(@Param("ownerId") String ownerId);
}
