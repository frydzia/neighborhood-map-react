const URL = 'https://api.foursquare.com/v2/';
const CLIENT_ID = 'R4W1RTC3UCMQ44NKEEYCYLBYNMUDPVNA4FTIS44SHPNCXSUJ';
const CLIENT_SECRET = 'AWUQMREBRSTGZCN31QBI02PUWCNLQGMGK54DSHNMHMEEP3AK';

export const getSearchResult = (lat, lng, title) =>
	fetch(`${URL}/venues/search?ll=${lat},${lng}&query=${title}
    	&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180801`)
	  	.then(response=>response.json())
	  	.then(response=>response.response.venues)
	  	.catch('error')


export const getDetailInfo = (id) =>
	fetch(`${URL}/venues/${id}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180801`)
  		.then(response => response.json())
  		.catch('error')
