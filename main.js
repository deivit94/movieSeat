import { dataBaseJSON } from "./dataBase.js" // Simulate that bring the data from server in JSON

const dataBase = JSON.parse(dataBaseJSON)
const seats = document.querySelectorAll('.half-circle')
const movie = document.getElementById('movie')
const howManyTicket = document.getElementById('howManyTicket')
const howMuchTicket = document.getElementById('howMuchTicket')
let currentMovie = 'me'
let currentPrice = 10


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
      if (dataBaseSeat[index] === 'available') {
        dataBaseSeat[index] = 'selected'
        dataBase[currentMovie].sold++
        updatePaymentInfo()
        paintSeat(seat, '#dada3c')
      } else if (dataBaseSeat[index] === 'selected') {
        dataBaseSeat[index] = 'available'
        dataBase[currentMovie].sold--
        updatePaymentInfo()
        paintSeat(seat, '#2d2d3b')
      }
    })
})





// Functions to make the code cleaner and easier to read

function resetMovieData(newValue) {
  currentMovie = newValue;
  currentPrice = dataBase[currentMovie].price
  howManyTicket.innerHTML = dataBase[currentMovie].sold
  howMuchTicket.innerHTML = dataBase[currentMovie].sold * currentPrice
}

function changeSeatColor(seat, index) {
  const state = dataBase[currentMovie].seats
  if (state[index] === 'selected') paintSeat(seat, '#dada3c')
  if (state[index] === 'available') paintSeat(seat, '#2d2d3b')
  if (state[index] === 'occupied') paintSeat(seat, 'white')
}

function paintSeat(seat, color){
  seat.style.backgroundColor = color
}

function updatePaymentInfo(){
        howManyTicket.innerHTML = dataBase[currentMovie].sold
        howMuchTicket.innerHTML = dataBase[currentMovie].sold * currentPrice
}
