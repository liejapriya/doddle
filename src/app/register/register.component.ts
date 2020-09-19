import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    pbject: boolean;
    psject: boolean;
    public URL = "http://localhost:3000"

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpClient
    ) {
        // redirect to home if already logged in
        // this.router.navigate(['/']);

    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        console.log(this.registerForm.value);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
        })
        this.http.post(this.URL + "/register", JSON.stringify(this.registerForm.value), {
            headers: headers
        })
            .subscribe(data => {
                if (data != null) {
                    this.pbject = false;
                    this.psject = true;
                }

                else {

                    this.pbject = true;
                    this.psject = false;

                }

            })


    }

}
