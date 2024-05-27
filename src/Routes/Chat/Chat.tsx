import React, { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import OpenAI from "openai";
import { RiOpenaiFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { Status } from "../../Types/Status";
import StatusInfo from "../../Components/StatusInfo";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import {
  getAllData,
  selectData,
  selectDataLoadStatus,
} from "../../store/slices/Main";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

type Response = {
  message: string;
  response: string | null;
  dateTime: Date;
};

function Chat() {
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  const data = useSelector(selectData);
  const dataStatus = useSelector(selectDataLoadStatus);

  const [message, setMessage] = React.useState("");
  const [responses, setResponses] = React.useState([] as Response[]);
  const [status, setStatus] = React.useState("idle" as Status);

  async function sendRequest() {
    setStatus("loading");
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: JSON.stringify(data) },
        { role: "user", content: message },
      ],
      model: "gpt-3.5-turbo",
    });

    setResponses([
      ...responses,
      {
        message,
        response: completion.choices[0].message.content,
        dateTime: new Date(),
      },
    ]);

    setStatus("idle");
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    if (dataStatus !== "succeeded") return;
    sendRequest();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses]); 

  return (
    <motion.div
      className="w-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StatusInfo status={status} error={null} />
      <div className="relative w-full h-[90vh] p-5 flex flex-col itmes-center justify-center rounded-lg">
        <div className="w-full flex flex-col items-center justify-center text-center my-5 space-x-2">
          <div className="w-full flex items-center justify-center">
            <h2 className="text-4xl font-semibold text-center">
              Chat with ChatGPT
            </h2>
            <RiOpenaiFill className="text-4xl" />
          </div>
          <p className="text-neutral-600 text-lg">
            There is a limit for how many messages can be sent per minute.
            Please keep that in mind.
          </p>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center overflow-y-scroll space-y-10 overflow-x-hidden py-5">
          {responses.map((res, index) => (
            <div
              key={index}
              className="w-full flex flex-col space-y-2 items-center"
            >
              <span className="text-neutral-600 text-xs text-center">
                {res.dateTime.toLocaleString()}
              </span>
              <div className="flex w-full justify-end">
                <div className="p-2 rounded-lg bg-neutral-100 shadow-lg mr-5 max-w-[80%]">
                  <span className="font-semibold">{res.message}</span>
                </div>
              </div>
              <div className="flex w-full justify-start ml-5">
                <div className="p-2 rounded-lg bg-neutral-100 shadow-lg max-w-[80%]">
                  <span>{res.response}</span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          className="h-fit w-full flex items-center justify-center space-x-2 rounded-2xl my-20"
          onSubmit={submitForm}
        >
          <motion.input
            initial={{ width: "0%" }}
            animate={{ width: "50%" }}
            whileHover={{ shadow: "md" }}
            whileFocus={{ width: "100%" }}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-3/4 bg-neutral-200 rounded-lg p-2 shadow-md border-2"
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
