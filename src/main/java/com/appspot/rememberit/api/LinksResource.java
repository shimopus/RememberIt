package com.appspot.rememberit.api;

import com.appspot.rememberit.dao.Link;
import com.appspot.rememberit.dao.TagTreeNode;
import com.appspot.rememberit.dao.memory.RememberItFacade;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * User: Babinsky
 * Date: 04.10.12
 */
@Path("/links")
public class LinksResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Link> getLinksList() {
        return new RememberItFacade().getLinksByUser(null);
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Link getLinkById() {
        return new RememberItFacade().getLinksByUser(null).get(0);
    }
}
