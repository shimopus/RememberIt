package com.appspot.rememberit.dao;

import com.appspot.rememberit.dao.Tag;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User: Babinsky
 * Date: 03.10.12
 */

/**
 * {
 *     data: {
 *         title: title of node,
 *         attr: {
 *         //attributes on anchor
 *             "class" : "label",
 *             "href" : "#"
 *         }
 *     }
 *     state : "open/close/etc",
 *     attr : {
 *         //attributes on list item
 *     },
 *     children : [{
 *         //child node
 *     }, {
 *         //child node
 *     }]
 * }
 */
public class TagTreeNode {
    private Map<String, Object> data;
    private String state;
    private List<TagTreeNode> children;
    private Map<String, String> attr;

    public TagTreeNode(Tag tag) {
        this.data = new HashMap<String, Object>();
        this.data.put("title", tag.getTitle());
        Map<String, String> tmp = new HashMap<String, String>();
        tmp.put("class", "label");
        tmp.put("href", tag.getUrl());
        this.data.put("attr", tmp);
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public List<TagTreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TagTreeNode> children) {
        this.children = children;
    }

    public Map<String, String> getAttr() {
        return attr;
    }

    public void setAttr(Map<String, String> attr) {
        this.attr = attr;
    }
}
