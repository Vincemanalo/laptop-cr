import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";


@Component({
  selector: "app-dashboard",
  imports: [CommonModule, ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {
  mockdata: any[] = [
    {
      laptop_id: 1,
      uid: 13,
      purchase_date: "1/20/2025",
      laptop_age: "10",
      location: "ink",
      condition: "working",
    },
    {
      laptop_id: 5,
      uid: 14,
      purchase_date: "1/20/2026",
      laptop_age: "10",
      location: "ink",
      condition: "working",
    },
  ];
  jonadata: any[] = [
    {
      label: "No of Laptops",
      count: 7,
    },
    {
      label: "No of Desktop",
      count: 7,
    },
    {
      label: "No of Users",
      count: 7,
    },
    {
      label: "No of Device Parts",
      count: 7,
    },
  ];

  vincedata: any[] = [
    {
      uid: 12,
      name: "Beverly Dadis",
    },
    {
      uid: 13,
      name: "Kim carl Buban",
    },
    {
      uid: 14,
      name: "Cedric Lunar",
    },
    {
      uid: 15,
      name: " Justmyr Gutierrez",
    },
    {
      uid: 16,
      name: "Reymart Castillo",
    },
  ];

  isSidebarOpen = false; // Track sidebar state

  handleSidebarToggle(isOpen: boolean): void {
    this.isSidebarOpen = isOpen;
  }
}
