import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeaturesService } from '../../features/features.service';

interface Employee {
  _id: string;
  employeeName: string;
  employmentDate: Date;
  employmentPeriod: string;
  status: string;
}

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
})
export class ModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  employees: Employee[] = []; // Store employees data
  selectedEmployeeId: string = ''; // Store selected employee ID

  editLaptopForm: FormGroup;
  isModalOpen: boolean = true;
  isAddEmployeeOpen: boolean = false; // For Add Employee modal
  newEmployee: string = '';

  ngOnInit(): void {
    this.getEmployees();
  }

  // Fetch employees from backend
  getEmployees(): void {
    this.featuresService.getAllEmployee().subscribe({
      next: (response) => {
        this.employees = response.employees;
        console.log('Employees fetched:', this.employees);
      },
      error: (error) => console.error('Error fetching employees:', error),
    });
  }

  // employees: string[] = [
  //   "67c5515be20a687c69e00b6c",
  //   " Kim Carl Buban",
  //   "Jhomark Alber",
  //   "Justmyr Rodriguez",
  //   "Raymart Castillo",
  //   "John Kenneth Fajiculay",
  //   "Cheli Ann",
  //   "Beverly Dadis"

  // ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private featuresService: FeaturesService
  ) {
    this.editLaptopForm = this.fb.group({
      laptopName: ['', Validators.required],
      laptopSerialNumber: ['', Validators.required],
      laptopDescription: ['', [Validators.maxLength(50)]],
      laptopPurchaseDate: ['', Validators.required],
      laptopLocation: ['', Validators.required],
      assignedTo: [''],
      laptopCondition: ['', Validators.required],
    });
  }

  // Close main modal
  closeModal() {
    this.isModalOpen = false;
    this.closeModalEvent.emit();
  }

  onAssignedChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'add') {
      this.openAddEmployeeModal();
    }
  }

  openAddEmployeeModal() {
    this.isAddEmployeeOpen = true;
  }

  closeAddEmployeeModal() {
    this.isAddEmployeeOpen = false;
    this.newEmployee = '';
  }

  // addEmployee() {
  //   if (this.newEmployee.trim()) {
  //     this.employees.push(this.newEmployee.trim());
  //     this.closeAddEmployeeModal();
  //   }
  // }

  onSubmit() {
    if (this.editLaptopForm.valid) {
      const laptopData = this.editLaptopForm.value;
      console.log('Submitting:', laptopData);

      this.featuresService.addLaptop(laptopData).subscribe({
        next: (response) => {
          console.log('Laptop added successfully:', response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error adding laptop:', error);
        },
      });
    }
  }
}
