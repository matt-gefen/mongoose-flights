import {Flight} from '../models/flight.js'

function index(req, res) {
  res.render('flights/index')
}

function newFlight(req, res) {
  console.log('new flight requested!')
}

export {
  index,
  newFlight as new
}