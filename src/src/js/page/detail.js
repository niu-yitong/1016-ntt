require(['jquery', "handle"], function($, handle) {
    $('#add').click(function() {
        location.href = '../../index.html'
    })
    $.ajax({
        url: "/api/listJson",
        dataType: "json",
        success: function(res) {
            console.log(res.data);
            var tpl = $('#tpl').html();
            var template = handle.compile(tpl);
            var html = template(res.data);
            $('#section').html(html);
        }
    })
})