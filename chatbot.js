// Sorren's predefined profile data
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
  
  // Initialize Brain.js neural network with simpler NeuralNetwork model
  const net = new brain.NeuralNetwork();
  
  // Minimal training data to reduce load time
  const trainingData = [
    { input: "Tell me about your skills", output: "I am skilled in JavaScript, React, and CSS." },
    { input: "What was your first project?", output: "My first project was a to-do app." },
    { input: "How are you?", output: "I'm just a bunch of code, but thanks for asking!" }
  ];
  
  // Train the network and enable chat interface when complete
  net.train(trainingData, { log: true, iterations: 200, learningRate: 0.3 }, () => {
    document.getElementById("loading").style.display = "none"; // Hide loading message
    document.getElementById("chat-input").disabled = false; // Enable input field
    document.querySelector("button").disabled = false; // Enable send button
  });
  
  // Process input and generate a response using both predefined data and Brain.js
  function processInput(input) {
    // Check for any matches in Sorren's predefined memories or skills
    const memory = sorrenProfile.memories.find(mem => input.includes(mem.topic));
    if (memory) return memory.content;
  
    const skill = sorrenProfile.skills.find(skill => input.includes(skill.toLowerCase()));
    if (skill) return `Yes, I'm skilled in ${skill}.`;
  
    // If no matches, generate a response using Brain.js
    return net.run(input) || "I'm not sure about that, but tell me more!";
  }
  
  // Generate Sorren's response and adapt it with tone and humor
  function generateResponse(input) {
    let response;
  
    // First, attempt to get a response from Sorren's predefined data
    response = processInput(input);
  
    // If no predefined response is found, use Brain.js to generate a response
    if (!response) {
      const brainResponse = net.run(input);
  
      // Check if Brain.js returned a valid string; otherwise, use a fallback response
      if (typeof brainResponse === "string") {
        response = brainResponse;
      } else {
        response = "I'm not sure about that, but tell me more!";
      }
    }
  
    // Adapt response based on Sorren's personality
    if (sorrenProfile.personality.tone === "friendly") {
      response = "Hey there! " + response;
    }
    if (sorrenProfile.personality.humor === "sarcastic") {
      response += " (Just kidding...or am I?)";
    }
  
    return response;
  }
  
  
  // Handle user message input and display Sorren's response
  function handleUserMessage() {
    const input = document.getElementById("chat-input").value;
    const response = generateResponse(input);
  
    // Display user and Sorren's messages in chat
    const display = document.getElementById("chat-display");
    display.innerHTML += `<p><b>You:</b> ${input}</p><p><b>Sorren:</b> ${response}</p>`;
    document.getElementById("chat-input").value = ""; // Clear input field
  }
  