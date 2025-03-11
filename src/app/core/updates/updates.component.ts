import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
  selector: 'app-updates',
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, FormsModule],
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css'],
  standalone: true,
})
export class UpdatesComponent implements OnChanges {
  @Input() selectedLaptop: any = {}; // Receive data from parent component
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() refreshTableEvent = new EventEmitter<void>(); // Emit event to p
  employees: Employee[] = []; // Store employees data
  selectedEmployeeId: string = ''; // Store selected employee ID

  editLaptopForm: FormGroup;
  isEditModalOpen: boolean = true;
  isAddEmployeeOpen: boolean = false; // For Add Employee modal
  newEmployee: string = '';

  locations: string[] = ['New Office', '1NK Center']; // Example locations
  ngOnInit(): void {
    this.getEmployees();
  }

  // Fetch employees from backend
  getEmployees(): void {
    this.featuresService.getAllEmployee().subscribe({
      next: (response) => {
        this.employees = response;
        console.log('Employees fetched:', this.employees);
      },
      error: (error) => console.error('Error fetching employees:', error),
    });
  }

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedLaptop'] && this.selectedLaptop) {
      this.updateForm();
    }
  }

  updateForm() {
    if (this.selectedLaptop) {
      this.editLaptopForm.patchValue({
        laptopName: this.selectedLaptop.laptopName || '',
        laptopSerialNumber: this.selectedLaptop.laptopSerialNumber || '',
        laptopDescription: this.selectedLaptop.laptopDescription || '',
        laptopPurchaseDate: this.selectedLaptop.laptopPurchaseDate || '',
        laptopLocation: this.selectedLaptop.laptopLocation || '',
        assignedTo: this.selectedLaptop.assignedTo || '',
        laptopCondition: this.selectedLaptop.laptopCondition || '',
      });
    }
  }

  closeModal() {
    this.isEditModalOpen = false;
    this.closeModalEvent.emit();
  }

  onAssignedChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'add') {
      this.openAddEmployeeModal();
    } else {
      this.selectedEmployeeId = selectedValue;
    }
  }

  openAddEmployeeModal() {
    this.isAddEmployeeOpen = true;
  }

  closeAddEmployeeModal() {
    this.isAddEmployeeOpen = false;
    this.newEmployee = '';
  }

  addEmployee() {
    if (this.newEmployee) {
      // Add new employee logic here
      console.log('New Employee:', this.newEmployee);
      this.closeAddEmployeeModal();
    }
  }

  onSubmit() {
    if (this.editLaptopForm.valid) {
      const laptopData = this.editLaptopForm.value;
      console.log('Submitting:', laptopData);

      this.featuresService
        .updateLaptop(this.selectedLaptop._id, laptopData)
        .subscribe({
          next: (response) => {
            console.log(this.selectedLaptop._id);
            console.log('Laptop edited successfully:', response);
            this.refreshTableEvent.emit(); // Emit event to refresh table
            this.closeModal();
          },
          error: (error) => {
            console.error('Error editing laptop:', error);
          },
        });
    }
  }
}
