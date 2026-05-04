import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import aiImage from "../../public/Ai.png";
import { useNavigate } from "react-router-dom";

const WAKE_WORD = "ankur";

const Ai = () => {
  const navigate = useNavigate();

  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const voicesRef = useRef([]);

  const [isListening, setIsListening] = useState(false);

  // sync state
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  // 🔥 Load voices properly
  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // 🎤 Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      let transcript =
        e.results[e.results.length - 1][0].transcript.toLowerCase().trim();

      console.log("🎤 Heard:", transcript);

      // clean punctuation
      transcript = transcript.replace(/[.,!?]/g, "").trim();

      if (transcript.startsWith(WAKE_WORD)) {
        const command = transcript.replace(WAKE_WORD, "").trim();
        handleCommand(command);
      } else if (transcript.includes(WAKE_WORD)) {
        const parts = transcript.split(WAKE_WORD);
        const command = parts[1]?.trim();
        handleCommand(command);
      }
    };

    recognition.onerror = (e) => {
      console.log("❌ Error:", e.error);
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        try {
          recognition.start();
        } catch {}
      }
    };

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, []);

  // 🔊 SPEAK FUNCTION (Indian Voice Fix)
  const speak = (text) => {
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);

    const voices = voicesRef.current;

    // 🎯 pick best Indian voice
    let voice =
      voices.find((v) => v.lang === "en-IN") ||
      voices.find((v) => v.lang === "hi-IN") ||
      voices.find((v) => v.lang.includes("en"));

    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang;
    } else {
      utter.lang = "en-IN";
    }

    // better clarity
    utter.rate = 0.9;
    utter.pitch = 1;

    utter.onstart = () => {
      recognitionRef.current?.stop();
    };

    utter.onend = () => {
      if (isListeningRef.current) {
        try {
          recognitionRef.current?.start();
        } catch {}
      }
    };

    window.speechSynthesis.speak(utter);
  };

  // 🌱 COMMAND HANDLER
  const handleCommand = (cmd) => {
    if (!cmd) {
      speak("Haan bolo, kaise madad karoon");
      return;
    }

    console.log("🧠 Command:", cmd);

    // HOME
    if (
      cmd.includes("home") ||
      cmd.includes("go home") ||
      cmd.includes("home page")
    ) {
      speak("Opening home");
      navigate("/");
    }

    // FERTILIZER
    else if (
      cmd.includes("fertilizer") ||
      cmd.includes("fertiliser") ||
      cmd.includes("khad")
    ) {
      speak("Fertilizer information khol raha hoon");
      navigate("/fertilizers");
    }

    // CROP DOCTOR
    else if (
      cmd.includes("crop doctor") ||
      cmd.includes("doctor") ||
      cmd.includes("disease") ||
      cmd.includes("plant problem")
    ) {
      speak("Crop doctor open kar raha hoon");
      navigate("/crop-doctor");
    }

    // SCHEDULER
    else if (
      cmd.includes("schedule") ||
      cmd.includes("scheduler") ||
      cmd.includes("planning")
    ) {
      speak("Crop scheduler open kar raha hoon");
      navigate("/crop-scheduler");
    }

    // BAZAAR
    else if (
      cmd.includes("bazaar") ||
      cmd.includes("market") ||
      cmd.includes("buy") ||
      cmd.includes("sell")
    ) {
      speak("Agri bazaar open kar raha hoon");
      navigate("/agri-bazaar");
    }

    // SCHEMES
    else if (
      cmd.includes("scheme") ||
      cmd.includes("yojana") ||
      cmd.includes("government")
    ) {
      speak("Government schemes dikha raha hoon");
      navigate("/schemes");
    }

    else {
      speak("Samajh nahi aaya, dobara boliye");
    }
  };

  // 🎤 TOGGLE
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (!isListeningRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        toast.success(`Listening... say "${WAKE_WORD}"`);
      } catch {}
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
      toast("Stopped listening");
    }
  };

  return (
    <div
      onClick={toggleListening}
      className="fixed bottom-6 left-4 z-50 cursor-pointer"
    >
      <img
        src={aiImage}
        alt="AI Assistant"
        className={`w-16 h-16 transition ${
          isListening ? "animate-pulse scale-110" : ""
        }`}
      />
    </div>
  );
};

export default Ai;