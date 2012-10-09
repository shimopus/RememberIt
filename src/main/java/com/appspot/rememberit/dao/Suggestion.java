package com.appspot.rememberit.dao;

/**
 * User: Babinsky
 * Date: 08.10.12
 */
public class Suggestion {
    private String label;
    private String url;

    public Suggestion(String label, String url) {
        this.label = label;
        this.url = url;
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
}
