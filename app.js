const clientID = `9d7a9d996a9e4912b8cc59d93b12d6d9`
const clienSecret = `f85f99af209742c49fc0c918ab2e6475`


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


_getToken()
.then(data => _searchAlbum(data, 'Dark Side Of The Moon'))
.then(data => console.log(data.albums.items))

