package com.appspot.rememberit.dao;

import java.util.UUID;

/**
 * User: Babinsky
 * Date: 04.10.12
 */
public class User {
    private String id;
    private String login;

    public User(String login) {
        this.id = UUID.randomUUID().toString();
        this.login = login;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
