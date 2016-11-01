package com.mazdah.tillsixty.controller.login;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/ts/login")
public class TSLoginController {

	private static final Logger logger = LoggerFactory.getLogger(TSLoginController.class);
	
	@RequestMapping(method=RequestMethod.GET)
	public String goLogin() {
		logger.debug("##### goLogin");
		
		return "/login/login";
	}
}
