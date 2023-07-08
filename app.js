const clientID = `9d7a9d996a9e4912b8cc59d93b12d6d9`
const clienSecret = `f85f99af209742c49fc0c918ab2e6475`

let myToken
let tokenState


let albumItem = document.createElement('li')
const albumList = document.querySelector('#album-list')
const albumButton = document.createElement('button')
const tempoAlbumName = document.createElement('img')


const _getToken = async () => {

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type' : "application/x-www-form-urlencoded",
      'Authorization' : 'Basic ' + btoa( clientID + ':' + clienSecret )
    },
    body: `grant_type=client_credentials`
  });

  const data = await result.json()
  return data.access_token;
}


const _searchAlbum = async (token, albumName) => {

  const type = 'album'
  const limit = 5
  
  albumName = albumName.replace(/ /g, '%2520' )

  albumRes = await fetch(`https://api.spotify.com/v1/search?q=${albumName}&type=${type}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Authorization' :  'Bearer ' + token
    }
  })

  const data = await albumRes.json()
  return data
}

const list = document.querySelector('#album-list')
const albumInputName = document.querySelector('#album-name')

function _inputChanged(){
  if(tokenState){
    _searchAlbum(myToken, albumInputName.value)
    .then(data => {
      albumList.innerHTML = ""
      data.albums.items.forEach(element => {
        

        albumItem = document.createElement('button')
        albumItem.innerHTML = element.name
        albumItem.id = element.name
        albumItem.onclick = _albumSelect(albumItem.id, element.)


        console.log(albumItem)
        albumList.appendChild(albumItem)
      })
    })
  }
  else {
    alert('Seu token ainda não foi gerado, aguarde alguns segundos!')
  }
}

function _albumSelect(name, url) {
  name
}


_getToken()
.then(data => {
  myToken = data
  tokenState = true
  console.log('Token recebido')
})




function displayAlbums(albumsList){
  albumsList.forEach(element => {
    console.log(element.name)
  });
}