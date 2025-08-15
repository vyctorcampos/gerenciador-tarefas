package com.desafio.tarefa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.desafio.tarefa.repository.UserRepository;

@Service
public class AuthServiceImpl implements  UserDetailsService{

	@Autowired
	UserRepository repository;

	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	return repository.findByLogin(username);
	}


   
}
