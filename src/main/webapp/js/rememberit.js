$("#tagTreeContainer").jstree({
        "themes" : {
            "theme" : "classic",
            "dots" : false,
            "icons" : false
        },

        "json_data" : {
            "ajax" : {
                "url" : "/api/tags"
            }
        },


        plugins : ["themes", "json_data" ]
    }
);

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
            if (modules[name]) {
                return modules[name];
            }

            remIt.modulesName.push(name);
            return modules[name] = {
                "name": name
            };
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
    }
});

$(function() {
    remIt.views.loadTemplates(function() {
        remIt.app = new RememberItRouter();
        Backbone.history.start();
    })
});