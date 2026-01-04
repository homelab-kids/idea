
import { GoogleGenAI, Type } from "@google/genai";
import { SensorData } from "../types";

// Always use the process.env.API_KEY directly when initializing.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePlantStatus = async (sensors: SensorData, imageBase64?: string) => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    You are an AI Plant Scientist for kids. 
    Analyze these sensor readings and provide a fun, educational, and helpful report.
    Sensors:
    - Soil Moisture: ${sensors.soilMoisture}%
    - Air Humidity: ${sensors.humidity}%
    - CO2 Level: ${sensors.co2} ppm
    - Air Temperature: ${sensors.airTemp}°F
    - Soil Temperature: ${sensors.soilTemp}°F

    Format your response as JSON with these keys:
    - summary: A 1-sentence friendly summary (e.g., "Your plant is breathing happy air!")
    - status: One of "Germinating", "Sprouting", "Growing", "Thirsty"
    - action: What should the kid do next? (e.g., "Add a tiny bit of water", "Open the humidity dome")
    - funFact: A cool science fact related to these specific readings.
  `;

  // Always use ai.models.generateContent to query GenAI with model and prompt.
  const response = await ai.models.generateContent({
    model,
    contents: imageBase64 
      ? { parts: [{ text: prompt }, { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } }] }
      : { parts: [{ text: prompt }] },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          status: { type: Type.STRING },
          action: { type: Type.STRING },
          funFact: { type: Type.STRING },
        },
        required: ["summary", "status", "action", "funFact"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const simulateExperiment = async (condition: string) => {
  const model = 'gemini-3-flash-preview';
  const prompt = `
    A kid is doing a "SproutLab" experiment. 
    Question: "What happens if ${condition}?"
    Explain the biological outcome in a way a 10th grader would find scientifically interesting but a 5-year-old would understand visually.
    Focus on variables like transpiration, photosynthesis, or root rot.
    Provide the response in Markdown.
  `;

  // Always use ai.models.generateContent to query GenAI.
  const response = await ai.models.generateContent({
    model,
    contents: { parts: [{ text: prompt }] },
  });

  // Extract text output from GenerateContentResponse using the .text property.
  return response.text;
};
