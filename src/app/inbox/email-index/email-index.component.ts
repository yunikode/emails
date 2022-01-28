import { Component, OnInit } from '@angular/core';

import { EmailService } from '../email.service';
import { EmailSummary } from '../models/email';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css'],
})
export class EmailIndexComponent implements OnInit {
  emails: EmailSummary[] = [];

  constructor(private email: EmailService) {}

  ngOnInit(): void {
    this.email.getEmails().subscribe((emails) => {
      this.emails = emails;
    });
  }
}
