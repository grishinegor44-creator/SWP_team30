package gde.gde_website.users.service;

import gde.gde_website.security.JwtUtils;
import gde.gde_website.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UsersRepository repository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;


}
