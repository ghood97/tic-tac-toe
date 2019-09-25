'use strict'

const store = require('../store.js')

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
  store.game = JSON.parse(response)
  const buttons = $('.game-board').find('button')
  buttons.each(x => {
    const btnIndex = x.attr('data-index')
    const value = store.game.cells[btnIndex]
    x.html(value)
  })
  store.turn = store.turn + 1
}

const onSignUpSuccess = (response) => {
  successMessage('Sign-Up Successful!')
}

const onSignUpFailure = (response) => {
  failureMessage(`Sign-Up Failed!:  --${response.responseText}`)
}

const onSignInSuccess = (response) => {
  // successMessage('Sign-In Successful!')
  // save user from response inside of store for later use
  store.user = response.user
  successMessage('Signed In Successfully')
  // Change ui to play game
}

const onSignInFailure = (response) => {
  failureMessage('Sign-In Failure! Try Again')
}

const onSignOutSuccess = (response) => {
  successMessage('Sign-Out Successful!')
  delete store.user
}

const onSignOutFailure = (response) => {
  failureMessage(`Sign-Out Failure!: --${response.statusText}`)
}

module.exports = {
  onUpdateSuccess,
  onSignInSuccess,
  onSignInFailure,
  onSignUpSuccess,
  onSignUpFailure,
  onSignOutSuccess,
  onSignOutFailure
}
