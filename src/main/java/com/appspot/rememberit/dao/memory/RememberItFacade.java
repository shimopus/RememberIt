package com.appspot.rememberit.dao.memory;

import com.appspot.rememberit.dao.Link;
import com.appspot.rememberit.dao.Suggestion;
import com.appspot.rememberit.dao.Tag;
import com.appspot.rememberit.dao.TagTreeNode;

import java.util.*;

/**
 * User: Babinsky
 * Date: 04.10.12
 */
public class RememberItFacade {
    public static final RememberItFacade instance = new RememberItFacade();

    private RememberItFacade() {
        this.addLink(new Link(
                        "http://yandex.ru",
                        "Yandex.ru",
                        "Big description about this link is very big and i don`t know what can i do with it",
                        Arrays.asList(new Tag("Test"), new Tag("Тест1"))));
        this.addLink(new Link(
                        "http://mail.ru",
                        "Mail@Mail.ru",
                        "Big description about this link is very big and i don`t know what can i do with it",
                        Arrays.asList(new Tag("Test1"), new Tag("Тест"))));
        this.addLink(new Link(
                        "http://habrahabr.ru",
                        "habrahabr",
                        "Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it Big description about this link is very big and i don`t know what can i do with it",
                        Arrays.asList(new Tag("Test"), new Tag("Тест"))));

    }

    public static RememberItFacade getInstance() {
        return instance;
    }

    private RememberItStorage storage = new RememberItStorage();

    public Link getLinkById(String id) {
        return storage.getLink(id);
    }

    public Link saveLink(String id, Link link) {
        if (storage.addOrUpdateLink(id, link)) {
            //search of tags duplicates
            List<Tag> uniqueTags = new ArrayList<Tag>(link.getTags().size());
            for (Tag tag : link.getTags()) {
                if (!uniqueTags.contains(tag)) {
                    uniqueTags.add(tag);
                }
            }
            link.setTags(uniqueTags);

            return link;
        } else {
            return null;
        }
    }

    public Link addLink(Link link) {
        if (link != null) {
            storage.addOrUpdateLink(link.getId(), link);
            return link;
        }

        return null;
    }

    public void removeLink(String id) {
        storage.removeLink(id);
    }

    public List<Link> getLinksByTag(String tag) {
        return storage.getLinksByTag(tag);
    }

    public List<TagTreeNode> getTagTree() {
        List<TagTreeNode> tree = new ArrayList<TagTreeNode>(storage.getTags().size());

        //add root level
        for (Tag tag : storage.getTags()) {
            TagTreeNode rootNode = new TagTreeNode(tag);
            tree.add(rootNode);
            addChildren(rootNode, tag, Arrays.asList(tag));
        }

        return tree;
    }

    private void addChildren(TagTreeNode node, Tag tag, List<Tag> alreadyAdded) {
        List<TagTreeNode> childrenNodes = node.getChildren();

        Set<Tag> children = new LinkedHashSet<Tag>();
        List<Link> links = storage.getLinksByTag(tag.getTitle());
        for (Link link : links) {
            children.addAll(link.getTags());
        }

        children.removeAll(alreadyAdded);

        for (Tag next : children) {
            TagTreeNode treeNode = new TagTreeNode(next);
            childrenNodes.add(treeNode);
            List<Tag> added = new ArrayList<Tag>(alreadyAdded);
            added.add(next);

            addChildren(treeNode, next, added);
        }
    }

    public List<Suggestion> search(String term) {
        List<Suggestion> result = new ArrayList<Suggestion>();

        for (Link link : storage.searchLink(term)) {
            result.add(new Suggestion(link.getTitle(), link.getUrl(), Suggestion.Type.LINK));
        }

        for (Tag tag : storage.searchTag(term)) {
            result.add(new Suggestion(tag.getTitle(), tag.getUrl(), Suggestion.Type.TAG));
        }

        return result;
    }
}
