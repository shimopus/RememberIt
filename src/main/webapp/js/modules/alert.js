/**
 * User: Babinsky
 * Date: 15.10.12
 */
(function (Alert) {
    Alert.Model = Backbone.Model.extend({
        defaults: {
            text: "error",
            isHidden: true,
            rendered: false
        }
    });

    Alert.View = Backbone.View.extend({
        initialize: function () {
            this.model.on("change:isHidden", this.show_hideAlert, this);
        },

        render: function () {
                var alert = $(this.template(this.model.toJSON()));
                this.$el = alert;
                this.el = alert[0];

                var _this = this;
                alert.on("closed", function () {
                    _this.model.set({
                        isHidden:true
                    });
                });
                $("body").append(alert);

            return this;
        },

        show_hideAlert: function () {
            var isHidden = this.model.get("isHidden");
            var timeout = this.model.timeout;
            if (timeout) {
                clearTimeout(timeout);
                this.model.timeout = null;
            }

            if (!isHidden) {
                var _this = this;
                this.render();
                this.$el.alert();
                this.model.timeout = setTimeout(function () {
                    _this.model.set({
                        isHidden: true
                    });
                    _this.model.timeout = null;
                }, 5000);
            } else {
                this.$el.alert("close");
            }
        }
    }, {
        showAlert: function (text) {
            var alertBox = Alert.View.instance;
            if (!alertBox) {
                alertBox = new Alert.View({
                    model: new Alert.Model()
                });
                Alert.View.instance = alertBox;
            }

            alertBox.model.set({
                text: text,
                isHidden: false
            });
        },

        hideAlert: function () {
            var alertBox = Alert.View.instance;
            if (alertBox) {
                alertBox.model.set({
                    isHidden: true
                });
            }
        },

        instance: null,

        templateName: "alert"
    });
    remIt.views.register(Alert.View);

})(remIt.module("alert"));
