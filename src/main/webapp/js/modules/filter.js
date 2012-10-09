/**
 * User: Babinsky
 * Date: 09.10.12
 */
(function (Filter) {
    var currentFilterModel;

    Filter.Model = Backbone.Model.extend({
        tagLabel: null
    });

    Filter.View = Backbone.View.extend({
        className: "filter",

        events: {
            "click a.link": "clear"
        },

        initialize: function(){
            currentFilterModel = this.model;
            this.model.on("change:tagLabel", this.render, this);

            Filter.router = new Filter.Router();
        },

        render: function () {
            var tagLabel = this.model.get("tagLabel");
            if (tagLabel) {
                this.$el.html(this.template(this.model.toJSON()));
            } else {
                this.$el.html("");
            }
            return this;
        },

        clear: function () {
            this.model.set({
                tagLabel: null
            });
        }
    }, {
        templateName: "filter"
    });
    remIt.views.register(Filter, Filter.View);

    Filter.Router = Backbone.Router.extend({
        routes: {
            "tag/:tag": "filterByTag"
        },

        filterByTag: function (tag) {
            currentFilterModel.set({
                "tagLabel": tag
            });
        }
    });

    Filter.router = null;

})(remIt.module("filter"));
