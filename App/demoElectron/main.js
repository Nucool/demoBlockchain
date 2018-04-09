const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1300, height: 600})

  win.loadURL('http://localhost:3000/');
}

app.on('ready', createWindow)
