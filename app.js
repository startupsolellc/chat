// Firebase Yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyA_t-Fet-OsxmMcpSM1y8dD--Lmr53kCQ4",
  authDomain: "startupsolechatboot.firebaseapp.com",
  projectId: "startupsolechatboot",
  storageBucket: "startupsolechatboot.firebasestorage.app",
  messagingSenderId: "297891513620",
  appId: "1:297891513620:web:4b30ec7c2f2ef563452e01",
  measurementId: "G-KJ1GSV3GGV"

};

// Firebase'i Başlat
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// HTML Elementleri
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Mesajı Sohbet Penceresine Ekle
function addMessageToChat(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.className = `p-2 my-1 rounded-lg shadow ${sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-gray-800 self-start"}`;
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Firestore'dan Veri Çek ve Yanıtla
async function getResponseFromFirestore(userMessage) {
    addMessageToChat("user", userMessage);
    const querySnapshot = await db.collection("blog_articles").get();
    
    let response = "Üzgünüm, bu konuda bir cevabım yok.";

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.content && data.content.toLowerCase().includes(userMessage.toLowerCase())) {
            response = data.content;
        }
    });

    addMessageToChat("bot", response);
}

// Gönder Butonu Tıklama Olayı
sendBtn.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message) {
        getResponseFromFirestore(message);
        userInput.value = "";
    }
});

// Enter Tuşu ile Mesaj Gönderme
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});
