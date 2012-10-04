package com.appspot.rememberit.dao.memory;

import com.appspot.rememberit.dao.Link;
import com.appspot.rememberit.dao.User;

import java.util.Arrays;
import java.util.List;

/**
 * User: Babinsky
 * Date: 04.10.12
 */
public class RememberItFacade {
    public List<Link> getLinksByUser(User user) {
        return Arrays.asList(new Link("http://yandex.ru", "Yandex.ru", "Big description about this link is very big and i don`t know what can i do with it"));
    }
}
