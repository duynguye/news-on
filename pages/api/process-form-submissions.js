import fetch from 'isomorphic-unfetch'
const API_ENDPOINT = 'https://sbgi118262site.wpengine.com/wp-json/frm/v2/forms/1/entries';

export default (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    let message = req.body;
    let buffer = Buffer.from(process.env.formidable + ':x');
    let auth = buffer.toString('base64');
    let interests = [];
    
    if (message.addstation) {
      interests.push('Add your TV station');
    }
    
    if (message.advertiser) {
      interests.push('Become an advertiser');
    }
    
    if (message.press) {
      interests.push('Press inquiry');
    }
    
    if (message.join) {
      interests.push('Join the team');
    }
    
    if (message.other) {
      interests.push('Other');
    }
    
    let results = await fetch('https://sbgi118262site.wpengine.com/wp-json/frm/v2/forms/1/entries', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      	'Authorization': 'Basic OURQQy1ITVlNLUQ4VkktMURCRzp4'
      },
      body: JSON.stringify({
      	"qh4icy": message.fullname,
        "8igzw": message.title,
        "kzex8": message.company,
        "29yf4d": message.email,
        "vfxqe": message.phone,
        "9jv0r1": message.message,
        "rcft7": interests
      })
    });
    
    if (results.ok) {
      res.status(200).send(results);
    } else {
      res.status(500).send(results.statusText);
    }
  }
}
