package com.mazdah.tillsixty.controller.login;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/ts/login")
public class TSLoginController {

	@RequestMapping(method=RequestMethod.GET)
	public String goLogin() {
		return "/login/login";
	}
}
