// Email Notification Service for New Tribute Submissions

export async function sendTributeNotification(tribute) {
  const recipientEmail = import.meta.env.VITE_NOTIFICATION_EMAIL || 'praisetechy001@gmail.com';

  if (!recipientEmail) {
    console.warn('No notification email configured.');
    return;
  }

  try {
    const payload = {
      _subject: `🎉 New Birthday Tribute for Dami from ${tribute.name || 'a Guest'}!`,
      _template: 'table',
      _captcha: 'false',
      "Sender Name": tribute.name || 'Anonymous',
      "Relationship to Dami": `${tribute.relationship || 'Friend'} (${tribute.relationshipCategory || 'Community'})`,
      "Three Words": tribute.threeWords || '—',
      "Birthday Wish": tribute.birthdayWish || '—',
      "Prayer": tribute.prayer || '—',
      "Photo Attached": tribute.photoUrl ? tribute.photoUrl : 'No photo uploaded',
      "Review Action": "Visit the website footer, click 'Review Submissions', and enter passcode 'dolly222' to approve this tribute."
    };

    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('Notification email dispatched successfully.');
    } else {
      console.warn('Notification email dispatch returned status:', response.status);
    }
  } catch (err) {
    console.warn('Failed to send notification email:', err);
  }
}
