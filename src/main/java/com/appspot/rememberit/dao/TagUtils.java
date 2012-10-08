package com.appspot.rememberit.dao;

/**
 * User: Babinsky
 * Date: 08.10.12
 */
public class TagUtils {
    public static String getUrl(Tag tag) {
        return "/tag/" + tag.getTitle();
    }
}
