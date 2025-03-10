// import { CommonModule } from "@angular/common";
// import { Component, Output, EventEmitter } from "@angular/core";
// import { Router } from "@angular/router";

// @Component({
//   selector: "app-header",
//   imports: [CommonModule],
//   templateUrl: "./header.component.html",
//   styleUrls: ["./header.component.css"],
// })
// export class HeaderComponent {
//   navigateToLaptop() {
//     throw new Error("Method not implemented.");
//   }
//   // isSidebarOpen = false;

//   constructor(private router: Router) {}

//   // toggleSidebar() {
//   //   this.isSidebarOpen = !this.isSidebarOpen;
//   // }

//   toggleSidebar(): void {
//     this.isSidebarOpen = !this.isSidebarOpen;
//     this.sidebarToggled.emit(this.isSidebarOpen); // Emit event with current state
//   }

//   closeSidebar() {
//     this.isSidebarOpen = false;
//   }

//   goToDashboard(): void {
//     this.router.navigate(["/main/dashboard"]);
//   }

//   navigateToLogin(): void {
//     this.router.navigate(["/login"]);
//   }
//   navigateToAssets(): void {
//     this.router.navigate(["/main/laptop"]);
//   }

//   @Output() sidebarToggled = new EventEmitter<boolean>();
//   isSidebarOpen = false; // Track sidebar state
// }

import { Component } from "@angular/core";
import { SidebarService } from "../sidebar/sidebar.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
