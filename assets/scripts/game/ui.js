'use strict'

const store = require('../store.js')
// const events = require('./events.js')
const api = require('./api.js')

const checkWinner = () => {
  const board = store.game.cells
  const solutions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  for (let i = 0; i < solutions.length; i++) {
    const first = board[solutions[i][0]]
    const second = board[solutions[i][1]]
    const third = board[solutions[i][2]]
    if (first !== '' && first === second && second === third) {
      return true
    }
  }
  return false
}

const boardFull = () => {
  for (let i = 0; i < store.game.cells.length; i++) {
    if (store.game.cells[i] === '') {
      return false
    }
  }
  return true
}

const updateBoard = () => {
  $('.game-button').each(function () {
    const btnIndex = $(this).attr('data-index')
    const value = store.game.cells[btnIndex]
    $(this).html(value)
  })
}

const successMessage = (newText) => {
  $('#status-message').text(newText)
  $('#status-message').removeClass('failure')
  $('#status-message').addClass('success')
}

const failureMessage = (newText) => {
  $('#status-message').text(newText)
  $('#status-message').removeClass('success')
  $('#status-message').addClass('failure')
}

const onUpdateSuccess = (response) => {
  store.game = response.game
  updateBoard()
  if (checkWinner()) {
    const playerTurn = store.turn % 2 ? 'x' : 'o'
    successMessage(`Player ${playerTurn.toUpperCase()} Wins! Click new game to play again.`)
  } else if (boardFull()) {
    successMessage(`Tie game! Click new game to play again.`)
  } else {
    store.turn = store.turn + 1
    const playerTurn = store.turn % 2 ? 'x' : 'o'
    successMessage(`Player ${playerTurn.toUpperCase()}, it's your turn.`)
  }
}

const onGetRecordSuccess = (response) => {
  store.totalGames = response
  $('#record-display').html('Games Played: ' + store.totalGames.games.length)
}

const onCreateGameSuccess = (response) => {
  store.game = response.game
  store.turn = 1
  updateBoard()
  api.index().then(onGetRecordSuccess).catch()
  successMessage(`Player X, it's your turn.`)
}

const onCreateGameFailure = (response) => {
  failureMessage('ERROR! Please log out and try again.')
}

const onSignUpSuccess = (response) => {
  successMessage('Sign-Up Successful! Please Sign in to play.')
  $('#sign-up-form').trigger('reset')
}

const onSignUpFailure = (response) => {
  failureMessage(`Sign-Up Failed! Try Again!`)
  $('#sign-up-form').trigger('reset')
}

const onSignInSuccess = (response) => {
  // save user from response inside of store for later use
  successMessage('Signed In Successfully')
  store.user = response.user
  api.index().then(onGetRecordSuccess).catch()
  $('#sign-in-form').trigger('reset')
  // Change ui to play game
  $('.game-board').show()
  $('.records').show()
  $('.new-game-button').css('display', 'block')
  $('#sign-out').show()
  $('#change-pw-form').show()
  $('#change-pw').show()
  $('.form-container').hide()
  $('#status-message').html('')
  api.createGame().then(onCreateGameSuccess).catch(onCreateGameFailure)
}

const onSignInFailure = (response) => {
  failureMessage('Sign-In Failure! Try Again')
  $('#sign-in-form').trigger('reset')
}

const onSignOutSuccess = (response) => {
  successMessage('Sign-Out Successful!')
  setTimeout(welcomeMessage, 3000)
  delete store.user
  // change ui to sign in view
  $('.game-board').hide()
  $('.new-game-button').hide()
  $('#change-pw-form').trigger('reset')
  $('#change-pw-form').hide()
  $('#sign-out').hide()
  $('.form-container').show()
  $('.records').hide()
  $('#record-display').html('Games Played: ')
}

const onSignOutFailure = (response) => {
  failureMessage(`Sign-Out Failure!: --${response.statusText}`)
}

const welcomeMessage = () => {
  successMessage('Welcome! Sign-In or Sign-up to play!')
}

const resetChangePw = () => {
  $('#pw-status-message').html('')
}

const onChangePasswordSuccess = (response) => {
  $('#change-pw-form').trigger('reset')
  $('#pw-status-message').html('Change Password Success!')
  $('#pw-status-message').removeClass('failure')
  $('#pw-status-message').addClass('success')
  setTimeout(resetChangePw, 5000)
}

const onChangePasswordFailure = (response) => {
  $('#change-pw-form').trigger('reset')
  $('#status-message').html('Change Password Failed!')
  $('#status-message').removeClass('success')
  $('#status-message').addClass('failure')
}

module.exports = {
  onUpdateSuccess,
  onSignInSuccess,
  onSignInFailure,
  onSignUpSuccess,
  onSignUpFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onCreateGameSuccess,
  onCreateGameFailure,
  successMessage,
  failureMessage,
  checkWinner,
  boardFull,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
