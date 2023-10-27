const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";
const OPENAI_API_URL =
	"https://api.openai.com/v1/engines/davinci-codex/completions";

app.post("/chat", async (req, res) => {
	const message = req.body.message;

	try {
		const response = await axios.post(
			OPENAI_API_URL,
			{
				prompt: message,
				max_tokens: 150 // You can adjust this parameter based on your needs
			},
			{
				headers: {
					Authorization: `Bearer ${OPENAI_API_KEY}`
				}
			}
		);

		const reply = response.data.choices[0].text.trim();
		res.json({ reply });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
