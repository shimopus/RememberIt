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
        tree: null,

        initialize: function () {
            remIt.on("link:changeList", this.refreshTree, this);
        },

        render: function () {
            var _this = this;
            if (!this.tree) {
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
                        _this.tree = $.jstree._reference($(this));
                        _this.tree.save_opened();
                    });
            }
        },

        refreshTree: function () {
            this.tree.refresh(); //TODO how to do it?
        },

        beforeClose: function () {
            this.tree.destroy();
        }
    });

})(remIt.module("tagtree"));