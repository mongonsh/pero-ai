# 🚀 PeroAI – Prompt Evaluation and Response Orchestrator

**PeroAI** is an AI governance layer that ensures safe, compliant, and traceable prompt interactions with generative AI models. Built with AWS Bedrock, Amazon Polly, and a multi-agent architecture powered by the Model Context Protocol (MCP), PeroAI is designed for enterprise-grade GenAI oversight.

---

## 📌 Problem

Organizations deploying GenAI face risks from:

* Unsafe or toxic prompt input
* Leaked sensitive data via AI outputs
* Lack of control, traceability, or policy enforcement

There's no standard way to *moderate*, *audit*, and *govern* AI model usage across tools like ChatGPT, Claude, or Bedrock.

---

## 💡 Solution

**PeroAI** acts as a secure middle layer that intercepts, evaluates, and governs prompts using:

* ✅ **Multi-agent Governance via MCP**
* ✅ **Prompt moderation and rewriting**
* ✅ **AI response generation via AWS Bedrock**
* ✅ **Speech synthesis via Amazon Polly**
* ✅ **Audit logging via DynamoDB**
* ✅ **3D avatar interface with viseme lip sync**

---

## 🔧 Architecture

* **Frontend**: Next.js + React + Three.js (3D avatar)
* **Backend**: FastAPI
* **AI Platform**: AWS Bedrock (Claude v2)
* **Voice**: Amazon Polly (speech + viseme)
* **Storage**: DynamoDB (logs)
* **MCP Agents**:

  * `PolicyAgent` → Check compliance
  * `RewriteAgent` → Rephrase if blocked
  * `ResponseAgent` → Generate safe response
  * `VoiceAgent` → Convert to voice
  * `TraceAgent` → Record everything

---

## 🎭 Features

| Feature                 | Description                                         |
| ----------------------- | --------------------------------------------------- |
| ✅ Prompt Moderation     | Detects blocked content (e.g., passwords, violence) |
| ✨ Multi-Agent Flow      | Each decision made by individual MCP-based agent    |
| 🎙️ AI Voice Response   | Polly voice + viseme lip sync to 3D avatar          |
| 📜 Audit Logging        | Stores every prompt + decision + response           |
| 🛡️ Enterprise-Grade UI | Clean SaaS-style experience with auth & dashboards  |

---

## 🎥 Demo Video (To Be Added)

> A short 2–3 minute video walking through prompt input → governance → spoken response with avatar.

---

## 📂 Run Locally

```bash
# Frontend
cd app
npm install
npm run dev

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Add the following env vars:

```
OPENAI_API_KEY=xxx
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-1
```

---

## 🏆 Why PeroAI Stands Out

* 🔒 **Strong alignment with governance & safety theme**
* 🧠 **Deep use of AWS-native tech: Bedrock + Polly**
* 🎨 **Engaging UX via 3D Avatar with lip sync**
* 📊 **Transparent audit trails for enterprises**
* 🧱 **MCP = Composable, flexible AI control system**

---

## 🤝 Team

Built solo by Mungunshagai, with support from ChatGPT + AWS open source libraries.

---

## 🔗 Links

* GitHub Repo: [github.com/mongonsh/pero-ai](https://github.com/mongonsh/pero-ai)
* Live Demo: [pero-ai-sandy.vercel.app](https://pero-ai-sandy.vercel.app/)

---

## 📝 License

MIT
