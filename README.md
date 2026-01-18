# 🎯 Discipline App - Setup & Usage Guide

## 📋 Project Overview

A powerful daily task management app to help you build discipline by categorizing tasks as:
- **Non-Negotiables** (Required) - Max 5 tasks, must-do items
- **Good to Do** (Optional) - Nice-to-have bonus tasks

## 📁 Files Structure

```
Decipline app/
├── index.html      # Main HTML structure
├── style.css       # Aesthetic styling
├── app.js          # Core functionality & logic
└── README.md       # This file
```

## 🚀 How to Use

### 1. **Open the App**
- Simply open `index.html` in your web browser
- The app uses localStorage to save your data automatically

### 2. **Add Non-Negotiables**
- Enter task name in the "Non-Negotiables" input
- Set weight (1-10, where 10 is highest priority)
- Click "Add Non-Negotiable"
- **Maximum 5 tasks allowed** - System will warn if exceeded

### 3. **Add Good to Do Tasks**
- Enter task name in the "Good to Do" input
- Set weight (1-5)
- Click "Add Good to Do"
- No limit on good to do tasks

### 4. **Track Progress**
- Check off tasks as completed using the checkbox
- Delete tasks with the × button
- Your progress updates instantly

### 5. **View Dashboard**
The dashboard shows:
- **Today's Score**: Overall completion percentage (0-100%)
- **Where to Focus**: Top incomplete non-negotiables
- **AI Suggestions**: Smart recommendations (see AI setup below)
- **Completion Rate**: Progress bars for each category
- **Daily Summary**: Stats on completed, pending, and average weights

### 6. **Daily Reset**
- Data automatically resets at midnight
- Manual reset available via "Reset Day" button
- All data is stored locally in your browser

### 7. **Export Progress**
- Click "Export Progress" to download daily report as JSON
- Great for tracking historical data and patterns

## 🤖 AI Suggestions Setup

The app integrates with Claude AI for intelligent suggestions.

### To Enable AI Features:

1. **Get an API Key:**
   - Go to [Anthropic Console](https://console.anthropic.com)
   - Sign up or log in
   - Create an API key

2. **Add Your API Key:**
   - Open `app.js`
   - Find this line (around line 330):
     ```javascript
     'x-api-key': 'YOUR_API_KEY_HERE',
     ```
   - Replace with your actual API key:
     ```javascript
     'x-api-key': 'sk-ant-xxxxxxxxxxxxxxxx',
     ```

3. **Get Suggestions:**
   - Click "Get AI Suggestions" button in dashboard
   - AI will analyze your tasks and provide actionable recommendations

**Note:** Without an API key, the app shows demo suggestions automatically.

## 📊 Scoring System

### Non-Negotiables
- Each task has a weight (1-10)
- Score = Sum of completed task weights / Sum of all task weights
- Example: 2 completed tasks (weight 5 each) = 10/20 = 50%

### Good to Do
- Each task has a weight (1-5)
- Bonus points for motivation
- Doesn't affect main score but adds bonus percentage

### Total Score
- Combined percentage of all completed tasks weighted by importance
- Tracks your daily discipline level

## 🎨 Features

✅ **Beautiful UI** - Modern gradient design with smooth animations
✅ **Responsive** - Works on desktop, tablet, and mobile
✅ **Auto-save** - Data persists using localStorage
✅ **Daily Reset** - Automatically starts fresh each day
✅ **Smart Limits** - Maximum 5 non-negotiables enforced
✅ **Real-time Updates** - Dashboard updates instantly
✅ **AI Integration** - Claude-powered suggestions
✅ **Data Export** - Download daily progress as JSON
✅ **Focus System** - Know what to prioritize
✅ **Keyboard Shortcuts** - Press Enter to add tasks

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Enter | Add task (when input focused) |
| Click Checkbox | Mark task complete |
| Click × | Delete task |

## 💾 Data Storage

- All data saved in browser's localStorage
- Persists across sessions
- Resets daily automatically at midnight
- No data sent to external servers (except AI API if enabled)

## 🔧 Customization

### Change Weight Ranges

In `app.js`, modify validation in:
- `addNonNegotiable()` - Change max weight from 10
- `addGoodToDo()` - Change max weight from 5

### Change Max Non-Negotiables

In `app.js`, line ~103:
```javascript
if (appData.nonNegotiables.length >= 5) { // Change 5 to desired number
```

### Modify Colors

In `style.css`, edit CSS variables:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    --success-color: #10b981;
    /* etc */
}
```

## 📱 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## 🐛 Troubleshooting

### Tasks not saving?
- Check browser allows localStorage (privacy settings)
- Try refreshing the page
- Clear browser cache and try again

### AI Suggestions not working?
- Verify API key is correct and valid
- Check you have API credits available
- Check browser console for error messages

### App slow or laggy?
- Check browser console for errors
- Try clearing browser cache
- Close other browser tabs

## 📈 Tips for Success

1. **Set realistic non-negotiables** - Not too easy, not too hard
2. **Assign fair weights** - Higher for important tasks
3. **Review focus areas** - Know your priorities
4. **Use AI suggestions** - Learn from recommendations
5. **Export daily** - Track patterns over time
6. **Reset properly** - Don't carry incomplete tasks forward

## 📝 Example Daily Setup

**Non-Negotiables (must do):**
- Exercise (weight: 8)
- Code review (weight: 7)
- Team meeting (weight: 6)
- Client call (weight: 7)
- Documentation (weight: 5)

**Good to Do (bonus):**
- Learn new library (weight: 4)
- Refactor legacy code (weight: 3)
- Read technical article (weight: 2)

## 🚀 Next Steps

1. Open `index.html` in your browser
2. Add your first non-negotiable task
3. Set appropriate weights
4. Track completion through the day
5. Add your Anthropic API key for AI suggestions
6. Export daily progress

Enjoy building your discipline! 🎯

---

**Need help?** Check the in-app tooltips or review the code comments in `app.js`
