package gde.gde_website.users.service;

import gde.gde_website.security.JwtUtils;
import gde.gde_website.users.entity.UserEntity;
import gde.gde_website.users.model.LoginResponse;
import gde.gde_website.users.model.RegisterRequest;
import gde.gde_website.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UsersRepository userRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;


    public LoginResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with such email is already registered");
        }

        String hashedPassword = passwordEncoder.encode(request.password());

        UserEntity newUser = new UserEntity(
                request.username(),
                request.email(),
                hashedPassword,
                request.profileImageUrl()
        );

        UserEntity savedUser = userRepository.save(newUser);

        String token = jwtUtils.generateToken(savedUser.getId());
        return new LoginResponse(token);
    }

}
