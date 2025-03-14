import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeachersTableComponent } from "./components/teachers-table/teachers-table.component";
// import { SubscriptionsAndSalariesComponent } from './components/subscriptions-and-salaries/subscriptions-and-salaries.component';
// import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { StudentsTableComponent } from './components/student/student.component';
import { ComplaintsComponent } from "./components/complaints/complaints.component";
import { SubscriptionsAndSalariesComponent } from "./components/subscriptions-and-salaries/subscriptions-and-salaries.component";

@Component({
  selector: 'app-root',
  standalone: true, // ✅ تأكد من أن `app-root` هو مكون مستقل
  imports: [RouterOutlet, TeachersTableComponent, StudentsTableComponent, ComplaintsComponent, SubscriptionsAndSalariesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-project';
}
