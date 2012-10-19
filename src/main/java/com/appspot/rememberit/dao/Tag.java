package com.appspot.rememberit.dao;

/**
 * User: Babinsky
 * Date: 03.10.12
 */
public class Tag {
    private String title;
    private String url;

    public Tag() {
    }

    public Tag(String title) {
        this.title = title;
        setUrl(TagUtils.getUrl(this));
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        if (url == null) {
            url = TagUtils.getUrl(this);
        }
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Tag tag = (Tag) o;

        if (title != null ? !title.equals(tag.title) : tag.title != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return title != null ? title.hashCode() : 0;
    }
}
