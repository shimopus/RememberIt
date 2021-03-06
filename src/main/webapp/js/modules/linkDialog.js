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
            this.$el.find("#url").removeClass("hide");
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
            var newTitle = tagsInput.val().trim();
            if (newTitle === "") return;
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
            var form = this.$el.find("form");
            var isAdd = false;
            var link = this.model.get("link");
            if (!link) {
                link = new Link.Model();
                isAdd = true;
            }

            link.set({
                title: form.find("#title").val(),
                tags: this.model.get("tags"),
                url: form.find("#url").val(),
                description: form.find("#description").val()
            });

            var _this = this;
            link.save({},{
                success: function () {
                    if (isAdd) {
                        remIt.trigger("linkDialog:add", link);
                    } else {
                        remIt.trigger("linkDialog:edit", link);
                    }
                    _this.model.set({
                        stateHidden: true
                    });
                },

                error: function () {
                    var Alert = remIt.module("alert");
                    Alert.View.showAlert("We can't save this link. Something is wrong. Please try to save later.");
                }
            });

            return false;
        }
    }, {
        templateName: "linkDialog"
    });
    remIt.views.register(LinkDialog.View);

})(remIt.module("linkDialog"));
