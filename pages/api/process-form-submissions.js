import fetch from 'isomorphic-unfetch'

export default (req, res) => {
  res.json({ name: 'Andy', email: 'andy@compulse.com' })
}
