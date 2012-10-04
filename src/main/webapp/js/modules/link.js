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
            $(this.el).html(this.template(this.model.toJSON()));
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
        },

        render: function () {
            $(this.el).empty();
            var _this = this;
            _.each(this.model.models, function (link) {
                $(_this.el).append(new Link.View({model:link}).render().el);
            }, this);
            return this;
        }
    },{
        templateName: "linkListView"
    });
    remIt.views.register(Link, Link.ListView);

})(remIt.module("link"));