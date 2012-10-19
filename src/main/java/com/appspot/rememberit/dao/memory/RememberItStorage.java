package com.appspot.rememberit.dao.memory;

import com.appspot.rememberit.dao.Link;
import com.appspot.rememberit.dao.Tag;

import java.util.*;

/**
 * User: Babinsky
 * Date: 08.10.12
 */
public class RememberItStorage {
    private Map<String, Tag> tags = new LinkedHashMap<String, Tag>();
    private Map<String, Link> links  = new LinkedHashMap<String, Link>();
    private Map<String, List<Tag>> tag_tags  = new LinkedHashMap<String, List<Tag>>();

    public Link getLink(String id) {
        return links.get(id);
    }

    public boolean addOrUpdateLink(String id, Link link) {
        if (!links.containsKey(id)) {
            //add new
            for (Link next : links.values()) {
                if (next.getUrl().equals(link.getUrl())) {
                    return false;
                }
            }
        }

        addTagsFromLink(link);
        links.put(id, link);

        return true;
    }

    public void removeLink(String id) {
        removeTagsFromTree(links.remove(id));
    }

    private void removeTagsFromTree(Link link) {
        for (Tag tag : link.getTags()) {
            tags.remove(tag.getTitle());
        }
    }

    public List<Link> getLinksByTag(String tag) {
        if (tag == null) return new ArrayList<Link>(this.links.values());

        List<Link> filteredLinks = new ArrayList<Link>();
        for (Link link : links.values()) {
            if (link.hasTag(tag)) {
                filteredLinks.add(link);
            }
        }

        return filteredLinks;
    }

    private void addTagsFromLink(Link link) {
        for (Tag tag : link.getTags()) {
            if (!tags.containsKey(tag.getTitle())) {
                tags.put(tag.getTitle(), tag);
            }
        }
    }

    public Collection<Tag> getTags() {
        return tags.values();
    }

    public List<Link> searchLink(String term) {
        List<Link> result = new ArrayList<Link>();

        for (Link link : links.values()) {
            if (link.getTitle().toUpperCase().contains(term.toUpperCase())
                    || link.getDescription().toUpperCase().contains(term.toUpperCase())
                    || link.getUrl().toUpperCase().contains(term.toUpperCase())) {

                result.add(link);
            }
        }

        return result;
    }

    public List<Tag> searchTag(String term) {
        List<Tag> result = new ArrayList<Tag>();

        for (Tag tag : tags.values()) {
            if (tag.getTitle().toUpperCase().contains(term.toUpperCase())) {
                result.add(tag);
            }
        }

        return result;
    }
}
