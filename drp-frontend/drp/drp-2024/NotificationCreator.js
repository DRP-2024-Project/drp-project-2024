import { REMOTE_HOST } from './Config.js';

async function createNotification(data = {community_id, title, message}) {

    await fetch(`${REMOTE_HOST}/createNotification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

module.exports = {
    createNotification
};