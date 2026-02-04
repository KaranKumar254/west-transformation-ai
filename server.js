import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('.'));

const API_KEY = "Paste your api key here";

app.post("/ai", async (req, res) => {
    try {
        const west = req.body.west;

        if (!west || west.trim() === "") {
            return res.status(400).json({ 
                error: "Please provide a waste material" 
            });
        }

        const prompt = `You are an agriculture and waste-to-wealth transformation expert AI.

Analyze "${west}" and provide:
1. **Transformation Methods**: List 5-7 ways this waste can be converted into valuable products
2. **Business Opportunities**: Practical business ideas using this waste
3. **Market Potential**: Economic value and demand
4. **Environmental Impact**: How this helps sustainability
5. **Implementation Steps**: Basic steps to start

Format the response in HTML with proper headings, lists, and emojis for better readability.`;

        // Call Google Gemini AI API
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                }),
            }
        );

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || "AI API Error");
        }

        const aiText = data.candidates[0]?.content?.parts[0]?.text || 
                       `Unable to generate analysis for ${west}. Please try again.`;

        // Generate YouTube search URL
        const videoQuery = encodeURIComponent(`${west} waste to wealth transformation`);
        const youtubeURL = `https://www.youtube.com/results?search_query=${videoQuery}`;

        // Send response
        res.json({
            success: true,
            text: aiText,
            video: youtubeURL,
            material: west
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to process request. Please try again.",
            details: error.message
        });
    }
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" });
});

// Serve index.html on root
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ WEST AI Server running on http://localhost:${PORT}`);
    console.log(`🌐 Open http://localhost:${PORT} in your browser`);
});
