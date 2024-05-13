<h1 align="center">SupaNext: Opensource Blog CMS</h1>
<div>
    <div align="center">
        <a href="https://twitter.com/rasmickyy">
            <img src="https://img.shields.io/badge/X/Twitter-000000?style=for-the-badge&logo=x&logoColor=white" />
        </a>
        <a href="https://www.youtube.com/@rasmic">
            <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" />
        </a>
    </div>

SupaNext CMS is a blog CMS built using Nextjs, Supabase, Tiptap, and Uploadthing. The purpose behind it is to have one CMS for all websites I build that might need a blog. I dreaded reading the docs of various CMS's so I decided to build my own.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and static web applications.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **Supabase**: An open-source Firebase alternative, Supabase provides a suite of tools including a PostgreSQL database, authentication, and real-time features for building modern applications.
- **TipTap**: A rich text editor framework for Vue.js applications.
- **Uploadthing**: A simplied typesafe s3 wrapper.

## Getting Started

### Prerequisites

- Ensure Node.js and npm are installed on your machine.
- Obtain API keys from Clerk, Supabase, and Uploadthing.

### Obtaining API Keys

- **Clerk**: [Generate your Clerk API key here](https://www.clerk.com/).
- **Supabase**: [Get your Supabase API key here](https://www.supabase.com).
- **Uploading**: [Get your Uploadthing API key here](https://www.uploadthing.com).

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/michaelshimeles/cms.git
    ```
2. Install the required dependencies:
    ```
    npm install
    ```
    or
    ```
    bun install
    ```
3. Create a `.env` file in the root of your project and add your API keys:
    ```
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
    WEBHOOK_SECRET=
    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    DATABASE_URL=
    DIRECT_URL=    
    ```

### Running the Server

To start the server, execute:
```
npm run dev
```
or
```
yarn dev
```


## Contributing

Contributions to the project are welcome. Feel free to fork the repository, make your changes, and submit a pull request. You can also open issues to suggest improvements or report bugs.


## License

This project is licensed under the MIT License.
