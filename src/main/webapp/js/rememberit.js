$("#tagTreeContainer").jstree({
        core: {
            animation: false
        },

        themes: {
            theme: "classic",
            dots: false,
            icons: false
        },

        json_data: {
            ajax: {
                url : "/api/tags"
            }
        },


        plugins: ["themes", "json_data" ]
    }
)
    .bind("loaded.jstree", function() {
        $(this).find("ul:first").addClass("affix");
    });

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

    module: function() {
        var modules = {};

        return function(name) {
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
    }(),

    views: function() {
        var viewsByModule = {};

        return {
            register: function(module, view) {
                var views = viewsByModule[module];

                if (!views) {
                    views = [];
                    viewsByModule[module] = views;
                }

                views.push(view);
            },

            loadTemplates: function(callback) {
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

    initialize: function() {
    },

    routes: {
        "" : "home"
    },

    home: function(){
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

        var Search = remIt.module("search");
        $("#searchContainer").html(new Search.View().render().$el);
    }
});

$(function() {
    remIt.views.loadTemplates(function() {
        remIt.app = new RememberItRouter();
        Backbone.history.start();
    })
});