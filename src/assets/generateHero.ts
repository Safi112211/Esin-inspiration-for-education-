import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateHeroImage() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: 'Empowering women in a diverse group, positive vibe, community, support, collaboration, high quality, professional photography, 16:9 aspect ratio',
        },
      ],
    },
    config: {
      imageConfig: {
            aspectRatio: "16:9",
            imageSize: "1K"
        },
    },
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64EncodeString: string = part.inlineData.data;
      const imageUrl = `data:image/png;base64,${base64EncodeString}`;
      console.log(imageUrl);
    }
  }
}
// I'll generate the images one by one and update the file.
