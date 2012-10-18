package com.appspot.rememberit.dao;

/**
 * User: Babinsky
 * Date: 08.10.12
 */
public class Suggestion {
    private String label;
    private String url;
    private Type type;

    public Suggestion(String label, String url, Type type) {
        this.label = label;
        this.url = url;
        this.type = type;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public enum Type {
        TAG, LINK
    }
}
