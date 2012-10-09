package com.appspot.rememberit.dao.memory;

import com.appspot.rememberit.dao.Link;
import com.appspot.rememberit.dao.Tag;
import com.appspot.rememberit.dao.User;

import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * User: Babinsky
 * Date: 08.10.12
 */
public class RememberItStorage {
    private Map<UUID, User> users;
    private Map<String, Tag> tags;
    private Map<String, Link> links;
    private Map<String, List<Tag>> tag_tags;
    private Map<UUID, List<Link>> user_links;
}
