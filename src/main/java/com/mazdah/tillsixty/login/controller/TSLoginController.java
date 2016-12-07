package com.mazdah.tillsixty.login.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/login")
public class TSLoginController {

	private static final Logger logger = LoggerFactory.getLogger(TSLoginController.class);
	
	@RequestMapping(method=RequestMethod.GET)
	@ResponseBody
	public String goLogin() {
		logger.debug("##### goLogin");
		
		return "/login/login";
	}
}
