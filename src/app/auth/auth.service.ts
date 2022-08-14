import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private users;
  private userName: string;
  private userPhone:number;

  private userEmail: string;
  private userPassword: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}



  /*      A function that returns a token of the password   */
  getToken() {
    return this.token;
  }
/*        A function that returns the username         */
  getUserName() {

    return this.userName;
  }
/* A function that returns the phone number */
  getUserPhone() {

    return this.userPhone;
  }

  /*  A function that returns the email */
  getUserEmail() {

    return this.userEmail;
  }


  getIsAuth() {
    return this.isAuthenticated;
  }
/*A function that returns user ID */
  getUserId() {

    return this.userId;
  }
/*A function that returns all registered users to the system through the database */
  getUsers(id:string) {
    this.http
      .post<{ users:[]}>(
        "http://localhost:3000/api/user/getUsers",{id:id}

      )
      .subscribe(response => {
        this.users=response.users;

      });

      return this.users;

    }

/* A function that updates the email through a profile page*/
updateUserEmail(email:string,id:string){
  this.http
  .post(
    "http://localhost:3000/api/user/updateUserEmail",{email:email,id:id}

  )
  .subscribe(response => {

    console.log(response)
  });

  return this.users;
}
/* A function that updates the phone through a profile page */
  updateUserPhone(phone:number,id:string){
    this.http
    .post(
      "http://localhost:3000/api/user/updateUserPhone",{phone:phone,id:id}

    )
    .subscribe(response => {

      console.log(response)
    });

    return this.users;
  }



/* A function that updates the password using a token via a profile page */
updateUserPassword(password:string,id:string){
  this.http
  .post(
    "http://localhost:3000/api/user/updateUserPassword",{password:password,id:id}

  )
  .subscribe(response => {

    console.log(response)
  });

  return this.users;
}



/* A function that updates the name through a profile page */
updateUserName(name:string,id:string){
  this.http
  .post(
    "http://localhost:3000/api/user/updateUserName",{name:name,id:id}

  )
  .subscribe(response => {

    console.log(response)
  });

  return this.users;
}

/* A function that returns authentication listener status  */
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }


/*A function that is activated after registration and takes you to the login page if the registration is successful */
  funLogin(){
    this.router.navigateByUrl('login');
}

/*  A function is activated after the user fills out the registration form and transfers the information to the database  */
  createUser(email: string, password: string,name:string,phone:number) {
    const authData: AuthData = { email: email, password: password};
    const aD={ email: email, password: password,name:name,phone:phone}

    this.http
      .post("http://localhost:3000/api/user/signup", aD)
      .subscribe(response => {
        console.log(response);
        alert("you are now signed in");
        this.funLogin();
      });
  }


  /*Function is activated After the user is registered and wants to connect to the system, the function will check if the username and password are correct */
  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };

    this.http
      .post<{ token: string; expiresIn: number, userId: string,name:string,email:string,phone:number,users:[] }>(
        "http://localhost:3000/api/user/login",
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.userName = response.name;
          this.userEmail=response.email;

          this.userPhone=response.phone;

          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);

          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(["/"]);
        }
      });
  }
/*   Allocates time for the user to be logged in and disconnects it after that time  */
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
/*The logout function is called after a certain time or if a user chooses to log out he will not have access to the various options on the site */
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
/*A function that stores authentication information  */
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return 0;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}
