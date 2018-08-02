// ======= Parameters: ========================================================
const api = 'https://api.foursquare.com/v2/';
const client_id = 'R4W1RTC3UCMQ44NKEEYCYLBYNMUDPVNA4FTIS44SHPNCXSUJ';
const client_secret = 'AWUQMREBRSTGZCN31QBI02PUWCNLQGMGK54DSHNMHMEEP3AK';
const limit = 1; // max number of venues to load
const v = '20180801'; // version of the API
const headers = {'Accept': 'application/json'}
// query - type of venues we want to query
// ll - the latitude and longitude of place to search

// ======= Requests: ===========================================================
export const getVenue = (lat, lng, name) =>
	fetch(`${api}/venues/search?ll=${lat},${lng}&limit=${limit}&query=${name}&client_id=${client_id}&client_secret=${client_secret}&v=${v}`, { headers })
	  	.then(response=>response.json())
	  	.then(response=>response.response.venues)

export const getDetailInfo = (id) =>
	fetch(`${api}/venues/${id}?&client_id=${client_id}&client_secret=${client_secret}&v=${v}`, { headers })
  		.then(response => response.json())
  		.then(response=>response.response.venue)
