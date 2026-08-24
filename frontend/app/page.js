"use client";

import { useState, useRef } from "react";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";

import {
  Brain,
  Sparkles,
  ArrowRight,
  Shield,
  Database,
  Cloud,
} from "lucide-react";

export default function Home() {

  const [showForm, setShowForm] = useState(false);

  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
const [result, setResult] = useState(false);
const [projectName, setProjectName] = useState("");
const [applicationType, setApplicationType] = useState("");
const [expectedUsers, setExpectedUsers] = useState("");
const [features, setFeatures] = useState("");
const [budget, setBudget] = useState("Low");

const [recommendation, setRecommendation] = useState(null);
const [agents, setAgents] = useState(null);

const generateArchitecture = async () => {
  setLoading(true);
  setResult(false);

  try {
    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_name: projectName,
        application_type: applicationType,
        expected_users: Number(expectedUsers),
        features: features,
        budget: budget,
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();

    console.log("Backend response:", data);

    setRecommendation(data.recommendation);
    setAgents(data.agents);

    setResult(true);

  } catch (error) {
    console.error("Error:", error);
    alert("Failed to connect to backend.");
  } finally {
    setLoading(false);
  }
}; 
return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
     {/* AI Background */}

<div className="absolute inset-0">

  {/* Grid */}

  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

  {/* Aurora Glow */}

  <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>

  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>

  <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>

</div>
  <div className="relative z-10">
   {/* Navbar */}
    <nav>
      
    </nav>

    {/* Hero */}

    

    {/* Form */}
    

    {/* Feature Cards */}
    <section
  id="features"
  className="grid md:grid-cols-3 gap-8 mt-28 px-10 pb-20"
></section>
    

      {/* Navbar */}
      {/* Hero Section */}



      <nav className="flex justify-between items-center px-10 py-6 sticky top-0 z-50 bg-[#07152f]/80 backdrop-blur-xl border-b border-cyan-400/10">

  <div className="flex items-center gap-3">
    <Brain size={35} className="text-cyan-400" />

    <h1 className="text-2xl font-bold">
      Software Architecture Advisor
    </h1>
  </div>

  <div className="flex gap-8 text-gray-300">

    <button
      onClick={() =>
        document.getElementById("home")?.scrollIntoView({
          behavior: "smooth",
        })
      }
      className="hover:text-cyan-400 transition"
    >
      Home
    </button>

    <button
      onClick={() =>
        document.getElementById("features")?.scrollIntoView({
          behavior: "smooth",
        })
      }
      className="hover:text-cyan-400 transition"
    >
      Features
    </button>

    <button
      onClick={() =>
        document.getElementById("about")?.scrollIntoView({
          behavior: "smooth",
        })
      }
      className="hover:text-cyan-400 transition"
    >
      About
    </button>

  </div>

</nav>
      {/* Hero */}

      <section
  id="home"
  className="text-center mt-20 px-5"
>

        <div className="flex justify-center">

          <Sparkles
            size={70}
            className="text-cyan-400 animate-pulse"
          />

        </div>

        <h1 className="text-6xl font-extrabold mt-6">

          Design Smarter.

          <br />

          Build Better.

        </h1>

        <p className="text-gray-300 text-xl mt-8 max-w-3xl mx-auto">

          AI-powered software architecture recommendations

          for modern applications.

        </p>
        <button
  onClick={() => {
    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }}
  className="mt-10 bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 mx-auto"
>
  Start Designing
  <ArrowRight size={20} />
</button>

        

      </section>
    

{showForm && (
<section
  ref={formRef}
  className="max-w-3xl mx-auto mt-16 mb-20
  bg-cyan-100/90
  backdrop-blur-xl
  rounded-3xl
  border border-cyan-300
  shadow-[0_0_40px_rgba(34,211,238,0.35)]
  p-8
  text-slate-900"
>

<h2 className="text-3xl font-bold text-center mb-8">
  Project Details
</h2>

<div className="space-y-5">
      <div>
        <label className="font-semibold">Project Name</label>
        <input
type="text"
placeholder="Enter project name"
value={projectName}
onChange={(e) => setProjectName(e.target.value)}
className="w-full border p-3 rounded-lg mt-2"
/>
      </div>

      <div>
        <label className="font-semibold">Application Type</label>
        <select
  value={applicationType}
  onChange={(e) => setApplicationType(e.target.value)}
  className="w-full border p-3 rounded-lg mt-2"
>
  <option value="">Select Application Type</option>
  
  <option value="Web Application">Web Application</option>
<option value="Mobile Application">Mobile Application</option>
<option value="Desktop Application">Desktop Application</option>
<option value="E-commerce">E-commerce</option>
<option value="Social Media">Social Media</option>
<option value="Banking System">Banking System</option>
<option value="Healthcare">Healthcare</option>
<option value="Education">Education</option>
<option value="ERP System">ERP System</option>
<option value="IoT Application">IoT Application</option>
<option value="Gaming">Gaming</option>
<option value="Video Streaming">Video Streaming</option>
<option value="Food Delivery">Food Delivery</option>
</select>
      </div>

      <div>
        <label className="font-semibold">Expected Users</label>
        <input
  type="number"
  placeholder="1000"
  value={expectedUsers}
  onChange={(e) => setExpectedUsers(e.target.value)}
  className="w-full border p-3 rounded-lg mt-2"
/>
      </div>

      <div>
        <label className="font-semibold">Features</label>
        <textarea
  rows="4"
  placeholder="Login, Payment, Chat..."
  value={features}
  onChange={(e) => setFeatures(e.target.value)}
  className="w-full border p-3 rounded-lg mt-2"
/>
      </div>

      <div>
        <label className="font-semibold">Budget</label>

        <select
  value={budget}
  onChange={(e) => setBudget(e.target.value)}
  className="w-full border p-3 rounded-lg mt-2"
>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>
      </div>

      <button
  onClick={generateArchitecture}
  disabled={loading}
  className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 duration-300 py-4 rounded-xl text-xl font-bold shadow-xl disabled:opacity-50"
>
  {loading ? "Generating..." : "🚀 Generate Architecture"}
</button>

    </div>

  </section>
)}
{loading && (
  <div className="mt-8 text-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-cyan-500 mx-auto"></div>

    <p className="mt-4 text-cyan-300 text-lg font-semibold">
      🤖 AI is designing your software architecture...
    </p>
  </div>
)}

{result && (

<div className="space-y-4 mt-6">

  <div className="bg-cyan-600 p-4 rounded-xl">
    <strong>Architecture:</strong> {recommendation.architecture}
  </div>

  <div className="bg-green-600 p-4 rounded-xl">
    <strong>Database:</strong> {recommendation.database}
  </div>

  <div className="bg-orange-600 p-4 rounded-xl">
    <strong>Deployment:</strong> {recommendation.deployment}
  </div>

  <div className="bg-purple-600 p-4 rounded-xl">
    <strong>Scaling:</strong> {recommendation.scaling}
  </div>

  <div className="bg-red-600 p-4 rounded-xl">
    <strong>Cache:</strong> {recommendation.cache}
  </div>

  <div className="bg-pink-600 p-4 rounded-xl">
    <strong>Message Queue:</strong> {recommendation.message_queue}
  </div>

  <div className="bg-yellow-500 p-4 rounded-xl text-black">
    <strong>Cloud:</strong> {recommendation.cloud}
  </div>

  <div className="bg-indigo-600 p-4 rounded-xl">
    <strong>Monitoring:</strong> {recommendation.monitoring}
  </div>

  <div className="bg-gray-700 p-4 rounded-xl">
    <strong>Authentication:</strong> {recommendation.authentication}
  </div>

</div>

)}
{result && (
<section className="max-w-7xl mx-auto mt-20 mb-24">

<h2 className="text-5xl font-extrabold text-center mb-4">
🏗 AI Generated Architecture
</h2>

<p className="text-center text-gray-400 mb-16">
Recommended system architecture based on your project requirements
</p>

<div className="flex flex-col items-center">

{recommendation && (
<div className="mt-16">

<h2 className="text-4xl font-bold text-center mb-10">
AI Generated Architecture
</h2>

<div className="flex flex-col items-center gap-6">

<div className="bg-blue-500 p-5 rounded-xl w-56 text-center">
👤 User
</div>

↓

<div className="bg-cyan-500 p-5 rounded-xl w-56 text-center">
🌐 React Frontend
</div>

↓

{recommendation.architecture === "Monolithic" && (
<>
<div className="bg-purple-500 p-5 rounded-xl w-56 text-center">
⚙ FastAPI Backend
</div>

↓

<div className="bg-green-500 p-5 rounded-xl w-56 text-center">
🗄 {recommendation.database}
</div>
</>
)}

{recommendation.architecture === "Modular Monolith" && (
<>
<div className="bg-orange-500 p-4 rounded-xl w-64 text-center">
🌐 Load Balancer
</div>

<div className="text-2xl">↓</div>

<div className="bg-purple-500 p-5 rounded-xl w-80 text-center">

<h3 className="font-bold text-xl">
⚙ FastAPI Backend
</h3>

<hr className="my-3" />

<div className="space-y-2">

<div className="bg-white/20 rounded-lg p-2">
👤 User Module
</div>

<div className="bg-white/20 rounded-lg p-2">
💳 Payment Module
</div>

<div className="bg-white/20 rounded-lg p-2">
🔔 Notification Module
</div>

</div>

</div>

<div className="text-2xl">↓</div>

<div className="bg-red-500 p-4 rounded-xl w-64 text-center">
⚡ Redis Cache
</div>

<div className="text-2xl">↓</div>

<div className="bg-green-500 p-4 rounded-xl w-64 text-center">
🗄 {recommendation.database}
</div>

<div className="text-2xl">↓</div>

<div className="bg-cyan-600 p-4 rounded-xl w-64 text-center">
{recommendation.deployment}
</div>

<div className="text-2xl">↓</div>

<div className="bg-yellow-500 p-5 rounded-xl w-64 text-center">
{recommendation.cloud}
</div>

</>
)}

{recommendation.architecture === "Microservices" && (
<>

<div className="bg-orange-500 p-4 rounded-xl w-64 text-center">
🚪 API Gateway
</div>

<div className="text-2xl">↓</div>

<div className="grid grid-cols-2 gap-4 w-full max-w-4xl">

<div className="bg-purple-500 p-4 rounded-xl text-center">
🔐 Auth Service
</div>

<div className="bg-purple-500 p-4 rounded-xl text-center">
👤 User Service
</div>

<div className="bg-purple-500 p-4 rounded-xl text-center">
💳 Payment Service
</div>

<div className="bg-purple-500 p-4 rounded-xl text-center">
🔔 Notification Service
</div>

<div className="bg-purple-500 p-4 rounded-xl text-center">
📦 Product Service
</div>

<div className="bg-purple-500 p-4 rounded-xl text-center">
📊 Analytics Service
</div>

</div>

<div className="text-2xl">↓</div>

<div className="bg-red-500 p-4 rounded-xl w-64 text-center">
⚡ {recommendation.cache}
</div>

<div className="text-2xl">↓</div>

<div className="bg-pink-500 p-4 rounded-xl w-64 text-center">
📨 {recommendation.message_queue}
</div>

<div className="text-2xl">↓</div>

<div className="bg-green-500 p-4 rounded-xl w-64 text-center">
🗄 {recommendation.database}
</div>

<div className="text-2xl">↓</div>

<div className="bg-cyan-600 p-4 rounded-xl w-64 text-center">
☸ Kubernetes
</div>

<div className="text-2xl">↓</div>

<div className="bg-yellow-500 p-5 rounded-xl w-64 text-center">
☁ AWS Cloud
</div>

</>
)}

</div>

</div>
)}

<div className="mt-10 w-full max-w-4xl bg-slate-800 rounded-2xl p-6 border border-cyan-500">

  <h2 className="text-2xl font-bold text-cyan-400 mb-4">
    🤖 AI Recommendation
  </h2>
  {/* Detailed Architecture Recommendation */}

<div className="mt-8 w-full max-w-6xl">

    <h2 className="text-3xl font-bold text-white mb-6 text-center">
        🏗️ Architecture Details
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        <div className="bg-slate-900/80 border border-cyan-400/40 rounded-xl p-5">
            <h3 className="text-lg font-bold text-cyan-300">
                🏛️ Architecture
            </h3>
            <p className="text-white mt-2">
                {recommendation.architecture}
            </p>
        </div>

        <div className="bg-slate-900/80 border border-blue-400/40 rounded-xl p-5">
            <h3 className="text-lg font-bold text-blue-300">
                🗄️ Database
            </h3>
            <p className="text-white mt-2">
                {recommendation.database}
            </p>
        </div>

        <div className="bg-slate-900/80 border border-purple-400/40 rounded-xl p-5">
            <h3 className="text-lg font-bold text-purple-300">
                ☁️ Deployment
            </h3>
            <p className="text-white mt-2">
                {recommendation.deployment}
            </p>
        </div>

        <div className="bg-slate-900/80 border border-green-400/40 rounded-xl p-5">
            <h3 className="text-lg font-bold text-green-300">
                📈 Scaling
            </h3>
            <p className="text-white mt-2">
                {recommendation.scaling}
            </p>
        </div>

        <div className="bg-slate-900/80 border border-yellow-400/40 rounded-xl p-5">
            <h3 className="text-lg font-bold text-yellow-300">
                ⚡ Cache
            </h3>
            <p className="text-white mt-2">
                {recommendation.cache}
            </p>
        </div>

        <div className="bg-slate-900/80 border border-pink-400/40 rounded-xl p-5">
            <h3 className="text-lg font-bold text-pink-300">
                📨 Message Queue
            </h3>
            <p className="text-white mt-2">
                {recommendation.message_queue}
            </p>
        </div>

        <div className="bg-slate-900/80 border border-orange-400/40 rounded-xl p-5">
            <h3 className="text-lg font-bold text-orange-300">
                ☁️ Cloud
            </h3>
            <p className="text-white mt-2">
                {recommendation.cloud}
            </p>
        </div>

        <div className="bg-slate-900/80 border border-cyan-400/40 rounded-xl p-5">
            <h3 className="text-lg font-bold text-cyan-300">
                📊 Monitoring
            </h3>
            <p className="text-white mt-2">
                {recommendation.monitoring}
            </p>
        </div>

        <div className="bg-slate-900/80 border border-red-400/40 rounded-xl p-5">
            <h3 className="text-lg font-bold text-red-300">
                🔐 Authentication
            </h3>
            <p className="text-white mt-2">
                {recommendation.authentication}
            </p>
        </div>

    </div>

    {recommendation.reason && (
        <div className="mt-6 bg-slate-900/80 border border-indigo-400/40 rounded-2xl p-6">

            <h3 className="text-2xl font-bold text-indigo-300 mb-3">
                💡 Why This Architecture?
            </h3>

            <p className="text-gray-200 leading-7">
                {recommendation.reason}
            </p>

        </div>
    )}

</div>

  <p className="text-lg text-gray-200">
    {recommendation.reason}
  </p>

</div>

<div className="mt-8 w-full max-w-4xl">

  <h2 className="text-2xl font-bold mb-5">
    💻 Recommended Tech Stack
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    <div className="bg-cyan-700 rounded-xl p-4 text-center">
      ⚛ React
    </div>

    <div className="bg-green-700 rounded-xl p-4 text-center">
      ⚡ FastAPI
    </div>

    <div className="bg-blue-700 rounded-xl p-4 text-center">
      🗄 {recommendation.database}
    </div>

    <div className="bg-purple-700 rounded-xl p-4 text-center">
      ☁ {recommendation.deployment}
    </div>

  </div>

</div>

{recommendation && (
  <section className="mt-16 px-5">

    <h2 className="text-4xl font-bold text-center mb-10">
      🏗️ Generated Architecture
    </h2>

    <div className="max-w-4xl mx-auto">

      {/* User */}
      <div className="flex justify-center">
        <div className="bg-cyan-500/20 border border-cyan-400
                        rounded-xl px-10 py-5 text-center
                        shadow-lg shadow-cyan-500/20">
          <div className="text-3xl">👤</div>
          <div className="font-bold text-lg">User</div>
        </div>
      </div>

      <div className="text-center text-cyan-400 text-3xl my-4">
        ↓
      </div>

      {/* Frontend */}
      <div className="flex justify-center">
        <div className="bg-blue-500/20 border border-blue-400
                        rounded-xl px-10 py-5 text-center
                        shadow-lg shadow-blue-500/20">
          <div className="text-3xl">🌐</div>
          <div className="font-bold text-lg">React Frontend</div>
        </div>
      </div>

      <div className="text-center text-cyan-400 text-3xl my-4">
        ↓
      </div>

      {/* Backend */}
      <div className="flex justify-center">
        <div className="bg-green-500/20 border border-green-400
                        rounded-xl px-10 py-5 text-center
                        shadow-lg shadow-green-500/20">
          <div className="text-3xl">⚡</div>
          <div className="font-bold text-lg">FastAPI Backend</div>
        </div>
      </div>

      <div className="text-center text-cyan-400 text-3xl my-4">
        ↓
      </div>

      {/* Architecture */}
      <div className="flex justify-center">
        <div className="bg-purple-500/20 border border-purple-400
                        rounded-xl px-10 py-5 text-center
                        shadow-lg shadow-purple-500/20">

          <div className="text-3xl">🏗️</div>

          <div className="font-bold text-lg">
            {recommendation.architecture}
          </div>

        </div>
      </div>

      <div className="text-center text-cyan-400 text-3xl my-4">
        ↓
      </div>

      {/* Infrastructure */}
      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-blue-500/20 border border-blue-400
                        rounded-xl p-5 text-center">

          <div className="text-3xl">🗄️</div>

          <div className="font-bold">
            Database
          </div>

          <div className="text-gray-300 mt-2">
            {recommendation.database}
          </div>

        </div>

        <div className="bg-purple-500/20 border border-purple-400
                        rounded-xl p-5 text-center">

          <div className="text-3xl">⚡</div>

          <div className="font-bold">
            Cache
          </div>

          <div className="text-gray-300 mt-2">
            {recommendation.cache}
          </div>

        </div>

        <div className="bg-orange-500/20 border border-orange-400
                        rounded-xl p-5 text-center">

          <div className="text-3xl">☁️</div>

          <div className="font-bold">
            Deployment
          </div>

          <div className="text-gray-300 mt-2">
            {recommendation.deployment}
          </div>

        </div>

      </div>

      {/* Additional components */}

      <div className="grid md:grid-cols-3 gap-5 mt-5">

        <div className="bg-pink-500/20 border border-pink-400
                        rounded-xl p-5 text-center">

          <div className="text-3xl">📨</div>

          <div className="font-bold">
            Message Queue
          </div>

          <div className="text-gray-300 mt-2">
            {recommendation.message_queue}
          </div>

        </div>

        <div className="bg-yellow-500/20 border border-yellow-400
                        rounded-xl p-5 text-center">

          <div className="text-3xl">📈</div>

          <div className="font-bold">
            Scaling
          </div>

          <div className="text-gray-300 mt-2">
            {recommendation.scaling}
          </div>

        </div>

        <div className="bg-indigo-500/20 border border-indigo-400
                        rounded-xl p-5 text-center">

          <div className="text-3xl">🔐</div>

          <div className="font-bold">
            Authentication
          </div>

          <div className="text-gray-300 mt-2">
            {recommendation.authentication}
          </div>

        </div>

      </div>

    </div>

  </section>
)}

{/* AI Recommendation */}

<div className="mt-10">
   ...
</div>

{/* Recommended Tech Stack */}

<div className="mt-8">
   ...
</div>

</div>

</section>
)}
{agents && (
  <section className="mt-16 px-6 max-w-6xl mx-auto">

    <h2 className="text-4xl font-bold text-center text-white mb-10">
      🤖 Multi-Agent Analysis
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* Architecture Agent */}
      <div className="bg-white/10 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-cyan-400">
          🏗️ Architecture Agent
        </h3>

        <pre className="mt-4 text-gray-200 whitespace-pre-wrap text-sm">
          {JSON.stringify(agents.architecture, null, 2)}
        </pre>
      </div>

      {/* Database Agent */}
      <div className="bg-white/10 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-blue-400">
          🗄️ Database Agent
        </h3>

        <pre className="mt-4 text-gray-200 whitespace-pre-wrap text-sm">
          {JSON.stringify(agents.database, null, 2)}
        </pre>
      </div>

      {/* Scaling Agent */}
      <div className="bg-white/10 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-purple-400">
          📈 Scaling Agent
        </h3>

        <pre className="mt-4 text-gray-200 whitespace-pre-wrap text-sm">
          {JSON.stringify(agents.scaling, null, 2)}
        </pre>
      </div>

      {/* Deployment Agent */}
      <div className="bg-white/10 backdrop-blur-xl border border-green-400/30 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-green-400">
          🚀 Deployment Agent
        </h3>

        <pre className="mt-4 text-gray-200 whitespace-pre-wrap text-sm">
          {JSON.stringify(agents.deployment, null, 2)}
        </pre>
      </div>

      {/* Security Agent */}
      <div className="bg-white/10 backdrop-blur-xl border border-red-400/30 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-red-400">
          🔐 Security Agent
        </h3>

        <pre className="mt-4 text-gray-200 whitespace-pre-wrap text-sm">
          {JSON.stringify(agents.security, null, 2)}
        </pre>
      </div>

      {/* Review Agent */}
      <div className="bg-white/10 backdrop-blur-xl border border-yellow-400/30 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-yellow-400">
          🤖 Review Agent
        </h3>

        <pre className="mt-4 text-gray-200 whitespace-pre-wrap text-sm">
          {JSON.stringify(agents.review, null, 2)}
        </pre>
      </div>

    </div>

  </section>
)}
      {/* Feature Cards */}

      <section className="grid md:grid-cols-3 gap-8 mt-28 px-10 pb-20">

        <div className="group bg-white/10 backdrop-blur-2xl border border-cyan-400/20 rounded-3xl p-8 shadow-2xl hover:scale-105 hover:border-cyan-400 hover:shadow-cyan-500/30 transition-all duration-500 cursor-pointer">

          <Database
  className="text-cyan-400 group-hover:rotate-12 group-hover:scale-125 transition-all duration-500"
  size={45}
/>

          <h2 className="text-2xl font-bold mt-5">

            Database

          </h2>
          <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
  AI Recommended
</span>

          <p className="text-gray-300 mt-3">

            AI suggests SQL or NoSQL databases according

            to your application.

          </p>
          <div className="mt-6 h-1 w-0 bg-cyan-400 rounded-full group-hover:w-full transition-all duration-500"></div>

        </div>

        <div className="group bg-white/10 backdrop-blur-2xl border border-cyan-400/20 rounded-3xl p-8 shadow-2xl hover:scale-105 hover:border-cyan-400 hover:shadow-cyan-500/30 transition-all duration-500 cursor-pointer">

          <Database
  className="text-cyan-400 group-hover:rotate-12 group-hover:scale-125 transition-all duration-500"
  size={45}
/>

          <h2 className="text-2xl font-bold mt-5">

            Deployment

          </h2>
          <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
  Cloud Ready
</span>

          <p className="text-gray-300 mt-3">

            Docker, Kubernetes,

            AWS, Azure or GCP deployment strategy.

          </p>
<div className="mt-6 h-1 w-0 bg-blue-400 rounded-full group-hover:w-full transition-all duration-500"></div>
        </div>

        <div className="group bg-white/10 backdrop-blur-2xl border border-cyan-400/20 rounded-3xl p-8 shadow-2xl hover:scale-105 hover:border-cyan-400 hover:shadow-cyan-500/30 transition-all duration-500 cursor-pointer">

          <Database
  className="text-cyan-400 group-hover:rotate-12 group-hover:scale-125 transition-all duration-500"
  size={45}
/>

         <h2 className="text-2xl font-bold mt-5 text-white group-hover:text-cyan-300 transition-colors">

            Security

          </h2>
          <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
  Enterprise Grade
</span>

          <p className="text-gray-300 mt-3 leading-7">

            JWT, OAuth, HTTPS,

            authentication and authorization.

          </p>
<div className="mt-6 h-1 w-0 bg-blue-400 rounded-full group-hover:w-full transition-all duration-500"></div>
        </div>

      </section>

{/* About Section */}
<section
  id="about"
  className="px-10 py-24 text-center border-t border-cyan-400/10"
>
  <div className="max-w-4xl mx-auto">

    <div className="flex justify-center mb-6">
      <Brain
        size={55}
        className="text-cyan-400"
      />
    </div>

    <h2 className="text-4xl font-bold">
      About Software Architecture Advisor
    </h2>

    <p className="text-gray-300 text-lg leading-8 mt-6">
      Software Architecture Advisor is an AI-powered system
      that analyzes project requirements and recommends a
      suitable software architecture, database, deployment
      strategy, scaling approach, caching strategy and
      authentication approach.
    </p>

    <div className="grid md:grid-cols-3 gap-6 mt-12">

      <div className="bg-white/5 border border-cyan-400/20 rounded-2xl p-6">
        <Sparkles className="text-cyan-400 mx-auto" size={35} />

        <h3 className="text-xl font-bold mt-4">
          AI Powered
        </h3>

        <p className="text-gray-400 mt-3">
          Uses AI to generate architecture recommendations.
        </p>
      </div>

      <div className="bg-white/5 border border-cyan-400/20 rounded-2xl p-6">
        <Database className="text-cyan-400 mx-auto" size={35} />

        <h3 className="text-xl font-bold mt-4">
          RAG Based
        </h3>

        <p className="text-gray-400 mt-3">
          Retrieves relevant architecture knowledge before
          generating recommendations.
        </p>
      </div>

      <div className="bg-white/5 border border-cyan-400/20 rounded-2xl p-6">
        <Cloud className="text-cyan-400 mx-auto" size={35} />

        <h3 className="text-xl font-bold mt-4">
          Architecture Analysis
        </h3>

        <p className="text-gray-400 mt-3">
          Evaluates architecture, database, scaling,
          deployment and security requirements.
        </p>
      </div>

    </div>

  </div>
</section>

</div>

</main>
);
}