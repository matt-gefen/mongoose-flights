import {Flight} from '../models/flight.js'

function index(req, res) {
  Flight.find({}, function(error, flights) {
    res.render('flights/index', {
      flights,
      error,
      title: 'Departing Flights'
    })
  })

}

function newFlight(req, res) {
  const newFlight = new Flight()
  let departure = newFlight.departs
  departure = String(departure.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}))
  console.log(departure)
  const month = departure.slice(0,2) 
  const day = departure.slice(3,5) 
  const year = departure.slice(6,10) 
  const time = departure.slice(12,18) 
  departure = `${year}-${month}-${day}T${time}00` 
  console.log(departure)
  res.render('flights/new', {
    departure,
    title: 'Add New Flight'
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') {
      delete req.body[key]
    }
  }

  Flight.create(req.body, function(error, flight) {
    if (error) {
      console.log(error)
      return res.redirect("/flights/new")
    }
    res.redirect("/flights")
  })
}

function show(req, res) {
  console.log(req.params.id)
  Flight.findById(req.params.id, function(error, flight){
    if(error) {
      console.log(error)
      return res.redirect('/flights')
    }
    res.render("flights/show", {
      title: 'Flight Details',
      flight
    })
  })
}

function createTicket(req, res) {
  console.log(req.body)
  Flight.findById(req.params.id, function(error, flight){
    flight.tickets.push(req.body)
    flight.save(function(err) {
      if (err) {
        console.log(err)
        return res.redirect(`/flights/${flight._id}`)
      }
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  createTicket
}