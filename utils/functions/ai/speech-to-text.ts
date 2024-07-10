export const speechToText = async (response: string) => {
  const apiKey = "c00d0b14197b0178707010c24474b6e2";
  const voiceId = "21m00Tcm4TlvDq8ikWAM";
  const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  const requestBody = {
    text: response,
    model_id: "eleven_monolingual_v1",
    voice_settings: {
      stability: 1,
      similarity_boost: 1,
      style: 1,
      use_speaker_boost: true,
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
        Accept: "audio/mpeg", // Specify that we want audio data
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the audio data as an ArrayBuffer
    const audioData = await response.arrayBuffer();

    // Convert ArrayBuffer to Base64
    const base64Audio = btoa(
      new Uint8Array(audioData).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );

    console.log("Audio data received and converted to Base64");

    return {
      audioBase64: base64Audio,
      contentType: response.headers.get("Content-Type") || "audio/mpeg",
    };
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};
