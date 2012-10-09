/**
 * Created with IntelliJ IDEA.
 * User: administrator
 * Date: 09.10.12
 * Time: 22:54
 * To change this template use File | Settings | File Templates.
 */
(function (LinkDialog) {

    LinkDialog.Model = Backbone.Model.extend({
        urlRoot: "/api/links",

        stateHidden: true
    });

    LinkDialog.View = Backbone.View.extend({
        initialize: function () {
            this.model.on("change:stateHidden", this.show_hideDialog, this);
        },

        render: function () {
            $("body").append(this.template(this.model.toJSON()).$el.find("*:first"));
        },

        show_hideDialog: function () {
            var stateHidden = this.model.get("stateHidden");
            if (stateHidden) {
                $("#addLinkDialog").modal("show");
            } else {
                $("#addLinkDialog").modal("hide");
            }
        }
    }, {
        templateName: "linkDialog"
    });
    remIt.views.register(LinkDialog, LinkDialog.View);

})(remIt.module("linkDialog"));
