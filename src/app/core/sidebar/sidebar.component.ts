// import { CommonModule } from "@angular/common";
// import { Component, Output, EventEmitter } from "@angular/core";
// import { Router } from "@angular/router";

// @Component({
//   selector: "app-sidebar",
//   imports: [CommonModule],
//   templateUrl: "./sidebar.component.html",
//   styleUrl: "./sidebar.component.css",
// })
// export class SidebarComponent {
//   navigateToLaptop() {
//     throw new Error("Method not implemented.");
//   }
//   isSidebarOpen = false;

//   constructor(private router: Router) {}

//   // toggleSidebar() {
//   //   this.isSidebarOpen = !this.isSidebarOpen;
//   // }

//   closeSidebar() {
//     this.isSidebarOpen = false;
//   }

// }

import { Component, OnInit } from "@angular/core";
import { SidebarService } from "./sidebar.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-sidebar",
  imports: [CommonModule],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;

  constructor(private router: Router, private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarOpen$.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }

  closeSidebar() {
    this.sidebarService.closeSidebar();
  }

  goToDashboard(): void {
    this.router.navigate(["/main/dashboard"]);
  }

  navigateToLogin(): void {
    this.router.navigate(["/login"]);
  }
  navigateToAssets(): void {
    this.router.navigate(["/main/laptop"]);
  }
}
