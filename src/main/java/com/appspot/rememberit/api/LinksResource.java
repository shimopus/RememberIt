package com.appspot.rememberit.api;

import com.appspot.rememberit.dao.Link;
import com.appspot.rememberit.dao.memory.RememberItFacade;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * User: Babinsky
 * Date: 04.10.12
 */
@Path("/links")
public class LinksResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Link> getLinksList(@QueryParam("tag") String tag) {
        if (tag != null) {
            return RememberItFacade.getInstance().getLinksByTag(tag);
        }
        return RememberItFacade.getInstance().getLinksByTag(null);
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Link getLinkById(@PathParam("id") String id) {
        return RememberItFacade.getInstance().getLinkById(id);
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Link updateLinkById(@PathParam("id") String id, Link link) {
        return RememberItFacade.getInstance().saveLink(id, link);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Link addLinkById(Link link) {
        Link ret = RememberItFacade.getInstance().addLink(link);
        if (ret == null) {
            Response response = Response.status(Response.Status.NOT_FOUND).build();
            throw new WebApplicationException(response);
        }

        return ret;
    }

    @DELETE
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void deleteLinkById(@PathParam("id") String id) {
        RememberItFacade.getInstance().removeLink(id);
    }
}
