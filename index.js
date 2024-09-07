const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
require("dotenv").config();

async function main() {
  const endpoint = process.env.AZURE_ENDPOINT;
  const azureApiKey = process.env.AZURE_API_KEY;

  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(azureApiKey)
  );

  const deploymentName = "Dalle3";
  const prompt = "Blue cream British shorthair cat napping with good owners";
  const size = "1024x1024";
  const n = 1;

  const results = await client.getImages(deploymentName, prompt, { n, size });

  for (const image of results.data) {
    console.log(`Image generation result URL: ${image.url}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
