// Email Notification Service for New Tribute Submissions

const DEFAULT_RECIPIENTS = [
  'adedolapoarilewola@gmail.com',
  'praisetechy001@gmail.com'
];

export async function sendTributeNotification(tribute) {
  const envEmail = import.meta.env.VITE_NOTIFICATION_EMAIL;
  const recipients = envEmail 
    ? envEmail.split(',').map(e => e.trim()).filter(Boolean)
    : DEFAULT_RECIPIENTS;

  if (!recipients || recipients.length === 0) {
    console.warn('No notification emails configured.');
    return;
  }

  try {
    const senderName = tribute.name || 'A Guest';
    const payload = {
      _subject: `New Tribute Submission from ${senderName} - Dami Birthday Keepsake`,
      _template: 'box',
      _captcha: 'false',
      _autoresponse: 'false',
      "Contributor Name": senderName,
      "Relationship": `${tribute.relationship || 'Friend'} (${tribute.relationshipCategory || 'General'})`,
      "Three Words for Dami": tribute.threeWords || 'Not provided',
      "Birthday Message": tribute.birthdayWish || 'Not provided',
      "Prayer": tribute.prayer || 'Not provided',
      "Photo Link": tribute.photoUrl ? tribute.photoUrl : 'None',
      "Approval Instructions": "Go to website footer, tap 'Review Submissions', enter passcode dolly222 to approve or manage."
    };

    // Dispatch notifications to all configured recipients
    const dispatchPromises = recipients.map(async (email) => {
      try {
        const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          console.log(`Notification dispatched successfully to ${email}`);
        }
      } catch (err) {
        console.warn(`Failed sending notification to ${email}:`, err);
      }
    });

    await Promise.allSettled(dispatchPromises);
  } catch (err) {
    console.warn('Failed to send notification emails:', err);
  }
}

