import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  employee: Partial<Employee> = {
    name: '', email: '', phone: '', department: '', designation: '',
    salary: 0, address: '', gender: '', dateOfJoining: ''
  };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeService.getEmployeeById(+id).subscribe(emp => this.employee = emp);
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee.id!, this.employee as Employee).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      const { id, ...empWithoutId } = this.employee;
      this.employeeService.addEmployee(empWithoutId as Employee).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}