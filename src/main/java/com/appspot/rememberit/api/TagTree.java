package com.appspot.rememberit.api;

import com.appspot.rememberit.dao.TagTreeNode;
import com.appspot.rememberit.dao.memory.RememberItFacade;

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
    public List<TagTreeNode> getTree() {
        return RememberItFacade.getInstance().getTagTree();
    }
}
