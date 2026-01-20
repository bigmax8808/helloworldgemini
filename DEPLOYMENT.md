# GitHub Pages Deployment Guide

This guide explains how to deploy this web application to GitHub Pages.

## Overview

This project uses GitHub Actions to automatically build and deploy the application to GitHub Pages whenever changes are pushed to the `main` branch.

## Prerequisites

- Repository with GitHub Pages enabled
- Access to repository settings

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. In the left sidebar, click on **Pages**
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
   
That's it! GitHub will automatically use the workflow defined in `.github/workflows/deploy.yml`

### 2. Push to Main Branch

Once you merge this PR to the `main` branch, the deployment will automatically trigger.

You can monitor the deployment:
1. Go to the **Actions** tab in your repository
2. Look for the "Deploy to GitHub Pages" workflow
3. Click on it to see the deployment progress

### 3. Access Your Deployed Site

After successful deployment, your site will be available at:
```
https://<your-username>.github.io/helloworldgemini/
```

Replace `<your-username>` with your GitHub username.

## Configuration

### Base Path

The application is configured with the base path `/helloworldgemini/` in `vite.config.ts`. If you rename the repository, update the `base` property:

```typescript
base: '/your-new-repo-name/',
```

### Environment Variables

Note: The Gemini API key is read from environment variables at runtime in the browser. For production deployment, you may want to implement a backend service to securely handle API keys instead of exposing them in the frontend.

## Manual Deployment

If you prefer to deploy manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist/` directory

3. You can deploy these files to any static hosting service

## Troubleshooting

### Workflow Not Running

- Ensure GitHub Actions are enabled for your repository
- Check that the workflow file is on the `main` branch
- Verify you have the correct permissions set in the workflow file

### 404 Errors

- Verify the `base` path in `vite.config.ts` matches your repository name
- Ensure GitHub Pages is set to use "GitHub Actions" as the source

### Build Failures

- Check the Actions tab for detailed error logs
- Ensure all dependencies are listed in `package.json`
- Verify Node.js version compatibility

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
