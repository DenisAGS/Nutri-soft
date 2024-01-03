import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.css']
})
export class ModalPerfilComponent {
  @Output() viewProfile = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  onViewProfile(): void {
    this.viewProfile.emit();
  }

  onLogout(): void {
    this.logout.emit();
  }
}
