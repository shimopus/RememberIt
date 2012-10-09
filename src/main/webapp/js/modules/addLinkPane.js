/**
 * User: Babinsky
 * Date: 09.10.12
 */
(function (AddLinkPane) {
    AddLinkPane.View = Backbone.View.extend({
        tagName: "form",

        className: "form-inline",

        action: "/addLink",

        render: function () {
            this.$el.html(this.template());
            this.$el.attr("action", this.action);
            return this;
        }
    }, {
        templateName: AddLinkPane.name
    });
    remIt.views.register(AddLinkPane, AddLinkPane.View);

})(remIt.module("addLinkPane"));