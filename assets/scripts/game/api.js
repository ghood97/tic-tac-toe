'use strict'

const config = require('./../config.js')
const store = require('../store.js')

const updateGame = (cellIndex, cellValue) => {
  const dataObj = {
    'game': {
      'cell': {
        'index': `${cellIndex}`,
        'value': `${cellValue}`
      }
    }
  }
  return $.ajax({
    url: config.apiUrl + `/games/${store.game.id}`,
    method: 'PATCH',
    data: JSON.stringify(dataObj)
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

module.exports = {
  updateGame,
  signUp,
  signIn,
  signOut
}
