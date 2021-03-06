function makeApiCalls() {
  // console.log('Im in api calls')

  if(document.getElementById('search')){
    $(this).disabled = false
    $('#search').click(function() {
      searchtext = $('#searchtext').val()
      console.log(searchtext)
      searchListByKeyword(searchtext)
    })
  }

  

}

function searchListByKeyword(q) {
  var request = gapi.client.youtube.search.list({
     part: 'snippet',
     q: q, //query searching for surfing
  });
  executeRequest(request)
}

// Sample JavaScript code for printing API response data

function executeRequest(request) {
  request.execute(function(response) {

    var result = response.result //the response in json object
    var view = createView() //the view or list for showing the video search result
    if(result['items'].length!=0) {
        for (var r = 0; r < result['items'].length; r++) {
          var obj = {}
          var item = result['items'][r]
          var itemId = ''
          if (item['rating']) {
            itemId = item['id']
          }
          else {
            if (item['id']['videoId']) {
              itemId = item['id']['videoId']
            } else if (item['id']['channelId']) {
              itemId = item['id']['channelId']
            } else {
              itemId = item['id']
            }
          }
          obj['videoId'] = itemId
          obj['title'] = item['snippet']['title']
          // console.log(item['snippet'])
          obj['thumbnail'] = item['snippet']['thumbnails']['default']['url']
          obj['desc'] = item['snippet']['description']

          var singleton = document.createElement('li')
          singleton.className = 'search-result-group-item container-pushin' 
          var innerdiv = document.createElement('div')
          innerdiv.className = 'item-content'

          var descpanel = document.createElement('div')
          descpanel.className = 'item-content-desc'
          
          var title = document.createElement('span')
          title.textContent = obj['title']
          title.className = 'item-content-desc-name'

          var desc = document.createElement('p')
          desc.textContent = obj['desc']
          desc.className = 'item-content-desc-description'

          descpanel.appendChild(title)
          descpanel.appendChild(desc)
          
          innerdiv.prepend(createLink(obj))
          innerdiv.appendChild(descpanel)

          singleton.appendChild(innerdiv)
          view.appendChild(singleton)

        }
        document.getElementById('searchresult').innerHTML = ''
        document.getElementById('searchresult').appendChild(view)
        //generate a path to directly go to this page
    }else {
      $('#searchresult').html('<p>No videos founded</p>')
    }

  });
}

function createView() {
  var view = document.createElement('ul')
  view.className = 'search-result-group'
  return view
}
function createLink(obj) {
  var link = document.createElement('a')
  link.className = 'item-content-video-link'
  var email = encodeURIComponent($('#email').text())
  console.log(email)
  link.href = './test.php?q='+encodeURIComponent(obj['videoId'])+'&title='+encodeURIComponent(obj['title'])+'&email='+btoa(email)
  link.innerHTML = '<img src="'+obj['thumbnail']+'" width="480" height="360"></img>'
  return link
}


