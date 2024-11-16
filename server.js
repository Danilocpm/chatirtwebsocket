const WebSocket = require('ws');
const express = require('express');
const app = express();

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Novo usuário conectado!');
  ws.on('message', (msg) => {
    console.log(`Mensagem recebida: ${msg}`);
    ws.send(`Você disse: ${msg}`);
  });

  ws.on('close', () => {
    console.log('Usuário desconectado!');
  });
});

app.server = app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
