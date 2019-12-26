import fetch from 'isomorphic-unfetch'
const API_ENDPOINT = 'https://sbgi118262site.wpengine.com/wp-json/frm/v2/forms/1/entries';

export default (req, res) => {
  let message = req.body;
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

  res.status(200).send(JSON.stringify({
    "qh4icy": message.fullname,
    "8igzw": message.title,
    "kzex8": message.company,
    "29yf4d": message.email,
    "vfxqe": message.phone,
    "9jv0r1": message.message,
    "rcft7": interests
  }))
  
  // fetch('https://sbgi118262site.wpengine.com/wp-json/frm/v2/forms/1/entries', {
  //   method: 'POST',
  //   headers: { 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Basic OURQQy1ITVlNLUQ4VkktMURCRzp4'
  //   },
  //   body: JSON.stringify({
  //     "qh4icy": message.fullname,
  //     "8igzw": message.title,
  //     "kzex8": message.company,
  //     "29yf4d": message.email,
  //     "vfxqe": message.phone,
  //     "9jv0r1": message.message,
  //     "rcft7": interests
  //   })
  // }).then(response => {
  //   if (response.ok) {
  //     res.status(200).send('Success');
  //   } else {
  //     res.status(response.status).send(JSON.stringify(req));
  //   }
  // });
}
