package gde.gde_website.users.model;

public record AuthResponse(
        String token,
        Long userId
) {}