import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENROUTER_API_KEY;
const PORT = process.env.PORT || 3001;

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-001",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are ProjectScan AI Assistant. You help students with project analysis, academic writing, and coding improvements. Be professional, encouraging, and provide high-quality technical insights."
                    },
                    ...messages
                ]
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('AI Proxy Error:', error);
        res.status(500).json({ error: 'Failed to communicate with AI' });
    }
});

app.post('/api/analyze', async (req, res) => {
    try {
        const { fileName, fileType } = req.body;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-001",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a World-Class Academic Evaluator and Senior Software Architect. Your goal is to provide deep technical insight and academic rigor in your analysis. Generate a comprehensive review report in JSON format. Respond ONLY with valid JSON."
                    },
                    {
                        "role": "user",
                        "content": `Analyze the following project metadata with extreme detail:
                  Project Name: "${fileName}"
                  File Category: ${fileType}
                  
                  Generate a structured report including:
                  - globalScore (0-100)
                  - grade (string, e.g., 'A+', 'Exemplary')
                  - technicalAccuracy (0-100)
                  - securityScore (number of issues)
                  - documentationScore (0-100)
                  - efficiency (string: 'Optimized', 'Good', 'Needs Work')
                  - issues (array of {title, type, desc, severity: 'Critical'|'High'|'Medium'|'Low'})
                  - suggestions (array of {title, text})
                  - advancedRecommendation (string: a sophisticated future scope or research direction)`
                    }
                ],
                "response_format": { "type": "json_object" }
            })
        });

        const data = await response.json();
        const reportContent = JSON.parse(data.choices[0].message.content);
        res.json(reportContent);
    } catch (error) {
        console.error('Analysis AI Error:', error);
        res.status(500).json({ error: 'Failed to analyze project' });
    }
});

app.listen(PORT, () => {
    console.log(`AI Proxy running on http://localhost:${PORT}`);
});
