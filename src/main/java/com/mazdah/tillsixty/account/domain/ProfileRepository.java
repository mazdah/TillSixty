package com.mazdah.tillsixty.account.domain;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProfileRepository extends MongoRepository<Profile, String> {

	List<Profile> findByName(@Param("name") String name);
}
