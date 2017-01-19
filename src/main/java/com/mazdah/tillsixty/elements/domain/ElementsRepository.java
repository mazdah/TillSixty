package com.mazdah.tillsixty.elements.domain;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="elements")
public interface ElementsRepository extends MongoRepository<Elements, String> {
	List<Elements> findByUserIdAndGoalId(@Param("userId") String userId, @Param("goalId") String goalId);
	
	List<Elements> findByUserIdAndGoalIdAndElementTypeOrderByEndDateAsc(@Param("userId") String userId, @Param("goalId") String goalId, @Param("elementType") String elementType);
	
	List<Elements> findByUserIdAndGoalIdAndElementTypeOrderByStatusDesc(@Param("userId") String userId, @Param("goalId") String goalId, @Param("elementType") String elementType);
	
	List<Elements> findByUserIdAndGoalIdAndStatusInOrderByCreateDateAsc(@Param("userId") String userId, @Param("goalId") String goalId, @Param("status") List<String> status);
	
	Long countByUserIdAndGoalIdAndElementType(@Param("userId") String userId, @Param("goalId") String goalId, @Param("elementType") String elementType);
}
