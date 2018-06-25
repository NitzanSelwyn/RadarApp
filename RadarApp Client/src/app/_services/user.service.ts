import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../Models/user.model';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    url = 'http://localhost:3000'

    getAll() {
        return this.http.get<User[]>(this.url + '/users');
    }

    getById(_id: string) {
        return this.http.get(this.url + '/users/' + _id);
    }

    create(user: User) {
        return this.http.post(this.url + '/users/register', user);
    }

    update(user: User) {
        return this.http.put(this.url + '/users/' + user._id, user);
    }

    delete(_id: string) {
        return this.http.delete(this.url + '/users/' + _id);
    }
}