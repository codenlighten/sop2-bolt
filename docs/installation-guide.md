# Cryptocurrency Crime Investigation Platform
## Installation Guide

This guide provides detailed instructions for setting up and deploying the Cryptocurrency Crime Investigation Training Platform.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Production Deployment](#production-deployment)
4. [Configuration Options](#configuration-options)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

Before installing the platform, ensure your system meets the following requirements:

### System Requirements

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **Memory**: Minimum 4GB RAM
- **Disk Space**: At least 1GB free space
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+, Debian 11+, etc.)

### Required Knowledge

- Basic understanding of JavaScript/TypeScript
- Familiarity with React
- Command line experience
- Web server configuration (for production deployment)

### Development Tools

- **Code Editor**: VS Code (recommended), WebStorm, or similar
- **Browser**: Chrome, Firefox, or Edge with developer tools
- **Git**: For version control (optional but recommended)

## Local Development Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-organization/crypto-crime-sop.git
cd crypto-crime-sop
```

If you don't have Git, you can download the source code as a ZIP file and extract it.

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies defined in the `package.json` file.

### Step 3: Environment Configuration

Create a `.env` file in the root directory with the following content:

```
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

Replace `your_stripe_public_key` with your actual Stripe public key if you want to enable payment functionality.

### Step 4: Start Development Server

```bash
npm run dev
```

This will start the development server, typically at http://localhost:3000 or http://localhost:5173. The console output will indicate the exact URL.

### Step 5: Verify Installation

1. Open the provided URL in your browser
2. Verify that the landing page loads correctly
3. Test navigation between different sections
4. Ensure interactive components are functioning

## Production Deployment

### Option 1: Static Site Deployment

#### Step 1: Build the Application

```bash
npm run build
```

This creates a production-ready build in the `dist` directory.

#### Step 2: Deploy to Web Server

Copy the contents of the `dist` directory to your web server's public directory.

For Apache:
```bash
cp -r dist/* /var/www/html/
```

For Nginx:
```bash
cp -r dist/* /usr/share/nginx/html/
```

#### Step 3: Configure Web Server

**Apache Configuration Example**:

Create or modify `/etc/apache2/sites-available/crypto-crime-sop.conf`:

```apache
<VirtualHost *:80>
    ServerName crypto-crime-sop.example.com
    DocumentRoot /var/www/html

    <Directory /var/www/html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Redirect all requests to index.html for SPA routing
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]

    ErrorLog ${APACHE_LOG_DIR}/crypto-crime-sop-error.log
    CustomLog ${APACHE_LOG_DIR}/crypto-crime-sop-access.log combined
</VirtualHost>
```

**Nginx Configuration Example**:

Create or modify `/etc/nginx/sites-available/crypto-crime-sop.conf`:

```nginx
server {
    listen 80;
    server_name crypto-crime-sop.example.com;
    root /usr/share/nginx/html;
    index index.html;

    # Redirect all requests to index.html for SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Logs
    error_log /var/log/nginx/crypto-crime-sop-error.log;
    access_log /var/log/nginx/crypto-crime-sop-access.log;
}
```

Enable the site and restart the web server.

### Option 2: Deployment to Netlify

#### Step 1: Create a `netlify.toml` File

Create a `netlify.toml` file in the root directory:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Step 2: Deploy to Netlify

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Log in to Netlify and click "New site from Git"
3. Select your repository and configure build settings
4. Click "Deploy site"

#### Step 3: Configure Environment Variables

In the Netlify dashboard:
1. Go to Site settings > Build & deploy > Environment
2. Add the environment variables:
   - Key: `VITE_STRIPE_PUBLIC_KEY`
   - Value: Your Stripe public key

### Option 3: Docker Deployment

#### Step 1: Create a Dockerfile

Create a `Dockerfile` in the root directory:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create an `nginx.conf` file:

```
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Step 2: Build and Run Docker Container

```bash
# Build the Docker image
docker build -t crypto-crime-sop .

# Run the container
docker run -p 8080:80 -e VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key crypto-crime-sop
```

The application will be available at http://localhost:8080.

## Configuration Options

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_STRIPE_PUBLIC_KEY` | Stripe public key for payments | - | Yes, for payment functionality |

### Build Configuration

The build process can be customized by modifying `vite.config.ts`:

```typescript
// Example: Changing the output directory
build: {
  outDir: 'custom-dist-folder',
}

// Example: Adding base path for subdirectory deployment
base: '/training/',

// Example: Configuring server port
server: {
  port: 4000,
}
```

### Content Customization

To customize the training content:

1. Modify files in the `src/data/` directory:
   - `chapters.ts`: Chapter definitions
   - `badges.ts`: Achievement badges
   - `certificates.ts`: Certification requirements

2. Update page components in `src/pages/` directory to change module content

## Troubleshooting

### Common Issues

#### Issue: Application fails to start

**Possible causes**:
- Node.js version incompatibility
- Missing dependencies
- Port conflicts

**Solutions**:
- Verify Node.js version (`node -v`)
- Run `npm install` again
- Check if another application is using the same port

#### Issue: Interactive components not working

**Possible causes**:
- JavaScript errors
- Missing dependencies
- Browser compatibility issues

**Solutions**:
- Check browser console for errors
- Verify all dependencies are installed
- Try a different browser

#### Issue: Build process fails

**Possible causes**:
- TypeScript errors
- Import/export issues
- Environment configuration problems

**Solutions**:
- Fix TypeScript errors indicated in the console
- Check import paths for correctness
- Verify environment variables are set correctly

### Getting Help

If you encounter issues not covered in this guide:

1. Check the [GitHub repository issues](https://github.com/your-organization/crypto-crime-sop/issues)
2. Join our [community forum](https://forum.example.com)
3. Contact support at support@cryptocrimetraining.com