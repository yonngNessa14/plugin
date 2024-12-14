"use client";

import { useEffect, useState, useRef } from "react";
import { meet } from "@googleworkspace/meet-addons/meet.addons";
import { CLOUD_PROJECT_NUMBER } from "./constants";
import { translate } from "google-translate-api-x";

export default function App() {
  // const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient>();

  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const interimTranscriptRef = useRef("");

  const startListening = async () => {
    if (!recognitionRef.current) {
      // @ts-expect-error here
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech Recognition API is not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.continuous = true; // Enable continuous listening
      recognitionRef.current = recognition;

      recognition.onstart = () => {
        console.log("Speech recognition started");
        setIsListening(true);
      };
      // @ts-expect-error here
      recognition.onresult = async (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " ";
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        // Append final transcript to the main text
        setText((prev) => prev + finalTranscript);
        console.log({ finalTranscript });

        try {
          // @ts-expect-error here
          const res = await translate("I speak french", { to: "fr", client: "gtx" });
          console.log({ res });
        } catch (error) {
          console.log({ error });
        }

        // Store the interim transcript temporarily for display
        interimTranscriptRef.current = interimTranscript;
      };
      // @ts-expect-error here
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
        if (isListening) {
          console.log("Speech recognition restarted due to silence");
          recognition.start(); // Restart listening
        }
      };
    }
    // @ts-expect-error here
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      // @ts-expect-error here
      recognitionRef.current.stop();
      recognitionRef.current = null; // Clear the recognition instance
      setIsListening(false);
    }
  };

  // Launches the main stage when the main button is clicked.
  // async function startActivity() {
  //   if (!sidePanelClient) {
  //     throw new Error("Side Panel is not yet initialized!");
  //   }
  //   await sidePanelClient.startActivity({
  //     mainStageUrl: "MAIN_STAGE_URL",
  //   });
  // }

  /**
   * Prepares the Add-on Side Panel Client.
   */
  useEffect(() => {
    (async () => {
      try {
        const session = await meet.addon.createAddonSession({
          cloudProjectNumber: CLOUD_PROJECT_NUMBER,
        });
        console.log({ session });

        // setSidePanelClient(await session.createSidePanelClient());
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  return (
    <>
      <h1>Continuous Speech to Text</h1>
      <button onClick={startListening} disabled={isListening}>
        {isListening ? "Listening..." : "Start Listening"}
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop Listening
      </button>
      <p>Recognized Text:</p>
      <div style={{ border: "1px solid #ccc", padding: "10px", minHeight: "100px" }}>
        {text + interimTranscriptRef.current} {/* Display both final and interim transcripts */}
      </div>
    </>
  );
}
