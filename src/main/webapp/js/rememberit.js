Backbone.View.prototype.close = function () {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};

var remIt = {
    modulesName: [],

    module: (function () {
        var modules = {};

        return function (name) {
            var module = modules[name];

            if (!module) {
                remIt.modulesName.push(name);
                module = {
                    name: name
                };
                modules[name] = module;
            }


            return module;
        };
    })(),

    views: function () {
        var viewsByModule = {};

        return {
            register: function (module, view) {
                var views = viewsByModule[module];

                if (!views) {
                    views = [];
                    viewsByModule[module] = views;
                }

                views.push(view);
            },

            loadTemplates: function (callback) {
                var deferreds = [];

                _.each(_.keys(viewsByModule), function (module) {
                    _.each(viewsByModule[module], function (view) {
                        deferreds.push($.get('/templates/' + view.templateName + '.html', function (data) {
                            view.prototype.template = _.template(data);
                        }, 'html'));
                    });
                });

                $.when.apply(null, deferreds).done(callback);
            }
        }
    }()
};

var RememberItRouter = Backbone.Router.extend({

    initialize: function () {
    },

    routes: {
        "": "home"
    },

    home: function () {
        var Search = remIt.module("search");
        $("#searchContainer").html(new Search.View().render().$el);

        var Filter = remIt.module("filter");
        $("#searchContainer").append(new Filter.View({
            model: new Filter.Model()
        }).render().$el);

        var Link = remIt.module("link");
        var linksView = new Link.ListView({
            model: new Link.Collection()
        });
        linksView.model.fetch({
            success: function () {
                linksView.render();
                $("#linksContainer").html(linksView.el);
            }
        });

        var AddLinkPane = remIt.module("addLinkPane");
        $("#addLinkContainer").html(new AddLinkPane.View().render().$el);

        var TagTree = remIt.module("tagtree");
        var tagTreeView = new TagTree.View({
            model: new TagTree.Collection()
        });
        tagTreeView.model.fetch({
            success: function () {
                tagTreeView.render();
            }
        });
    }
});

$(function () {
    remIt.views.loadTemplates(function () {
        remIt.app = new RememberItRouter();
        Backbone.history.start();
    })
});