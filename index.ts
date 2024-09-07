import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import * as dotenv from "dotenv";

dotenv.config();

async function main(): Promise<void> {
  const endpoint: string | undefined = process.env.AZURE_ENDPOINT;
  const azureApiKey: string | undefined = process.env.AZURE_API_KEY;

  if (!endpoint || !azureApiKey) {
    throw new Error("Azure endpoint or API key is missing.");
  }

  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(azureApiKey)
  );

  const deploymentName: string = "Dalle3";
  const prompt: string =
    "Blue cream British shorthair cat napping with good owners";
  const size: string = "1024x1024";
  const n: number = 1;

  try {
    const results = await client.getImages(deploymentName, prompt, { n, size });

    for (const image of results.data) {
      console.log(`Image generation result URL: ${image.url}`);
    }
  } catch (err) {
    console.error("The sample encountered an error:", err);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
