import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Employee} from './employee.interface';

@Injectable()
export class EmployeeService {

    constructor(private http: Http) {}

    getEmployeesMedium() {
        return this.http.get('assets/data/employees-medium.json')
            .toPromise()
            .then(res => <Employee[]> res.json().data)
            .then(data => { return data; });
    }
}