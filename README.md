# 📖 Beacon Survival App

![](https://raw.githubusercontent.com/michaelsboost/Beacon/main/imgs/screenshots/screenshot-training.png)

## 🌟 Overview
The **Beacon Survival App** is an **interactive survival training tool** designed to help users build critical survival skills through **guides, training simulations, emergency checklists, and scenario-based challenges**. It includes **real-time progress tracking, skill meters, local storage integration, and an interactive UI** powered by **Alpine.js**.

[![MIT License](https://img.shields.io/github/license/michaelsboost/Beacon)](LICENSE) [![GitHub Stars](https://img.shields.io/github/stars/michaelsboost/Beacon)](https://github.com/michaelsboost/Beacon/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/michaelsboost/Beacon)](https://github.com/michaelsboost/Beacon/issues)

> 🛠️ **Built Entirely with kodeWeave**  
> This app was developed using **[kodeWeave](https://michaelsboost.com/kodeweave)**, a powerful coding playground that allows developers to write, test, and refine web applications from anywhere.

### ⚠️ **Project Status**
> **As of August 1st, 2025, this project has been abandoned.**  
> **All further updates and contributions are now community-driven.**  
> **The original developer, Michael Schwartz, is no longer maintaining or updating this repository.**  

If you wish to contribute, feel free to **fork the project** and expand upon it.

---

## 🚀 **Launch the App**
🌍 **Beacon Survival App is live!**  
Access it here: **[Beacon Survival App](https://michaelsboost.com/Beacon/)**

> 📲 **Progressive Web App (PWA) Support**  
> Beacon can be **installed as a PWA**, allowing you to use it **offline** and access features seamlessly across devices.

---

## 🛠️ Key Features

### 🎓 **Training System**
- Tracks **skill points** across multiple training areas.
- Users complete **challenges** to gain experience and level up.
- Global progress meters determine overall **survival readiness**.
- Supports **real-time updates & persistent state saving** with LocalStorage.  

### 🎭 **Survival Scenario Simulator**
- Interactive scenarios with **dynamic challenges**.
- **Time-based survival mechanics** (e.g., complete objectives before time runs out).
- **Only one active scenario runs at a time**.
- Supports **starting, pausing, and completing challenges** dynamically.

### 🆘 **Emergency Preparedness Checklist**
- Covers **shelter, food, finances, transportation, and personal security**.
- **Responsive UI** optimized for small phones (320px+), tablets, and desktops.
- **Touch-friendly controls** with large tap targets (44x44px minimum) for mobile usability.
- **Accessible design** with ARIA attributes, clear focus states, and screen reader support.
- Readiness level indicators from **Unprepared 🚨 to Ultimate Survivalist 🏆**.
- **LocalStorage integration** saves checklist states across sessions.
- **Export options**: Save as JSON or PDF for sharing or printing.

### **🛠️ Survival Tools**
Enhance your survival experience with built-in survival tools, including:  

- **Signal Mirror** – Flashes an SOS light pattern to simulate emergency signaling.
- **Compass** – Uses device orientation to provide a real-time directional heading.
- **Pedometer** – Tracks step count using motion sensors.
- **Morse Code Translator** – Converts text into Morse code and plays it via vibrations.
- **Level Tool** – Uses accelerometer data to determine balance and leveling.

### ✅ **Survival Guides Library**
- Organized by **categories** (e.g., Fire-Making, Shelter, Water Collection, Foraging, Tactical, etc.).
- Each guide includes **step-by-step instructions, required materials, and tips**.
- **Readiness meters** track completion levels for individual guides and overall preparedness.
- **Markdown rendering** converts guides into a structured HTML format.

### 🔄 **LocalStorage Integration**
- **Saves key user progress** (guides, checklist, training progress) across sessions.
- Uses **individual keys** for optimized storage (`emergencyCategories`, `trainingProgress`, `libraryGuides`, etc.).
- Ensures efficient data retrieval and updates without unnecessary UI re-rendering.

---

## ⚡ **Getting Started**
### **1️⃣ Install & Run Locally**
```sh
# Clone the repository
git clone https://github.com/michaelsboost/Beacon.git
cd Beacon

# Open index.html in a browser
```

### **2️⃣ Dependencies**
- Alpine.js (lightweight reactive framework)
- TailwindCSS (for UI styling)
- Marked.js (for Markdown rendering)
- jsPDF: For exporting emergency plans as PDFs
- Service Worker: For PWA offline caching.

### **3️⃣ Contributing**
Since the project is now community-driven:
- Fork the repo
- Create a feature branch (`feature-new-skill-system`)
- Submit a pull request 🎉
- Community members may review, merge, or modify updates as needed.

---

## 📜 **License**
This project is licensed under the **MIT License**. You are free to use, modify, and distribute it.

**Originally Developed by:** [Michael Schwartz](https://michaelsboost.com/)  
**Maintained by:** The Community (as of August 1st, 2025)

## **☕ Support the Developer**
If Beacon was helpful for you, consider showing your appreciation in the following ways:

- 🎨 Check out my Graphic Design Course: https://michaelsboost.com/graphicdesign  
- 🛒 Register as a customer on my store: https://michaelsboost.com/store  
- ☕ Buy me a coffee: http://ko-fi.com/michaelsboost  
- 👕 Purchase a T-Shirt: https://michaelsboost.com/gear  
- 🖼️ Buy my art prints: https://deviantart.com/michaelsboost/prints 
- 💰 Donate via PayPal: https://michaelsboost.com/donate 
- 💵 Donate via Cash App: https://cash.me/$michaelsboost  

Your support is greatly appreciated and helps fund future projects! 🚀