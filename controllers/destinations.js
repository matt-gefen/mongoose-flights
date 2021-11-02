import {Destination} from '../models/destination.js'

function newDestination(req, res) {
  Destination.find({}, function(err, destinations) {
    res.render('destinations/new', {
      title: 'Add Destination',
      destinations
    })
  })
}
function create(req, res) {
  console.log(req.body)
  Destination.create(req.body, function(err, destination) {
    if(err) {
      console.log(err)
      return res.redirect('/destinations/new')
    }
    res.redirect('/destinations/new')
  })
}

export {
  newDestination as new,
  create
}