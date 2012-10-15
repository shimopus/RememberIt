package com.appspot.rememberit.dao.memory;

import com.appspot.rememberit.dao.Link;
import com.appspot.rememberit.dao.Tag;
import com.appspot.rememberit.dao.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/**
 * User: Babinsky
 * Date: 04.10.12
 */
public class RememberItFacade {
    public static final RememberItFacade instance = new RememberItFacade();

    private RememberItFacade() {}

    public static RememberItFacade getInstance() {
        return instance;
    }

    private List<Link> links = new ArrayList<Link>(Arrays.asList(
            new Link(
            "http://yandex.ru",
                    "Yandex.ru",
                    "Big description about this link is very big and i don`t know what can i do with it",
            Arrays.asList(new Tag("Test"), new Tag("Тест"))),
            new Link(
            "http://mail.ru",
                    "Mail@Mail.ru",
                    "Big description about this link is very big and i don`t know what can i do with it",
            Arrays.asList(new Tag("Test"), new Tag("Тест"))),
            new Link(
            "http://habrahabr.ru",
                    "habrahabr",
                    "Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it",
            Arrays.asList(new Tag("Test"), new Tag("Тест"))),
            new Link(
            "http://yandex.ru",
                    "Yandex.ru",
                    "Big description about this link is very big and i don`t know what can i do with it",
            Arrays.asList(new Tag("Test"), new Tag("Тест"))),
            new Link(
            "http://mail.ru",
                    "Mail@Mail.ru",
                    "Big description about this link is very big and i don`t know what can i do with it",
            Arrays.asList(new Tag("Test"), new Tag("Тест"))),
            new Link(
            "http://habrahabr.ru",
                    "habrahabr",
                    "Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it",
            Arrays.asList(new Tag("Test"), new Tag("Тест"))),
            new Link(
            "http://yandex.ru",
                    "Yandex.ru",
                    "Big description about this link is very big and i don`t know what can i do with it",
            Arrays.asList(new Tag("Test"), new Tag("Тест"))),
            new Link(
            "http://mail.ru",
                    "Mail@Mail.ru",
                    "Big description about this link is very big and i don`t know what can i do with it",
            Arrays.asList(new Tag("Test"), new Tag("Тест"))),
            new Link(
            "http://habrahabr.ru",
                    "habrahabr",
                    "Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it",
            Arrays.asList(new Tag("Test"), new Tag("Тест"))),
            new Link(
            "http://yandex.ru",
                    "Yandex.ru",
                    "Big description about this link is very big and i don`t know what can i do with it",
            Arrays.asList(new Tag("Test"), new Tag("Тест"))),
            new Link(
            "http://mail.ru",
                    "Mail@Mail.ru",
                    "Big description about this link is very big and i don`t know what can i do with it",
            Arrays.asList(new Tag("Test"), new Tag("Тест"))),
            new Link(
            "http://habrahabr.ru",
                    "habrahabr",
                    "Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it",
            Arrays.asList(new Tag("Test"), new Tag("Тест")))
            ));

    public List<Link> getLinksByUser(User user) {
        return links;
    }

    public Link getLinkById(String id) {
        for (Link link : links) {
            if (link.getId().equals(id)) {
                return link;
            }
        }

        return null;
    }

    public void saveLink(String id, Link link) {
        int i = 0;
        for (Link next : links) {
            if (next.getId().equals(id)) {
                break;
            }
            i++;
        }

        if (i <= links.size()) {
            links.remove(i);
            links.add(i, link);
        }
    }

    public Link addLink(Link link) {
        if (link != null) {
            this.links.add(link);

            return link;
        }

        return null;
    }
}
