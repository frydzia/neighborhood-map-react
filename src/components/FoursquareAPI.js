const api = 'https://api.foursquare.com/v2/';
const client_id = 'R4W1RTC3UCMQ44NKEEYCYLBYNMUDPVNA4FTIS44SHPNCXSUJ'; //Client ID obtained by getting developer access
const client_secret = 'AWUQMREBRSTGZCN31QBI02PUWCNLQGMGK54DSHNMHMEEP3AK'; //Client Secret obtained by getting developer access
const limit = 1; //The max number of venues to load
//const query = ''; //The type of venues we want to query
const v = '20180801'; //The version of the API.
//const ll = ''; //The latitude and longitude of Charing Cross, London
const headers = {'Accept': 'application/json'}


export const getVenue = (lat, lng, name) =>
	fetch(`${api}/venues/search?ll=${lat},${lng}&limit=${limit}&query=${name}&client_id=${client_id}&client_secret=${client_secret}&v=${v}`, { headers })
	  	.then(response=>response.json())
//      .then(data => data)
	  	.then(response=>response.response.venues)
//	  	.catch('error')


export const getDetailInfo = (id) =>
	fetch(`${api}/venues/${id}?&client_id=${client_id}&client_secret=${client_secret}&v=${v}`)
  		.then(response => response.json())
  		.then(response=>response.response.venue)
