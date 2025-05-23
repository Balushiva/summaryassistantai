import OpenAI from 'openai';
import axios from 'axios';
import Todo from '../models/Todo.js';
import logger from '../utils/logger.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const summarizeTodos = async () => {
  try {
    const todos = await Todo.find({ completed: false });
    
    if (todos.length === 0) {
      throw new Error('No pending todos to summarize');
    }

    const todoText = todos.map(t => `- ${t.title}: ${t.description || 'No description'}`).join('\n');
    
    const prompt = `Summarize these pending tasks in a concise professional paragraph, 
                  highlighting priorities and deadlines if mentioned:\n\n${todoText}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const summary = completion.choices[0].message.content;

    // Send to Slack
    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `*Task Summary*\n${summary}\n\n*Pending Items*\n${todoText}`
    });

    return { summary, count: todos.length };
  } catch (error) {
    logger.error(`OpenAI Service Error: ${error.message}`);
    throw error;
  }
};