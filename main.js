import { dataBaseJSON } from "./dataBase.js" // Simulate that bring the data from server in JSON

const dataBase = JSON.parse(dataBaseJSON)
const seats = document.querySelectorAll('.half-circle')
const movie = document.getElementById('movie')
const howManyTicket = document.getElementById('howManyTicket')
const howMuchTicket = document.getElementById('howMuchTicket')
let currentMovie = 'me'
let currentPrice = 10
let numberTickets = 0


seats.forEach((seat, index) => {    // paint the seats according to their state 
  changeSeatColor(seat, index)
})

movie.addEventListener('change', () => {    // listen when client select new movie
  resetMovieData(movie.value)
  
  seats.forEach((seat, index) => {
    changeSeatColor(seat, index)
  })   
})

seats.forEach((seat, index) => {  // when client click a seat that will be selected or available
    seat.addEventListener('click', () => {
      const dataBaseSeat = dataBase[currentMovie].seats
      if (dataBaseSeat[index] === false) {
        dataBaseSeat[index] = true //from Available to Occupied
        numberTickets++
        updatePaymentInfo()
        paintSeat(seat, '#dada3c')
      } else if (dataBaseSeat[index] === true) {
        dataBaseSeat[index] = false //from Occupied to Available
        numberTickets--
        updatePaymentInfo()
        paintSeat(seat, '#2d2d3b')
      }
    })
})





// Functions to make the code cleaner and easier to read

function resetMovieData(newValue) {
  currentMovie = newValue;
  numberTickets = 0
  howManyTicket.innerHTML = 0
  howMuchTicket.innerHTML = 0
  currentPrice = dataBase[currentMovie].price
}

function changeSeatColor(seat, index) {
  const state = dataBase[currentMovie].seats
  if (state[index] === null) paintSeat(seat, 'white')
  if (state[index] === false) paintSeat(seat, '#2d2d3b')
}

function paintSeat(seat, color){
  seat.style.backgroundColor = color
}

function updatePaymentInfo(){
          howManyTicket.innerHTML = numberTickets
        howMuchTicket.innerHTML = numberTickets * currentPrice
}
