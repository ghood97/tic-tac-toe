'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const events = require('./game/events.js')
const ui = require('./game/ui.js')
const store = require('./store.js')
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
  $('.new-game-button-human').hide()
  $('.new-game-button-ai').hide()
  $('#sign-out').hide()
  $('#change-pw-form').hide()
  $('.lookup-container').hide()
  $('.lookup-container').on('submit', events.onLookup)
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-in-form').on('submit', events.onSignIn)
  $('.new-game-button-human').on('click', (event) => {
    store.ai = false
    events.onCreateGame(event)
  })
  $('.new-game-button-ai').on('click', (event) => {
    store.ai = true
    events.onCreateGame(event)
  })
})
