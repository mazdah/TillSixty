package com.mazdah.tillsixty.account.domain;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface UserRepository extends MongoRepository<User, String> {

	List<User> findByName(@Param("name") String name);
	
	User findByUserIdAndPassword (@Param("userId") String userId, @Param("password") String password);
	
	Long countByUserIdAndPassword (@Param("userId") String userId, @Param("password") String password);
	
	Long countByUserId(@Param("userId") String userId);
	
	Long countByEmail(@Param("email") String email);
}
