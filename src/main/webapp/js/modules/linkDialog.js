/**
 * User: Babinsky
 * Date: 09.10.12
 * Time: 22:54
 * To change this template use File | Settings | File Templates.
 */
(function (LinkDialog) {
    var Link = remIt.module("link");

    LinkDialog.Model = Link.Model.extend({
        /*defaults: {
            stateHidden: true,
            operation: "Save"
        }*/
    });

    LinkDialog.View = Backbone.View.extend({
        initialize: function () {
            this.model.on("change:stateHidden", this.show_hideDialog, this);
        },

        render: function () {
            var dialog = $(this.template(this.model.toJSON()));
            var _this = this;
            dialog.on("hidden", function () {
                _this.model.set({
                    stateHidden: true
                });
            });
            $("body").append(dialog);

            var tagsContainer = dialog.find("div.tags-container");
            if (tagsContainer.length) {
                tagsContainer.append(new (remIt.module("tag")).TagListView({model: this.model.toJSON().tags}).render().$el.children());
            }

            this.$el = dialog;
            return this;
        },

        show_hideDialog: function () {
            var stateHidden = this.model.get("stateHidden");
            if (!stateHidden) {
                this.render();
                $("#addLinkDialog").modal("show");
            } else {
                $("#addLinkDialog").modal("hide");
                this.close();
            }
        },

        beforeClose: function() {
            this.$el.remove();
        }
    }, {
        templateName: "linkDialog"
    });
    remIt.views.register(LinkDialog, LinkDialog.View);

})(remIt.module("linkDialog"));
