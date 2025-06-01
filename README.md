# Agroww 🌱

**Agroww** is a cutting-edge **farming investment platform** designed to bridge the gap between investors and agriculture. It enables users to invest in agricultural farms based on **shares**, and earn profits once the produce is sold. This model empowers both farmers and investors — bringing transparency, opportunity, and sustainability to the agri-investment ecosystem.

---

## 🚀 Features

- 📊 **Investment by Shares**: Investors can invest in farms by purchasing shares, each representing a portion of the farm's production.
- 💰 **Profit Distribution**: Once the produce is sold, profits are calculated and distributed based on shareholding.
- 🌾 **Farm Management**: Real-time data on farm activities, investments, and expected returns.
- 🧾 **Transaction History**: View past investments and profit summaries.
- 🔐 **Secure Authentication**: Investor access is secured and authenticated.

---
## 🌐 Live Website

🔗 [https://agroww.vercel.app](https://agroww.vercel.app)

Visit the deployed frontend of Agroww to explore the platform and test its features in real time.


## 🛠️ Tech Stack

### 🔧 Backend
- **Spring Boot**: Fast, production-ready RESTful API development.
- **Docker**: Containerized deployment for scalability and environment consistency.

### 🗄️ Database
- **H2 Database**: Lightweight and in-memory DB for development and testing.

### 🌐 Frontend
- **React.js**: Dynamic and responsive UI for investor and admin interfaces.

---

## 📦 Installation

### Prerequisites
- Docker
- Java 17+
- Node.js and npm

### Clone the Repository
\`\`\`bash
git clone https://github.com/your-username/agroww.git
cd agroww
\`\`\`

### Backend Setup
\`\`\`bash
cd backend
./mvnw clean install
docker build -t agroww-backend .
docker run -p 8080:8080 agroww-backend
\`\`\`

### Frontend Setup
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

---

## 📡 API Documentation

Access the live API documentation using Swagger UI here:

🔗 [https://agroww.onrender.com/swagger-ui/index.html](https://agroww.onrender.com/swagger-ui/index.html)

This provides a complete reference for all backend endpoints — including authentication, investment, farm management, and more.

---

## 🚀 Deployment

The application is containerized and ready for deployment using Docker.

- 🐳 **Docker Image**: Available at  
  🔗 [https://hub.docker.com/repository/docker/harry8080/farmer-deployment](https://hub.docker.com/repository/docker/harry8080/farmer-deployment)

To pull and run the image:

\`\`\`bash
docker pull harry8080/farmer-deployment
docker run -p 8080:8080 harry8080/farmer-deployment
\`\`\`

You can integrate this with a frontend app or access the backend directly via REST endpoints.

---

 ## 🎥 Demo Video

>

[![Watch Video Demonstration by Clicking Here]](https://drive.google.com/file/d/1q2I5uVieTsvrfHbZQ_UgT8acLMvvxXT6/view?usp=sharing)


---

## 📌 Project Structure

\`\`\`
agroww/
│
├── backend/              # Spring Boot application
│   ├── src/
│   └── Dockerfile
│
├── frontend/             # React app
│   ├── src/
│   └── public/
│
└── README.md
\`\`\`

---

## 🤝 Contributing

We welcome contributions! Please fork the repo and submit a pull request.

1. Fork the project  
2. Create your feature branch (\`git checkout -b feature/FarmStats\`)  
3. Commit your changes (\`git commit -m 'Add new farm statistics section'\`)  
4. Push to the branch (\`git push origin feature/FarmStats\`)  
5. Open a Pull Request

---

## 📃 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

Have questions or feedback?

- Project Maintainer: [Madem Venkata Aditya Prakash](mailto:mademaditya@gmail.com), Hardik Sahu, Manas Chaturvedi
- GitHub: [github.com/Diordi1](https://github.com/Diordi1)

---

> *Agroww — Growing agriculture through collective investment.*
