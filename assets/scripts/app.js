'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const events = require('./game/events.js')
const ui = require('./game/ui.js')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  ui.successMessage('Welcome! Sign-In or Sign-up to play!')
  $('.game-board').find('button').on('click', events.onCellClick)
  $('#sign-out').on('click', events.onSignOut)
  $('#change-pw-form').on('submit', events.onChangePassword)
  $('.game-board').hide()
  $('#change-pw-form').hide()
  $('.records').hide()
  $('.new-game-button').hide()
  $('#sign-out').hide()
  $('#change-pw-form').hide()
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-in-form').on('submit', events.onSignIn)
  $('.new-game-button').on('click', events.onCreateGame)
})
