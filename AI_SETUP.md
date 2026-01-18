# 🤖 AI Integration Setup

## Quick Start for Claude AI Integration

### Step 1: Get Your API Key
1. Visit [Anthropic Console](https://console.anthropic.com)
2. Sign up or log in
3. Go to "API Keys" section
4. Click "Create Key"
5. Copy your API key (looks like: `sk-ant-xxxxxxxxxxxxxxxx`)

### Step 2: Add to App
Open `app.js` and find this section (around line 330):

```javascript
async function getAISuggestions() {
    const suggestionsContainer = document.getElementById('aiSuggestions');
    
    if (appData.nonNegotiables.length === 0 && appData.goodToDos.length === 0) {
        showToast('Add tasks first to get suggestions');
        return;
    }

    suggestionsContainer.innerHTML = '<p style="color: #999;">🤖 Getting AI suggestions...</p>';

    try {
        const prompt = generateAIPrompt();
        
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'YOUR_API_KEY_HERE',  // <-- REPLACE THIS LINE
                'anthropic-version': '2023-06-01',
            },
            // ...rest of code
        });
```

Replace `'YOUR_API_KEY_HERE'` with your actual API key:

```javascript
'x-api-key': 'sk-ant-xxxxxxxxxxxxxxxx',
```

### Step 3: Test It!
1. Open the app in your browser
2. Add some tasks
3. Click "Get AI Suggestions"
4. See Claude's recommendations appear!

## What the AI Does

Claude analyzes your:
- **Incomplete non-negotiables** - Priority focus items
- **Incomplete good to do tasks** - Bonus items  
- **Current progress** - Current completion percentage
- **Task weights** - Importance levels

And provides suggestions for:
- Time management strategies
- Task prioritization
- Motivation techniques
- Workflow optimization

## Example Prompt Sent to Claude

```
Based on today's discipline tracking:

Non-Negotiables (Required):
- Complete project proposal (weight: 8)
- Review team submissions (weight: 7)

Good to Do (Optional):
- Learn React Hooks (weight: 4)

Current Progress: 35% (7/20 points)

Please provide 3-4 brief, actionable suggestions...
```

## API Pricing

- **First 3 months**: Free trial ($5 credit)
- **After trial**: Pay-as-you-go (~$0.003 per 1K input tokens)
- Each suggestion costs ~$0.001-0.005 typically

## Troubleshooting

### "401 Unauthorized"
- API key is invalid or missing
- Check key is copied correctly
- Regenerate key if needed

### "Rate limit exceeded"
- You're making too many API calls
- Wait a few minutes before trying again

### No API response
- Check internet connection
- API might be temporarily unavailable
- Try again in a few seconds

## Security Notes

⚠️ **Important**: Never commit your API key to version control!

For production use, consider:
1. Using environment variables
2. Backend proxy for API calls
3. User authentication system

For personal use, keeping it in the file is acceptable.

## Advanced: Backend Proxy

For better security, create a backend endpoint:

```javascript
// Instead of direct API call:
const response = await fetch('/api/suggestions', {
    method: 'POST',
    body: JSON.stringify({ tasks: appData.nonNegotiables, /* ... */ })
});
```

Then your backend makes the actual Claude API call with the key safely stored server-side.

## Need Help?

- [Anthropic Docs](https://docs.anthropic.com)
- [API Reference](https://docs.anthropic.com/en/api/getting-started)
- [Console Support](https://console.anthropic.com/help)

---

Enjoy AI-powered suggestions for your discipline journey! 🚀
