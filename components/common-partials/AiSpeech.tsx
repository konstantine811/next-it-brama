import { useRef, useState } from "react";

export default function AISpeech() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const getChatGPTAnswer = async (msg: string) => {
    const res = await fetch("/api/chat-gpt-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: msg,
          },
        ],
      }),
    });
    return res.json();
  };

  const getTextLang = async (msg: string) => {
    const res = await fetch("/api/get-lang-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: msg,
      }),
    });
    return res.json();
  };

  const getTextToSpeech = async (msg: string, lang: string) => {
    const res = await fetch("/api/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: msg,
        lang,
      }),
    });
    return res.json();
  };

  const handleSubmit = async (event: any) => {
    setAudioUrl("");
    event.preventDefault();
    const answer = await getChatGPTAnswer(text);
    const langText = await getTextLang(text);
    const langCurrent = langText.find((i: any) => i.isReliable)?.language;
    console.log(answer);
    const answerText = answer.data.choices[0].message.content;
    const audioPath = await getTextToSpeech(answerText, langCurrent);
    if (audioPath.path) {
      setAudioUrl(`/${audioPath.path}`);
      console.log("set path");
      setTimeout(() => {
        console.log(audioRef.current);
        audioRef?.current?.play();
      }, 300);
    }
    // setAudioUrl(objectUrl);
    // Release resource when it's loaded
    /* audio.onload = function(evt) {
      URL.revokeObjectURL(objectUrl);
    };
    audio.play(); */

    setIsLoading(false);
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          Сгенерировать аудио на Narakeet
        </button>
      </form>
      {audioUrl && (
        <audio ref={audioRef} controls>
          <source src={audioUrl} type="audio/ogg" />
        </audio>
      )}
    </>
  );
}
