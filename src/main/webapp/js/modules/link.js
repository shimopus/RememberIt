/**
 * User: Babinsky
 * Date: 04.10.12
 */
(function (Link) {
    Link.Model = Backbone.Model.extend({
        urlRoot: "/api/links",

        defaults: {
            url: "",
            title: "",
            description: "",
            tags: []
        }
    });

    Link.Collection = Backbone.Collection.extend({
        model: Link.Model,

        url: "/api/links"
    });

    Link.View = Backbone.View.extend({
        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    }, {
        templateName: Link.name
    });
    remIt.views.register(Link.View);

    Link.ListView = Backbone.View.extend({
        tagName: "ol",

        className: "unstyled",

        events: {
            "click #editLink": "editLinkButton"
        },

        initialize: function () {
            this.model.on("reset", function() {
                this.render();
            }, this);

            this.model.on("change", function(link) {
                this.updateLink(link);
                this.focusLink(link);
                remIt.trigger("link:changeList");
            }, this);

            this.model.on("add", function(link) {
                this.$el.append(this.renderLink(link));
                this.focusLink(link);
                remIt.trigger("link:changeList");
            }, this);

            remIt.module("filter").router.on("route:filterByTag", this.filterByTag, this);

            remIt.on("linkDialog:add", this.refreshList, this);

            $(document).on("mousemove", _.bind(this.document_mousemove, this));

            this.initShareButton();
        },

        render: function () {
            this.initActionsBar();

            _.each(this.model.models, function (link) {
                this.$el.append(this.renderLink(link));
            }, this);
            return this;
        },

        renderLink: function (link) {
            var linkEl = new Link.View({model: link}).render().$el.find("*:first");
            var tagsContainer = linkEl.find("div.tags-container");
            if (tagsContainer.length) {
                tagsContainer.append(new (remIt.module("tag")).TagListView({model: link.get("tags")}).render().$el.children());
            }

            return linkEl;
        },

        updateLink: function (link) {
            console.log("update");
            var linkEl = this.renderLink(link);
            var id = link.get("id");
            this.$el.find("section#" + id).html(linkEl.find("section"));
        },

        initActionsBar: function () {
            this.$el.html(this.template());
            this.$el.data("actionsBar", this.$el.find("div.actions"));
            this.$el.find("a#shareLink").css("width", "14px");
        },

        initShareButton: function () {
            window.addthis_config = {
                services_expanded: "facebook," +
                    "facebook_like," +
                    "twitter," +
                    "vk," +
                    "odnoklassniki_ru," +
                    "delicious," +
                    "email",

                services_compact: "facebook," +
                    "facebook_like," +
                    "twitter," +
                    "vk," +
                    "odnoklassniki_ru," +
                    "delicious," +
                    "email",

                ui_click: true,

                data_track_clickback: false
            }
        },

        configureShareButtonFor: function (li) {
            addthis.button("#shareLink", window.addthis_config, {
                url: li.find("a.linkUrl").attr("href"),
                title: li.find("a.linkUrl").text(),
                description: li.find("pre").text()
            });
        },

        document_mousemove: function (event) {
            var ADDTHIS_DIALOG_ID = "at20mc";

            var li = $(event.target);

            if (!li.hasClass("link-container") || !li.attr("id") === ADDTHIS_DIALOG_ID) {
                var maybeli = li.parents("li.link-container");

                if (!maybeli.length) {
                    maybeli = li.parents("#" + ADDTHIS_DIALOG_ID);
                    if (!maybeli.length) {
                        this.show_hideActionsBar(null);
                        return;
                    } else {
                        li = this.$el.data("currentLi");
                    }
                } else {
                    li = maybeli;
                }
            }

            this.show_hideActionsBar(li);
        },

        show_hideActionsBar: function (li) {
            var actionsBar = this.$el.data("actionsBar");

            if (!actionsBar) return;

            if (!li) {
                if (!actionsBar.hideTimeout) {
                    var _this = this;
                    actionsBar.hideTimeout = setTimeout(function () {
                        actionsBar.animation = true;
                        actionsBar.fadeOut("slow", function () {
                            actionsBar.animation = false;
                        });
                        _this.$el.data("currentLi", null);
                    }, 300);
                }
            } else {
                if (actionsBar.hideTimeout) {
                    clearTimeout(actionsBar.hideTimeout);
                    actionsBar.hideTimeout = null;
                }

                if (actionsBar.animation) {
                    return;
                }

                if (!this.$el.data("currentLi") || li[0] !== this.$el.data("currentLi")[0]) {
                    li.prepend(actionsBar);

                    actionsBar.show();

                    this.configureShareButtonFor(li);

                    this.$el.data("currentLi", li);
                }
            }
        },

        filterByTag: function (tag) {
            this.model.fetch({
                data: {
                    tag: tag
                }
            });
        },

        editLinkButton: function () {
            var li = this.$el.data("currentLi");
            if (li) {
                var link = this.model.get(li.find("section").attr("id"));

                if (link) {
                    if (!this.dialog) {
                        var LinkDialog = remIt.module("linkDialog");
                        this.dialog = new LinkDialog.View({
                            model: new LinkDialog.Model()
                        });
                    }

                    this.dialog.model.set(link);

                    this.dialog.model.set({
                        link: link,
                        stateHidden: false,
                        operation: "Edit"
                    });
                }
            }
        },

        refreshList: function(link) {
            this.model.add(link);
        },

        focusLink: function (link) {
            this.$el.find("section#" + link.get("id") + " > a").focus();
            var $el = this.$el;
            setTimeout(function () {
                $el.find("section#" + link.get("id") + "").parent().
                    animate({
                        opacity:0.2
                    }, "slow").
                    animate({
                        opacity:1
                    }, "slow");
            }, 200);
        }
    }, {
        templateName: "linkListView"
    });
    remIt.views.register(Link.ListView);

})(remIt.module("link"));