/* eslint-disable @typescript-eslint/no-require-imports */
"use client";
import { useEffect, useState } from "react";
import React from "react";

export default function Test() {
    const [res, setRes] = useState("");
    const [prompt, setPrompt] = useState("");

    const { GoogleGenerativeAI } = require("@google/generative-ai");

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_AI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    useEffect(() => {
        const getResponse = async () => {
            try {
                const result = await model.generateContent(prompt);
                console.log(result.response.text())
                setRes(result.response.text());
            } catch (error) {
                console.log("THERES A FUCKING ERROR: ", error);
            }
        };

        getResponse();
    }, [model, prompt])

    return(<>
        <input style={{ border: '2px solid black'}} onChange={(e) => setPrompt("Explain what recipes we can make with " +  e.target.value + "and can output the recipes in the format food (not in a list): {instructions in numbered list form}")} placeholder="PUT SUM SHIT HERE"></input>
        <div style={{width: '100vw', height: '100vh', border: '2px solid green'}}>{res}</div>
    </>)
}