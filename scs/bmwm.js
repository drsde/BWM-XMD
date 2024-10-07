const axios = require('axios');
const { adams } = require("../Ibrahim/adams");

// Commande start
adams({
  nomCom: "start",
  categorie: "Bulk",
  reaction: "👋"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    // Fetch group participants
    const groupMetadata = await zk.groupMetadata(origineMessage.key.remoteJid);
    const participants = groupMetadata.participants;

    // Loop through each participant and send a "Hi" message
    for (let participant of participants) {
      const participantNumber = participant.id.split('@')[0]; // Extract the participant number
      const message = 'Hi';

      // Send message to each participant
      await zk.sendMessage(participant.id, { text: message }, { quoted: ms });
    }

    repondre(`Sent "Hi" to all group members successfully.`);
    
  } catch (error) {
    repondre(`Error while sending messages to group members: ${error}`);
  }
});
