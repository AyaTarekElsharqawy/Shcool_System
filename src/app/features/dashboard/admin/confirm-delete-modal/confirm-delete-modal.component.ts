import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent {
  @Input() itemType: string = ''; 

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close(true); 
  }

  dismiss() {
    this.activeModal.dismiss(); 
  }
}
