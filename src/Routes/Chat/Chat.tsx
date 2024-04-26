import React from "react";
import { Button } from "@mui/material";
import OpenAI from "openai";
import { RiOpenaiFill } from "react-icons/ri";
import { motion } from "framer-motion";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

type Response = {
  message: string;
  response: string;
  dateTime: Date;
};

function Chat() {
  const [message, setMessage] = React.useState("");
  const [responses, setResponses] = React.useState([
    { message: "Hello", response: "Hi there!", dateTime: new Date() },
    {
      message: "How are you?",
      response: "I'm doing great, thanks!",
      dateTime: new Date(),
    },
    {
      message: "What's the weather like today?",
      response: "It's sunny and warm!",
      dateTime: new Date(),
    },
    {
      message: "Tell me a joke",
      response:
        "Why don't scientists trust atoms? Because they make up everything!",
      dateTime: new Date(),
    },
    {
      message: "Tell me a joke",
      response:
        "Why don't scientists trust atoms? Because they make up everything!",
      dateTime: new Date(),
    },
    {
      message: "Tell me a joke",
      response:
        "Why don't scientists trust atoms? Because they make up everything!",
      dateTime: new Date(),
    },
  ] as Response[]);

  async function sendRequest() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: message }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
    // setResponses([
    //   ...responses,
    //   { message, response: completion.choices[0] },
    // ]);
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    sendRequest();
  };

  return (
    <motion.div
      className="w-full h-[90vh] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full h-[70vh] bg-neutral-700 p-5 flex flex-col itmes-center justify-center rounded-lg">
        <div className="w-full flex flex-col items-center justify-center text-center my-5 space-x-2">
          <div className="w-full flex items-center justify-center">
            <h2 className="text-white text-4xl font-semibold text-center">
              Chat with ChatGPT
            </h2>
            <RiOpenaiFill className="text-white text-4xl" />
          </div>
          <p className="text-neutral-200 text-lg">
            There is a limit for how many messages can be sent per minute.
            Please keep that in mind.
          </p>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center overflow-y-scroll space-y-2">
          {responses.map((res, index) => (
            <div key={index} className="w-full">
              <span className="text-neutral-200 text-xs">
                {res.dateTime.toLocaleString()}
              </span>
              <div className={`w-full p-2 rounded-lg bg-neutral-800`}>
                <p className="text-white font-semibold">
                  <span className="underline text-green-200">Prompt</span>:{" "}
                  {res.message}
                </p>
                <p className="text-white">{res.response}</p>
              </div>
            </div>
          ))}
        </div>
        <form
          className="h-fit w-full flex items-center justify-center space-x-2 px-3 py-5 rounded-2xl bg-neutral-800"
          onSubmit={submitForm}
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-3/4 bg-neutral-100 rounded-lg p-2"
            placeholder="Type a message..."
            maxLength={1500}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="w-1/4 h-full"
            style={{ backgroundColor: "#00A67E" }}
          >
            Send
          </Button>
        </form>
      </div>
    </motion.div>
  );
}

export default Chat;
