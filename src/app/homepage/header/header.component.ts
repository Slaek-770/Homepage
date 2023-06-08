import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('title')
  title?: ElementRef;

  @ViewChild('title0')
  title0?: ElementRef;

  @ViewChild('title1')
  title1?: ElementRef;

  constructor() { }

  ngOnInit(): void {
    window.onmousemove = (event) => {
      const x = event.x;
      const y = event.y;

      if (this.title && this.title0 && this.title1) {
        const width = window.innerWidth / 2;
        const height = window.innerHeight / 2;

        // Maximal offset of a shadow
        const maxOffsetX_0 = 4;
        const maxOffsetX_1 = maxOffsetX_0 + 6;
        const maxOffsetY_0 = 3;
        const maxOffsetY_1 = maxOffsetY_0 + 3;

        // Centerposition of the title
        const ax = window.innerWidth / 2; // anchor x
        const ay = 24; // anchor y

        // Vector of mosue to center
        const dx = ax - x;
        const dy = ay - y;

        // Ratio of dx/dy to width/height
        // When mouse on screen edge => dx/dy = 1
        // In center => dx/dy = 0
        const rx = dx / width;
        const ry = dy / height;

        // Fix main title on position
        this.title.nativeElement.style.top = ay + "px";
        this.title.nativeElement.style.left = ax + "px";

        // New x/y for shadow 0
        const nx0 = ax + rx * maxOffsetX_0;
        const ny0 = ay + ry * maxOffsetY_0;

        this.title0.nativeElement.style.left = nx0 + "px";
        this.title0.nativeElement.style.top = ny0 + "px";

        // New x/y for shadow 1
        const nx1 = ax + rx * maxOffsetX_1;
        const ny1 = ay + ry * maxOffsetY_1;

        this.title1.nativeElement.style.left = nx1 + "px";
        this.title1.nativeElement.style.top = ny1 + "px";
      }
    };
  }

}
