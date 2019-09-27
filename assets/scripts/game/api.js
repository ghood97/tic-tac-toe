'use strict'

const config = require('./../config.js')
const store = require('../store.js')
// const ui = require('./ui.js')

const index = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateGame = (cellIndex, cellValue, over) => {
  const dataObj = {
    'game': {
      'cell': {
        'index': `${cellIndex}`,
        'value': `${cellValue}`
      },
      'over': 'false'
    }
  }

  const finalUpdate = {
    game: {
      over: true
    }
  }

  if (over === '') {
    return $.ajax({
      url: config.apiUrl + `/games/${store.game.id}`,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: dataObj
    })
  } else if (over === true && cellIndex === '' & cellValue === '') {
    console.log('entered')
    return $.ajax({
      url: config.apiUrl + `/games/${store.game.id}`,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      // Below code is not changing over to true
      data: finalUpdate
    })
  }
}

const createGame = () => {
  return $.ajax({
    url: config.apiUrl + `/games`,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: '{}'
  })
}

const signUp = (formData) => {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-up',
    data: formData
  })
}

const signIn = (formData) => {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-in',
    data: formData
  })
}

const signOut = () => {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const changePassword = (formData) => {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/change-password',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

module.exports = {
  updateGame,
  signUp,
  signIn,
  signOut,
  changePassword,
  createGame,
  index
}
