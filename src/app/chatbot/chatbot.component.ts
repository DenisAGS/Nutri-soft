import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  mensajes: { text: string; isUser: boolean }[] = [];
  responseMap: { pregunta: string; respuesta: string }[] = [
    { pregunta: 'Hola', respuesta: '¡Hola! ¿En qué puedo ayudarte?' },
    { pregunta: '¿Cómo estás?', respuesta: 'Estoy bien, gracias. ¿Y tú?' },
    { pregunta: 'ILY', respuesta: 'ILY <3' },
  ];

  enviarMensaje(event: any): void {
    const userMessage = event.target.value;
    if (!userMessage.trim()) {
      return;
    }
  
    const userMessageText = { text: userMessage, isUser: true };
    this.mensajes.push(userMessageText);

    const matchedResponse = this.responseMap.find(response =>
      userMessage.toLowerCase().includes(response.pregunta.toLowerCase())
    );
    
    setTimeout(() => {
      if (matchedResponse) {
        this.mensajes.push({ text: matchedResponse.respuesta, isUser: false });
      } else {
        this.mensajes.push({ text: 'Por el momento no puedo responder a eso.', isUser: false });
      }
    }, 1000); 
    event.target.value = '';
  }
}
