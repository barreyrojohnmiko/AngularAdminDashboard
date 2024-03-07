import { Component, OnInit } from '@angular/core';

import { SubjectService } from 'src/app/services/subject.service';
import { CommonUtils } from 'src/app/services/common-utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  name = '';

  storedData = JSON.parse(localStorage.getItem('storedData') ?? '[]');

  constructor(private subjectService: SubjectService, public commonUtils: CommonUtils) {}

  ngOnInit(): void {
    // this.subjectService.name$.subscribe(data => {
    //   this.name = data;
    // });
    this.name = this.storedData[0].name;
  }
}
