import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ResponceModel } from '../../models/responce.model';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.scss'
})
export class ChatboxComponent {
  private userService = inject(UserService);
  chats: String[] = [];
  isHidden: boolean = true;

  chatForm = new FormGroup({
    chatQuery: new FormControl(''),
  });

  Visibility() {
    this.isHidden = !this.isHidden;
  }

  handleChat() {
    this.chats.push("User: " + this.chatForm.value.chatQuery);
    this.userService.askGemini(this.chatForm.value.chatQuery??"").subscribe({
      next: (response: ResponceModel) => {
        console.log('✅ Success (200):', response);
        this.chats.push("Gemini: " + response.gemini_response);
      },
      error: (error) => {
        console.error('❌ Error:', error);
        this.chats.push("Gemini: Unexpected error occurred.");

        if (error.status === 400) {
          console.warn('Bad Request (400):', error.error);
          alert(error.error.message)
        } else if (error.status === 404) {
          console.warn('Not Found (404):', error.message);
          alert(error.error.message)
        }
      },
    });
    this.chatForm.controls.chatQuery.setValue('');
  }
}
