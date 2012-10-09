/**
 * User: Babinsky
 * Date: 08.10.12
 */

(function (Search) {
    Search.View = Backbone.View.extend({
        tagName: "form",

        className: "form-search",

        action: "/search",

        render: function () {
            this.$el.html(this.template());
            this.$el.attr("action", this.action);

            var _this = this;
            this.$el.find("input").autocomplete({
                source: function (request, response) {
                    if (_this.xhr) {
                        _this.xhr.abort();
                    }
                    _this.xhr = $.ajax({
                        url: "/api" + _this.action + "/" + request.term,
                        data: {},
                        dataType: "json",
                        success: function (data, status) {
                            response(data);
                        },
                        error: function () {
                            response([]);
                        }
                    });
                }
            });
            return this;
        }
    }, {
        templateName: Search.name
    });
    remIt.views.register(Search, Search.View);

})(remIt.module("search"));
