import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/@core/services/user.service';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  userId: number = 0;
  user: any
  constructor(
    private userService: UserService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
      console.log(this.user);
    });
  }

}
