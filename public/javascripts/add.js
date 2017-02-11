$(function(){
    console.log('im on');

    //Watch for chnage to upload photo.
    $("#image-input").on('change', function(){
        var files = document.getElementById('image-input').files;
        var file = files[0];
        if(file == null){
            return alert('No file selected.');
        }
        $('#preview').fadeOut(400);
        getSignedRequest(file);
    }) 


    $('#submit').on('click', function(){


        //Call to our API to make the record        
        $.ajax({
            url: '/api/cities',
            type: 'POST',
            data: {
                "name": $('#name').val(),
                "latitude": $("#lat").val(),
                "longitude": $("#long").val(),
                "image": $("#image-url").val()
            },
            success: function(){
                console.log('got it');
            }, 
            error: function(err){
                console.log(err);
            }
        })
    })
})

