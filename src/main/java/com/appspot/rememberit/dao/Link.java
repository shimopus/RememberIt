package com.appspot.rememberit.dao;

import java.util.List;
import java.util.UUID;

/**
 * User: Babinsky
 * Date: 04.10.12
 */
public class Link {
    String id;
    String url;
    String title;
    String description;
    List<Tag> tags;

    //For json create
    public Link() {
    }

    public Link(String url, String title, String description, List<Tag> tags) {
        this.id = UUID.randomUUID().toString();
        this.url = url;
        this.title = title;
        this.description = description;
        this.tags = tags;
    }

    public String getId() {
        if (id == null) {
            id = UUID.randomUUID().toString();
        }
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public boolean hasTag(String tag) {
        for (Tag nextTag : tags) {
            if (nextTag.getTitle().equals(tag)) {
                return true;
            }
        }

        return false;
    }
}
