
import { BardAPI } from 'bard-api-node';

async function Assistant(message) {
  try {
    // Initialize BardAPI object
    const bard = new BardAPI();

    // Set API key
    const apiKey = 'AIzaSyDvujJ5BC_kMt1IamSE5f6hoAiU91nraz0'; // Replace with your actual API key

    // Initialize chat with API key
    await bard.initializeChat(apiKey);

    // Send a query to Bard
    const response = await bard.getBardResponse(message);
    console.log('Response from Bard:', response);
    return response.text;
  } catch (error) {
    console.error('Error:', error);
    if (error.message.includes('429')) {
      return 'The API quota has been exhausted. Please try again later.';
    }
    return 'An error occurred while processing the report.';
  }
}

export { Assistant };
