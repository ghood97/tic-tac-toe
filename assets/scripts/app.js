'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const events = require('./game/events.js')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('.game-board').find('button').on('click', events.onCellClick)
  $('#sign-out').on('click', events.onSignOut)
  $('.game-board').hide()
  $('.new-game-button').hide()
  $('#sign-out').hide()
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-in-form').on('submit', events.onSignIn)
  $('.new-game-button').on('click', events.onCreateGame)
})
