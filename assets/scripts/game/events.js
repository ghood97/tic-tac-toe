'use strict'

const api = require('./api.js')
const store = require('../store.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const onCellClick = (event) => {
  event.preventDefault()
  if ($(event.target).text() === '' && ui.checkWinner() === false) {
    const cellIndex = $(event.target).attr('data-index')
    const cellValue = store.turn % 2 ? 'x' : 'o'
    store.game.cells[cellIndex] = cellValue
    if (ui.checkWinner()) {
      api.updateGame(cellIndex, cellValue, true).then(ui.onUpdateSuccess).catch(console.error())
    } else {
      api.updateGame(cellIndex, cellValue, false).then(ui.onUpdateSuccess).catch(console.error())
    }
  } else if (ui.checkWinner()) {
    const playerTurn = store.turn % 2 ? 'x' : 'o'
    ui.successMessage(`Player ${playerTurn.toUpperCase()} Wins! Click new game to play again.`)
  }
}

const onCreateGame = (event) => {
  event.preventDefault()
  api.createGame().then(ui.onCreateGameSuccess).catch(ui.onCreateGameFilure)
}

const onSignUp = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signUp(formData).then(ui.onSignUpSuccess).catch(ui.onSignUpFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signIn(formData).then(ui.onSignInSuccess).catch(ui.onSignInFailure)
}

const onSignOut = (event) => {
  event.preventDefault()
  api.signOut().then(ui.onSignOutSuccess).catch(ui.onSignOutFailure)
}

module.exports = {
  onCellClick,
  onSignUp,
  onSignIn,
  onSignOut,
  onCreateGame
}
