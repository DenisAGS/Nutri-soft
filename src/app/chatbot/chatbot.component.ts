import { Component } from '@angular/core';
import { OpenAIConfig } from '../open-ai/openIAConfig.component';
import OpenAI from 'openai';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  mensajes: { text: string; isUser: boolean }[] = [];
  openia: any;

  constructor(private openAIConfig: OpenAIConfig) {
    this.openia = new OpenAI({ apiKey: this.openAIConfig.apiKey });
  }

  enviarMensaje(event: any): void {
    const userMessage = event.target.value;
    if (!userMessage.trim()) {
      return;
    }

    const userMessageText = { text: userMessage, isUser: true };
    this.mensajes.push(userMessageText);

    this.openia.chat.create({
      messages: [
        { role: 'user', content: userMessage }
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 100
    }).then((completion: any) => {
      const nutritionResponses = completion.data.filter((response: any) =>
        response.role === 'assistant' && response.text.toLowerCase().includes('nutrition')
      );

      console.log(nutritionResponses);

      nutritionResponses.forEach((response: any) => {
        this.mensajes.push({ text: response.text, isUser: false });
      });
    }).catch((error: any) => {
      console.error('Error:', error);
      this.mensajes.push({ text: 'Por el momento no puedo responder a eso.', isUser: false });
    });

    event.target.value = '';
  }
}
