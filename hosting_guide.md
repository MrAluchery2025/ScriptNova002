# ScriptNova Hosting Guide

Since your website now has both a **Frontend** (HTML/CSS) and a **Backend** (Node.js relay), you need a hosting strategy that supports both.

## Option 1: Render or Railway (Easiest)
These platforms are designed to host full-stack applications with minimal configuration.

### Steps:
1.  **Create an Account**: Sign up at [Render.com](https://render.com) or [Railway.app](https://railway.app).
2.  **Connect GitHub**: Connect the repository containing your `ScriptNova` files.
3.  **Setup Web Service**:
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
4.  **Environment Variables**: In the platform's "Environment" tab, add your `GMAIL_USER` and `GMAIL_PASS` (the same values from your `.env`).
5.  **Update Frontend**: Once deployed, you will get a URL (e.g., `https://scriptnova-api.onrender.com`). You must update line 278 in your `main.js` to point to this new URL instead of `localhost:5000`.

---

## Option 2: Vercel or Netlify (Best Performance)
Best if you want the absolute fastest loading times for your website.

### Steps:
1.  **Frontend**: Deploy the static HTML/CSS files as a "Static Site."
2.  **Backend**: You must convert `server.js` into an **API Route** (Serverless Function). Vercel handles this automatically if you move the logic into an `api/` folder.
3.  **Custom Domain**: Both provide free `.vercel.app` or `.netlify.app` domains, or you can connect a professional domain like `scriptnova.com`.

---

## Option 3: Traditional VPS (DigitalOcean / Linode)
Best for total control and scaling.

### Steps:
1.  **Server Setup**: Provision a Linux server and install Node.js and Nginx.
2.  **Process Management**: Use **PM2** to keep your `server.js` running 24/7.
3.  **Reverse Proxy**: Configure Nginx to serve the HTML files and proxy the `/api` requests to your Node.js process.

---

## 🏗️ Preparation Checklist
Before you host, ensure you have done the following:

> [!IMPORTANT]
> **Environment Security**: Never upload your `.env` file to a public GitHub repository. Instead, use the **Environment Variables** settings provided by your hosting provider.
>
> **API URL**: Remember that once hosted, your frontend `fetch` request in `main.js` must point to your live backend URL, not `localhost`.

**Which option sounds best for you? I can help you prepare the files (like a `vercel.json` or directory refactor) for your chosen platform.**
