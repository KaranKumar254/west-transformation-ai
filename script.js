// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Function to fill input when example card is clicked
function fillInput(value) {
    const input = document.getElementById('westInput');
    input.value = value;
    input.focus();
    
    // Scroll to search section
    document.querySelector('.hero').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Main AI function
async function askAI() {
    const input = document.getElementById('westInput').value.trim();
    const loading = document.getElementById('loading');
    const answerSection = document.getElementById('answerSection');
    const answerDiv = document.getElementById('answer');
    const videoDiv = document.getElementById('video');
    
    // Validate input
    if (!input) {
        showNotification('Please enter a waste material', 'warning');
        return;
    }
    
    // Show loading, hide previous results
    loading.classList.remove('hidden');
    answerSection.classList.add('hidden');
    videoDiv.innerHTML = '';
    
    try {
        // Simulate AI processing (Replace this with actual AI API call)
        await simulateAIProcessing(input);
        
        // Generate response
        const response = generateResponse(input);
        
        // Display results
        answerDiv.innerHTML = response;
        answerSection.classList.remove('hidden');
        
        // Optionally load related video
        loadRelatedVideo(input);
        
        showNotification('Analysis complete!', 'success');
        
    } catch (error) {
        showNotification('An error occurred. Please try again.', 'error');
        console.error(error);
    } finally {
        loading.classList.add('hidden');
    }
}

// Simulate AI processing delay
function simulateAIProcessing(input) {
    return new Promise(resolve => {
        setTimeout(resolve, 2000); // 2 second delay
    });
}

// Generate AI response based on input
function generateResponse(input) {
    const wasteMaterial = input.toLowerCase();
    
    // Sample responses (Replace with actual AI-generated content)
    const responses = {
        'rice husk': `
            <h4>🌾 Rice Husk Transformation Opportunities:</h4>
            <ul>
                <li><strong>Silica Production:</strong> Rice husk contains 15-20% silica which can be extracted for industrial use</li>
                <li><strong>Biofuel:</strong> Can be converted into bio-pellets and briquettes for renewable energy</li>
                <li><strong>Insulation Material:</strong> Used in construction as an eco-friendly insulation material</li>
                <li><strong>Activated Carbon:</strong> Processed into activated carbon for water purification</li>
                <li><strong>Ash for Cement:</strong> Rice husk ash can be used as a supplementary cementing material</li>
            </ul>
            <p><strong>💰 Market Potential:</strong> High demand in construction, energy, and agriculture sectors</p>
            <p><strong>🌍 Environmental Impact:</strong> Reduces agricultural waste and CO₂ emissions</p>
        `,
        'tomato waste': `
            <h4>🍅 Tomato Waste Transformation Opportunities:</h4>
            <ul>
                <li><strong>Lycopene Extraction:</strong> High-value antioxidant used in pharmaceuticals and cosmetics</li>
                <li><strong>Animal Feed:</strong> Dried tomato waste as nutritious livestock feed supplement</li>
                <li><strong>Biofuel Production:</strong> Fermentation to produce bioethanol and biogas</li>
                <li><strong>Pectin Production:</strong> Extract pectin for food industry applications</li>
                <li><strong>Composting:</strong> Rich organic fertilizer for agricultural use</li>
            </ul>
            <p><strong>💰 Market Potential:</strong> Growing demand in nutraceutical and cosmetic industries</p>
            <p><strong>🌍 Environmental Impact:</strong> Reduces food waste and creates circular economy</p>
        `,
        'coffee grounds': `
            <h4>☕ Coffee Grounds Transformation Opportunities:</h4>
            <ul>
                <li><strong>Biofuel:</strong> Convert into biodiesel and bio-pellets</li>
                <li><strong>Fertilizer:</strong> Nitrogen-rich compost for gardening and agriculture</li>
                <li><strong>Mushroom Cultivation:</strong> Excellent substrate for growing oyster mushrooms</li>
                <li><strong>Odor Neutralizer:</strong> Natural air freshener and deodorizer</li>
                <li><strong>Cosmetic Products:</strong> Used in scrubs and skincare products</li>
            </ul>
            <p><strong>💰 Market Potential:</strong> High value in cosmetics, agriculture, and renewable energy</p>
            <p><strong>🌍 Environmental Impact:</strong> Diverts waste from landfills and reduces methane emissions</p>
        `,
        'default': `
            <h4>♻️ ${input} Transformation Analysis:</h4>
            <p>Based on AI analysis, here are potential transformation opportunities:</p>
            <ul>
                <li><strong>Composting:</strong> Convert into organic fertilizer for agricultural use</li>
                <li><strong>Biogas Production:</strong> Generate renewable energy through anaerobic digestion</li>
                <li><strong>Animal Feed:</strong> Process into nutritious livestock feed supplements</li>
                <li><strong>Biofuel:</strong> Convert into sustainable bio-energy sources</li>
                <li><strong>Industrial Raw Material:</strong> Explore chemical extraction and processing opportunities</li>
            </ul>
            <p><strong>💡 Recommendation:</strong> Conduct detailed analysis for specific transformation methods based on local market demand and infrastructure availability.</p>
            <p><strong>🌍 Environmental Impact:</strong> Contributes to waste reduction and sustainable resource management</p>
        `
    };
    
    // Return specific response or default
    return responses[wasteMaterial] || responses['default'];
}

// Load related video (placeholder)
function loadRelatedVideo(input) {
    const videoDiv = document.getElementById('video');
    
    // This is a placeholder - integrate with actual video API
    const videoHTML = `
        <div class="answer-card" style="margin-top: 2rem;">
            <div class="answer-header">
                <i class="fas fa-video"></i>
                <h3>Related Videos</h3>
            </div>
            <div style="aspect-ratio: 16/9; background: rgba(0,0,0,0.3); border-radius: 1rem; display: flex; align-items: center; justify-content: center;">
                <p style="color: var(--gray);">Video content will be loaded here</p>
            </div>
        </div>
    `;
    
    videoDiv.innerHTML = videoHTML;
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--success)' : type === 'warning' ? 'var(--warning)' : type === 'error' ? 'var(--danger)' : 'var(--secondary)'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-xl);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
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
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enter key support for input
document.getElementById('westInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        askAI();
    }
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                animateCounter(entry.target, number);
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-card, .example-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

console.log('🌿 WEST Transformation AI - Initialized Successfully!');