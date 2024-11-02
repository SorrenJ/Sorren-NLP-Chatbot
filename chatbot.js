// Sorren's predefined profile
const sorrenProfile = {
    name: "Sorren",
    personality: {
      tone: "friendly",
      humor: "sarcastic",
      interests: ["coding", "music", "gaming"]
    },
    skills: ["JavaScript", "HTML", "CSS", "React"],
    memories: [
      { topic: "first project", content: "My first project was a to-do app." },
      { topic: "recent achievement", content: "Completed the Lighthouse Labs program." }
    ]
  };
  
  // Initialize chat history in LocalStorage if not already present
  if (!localStorage.getItem("chatHistory")) {
    localStorage.setItem("chatHistory", JSON.stringify([]));
  }
  
  // Save chat history to LocalStorage
  function saveChat(userMessage, botResponse) {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory"));
    chatHistory.push({ user: userMessage, sorren: botResponse });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }
  
  // Retrieve chat history from LocalStorage
  function getChatHistory() {
    return JSON.parse(localStorage.getItem("chatHistory"));
  }
  
  // Process user input and match it to Sorren's predefined data
  function processInput(input) {
    // Check if input matches any of Sorren's memories
    const memory = sorrenProfile.memories.find(mem => input.includes(mem.topic));
    if (memory) return memory.content;
  
    // Check if input matches any of Sorren's skills
    const skill = sorrenProfile.skills.find(skill => input.includes(skill.toLowerCase()));
    if (skill) return `Yes, I'm skilled in ${skill}.`;
  
    // Default response if input doesn't match predefined data
    return "I'm not sure about that, but tell me more!";
  }
  
  // Generate Sorren's response based on profile and chat history
  function generateResponse(input) {
    let response = processInput(input);
  
    // Search history for related topics to make conversation more dynamic
    const history = getChatHistory();
    history.forEach(chat => {
      if (input.includes(chat.user)) {
        response += ` I remember you mentioned "${chat.user}" before!`;
      }
    });
  
    // Adjust response based on Sorren's personality
    if (sorrenProfile.personality.tone === "friendly") {
      response = "Hey there! " + response;
    }
    if (sorrenProfile.personality.humor === "sarcastic") {
      response += " (Just kidding...or am I?)";
    }
  
    saveChat(input, response); // Save chat for future reference
    return response;
  }
  
  // Teach Sorren new memories based on repeated topics in chat
  function learnNewMemory(input) {
    const existingMemory = sorrenProfile.memories.find(mem => input.includes(mem.topic));
    
    if (!existingMemory) {
      const newMemory = { topic: input.slice(0, 10), content: `You told me about "${input}"!` };
      sorrenProfile.memories.push(newMemory);
    }
  }
  
  // Handle user message input and display Sorren's response
  function handleUserMessage() {
    const input = document.getElementById("chat-input").value;
    const response = generateResponse(input);
    
    learnNewMemory(input); // Teach Sorren new topics
  
    // Display user and Sorren's messages in chat
    const display = document.getElementById("chat-display");
    display.innerHTML += `<p><b>You:</b> ${input}</p><p><b>Sorren:</b> ${response}</p>`;
    document.getElementById("chat-input").value = ""; // Clear input field
  }
  