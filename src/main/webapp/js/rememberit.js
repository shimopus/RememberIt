$("#tagTreeContainer").jstree(
    {
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

var rememberIt = {
    modulesName: [],

    module: function() {
        var modules = {};

        return function(name) {
            if (modules[name]) {
                return modules[name];
            }

            rememberIt.modulesName.push(name);
            return modules[name] = {
                "name": name
            };
        };
    }(),

    loadTemplates: function(callback) {

        var deferreds = [];

        $.each(rememberIt.modulesName, function(index, moduleName) {
            var module = rememberIt.module(moduleName);
            if (module.View) {
                deferreds.push($.get('templates/' + moduleName + '.html', function(data) {
                    module.View.prototype.template = _.template(data);
                }, 'html'));
            } else {
                console.log("View for module " + moduleName + " is not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }
};

var RememberItRouter = Backbone.Router.extend({

    initialize: function() {
    },

    routes: {
    }
});

rememberIt.loadTemplates(function() {
    Backbone.history.start();
});