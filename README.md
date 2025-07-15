zoom_board — Web-based Interview Software for Tech Hiring

zoom_board is a modern, web-based interview platform designed for tech companies to seamlessly interview and evaluate potential developer hires. Built with Next.js, Clerk for authentication, and Convex for serverless database management, this platform provides real-time video capabilities, screen sharing, meeting scheduling, and more — all in one place.

🚀 Tech Stack
- Frontend: Next.js
- Authentication: Clerk
- Database: Convex
- Video Calling & Screen Sharing: WebRTC / integrated services
- UI/UX: TailwindCSS + Headless UI (or similar)

✨ Features
👥 For Admins (Tech Recruiters, Hiring Teams)
🔹 Create Instant Meetings - Quickly start a new interview session on the fly.
🔹 Schedule Meetings - Schedule interviews in advance with custom titles, descriptions, and time slots.
🔹 Record Meetings - Record entire sessions for later review.
🔹 Access & Download Recorded Sessions - All sessions are saved and accessible for later playback and download.
🔹 Comment on Recorded Sessions - Leave feedback and make collaborative hiring decisions directly on the video timeline.
🔹 Screen Sharing - Share your screen during interviews for technical demonstrations or task discussions.

👨💻 For Candidates (Developers being interviewed)
🔸 Join Interview via Link - Securely join an interview using a unique meeting link.
🔸 Live Coding Environment - Perform live coding tasks to showcase your problem-solving skills.
🔸 Screen Sharing - Share your screen when needed to demonstrate your work.
🔸 Engage in Real-time Video Interviews - Communicate directly with the hiring team via secure, real-time video chat.

🛠️ Installation & Setup
Clone the Repository:

```
git clone https://github.com/your-username/devmeet.git
cd devmeet
```
Install Dependencies:

```
npm install
```
Set Up Clerk:
- Create an account at Clerk.dev
- Create a Clerk application and copy your API keys
- Add your Clerk keys to the `.env.local` file:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```
Set Up Convex:
- Install the Convex CLI:
```
npm install -g convex
```
- Initialize Convex in your project:
```
npx convex dev
```
- Update `.env.local` with your Convex deployment URL.
Run the Development Server:
```
npm run dev
```
Your app should be running at http://localhost:3000
🧪 Future Improvements (Optional Ideas)
- AI-assisted candidate evaluation
- In-app collaborative whiteboard
- Candidate performance scoring system
- Integrated calendar sync for scheduling

📁 Folder Structure (Simplified)
```
├── src/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── actions/
│   ├── lib/
├── convex/
├── public/
├── styles/
├── .env.local
└── README.md

```
📜 License
MIT License — feel free to use and extend!

🙌 Acknowledgments
- Clerk.dev for seamless auth
- Convex.dev for powerful real-time backend
- Next.js for blazing-fast frontend development

📬 Contact
Author: Abdulrasheed Yusuf
Email: yusufabdulrasheed200@gmail.com
LinkedIn/GitHub: @yourusername
