import { Component } from '@angular/core';
import { OpenAIConfig } from '../open-ai/openIAConfig.component';
import OpenAI from 'openai';
import { Completions } from 'openai/resources';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  mensajes: { text: string; isUser: boolean }[] = [];
  openia: any;
  nutritionResponses: any;
  respuesta: any;
  prompt =`Sólo responderás a preguntas relacionadas con nutrición del usuario. Si la pregunta es sobre otro tema, deberás responder que no puedes proporcionar información sobre temas no relacionados con nutrición.

  Ejemplo:
  Usuario: '¿Cómo puedo bajar de peso?'
  Asistente: 'Debes comer menos calorías de las que gastas.'
  
  Usuario: '¿Cómo puedo bajar de peso?'
  Asistente: 'No puedo responder a eso.'
  
  Usuario: '¿Qué es la programación?'
  Asistente: 'Solo puedo responder a temas relacionados con tu nutrición.'`;

  constructor(private openAIConfig: OpenAIConfig) {
    this.openia = new OpenAI({ apiKey: this.openAIConfig.apiKey, dangerouslyAllowBrowser:true });
  }

  enviarMensaje(event: any): void {
    const userMessage = event.target.value;
    if (!userMessage.trim()) {
      return;
    }

    const userMessageText = { text: userMessage, isUser: true };
    this.mensajes.push(userMessageText);

    this.openia.chat.completions.create({
      messages: [
        { role: 'user', content: userMessage }
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 100
    }).then((completion: any) => {
      if (completion && completion.choices && Array.isArray(completion.choices)) {
        this.nutritionResponses = completion.choices.find((choices: any) =>
          choices.message.role === 'assistant');

        console.log(this.nutritionResponses);
        console.log(completion);

        if(this.nutritionResponses){
          this.mensajes.push({ text: this.nutritionResponses.message.content, isUser: false });
        }else{
          console.log("no se encontro respuesta del asistente");
        }
      } else {
        console.log(completion);
        // Manejar el caso en el que completion.data no tiene la estructura esperada
      }
    }).catch((error: any) => {
      console.error('Error:', error);
      console.log(this.openAIConfig.apiKey);
      this.mensajes.push({ text: 'Por el momento no puedo responder a eso.', isUser: false });
    });

    event.target.value = '';
  }
}
