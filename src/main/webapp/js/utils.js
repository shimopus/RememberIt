/**
 * User: Babinsky
 * Date: 04.10.12
 * Time: 1:25
 */
window.templateLoader = {

    load:function (views, callback) {

        var deferreds = [];

        $.each(views, function (index, view) {
            if (window[view]) {
                deferreds.push($.get('/templates/' + view + '.html', function (data) {
                    window[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

};
