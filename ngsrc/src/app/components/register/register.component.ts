import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages'
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private valideService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    console.log(this.name)

    const user ={
      name : this.name,
      username: this.username,
      password: this.password,
      email: this.email
    }

    if(!this.valideService.validateRegister(user)){
      this.flashMessageService.show('fill out the form...', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //valide email
    if(!this.valideService.valideEmail(user.email)){
      this.flashMessageService.show('use valid email...', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // register
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessageService.show('You are now registered', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      }else{
        this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }

}
