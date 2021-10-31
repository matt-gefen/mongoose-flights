import mongoose from "mongoose"

const Schema = mongoose.Schema

const ticketSchema = new Schema ({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/
  },
  price: {
    type: Number,
    min: 0
  }
})

const flightSchema = new Schema ({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
    required: true
  },
  airport: {
    type: String,
    default:'DEN',
    enum: ['AUS','DFW','DEN', 'LAX', 'SAN']
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    required: true
  },
  departs: {
    type: Date,
    default: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    },
  tickets: [ticketSchema]
  }
)

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}