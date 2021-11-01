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
  departure = String(departure.toLocaleString([], {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}))
  console.log('original departure', departure)
  const month = departure.slice(0,2) 
  const day = departure.slice(3,5) 
  const year = departure.slice(6,8) 
  const time = departure.slice(10,15) 
  departure = `20${year}-${month}-${day}T${time}` 
  console.log("departure", departure)
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

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(error, flight) {
    if(error) {
      console.log(error)
      return res.redirect("/flights")
    }
    res.redirect("/flights")
  })
}
function deleteTicket(req, res) {
  // console.log(req.params)
  Flight.findById(req.params.id, function(error, flight) {
    if(error) {
      console.log(error)
      return res.redirect(`/flights/${req.params.id}`)
    }
      flight.tickets.forEach(function(t, idx) {
        let id = t._id
        let strId = id.toString()
        if(strId === req.params.ticketId) {
          flight.tickets.splice(idx, 1)
        }
      })
      flight.save(function(error) {
        if(error) {
          console.log(error)
          return res.redirect(`/flights/${req.params.id}`)
        }
      })
      res.redirect(`/flights/${req.params.id}`)
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  createTicket,
  deleteFlight as delete,
  deleteTicket
}