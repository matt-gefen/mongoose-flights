import {Destination} from '../models/destination.js'

function newDestination(req, res) {
  Destination.find({}, function(err, destinations) {
    res.render('destinations/new', {
      title: 'Add Destination',
      destinations
    })
  })
}

export {
  newDestination as new
}