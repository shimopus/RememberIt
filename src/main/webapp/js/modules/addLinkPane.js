/**
 * User: Babinsky
 * Date: 09.10.12
 */
(function (AddLinkPane) {
    AddLinkPane.View = Backbone.View.extend({
        tagName: "form",

        className: "form-inline control-group",

        action: "/addLink",

        events: {
            "click #addLinkButton": "addLink"
        },

        render: function () {
            this.$el.html(this.template());
            this.$el.attr("action", this.action);
            return this;
        },

        addLink: function () {
            var link = this.$el.find("input").val();
            if (!link) {
                this.$el.addClass("error").
                    find("#error").
                    removeClass("hide");
                var _this = this;
                setTimeout(function () {
                    _this.$el.removeClass("error").
                        find("#error").
                        addClass("hide");
                }, 5000);
            }
        }
    }, {
        templateName: AddLinkPane.name
    });
    remIt.views.register(AddLinkPane, AddLinkPane.View);

})(remIt.module("addLinkPane"));