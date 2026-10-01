// Email Notification Service for New Tribute Submissions

export async function sendTributeNotification(tribute) {
  const recipientEmail = import.meta.env.VITE_NOTIFICATION_EMAIL || 'adedolapoarilewola@gmail.com';

  if (!recipientEmail) {
    console.warn('No notification email configured.');
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
