/**
 * User: Babinsky
 * Date: 09.10.12
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
            this.model.on("change:tags", this.renderTags, this);
        },

        render: function () {
            var dialog = $(this.template(this.model.toJSON()));
            this.$el = dialog;
            this.el = dialog[0];

            var _this = this;
            dialog.on("hidden", function () {
                _this.model.set({
                    stateHidden: true
                });
            });
            $("body").append(dialog);

            this.renderTags();

            dialog.on("click", "#btnEditUrl", _.bind(this.openEditUrl, this));
            dialog.on("keydown", _.bind(this.dialog_keydown, this));
            dialog.find("form").on("submit", _.bind(this.saveOrEdit, this));

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

        openEditUrl: function () {
            this.$el.find("#linkUrlEdit").removeClass("hide");
            this.$el.find("#linkUrl").addClass("hide");
            this.$el.find("#btnEditUrl").addClass("hide");
        },

        beforeClose: function() {
            this.$el.unbind("click");
            this.$el.unbind("keydown");
            this.$el.find("form").unbind("submit");
            this.$el.remove();
        },

        dialog_keydown: function (event) {
            if (event.which === $.ui.keyCode.ENTER) {
                if ($(event.target).attr("id") === "tags") {
                    this.addTagEvent();
                    return false;
                }
            }
        },

        addTagEvent: function () {
            var tags = _.clone(this.model.get("tags"));
            var tagsInput = this.$el.find("#tags");
            //TODO move to model
            var newTitle = tagsInput.val();
            tagsInput.val("");
            tags.push({
                title: newTitle
            });

            this.model.set({
                tags: tags
            });
        },

        renderTags: function () {
            var tagsContainer = this.$el.find("div.tags-container");
            if (tagsContainer.length) {
                tagsContainer.html("");
                if (this.tagListView) {
                    this.tagListView.close();
                }
                this.tagListView = new (remIt.module("tag")).TagListView({model: this.model.toJSON().tags});
                tagsContainer.append(this.tagListView.render().$el.children());
            }
        },

        saveOrEdit: function (event) {
            console.log("save " + this.model.get("operation"));
            var link = this.model.get("link");
            if (link) {
                link.set({
                    title: this.model.get("title"),
                    tags: this.model.get("tags"),
                    url: this.model.get("url"),
                    description: this.model.get("description")
                }, {
                    silent: true
                })
            }

            link.save();
            event.preventDefault();
        }
    }, {
        templateName: "linkDialog"
    });
    remIt.views.register(LinkDialog, LinkDialog.View);

})(remIt.module("linkDialog"));
