// import { FormsModule } from '@angular/forms';
// import { CommonModule, NgClass } from '@angular/common';
// import { Component } from '@angular/core';
// import { ChatService } from '../../../../services/gemini.service';
// import { ExamService } from '../../../../services/exam.service';
// @Component({
//   selector: 'app-chat',
//   imports:[NgClass,FormsModule,CommonModule],
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
//   export class ChatComponent {
//     messages: { text: string, sender: string }[] = [];
//     userInput: string = '';
  
//     constructor(private chatService: ChatService, private examService: ExamService) { } // حقن ExamService
  
//     sendMessage() {
//       if (this.userInput.trim()) {
//         this.messages.push({ text: this.userInput, sender: 'user' });
  
//         if (this.userInput.toLowerCase().includes('امتحانات') || this.userInput.toLowerCase().includes('exams')) {
//           this.examService.getExams().subscribe(
//             (exams) => {
//               if (exams && exams.length > 0) {
//                 let examsList = "<ul>";
//                 exams.forEach(exam => {
//                   examsList += `<li>${exam.name} - ${exam.date}</li>`;
//                 });
//                 examsList += "</ul>";
//                 this.messages.push({ text: examsList, sender: "bot" });
//               } else {
//                 this.messages.push({ text: 'لا توجد امتحانات متاحة حاليًا.', sender: "bot" });
//               }
//             },
//             (error) => {
//               console.error('Error fetching exams:', error);
//               this.messages.push({ text: 'حدث خطأ في جلب الامتحانات.', sender: "bot" });
//             }
//           );
//         } else {
//           this.chatService.sendMessage(this.userInput).subscribe(
//             (response) => {
//               let botReply = '';
  
//               if (typeof response.reply === 'string') {
//                 botReply = response.reply;
//               } else if (response.reply && response.reply.parts && response.reply.parts.length > 0) {
//                 botReply = response.reply.parts[0].text;
//               } else if (response && response.reply && response.reply.response && response.reply.response.candidates && response.reply.response.candidates.length > 0) {
//                 botReply = response.reply.response.candidates[0].content;
//               }
  
//               if (botReply) {
//                 this.messages.push({ text: botReply, sender: 'bot' });
//               } else {
//                 this.messages.push({ text: 'لم يتم تلقي رد صحيح من البوت.', sender: 'bot' });
//                 console.error('API Response missing valid reply:', response);
//               }
//             },
//             (error) => {
//               console.error('Error sending message:', error);
//               this.messages.push({ text: 'حدث خطأ في الاتصال بالبوت.', sender: 'bot' });
//             }
//           );
//         }
//         this.userInput = '';
//       }
//     }
// }
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ChatService } from '../../../../services/gemini.service';
import { ExamService } from '../../../../services/exam.service';

@Component({
  selector: 'app-chat',
  imports: [NgClass, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: { text: string, sender: string }[] = [];
  userInput: string = '';
  loading: boolean = false; // إضافة خاصية للتحكم في علامة التحميل

  constructor(private chatService: ChatService, private examService: ExamService) { }

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, sender: 'user' });
      this.loading = true; // تعيين علامة التحميل إلى true

      if (this.userInput.toLowerCase().includes('امتحانات') || this.userInput.toLowerCase().includes('exams')) {
        this.examService.getExams().subscribe(
          (exams) => {
            this.loading = false; // تعيين علامة التحميل إلى false
            if (exams && exams.length > 0) {
              let examsList = "";
              exams.forEach(exam => {
                examsList += `<p><strong>${exam.name}</strong> - ${exam.date}</p>`;
              });
              this.messages.push({ text: examsList + ' ❤️', sender: "bot" });
            } else {
              this.messages.push({ text: 'لا توجد امتحانات متاحة حاليًا. ❤️', sender: "bot" });
            }
          },
          (error) => {
            this.loading = false; // تعيين علامة التحميل إلى false
            console.error('Error fetching exams:', error);
            this.messages.push({ text: 'حدث خطأ في جلب الامتحانات. ❤️', sender: "bot" });
          }
        );
      } else {
        this.chatService.sendMessage(this.userInput).subscribe(
          (response) => {
            this.loading = false; // تعيين علامة التحميل إلى false
            let botReply = '';

            if (typeof response.reply === 'string') {
              botReply = response.reply;
            } else if (response.reply && response.reply.parts && response.reply.parts.length > 0) {
              botReply = response.reply.parts[0].text;
            } else if (response && response.reply && response.reply.response && response.reply.response.candidates && response.reply.response.candidates.length > 0) {
              botReply = response.reply.response.candidates[0].content;
            }

            if (botReply) {
              this.messages.push({ text: botReply + ' ❤️', sender: 'bot' });
            } else {
              this.messages.push({ text: 'لم يتم تلقي رد صحيح من البوت. ❤️', sender: 'bot' });
              console.error('API Response missing valid reply:', response);
            }
          },
          (error) => {
            this.loading = false; // تعيين علامة التحميل إلى false
            console.error('Error sending message:', error);
            this.messages.push({ text: 'حدث خطأ في الاتصال بالبوت. ❤️', sender: "bot" });
          }
        );
      }
      this.userInput = '';
    }
  }
}