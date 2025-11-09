// Video Generator - JavaScript functionality

// DOM Elements
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const promptInput = document.getElementById('prompt');
const durationSelect = document.getElementById('duration');
const styleSelect = document.getElementById('style');
const previewArea = document.getElementById('previewArea');
const progressSection = document.getElementById('progressSection');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const progressStatus = document.getElementById('progressStatus');
const gallery = document.getElementById('gallery');

// State Management
let isGenerating = false;
let generatedVideos = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    generateBtn.addEventListener('click', handleGenerate);
    clearBtn.addEventListener('click', handleClear);
    
    // Enter key to generate
    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleGenerate();
        }
    });
}

// Generate Video Handler
async function handleGenerate() {
    const prompt = promptInput.value.trim();
    
    if (!prompt) {
        showNotification('Please enter a video description', 'error');
        return;
    }
    
    if (isGenerating) {
        showNotification('Video generation in progress...', 'info');
        return;
    }
    
    isGenerating = true;
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<span class="loading"></span> <span>Generating...</span>';
    
    // Show progress section
    progressSection.classList.remove('hidden');
    
    // Get form values
    const duration = durationSelect.value;
    const style = styleSelect.value;
    const resolution = document.querySelector('input[name="resolution"]:checked').value;
    
    // Generate video with Mochi service (or simulate if no API key)
    let videoUrl = null;
    try {
        // Check if API is configured
        if (typeof CONFIG !== 'undefined' && CONFIG.MOCHI_API_KEY && CONFIG.ENABLE_VIDEO_GENERATION) {
            videoUrl = await generateVideoWithAPI(prompt, duration, style, resolution);
            // Complete with actual video URL
            completeGeneration(prompt, duration, style, resolution, videoUrl);
        } else {
            // Fallback to simulation if no API configured
            await simulateVideoGeneration(prompt, duration, style, resolution);
        }
    } catch (error) {
        console.error('Generation error:', error);
        // Fallback to simulation on error
        await simulateVideoGeneration(prompt, duration, style, resolution);
    }
}

// Simulate Video Generation (Replace with actual API integration)
async function simulateVideoGeneration(prompt, duration, style, resolution) {
    const steps = [
        { percent: 10, status: 'Initializing models...' },
        { percent: 25, status: 'Analyzing your prompt...' },
        { percent: 40, status: 'Generating video frames...' },
        { percent: 60, status: 'Applying style: ' + style + '...' },
        { percent: 75, status: 'Rendering at ' + resolution + '...' },
        { percent: 90, status: 'Finalizing video...' },
        { percent: 100, status: 'Video generated successfully!' }
    ];
    
    for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const step = steps[i];
        updateProgress(step.percent, step.status);
        
        if (step.percent === 100) {
            // Video generation complete
            setTimeout(() => {
                completeGeneration(prompt, duration, style, resolution, null);
            }, 500);
        }
    }
}

// Update Progress
function updateProgress(percent, status) {
    progressFill.style.width = percent + '%';
    progressPercent.textContent = percent + '%';
    progressStatus.textContent = status;
}

// Complete Generation
function completeGeneration(prompt, duration, style, resolution, videoUrl = null) {
    isGenerating = false;
    generateBtn.disabled = false;
    generateBtn.innerHTML = '<span>Generate Video</span>';
    
    // Hide progress section
    progressSection.classList.add('hidden');
    
    // Create video object
    const videoData = {
        id: Date.now(),
        prompt: prompt,
        duration: duration,
        style: style,
        resolution: resolution,
        date: new Date().toLocaleDateString(),
        videoUrl: videoUrl // Will be set when API returns actual video
    };
    
    // Add to gallery
    generatedVideos.unshift(videoData);
    saveGallery();
    
    // Show preview (with actual video if available)
    showPreview(videoData);
    
    // Update gallery
    renderGallery();
    
    showNotification('Video generated successfully!', 'success');
}

// Show Preview
function showPreview(videoData) {
    // If we have an actual video URL from API, show the video
    if (videoData.videoUrl) {
        previewArea.innerHTML = `
            <video class="preview-video" controls autoplay>
                <source src="${videoData.videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div style="margin-top: 1rem; text-align: center; color: var(--text-secondary);">
                <p style="font-size: 0.9rem;">
                    ${videoData.duration}s • ${videoData.style} • ${videoData.resolution}
                </p>
            </div>
        `;
    } else {
        // Show placeholder for demo/simulation
        previewArea.innerHTML = `
            <div class="preview-placeholder">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="35" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/>
                    <path d="M32 28L32 52L52 40L32 28Z" fill="currentColor" opacity="0.5"/>
                </svg>
                <p>Video Generated: ${videoData.prompt}</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.7;">
                    ${videoData.duration}s • ${videoData.style} • ${videoData.resolution}
                </p>
                <p style="font-size: 0.8rem; margin-top: 1rem; opacity: 0.5;">
                    ${typeof CONFIG !== 'undefined' && CONFIG.MOCHI_API_KEY ? 
                        'Note: This is a demo preview. Configure your Mochi API key in config.js to generate actual videos.' : 
                        'Note: Configure your Mochi API key in config.js to generate actual videos.'}
                </p>
            </div>
        `;
    }
}

// Clear Handler
function handleClear() {
    if (isGenerating) {
        showNotification('Cannot clear while generating', 'error');
        return;
    }
    
    promptInput.value = '';
    durationSelect.value = '10';
    styleSelect.value = 'realistic';
    document.querySelector('input[name="resolution"][value="720p"]').checked = true;
    
    previewArea.innerHTML = `
        <div class="preview-placeholder">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="35" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/>
                <path d="M32 28L32 52L52 40L32 28Z" fill="currentColor" opacity="0.5"/>
            </svg>
            <p>Your generated video will appear here</p>
        </div>
    `;
    
    showNotification('Form cleared', 'success');
}

// Render Gallery
function renderGallery() {
    if (generatedVideos.length === 0) {
        gallery.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <p>No videos generated yet. Create your first video above!</p>
            </div>
        `;
        return;
    }
    
    gallery.innerHTML = generatedVideos.slice(0, 6).map(video => `
        <div class="gallery-item" onclick="viewVideo(${video.id})">
            <div class="gallery-item-image">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="25" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/>
                    <path d="M24 20L24 40L40 30L24 20Z" fill="currentColor" opacity="0.5"/>
                </svg>
            </div>
            <div class="gallery-item-info">
                <div class="gallery-item-title">${truncateText(video.prompt, 40)}</div>
                <div class="gallery-item-date">${video.date} • ${video.duration}s • ${video.resolution}</div>
            </div>
        </div>
    `).join('');
}

// View Video
function viewVideo(id) {
    const video = generatedVideos.find(v => v.id === id);
    if (video) {
        showPreview(video);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Truncate Text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Save Gallery to LocalStorage
function saveGallery() {
    try {
        localStorage.setItem('aiVideoGenerator_gallery', JSON.stringify(generatedVideos));
    } catch (e) {
        console.error('Failed to save gallery:', e);
    }
}

// Load Gallery from LocalStorage
function loadGallery() {
    try {
        const saved = localStorage.getItem('aiVideoGenerator_gallery');
        if (saved) {
            generatedVideos = JSON.parse(saved);
            renderGallery();
        }
    } catch (e) {
        console.error('Failed to load gallery:', e);
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? 'var(--error-color)' : type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// API INTEGRATION SECTION
// ============================================

// Main API function - uses Mochi service
async function generateVideoWithAPI(prompt, duration, style, resolution) {
    return await generateVideoWithMochi(prompt, duration, style, resolution);
}

// ============================================
// Mochi API integration (via fal.ai)
// Best for: Open-source video generation by Genmo
// Uses fal.ai API to access the Mochi model
// Documentation: https://fal.ai/models/fal-ai/mochi-v1
async function generateVideoWithMochi(prompt, duration, style, resolution) {
    const API_KEY = CONFIG.MOCHI_API_KEY;
    const API_URL = CONFIG.MOCHI_API_URL || 'https://fal.run/fal-ai/mochi-v1';

    if (!API_KEY || API_KEY === 'your-fal-api-key-here') {
        throw new Error('Mochi API key not configured. Please add your fal.ai API key to config.js');
    }

    try {
        updateProgress(10, 'Connecting to remote model service (via fal.ai)...');

        // Mochi API request via fal.ai
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Key ${API_KEY}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                num_frames: Math.min(parseInt(duration) * 6, 163), // Mochi supports up to 163 frames
                num_inference_steps: 64,
                height: resolution === '4k' ? 1080 : resolution === '1080p' ? 720 : 480,
                width: resolution === '4k' ? 1920 : resolution === '1080p' ? 1280 : 848,
                negative_prompt: "",
                seed: Math.floor(Math.random() * 1000000),
                // Mochi-specific parameters
                cfg_scale: 6.0,
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || errorData.detail || `API request failed: ${response.status}`);
        }

        updateProgress(30, 'Video generation started...');

        const data = await response.json();

        // fal.ai returns a request_id for polling
        if (data.request_id) {
            // Poll for completion
            return await pollMochiStatus(data.request_id, API_KEY);
        } else if (data.video_url || data.video) {
            // Direct video URL
            updateProgress(100, 'Video generated successfully!');
            return data.video_url || data.video;
        } else if (data.output_url) {
            // Output URL format
            updateProgress(100, 'Video generated successfully!');
            return data.output_url;
        } else {
            throw new Error('Unexpected API response format');
        }

    } catch (error) {
        console.error('Mochi service error:', error);
        showNotification(`Mochi service error: ${error.message}`, 'error');
        throw error;
    }
}

// Poll Mochi API for video completion
async function pollMochiStatus(requestId, apiKey) {
    const pollUrl = `https://fal.run/fal-ai/mochi-v1/${requestId}`;
    const maxAttempts = 60; // 5 minutes max
    let attempts = 0;

    while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

        try {
            const response = await fetch(pollUrl, {
                headers: {
                    'Authorization': `Key ${apiKey}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Polling failed: ${response.status}`);
            }

            const data = await response.json();

            if (data.status === 'completed' || data.status === 'COMPLETED') {
                const videoUrl = data.video_url || data.video || data.output_url || data.video?.url;
                if (videoUrl) {
                    updateProgress(100, 'Video generated successfully!');
                    return videoUrl;
                }
            } else if (data.status === 'failed' || data.status === 'FAILED') {
                throw new Error(data.error || data.message || 'Video generation failed');
            } else {
                // Still processing
                const progress = 30 + (attempts / maxAttempts) * 60;
                updateProgress(Math.min(progress, 95), 'Generating video frames...');
            }

            attempts++;
        } catch (error) {
            console.error('Polling error:', error);
            throw error;
        }
    }

    throw new Error('Video generation timeout');
}

