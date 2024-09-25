# Tsafi

Tsafi is an AI-powered Content Management System (CMS) that helps users create and manage their blog sites and content efficiently.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Features

- AI-assisted content creation and management
- Multi-site support
- Custom domain and subdomain management
- Image generation and YouTube video transcription
- User-friendly interface for creating and publishing articles
- Author and category management

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- A Supabase account and project
- OpenAI API key
- Clerk account for authentication
- UploadThing account for file uploads

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/tsafi-cms.git
   ```

2. Navigate to the project directory:
   ```
   cd tsafi-cms
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

## Configuration

1. Create a `.env.local` file in the root directory of the project.

2. Add the following environment variables to the `.env.local` file:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SECRET_KEY=your_supabase_secret_key

   OPENAI_API_KEY=your_openai_api_key

   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id

   BASE_DOMAIN=your_base_domain
   ```

   Replace the placeholder values with your actual API keys and configuration details.

## Usage

1. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Sign in or create an account to start using Tsafi CMS.

4. Create a new site, manage content, and publish articles using the intuitive interface.

## API Reference

The main API route is located at `app/api/chat/route.ts`. It handles various functions including:

- Creating and managing sites
- Generating blog images
- Transcribing YouTube videos
- Storing and retrieving messages

For detailed API documentation, please refer to the comments in the source code.

## Contributing

Contributions to Tsafi CMS are welcome! Here's how you can contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

Please make sure to update tests as appropriate and adhere to the existing coding style.
