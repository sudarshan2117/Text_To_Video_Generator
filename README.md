# AI Video Generator - Complete Guide

## About This Project

This is a modern, attractive AI Video Generator website built with **HTML, CSS, and JavaScript**. It features a dashboard with animated backgrounds and a user interface for generating videos.

## Skills Required

To build and customize this AI Video Generator, you need:

### **Essential Skills:**

1. **HTML (HyperText Markup Language)**
   - Understanding of semantic HTML5 elements
   - Form elements and input types
   - Structure and layout

2. **CSS (Cascading Style Sheets)**
   - Flexbox and Grid layouts
   - CSS animations and transitions
   - Responsive design (media queries)
   - CSS variables and custom properties
   - Backdrop filters and modern effects

3. **JavaScript (ES6+)**
   - DOM manipulation
   - Event handling
   - Async/await and Promises
   - Fetch API for HTTP requests
   - LocalStorage for data persistence
   - Array methods (map, filter, forEach)

### **Recommended Skills (for API Integration):**

4. **API Integration**
   - Understanding REST APIs
   - HTTP methods (GET, POST)
   - JSON data handling
   - Error handling
   - API authentication (API keys)

5. **Basic Backend Knowledge (Optional)**
   - If you want to add a backend server
   - Node.js basics (if using Express)
   - Environment variables for API keys

## Getting Started

### Step 1: Open the Project

1. Open `index.html` in your web browser
2. Or use a local server (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using VS Code Live Server extension
   # Right-click index.html > Open with Live Server
   ```

### Step 2: Test the Interface

- The website should load with animated robots in the background
- Try entering a video description and clicking "Generate Video"
- The demo will simulate video generation (no API needed for testing)

## API Keys - Do You Need Them?

### Short answer: Yes, for actual video generation

For a **working AI video generator**, you'll need API keys from AI video generation services. However, the current code works as a **demo/UI** without API keys.

### **When You Need API Keys:**

1. **For Real Video Generation:**
   - You need API keys from AI video generation services
   - Examples: RunwayML, Stability AI, Pika Labs, etc.

2. **For Production Use:**
   - API keys are required to generate actual videos
   - You'll need to sign up for these services and get API keys

### **Current Status:**

- UI/UX is complete - Beautiful interface ready
- Frontend functionality - All buttons and forms work
- Demo mode - Simulates video generation
- API integration - Needs to be connected to an external service

## API Integration Guide

### Option 1: RunwayML API (Recommended)

1. **Sign up:** Go to [runwayml.com](https://runwayml.com)
2. **Get API Key:** Navigate to API settings
3. **Update `script.js`:**

```javascript
async function generateVideoWithRunwayML(prompt, duration, style, resolution) {
    const API_KEY = 'YOUR_RUNWAYML_API_KEY'; // Replace with your key
    const API_URL = 'https://api.runwayml.com/v1/image-to-video';
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                prompt: prompt,
                duration: parseInt(duration),
                style: style,
                resolution: resolution
            })
        });
        
        const data = await response.json();
        return data.videoUrl;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

4. **Replace the simulation function** in `script.js`:
   - Find `simulateVideoGeneration` function
   - Replace it with actual API call to `generateVideoWithRunwayML`

### **Option 2: Stability AI API**

1. **Sign up:** Go to [stability.ai](https://stability.ai)
2. **Get API Key:** Create account and get API key
3. **Update code** similar to RunwayML example above

### **Option 3: Pika Labs API** (If available)

1. Check if Pika Labs offers API access
2. Follow their API documentation
3. Integrate similar to other APIs

## Step-by-Step Implementation

### Phase 1: Basic Setup (Current - Complete)

1. HTML structure created
2. CSS styling with animations
3. JavaScript functionality
4. Responsive design
5. Robot animations

### Phase 2: API Integration (Next Steps)

1. **Choose an AI Video API:**
   - Research available services
   - Compare pricing and features
   - Sign up and get API key

2. **Secure API Key Storage:**
   ```javascript
   // Create config.js (add to .gitignore)
   const CONFIG = {
       API_KEY: 'your-api-key-here',
       API_URL: 'https://api.example.com/v1/video'
   };
   ```

3. **Update `script.js`:**
   - Replace `simulateVideoGeneration` function
   - Add error handling
   - Handle API responses

4. **Test Integration:**
   - Test with simple prompts
   - Verify video generation
   - Handle errors gracefully

### Phase 3: Enhancements (Optional)

1. **Add Video Upload:**
   - Allow users to upload images
   - Generate videos from images

2. **Add Video Editing:**
   - Trim videos
   - Add effects
   - Export options

3. **Add User Accounts:**
   - Save user preferences
   - Video history
   - Favorites

## Customization

### **Change Colors:**

Edit `styles.css` - CSS variables:
```css
:root {
    --primary-color: #667eea;    /* Change primary color */
    --secondary-color: #764ba2;   /* Change secondary color */
    --accent-color: #f093fb;      /* Change accent color */
}
```

### **Modify Robot Animation:**

Edit `.robot` styles in `styles.css`:
- Change animation duration
- Modify robot size
- Adjust opacity

### **Add More Features:**

- Video download button
- Share functionality
- Video preview modal
- Settings panel

## Project Structure

```
ai-video-generator/
│
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## Security Best Practices

1. **Never commit API keys to Git:**
   - Use `.gitignore` for config files
   - Use environment variables
   - Store keys securely

2. **API Key Storage:**
   ```javascript
   // BAD - Don't hardcode
   const API_KEY = 'sk-1234567890';
   
   // GOOD - Use environment variable
   const API_KEY = process.env.API_KEY;
   
   // GOOD - Use config file (not in Git)
   const API_KEY = CONFIG.API_KEY;
   ```

3. **Rate Limiting:**
   - Implement rate limiting
   - Prevent API abuse
   - Add user authentication

## Troubleshooting

### **Robots not animating?**
- Check browser console for errors
- Ensure CSS is loaded properly
- Try clearing browser cache

### **Form not submitting?**
- Check JavaScript console
- Verify event listeners are attached
- Check for JavaScript errors

### **API not working?**
- Verify API key is correct
- Check API endpoint URL
- Review API documentation
- Check network requests in browser DevTools

## Learning Resources

### **HTML/CSS/JavaScript:**
- [MDN Web Docs](https://developer.mozilla.org)
- [W3Schools](https://www.w3schools.com)
- [JavaScript.info](https://javascript.info)

### **API Integration:**
- [Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [REST API Tutorial](https://restfulapi.net)

### **AI Video APIs:**
- RunwayML Documentation
- Stability AI Documentation
- Pika Labs Documentation (if available)

## Next Steps

1. **Test the current UI** - Make sure everything works
2. **Choose an AI API** - Research and select a service
3. **Get API Key** - Sign up and obtain credentials
4. **Integrate API** - Replace simulation with real API calls
5. **Test thoroughly** - Verify video generation works
6. **Deploy** - Host on GitHub Pages, Netlify, or Vercel

## Tips

- Start with the demo mode to understand the flow
- Test API integration with simple prompts first
- Keep API keys secure and never share them
- Monitor API usage to avoid unexpected costs
- Add loading states and error messages for better UX

## Support

If you need help:
1. Check the code comments in `script.js`
2. Review API documentation for your chosen service
3. Test in browser DevTools console
4. Check for JavaScript errors

---

Built with HTML, CSS, and JavaScript

Note: This is a frontend template. Actual video generation requires API integration with video generation services.

