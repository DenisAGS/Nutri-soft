import { DOCUMENT } from '@angular/common';
import { Component, Input, Renderer2, Inject  } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-publicacion-modal',
  templateUrl: './publicacion-modal.component.html',
  styleUrls: ['./publicacion-modal.component.css'],
  providers: [DatePipe]
})
export class PublicacionModalComponent {
  tipText: string = '';
  selectedFile: File | null = null;
  @Input() nombreDeUsuario: string = 'Denise'; // Recibe el nombre de usuario desde el componente principal
  previewImage: string | ArrayBuffer | null = null;
  modalAbierta: boolean = false;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal,  private datePipe: DatePipe,   @Inject(DOCUMENT) private document: Document,
  private renderer: Renderer2) {}

  getCurrentDate(): string {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'dd/MM/yyyy');
    return formattedDate || '';
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files ? event.target.files[0] : null;
  
    if (this.selectedFile) {
      this.getBase64(this.selectedFile);
    }
  }
  
  getBase64(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.previewImage = reader.result;
    };
  }

  abrirModal(): void {
    if (!this.modalAbierta) {
      const modalRef = this.modalService.open(PublicacionModalComponent);
      modalRef.componentInstance.nombreDeUsuario = this.nombreDeUsuario;
      this.modalAbierta = true;
    }
  }

  onDragStarted(): void {
    console.log('Drag started');
  }

  onDragReleased(): void {
    console.log('Drag released');

  }

  /* Para cerrar la ventana cuando el cursor se encuentre fuera del modal */
  ngOnInit() {
    this.addMouseLeaveListener();
  }

  addMouseLeaveListener() {
    this.renderer.listen('document', 'mouseleave', (event) => {
      const isOutside = !this.isMouseInsideModal(event);
      if (isOutside) {
        this.activeModal.close();
      }
    });
  }

  isMouseInsideModal(event: MouseEvent): boolean | null {
    const modalElement = this.document.querySelector('.modal-content');
    return modalElement ? modalElement.contains(event.target as Node) : null;
  }

  /** Logica para publicar */
  publicar(): void {
    console.log('Publicando...');
    console.log('Texto:', this.tipText);
    console.log('Imagen:', this.selectedFile);
    this.activeModal.close();
  }

  cancelar(): void {
    console.log('Cancelando...');
    this.activeModal.dismiss('Cancelado');
  }
}