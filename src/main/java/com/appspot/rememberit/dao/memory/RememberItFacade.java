package com.appspot.rememberit.dao.memory;

import com.appspot.rememberit.dao.Link;
import com.appspot.rememberit.dao.Tag;
import com.appspot.rememberit.dao.User;

import java.util.Arrays;
import java.util.List;

/**
 * User: Babinsky
 * Date: 04.10.12
 */
public class RememberItFacade {
    public List<Link> getLinksByUser(User user) {
        return Arrays.asList(
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
        );
    }
}
