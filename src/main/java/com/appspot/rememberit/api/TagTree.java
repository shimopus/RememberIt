package com.appspot.rememberit.api;

import com.appspot.rememberit.dao.Tag;
import com.appspot.rememberit.dao.TagTreeNode;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.*;

/**
 * User: Babinsky
 * Date: 03.10.12
 */
@Path("/tags")
public class TagTree {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<TagTreeNode> sayHello() {
        Tag tag = new Tag("Root1");
        TagTreeNode rootNode = new TagTreeNode(tag);
        List<TagTreeNode> children = new ArrayList<TagTreeNode>();
        children.add(new TagTreeNode(new Tag("child1")));
        children.add(new TagTreeNode(new Tag("child2")));
        rootNode.setChildren(children);

        return Arrays.asList(rootNode, rootNode);
    }
}
