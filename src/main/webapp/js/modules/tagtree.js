/**
 * User: Babinsky
 * Date: 09.10.12
 */
(function (TagTree) {

    TagTree.Model = Backbone.Model.extend({
        urlRoot: "/api/tags"
    });

    TagTree.Collection = Backbone.Collection.extend({
        model: TagTree.Model,

        url: "/api/tags"
    });

    TagTree.View = Backbone.View.extend({
        render: function () {
            if (!$("#tagTreeContainer").children().length) {
                $("#tagTreeContainer").jstree({
                        core: {
                            animation: false
                        },

                        themes: {
                            theme: "classic",
                            dots: false,
                            icons: false
                        },

                        json_data: {
                            data: this.model.toJSON()
                        },

                        plugins: ["themes", "json_data"]
                    }
                )
                    .bind("loaded.jstree", function () {
                        $(this).find("ul:first").addClass("affix");
                    });
            }
        }
    });

})(remIt.module("tagtree"));