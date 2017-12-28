import {Component} from '@angular/core';
import {Employee} from './employee.interface';
import {EmployeeService} from './employeeservice';

class PrimeEmployee implements Employee {
    constructor(public name?, public empId?, public city?) {}
}

@Component({
  selector: 'app-primeng',
  templateUrl: './primeng.component.html',
  styleUrls: ['./primeng.component.css'],
  providers: [EmployeeService]
})

export class PrimengComponent {
    displayDialog: boolean;

    employee: Employee = new PrimeEmployee();

    selectedEmployee: Employee;

    newEmployee: boolean;

    employees: Employee[];

    constructor(private employeeService: EmployeeService) { }

    ngOnInit() {
        this.employeeService.getEmployeesMedium().then(employees => this.employees = employees);
    }
	
	 showDialogToAdd() {
        this.newEmployee = true;
        this.employee = new PrimeEmployee();
        this.displayDialog = true;
    }

    save() {
        if(this.newEmployee)
            this.employees.push(this.employee);
        else
            this.employees[this.findSelectedCarIndex()] = this.employee;

        this.employee = null;
        this.displayDialog = false;
    }

    delete() {
        this.employees.splice(this.findSelectedCarIndex(), 1);
        this.employee = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newEmployee = false;
        this.employee = this.cloneCar(event.data);
        this.displayDialog = true;
    }

    cloneCar(c: Employee): Employee {
        let employee = new PrimeEmployee();
        for(let prop in c) {
            employee[prop] = c[prop];
        }
        return employee;
    }

    findSelectedCarIndex(): number {
        return this.employees.indexOf(this.selectedEmployee);
    }

   
}