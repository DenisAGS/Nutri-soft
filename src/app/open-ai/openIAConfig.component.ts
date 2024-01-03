import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OpenAIConfig{

  public apiKey = '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';
  private apiUrl = 'https://api.openai.com/v1/';

  constructor(private http: HttpClient) { }

  // Función para hacer una solicitud de ejemplo a la API de OpenAI
  getSomeData(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}example-endpoint`, { headers: headers });
  }

}
