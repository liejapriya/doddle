import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
// @Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    public URL = "http://localhost:3000"
    public d = {};

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    onSubmit() {

        console.log("gggg", this.loginForm.value);

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'

        })
        this.http.post(this.URL + "/users", JSON.stringify(this.loginForm.value), {
            headers: headers
        })
            .subscribe((data: any) => {

                // this.http.get(this.URL + "/register").subscribe(registerData => {

                // })
                this.d = data;
                console.log(this.d,"this.d");
                
                if (data.response.token == null) {
                    alert("please register")
                }
                else {
                    localStorage.setItem('token', data.response.token)
                    localStorage.setItem('userId', data.response.result[0].Id)

                    this.router.navigate(['/create_product']);

                    // this.authenticationService.loginUser(this.f.username.value, this.f.password.value,this.d,JSON.stringify(this.loginForm.value))

                }

            })
    }

}
