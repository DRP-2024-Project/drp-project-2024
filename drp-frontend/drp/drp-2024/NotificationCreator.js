import { REMOTE_HOST } from './Config.js';

async function createNotification(data = {community_id, proposal_id, is_proposal, title, message}) {

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