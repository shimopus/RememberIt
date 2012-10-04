/**
 * User: Babinsky
 * Date: 04.10.12
 */
(function(Link) {
    Link.Model = Backbone.Model.extend({
        urlRoot: "/api/links"
    });

    Link.Collection = Backbone.Collection.extend({
        model: Link.Model,

        url: "/api/links"
    });

    Link.View = Backbone.View.extend({
        tagName: "li",

        initialize: function() {
            console.log('Initializing Link View');
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    },{
        templateName: Link.name
    });
    remIt.views.register(Link, Link.View);

    Link.ListView = Backbone.View.extend({
        tagName: "ol",

        className: "unstyled",

        initialize: function() {
            var _this = this;
            this.model.bind("reset", this.render, this);
            this.model.bind("add", function (link) {
                $(_this.el).append(new Link.View({model:link}).render().el);
            });

            $(document).on("mousemove", _.bind(this.document_mousemove, this));
        },

        render: function () {
            this.initActionsBar();

            var _this = this;
            _.each(this.model.models, function (link) {
                $(_this.el).append(new Link.View({model:link}).render().el);
            }, this);
            return this;
        },

        initActionsBar: function() {
            this.$el.html(this.template());
            this.$el.data("actionsBar", this.$el.find("div.actions"));
        },

        document_mousemove: function(event) {
            var li = $(event.target);
            if (!li.hasClass("link-container")) {
                li = li.parents("li.link-container");
                if (!li.length) {
                    this.show_hideActionsBar(null);
                    return;
                }
            }

            this.show_hideActionsBar(li);
        },

        show_hideActionsBar: function(li) {
            var actionsBar = this.$el.data("actionsBar");

            if (!actionsBar) return;

            if (!li) {
                if (actionsBar.hideTimeout) {
                    clearTimeout(actionsBar.hideTimeout);
                }
                var _this = this;
                actionsBar.hideTimeout = setTimeout(function () {
                    actionsBar.animation = true;
                    actionsBar.fadeOut("slow", function() {
                        actionsBar.animation = false;
                    });
                    _this.$el.data("currentLi", null);
                }, 500);
            } else {
                if (actionsBar.hideTimeout) {
                    clearTimeout(actionsBar.hideTimeout);
                    actionsBar.hideTimeout = null;
                }
                if (actionsBar.animation) {
                    return;
                }

                if (!this.$el.data("currentLi") || li[0] !== this.$el.data("currentLi")[0]) {
                    var linkId = li.find("section").id;

                    li.prepend(actionsBar);

                    actionsBar.show();

                    this.$el.data("currentLi", li);
                }
            }
        }
    },{
        templateName: "linkListView"
    });
    remIt.views.register(Link, Link.ListView);

})(remIt.module("link"));