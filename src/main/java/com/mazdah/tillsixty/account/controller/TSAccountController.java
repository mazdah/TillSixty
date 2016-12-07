package com.mazdah.tillsixty.account.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/account")
public class TSAccountController {

	@RequestMapping(value="/regist", method=RequestMethod.GET)
	@ResponseBody
	public String goRegist () {
		return "/account/regist";
	}
	
	@RequestMapping(value="/edit", method=RequestMethod.GET)
	@ResponseBody
	public String goEdit () {
		return "/account/edit";
	}
}
