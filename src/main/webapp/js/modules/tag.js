/**
 * User: Babinsky
 * Date: 11.10.12
 */
(function (Tag) {
    Tag.TagView = Backbone.View.extend({
        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        }
    }, {
        templateName: "tagView"
    });
    remIt.views.register(Tag, Tag.TagView);

    Tag.TagListView = Backbone.View.extend({
        render: function () {
            _.each(this.model, function (tag) {
                this.$el.append(new Tag.TagView({model: tag}).render().$el.find("*:first"));
            }, this);

            return this;
        }
    });
})(remIt.module("tag"));
