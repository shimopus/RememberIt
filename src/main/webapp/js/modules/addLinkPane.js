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
            "click #addLinkButton": "addLink",
            "focus #url": "inputFocus"
        },

        render: function () {
            this.$el.html(this.template());
            this.$el.attr("action", this.action);
            return this;
        },

        addLink: function () {
            var link = this.$el.find("input").val();
            if (!link) {
                this.showError();
                this.errorTimeout = setTimeout(_.bind(this.hideError, this), 5000);
            } else {
                this.showDialog(link);
            }
        },

        showError: function () {
            var input = this.$el.find("#url");
            var error = input.attr("data-errorplaceholder");
            var placeholder = input.attr("placeholder");

            this.$el.addClass("error");
            input.attr("placeholder", error).attr("data-errorplaceholder", placeholder);
        },

        hideError: function () {
            var input = this.$el.find("#url");
            var placeholder = input.attr("data-errorplaceholder");
            var error = input.attr("placeholder");

            this.$el.removeClass("error");
            input.attr("placeholder", placeholder).attr("data-errorplaceholder", error);

            this.errorTimeout = null;
        },

        inputFocus: function () {
            if (this.errorTimeout) {
                clearTimeout(this.errorTimeout);
                this.hideError();
            }
        },

        showDialog: function (link) {
            if (!this.dialog) {
                var LinkDialog = remIt.module("linkDialog");
                this.dialog = new LinkDialog.View({
                    model: new LinkDialog.Model()
                });
                this.dialog.render();
            }

            if (link) {
                this.dialog.model.set({
                    stateHidden: false,
                    link: link
                })
            }
        }
    }, {
        templateName: AddLinkPane.name
    });
    remIt.views.register(AddLinkPane, AddLinkPane.View);

})(remIt.module("addLinkPane"));