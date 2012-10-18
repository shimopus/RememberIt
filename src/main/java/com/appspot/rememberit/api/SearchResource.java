package com.appspot.rememberit.api;

import com.appspot.rememberit.dao.Suggestion;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

/**
 * User: Babinsky
 * Date: 08.10.12
 */
@Path("/search")
public class SearchResource {

    @GET
    @Path("{term}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Suggestion> getSuggestions(@PathParam("term") String term){
        List<Suggestion> suggestions = new ArrayList<Suggestion>();
        suggestions.add(new Suggestion("Test", "#/tag/Test", Suggestion.Type.TAG));
        suggestions.add(new Suggestion("Yandex.ru", "http://www.yandex.ru", Suggestion.Type.LINK));
        return suggestions;
    }
}
