document.getElementById('Add').addEventListener('click', saveVideos);

function saveVideos(e) {
     var videoDescElement = document.getElementById('issueDescInput');
     var videoDesc = videoDescElement.value;
     console.log(videoDesc);
     var videoLinkElement= document.getElementById('issueLinkInput');
     var videoLink = videoLinkElement.value;
     var videoTypeElement = document.getElementById('issueTypeInput');
     var videoType = videoTypeElement.value;
     var videoAddedByElement = document.getElementById('issueAddedByInput');
     var videoAddedBy = videoAddedByElement.value;
     var videoId = chance.guid();
     

     var video = {
         id : videoId,
         description : videoDesc,
         link : videoLink,
         type : videoType,
         addedby : videoAddedBy

     }

     if (localStorage.getItem('videos')== null) {
         var videos = [];
        videos.push(video);
        localStorage.setItem('videos', JSON.stringify(videos))
     }
     else {
         var videos = JSON.parse(localStorage.getItem('videos'));
         videos.push(video);
         localStorage.setItem('videos', JSON.stringify(videos));

     }

     document.getElementById('issueInputForm').reset();

     fetchVideos();
      
     e.preventDefault();

}

function deleteVideo(id) {
    var videos = JSON.parse(localStorage.getItem('videos'));

    for ( var i=0; i < videos.length-1 ; i++) {
        if (videos[i].id == id) {
            videos.splice(i,1);
            localStorage.setItem('videos', JSON.stringify(videos));
        }
    }
   fetchVideos();
}

function fetchVideos() {
    if (localStorage.getItem('videos')== null) {
        var videos = [];
    }
    else {
        var videos = JSON.parse(localStorage.getItem('videos'));
        var videosList = document.getElementById('videoList');

        videosList.innerHTML = '';
        console.log(videos);
        for (var i = 0; i < videos.length; i++) {
            var desc = videos[i].description;
            var link = videos[i].link;
            var type = videos[i].type;
            var addedBy = videos[i].addedby;
            var id = videos[i].id;

            videosList.innerHTML += '<div class="container">' +
                                    '<h6> Video: </h6>'  +
                                    '<h6>'+ desc + '</h6>' +
                                    '<h6><a href="'+link+ '"></a>'+ link + '</h6>' +
                                    '<p><span class="glyphicon glyphicon-time"></span>'+ type + '</p>' +
                                    '<p><span class="glyphicon glyphicon-user"></span>'+ addedBy + '</p>' +
                                    '<a href="#" onclick="deleteVideo(\''+ id +'\')" class="btn btn-warning">Delete</a>'
                                    '</div>'
        }
    }
}