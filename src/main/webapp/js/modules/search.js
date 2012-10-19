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
                },

                select: function (event, li) {
                    _this.onSelect(li);
                    return false;
                }
            })
            .data( "autocomplete" )._renderItem = _.bind(this.renderSuggestion, this);
            return this;
        },

        renderSuggestion: function( ul, suggestion ) {
            var aContent = "";
            var term = this.$el.find("input").val().toUpperCase();
            var label = suggestion.label;

            var i = -1;
            if ((i = suggestion.label.toUpperCase().indexOf(term)) >= 0) {
                var start = suggestion.label.substring(0, i);
                var middle = suggestion.label.substring(i, i + term.length);
                var end = suggestion.label.substring(i + term.length);
                label = _.escape(start) + "<b>" + _.escape(middle) + "</b>" + _.escape(end);
            }

            switch (suggestion.type) {
                case "LINK" : {
                    aContent = label;
                    break;
                }

                case "TAG" : {
                    aContent = $("<span>")
                        .addClass("label")
                        .html(label);
                    break;
                }
            }

            return $("<li>")
                .data("item.autocomplete", suggestion)
                .append($("<a>").append(aContent))
                .appendTo(ul);
        },

        onSelect: function (li) {
            window.document.location.href = li.item.url;
            this.$el.find("input").val("");
        }
    }, {
        templateName: Search.name
    });
    remIt.views.register(Search.View);

})(remIt.module("search"));
