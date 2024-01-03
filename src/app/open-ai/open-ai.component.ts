import { Component } from '@angular/core';
import OpenAI from 'openai';
import { OpenAIConfig } from './openIAConfig.component';

@Component({
  selector: 'app-open-ai',
  templateUrl: './open-ai.component.html',
  styleUrls: ['./open-ai.component.css']
})
export class OpenAIComponent {
  openia: any;

  constructor(private openAIConfig: OpenAIConfig) {
    this.openia = new OpenAI({ apiKey: this.openAIConfig.apiKey });
  }

  ngOnInit() {
   
  }  

  async chat() {
    try {
      const completion = await this.openia.chat.create({
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Tell me about nutrition.' } // Pregunta sobre nutrición
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 100
      });

      // Filtrar las respuestas relacionadas con la nutrición
      const nutritionResponses = completion.data.filter((response: any) =>
        response.role === 'assistant' && response.text.toLowerCase().includes('nutrition')
      );

      // Mostrar las respuestas relacionadas con nutrición en la consola
      console.log(nutritionResponses);

      // Haz algo con las respuestas relacionadas con nutrición, como mostrarlas en la interfaz de usuario
    } catch (error) {
      console.error('Error:', error);
    }
  }  
}

