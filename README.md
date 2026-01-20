<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally and deploy it to GitHub Pages.

View your app in AI Studio: https://ai.studio/apps/drive/1OxtEMyzqrPNoe9a-c-VlN2eFQPOdWawi

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

### Setup

1. Go to your repository's Settings > Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. Push to the `main` branch to trigger the deployment

### Manual Deployment

You can also manually build and deploy:

1. Build the project:
   ```bash
   npm run build
   ```
2. The built files will be in the `dist/` directory
3. Deploy the `dist/` directory to your hosting service of choice

The app will be available at: `https://<username>.github.io/helloworldgemini/`
