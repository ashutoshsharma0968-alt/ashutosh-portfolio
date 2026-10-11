# Ashutosh Sharma — Portfolio starter

A responsive, dark futuristic portfolio built with React + Vite, Tailwind CSS v4, React Router, Framer Motion, and Lucide icons.

## 1. Install requirements
- Install Node.js LTS from https://nodejs.org/ (npm is included).
- Install Visual Studio Code from https://code.visualstudio.com/.

## 2. Run locally
Open this folder in VS Code, then use Terminal → New Terminal:

```bash
npm install
npm run dev
```

Open the Local URL printed by Vite, normally http://localhost:5173.

## 3. Personalize before publishing
Edit `src/data.js`:
- Replace `YOUR_EMAIL@example.com` with your real professional email.
- Replace `YOUR_GITHUB_USERNAME` in the GitHub URL.
- Check the LinkedIn URL.
- Edit the project descriptions, status labels, stack, and links so they accurately describe your work.
- For a resume link, place a PDF named `resume.pdf` in `public/`.
- Add your own photo only if you want to; the current hero artwork is CSS, so no image is required.

Do not claim a project is live unless it is deployed. The supplied project entries are editable examples based on your ideas.

## 4. Test a production build
```bash
npm run build
npm run preview
```
If the build completes, Vite creates the `dist/` folder.

## 5. Publish with GitHub + Vercel
1. Create/sign in to GitHub and create a new empty repository, e.g. `ashutosh-portfolio`.
2. In VS Code terminal, from this folder:

```bash
git init
git add .
git commit -m "Build portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ashutosh-portfolio.git
git push -u origin main
```

3. Replace `YOUR_GITHUB_USERNAME` in the remote URL first. If Git is not installed, install it from https://git-scm.com/downloads. GitHub may ask you to sign in through a browser.
4. Sign in to https://vercel.com/ using GitHub, choose **Add New → Project**, import `ashutosh-portfolio`, then click **Deploy**. Vercel normally detects Vite automatically.
5. When deployment finishes, open the generated `https://....vercel.app` URL on your phone and computer. Test every page and link.
6. Later changes: edit files, then run `git add .`, `git commit -m "Update portfolio"`, and `git push`. Vercel will redeploy automatically.

## 6. Add it to LinkedIn
- Open your LinkedIn profile.
- Click **Add profile section** → **Recommended** → **Add featured** (labels can vary).
- Add a link to your deployed portfolio and give it a clear title such as **My Developer Portfolio**.
- You can also add the URL under **Contact info → Website**, and mention it in your About section.
- Example post: “I’ve launched my developer portfolio! It brings together my projects, skills, and current learning journey. I’d love your feedback. [PASTE YOUR LIVE URL]”

## Notes
- `src/data.js` is the main place to edit profile details and projects.
- This starter does not need a backend or environment variables.
- Vercel supports React Router history fallback for this setup.
- Keep secrets and API keys out of frontend code.
