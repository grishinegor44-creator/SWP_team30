package gde.gde_website.users.controller;

import gde.gde_website.games.controller.GamesController;
import gde.gde_website.users.model.AuthResponse;
import gde.gde_website.users.model.User;
import gde.gde_website.users.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UsersController {
    private static final Logger usersControllerLogger = LoggerFactory.getLogger(UsersController.class);

    private final UsersService userService;

    // #TODO: implement this function
    // This function must implement user registration logic,
    // it must save new user to the DB, and return user session token in ideal scenario
    // In the ideal case this function must return ResponseEntity<SessionToken>
    // where SessionToken is a user session token which is provided by the AuthenticationController

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody Map<String, String> userToRegisterBody
    ) {
        return null;
    }

    // #TODO: implement this function
    // This function must implement user login logic,
    // it must check requested username/email + passwordHash from DB, and return user session token in ideal scenario
    // In the ideal case this function must return ResponseEntity<SessionToken>
    // where SessionToken is a user session token which is provided by the AuthenticationController

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody Map<String, String> userToLoginBody
            ) {
        return null;
    }

    @GetMapping("/me")
    public ResponseEntity<User> me(
            Authentication authentication
    ) {

    }
}
