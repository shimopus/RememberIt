package com.appspot.rememberit.dao;

/**
 * User: Babinsky
 * Date: 03.10.12
 */
public class Tag {
    private String title;

    public Tag(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return "/tag/" + title;
    }
}
