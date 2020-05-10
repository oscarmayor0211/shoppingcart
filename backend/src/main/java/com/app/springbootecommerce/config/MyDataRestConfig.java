package com.app.springbootecommerce.config;


import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.app.springbootecommerce.entity.Product;
import com.app.springbootecommerce.entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{

	private EntityManager entityManager;
	
	@Autowired
	public MyDataRestConfig(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		// TODO Auto-generated method stub
		HttpMethod[] theUnSupportedActions =  {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
		
		// disable HTTP methods for Products: PUT,POST,DELETE
		config.getExposureConfiguration().forDomainType(Product.class).withItemExposure((metdata , httpMethods) -> httpMethods.disable(theUnSupportedActions))
		.withCollectionExposure((metdata , httpMethods) -> httpMethods.disable(theUnSupportedActions));
		
		// disable HTTP methods for ProductCategory: PUT,POST,DELETE
				config.getExposureConfiguration().forDomainType(ProductCategory.class).withItemExposure((metdata , httpMethods) -> httpMethods.disable(theUnSupportedActions))
				.withCollectionExposure((metdata , httpMethods) -> httpMethods.disable(theUnSupportedActions));
				
		
		//call an internal helper method
			exposeIds(config);
		
	}

	private void exposeIds(RepositoryRestConfiguration config) {
		// TODO Auto-generated method stub
		//expose entity ids
		//
		
		// -get a list of all  entity classes from the entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		
		//create an array of the list types
		List<Class> entityClass = new ArrayList<>();
		
		//get the entity types for the entities
		for(EntityType tempEntityType: entities) {
			entityClass.add(tempEntityType.getJavaType());
		}
		
		// expose the entityids for the array of entity/domain tyhpes
		Class[] domainTypes = entityClass.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
	}

	
}
