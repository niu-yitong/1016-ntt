require(["jquery"], function($) {
    // alert(1);
    $('#send').click(function() {
        var titVal = $('#tit').val();
        var contVal = $('#cont').val();
        $.ajax({
            url: "/api/addlist",
            dataType: 'json',
            type: 'post',
            data: {
                tit: titVal,
                content: contVal
            },
            success: function(res) {
                console.log(res);
                if (res.code === 1) {
                    location.href = "../../page/detail.html"
                }
            }
        })
    })
})