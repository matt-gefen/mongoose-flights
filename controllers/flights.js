import {Flight} from '../models/flight.js'

function index(req, res) {
  res.render('flights/index')
}

function newFlight(req, res) {
  console.log('new flight requested!')
  res.render('flights/new')
}

function create(req, res) {
  console.log('new flight created!')
}

export {
  index,
  newFlight as new,
  create
}