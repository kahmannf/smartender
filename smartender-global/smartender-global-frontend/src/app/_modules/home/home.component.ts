import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (this.route.children.length === 0) {
      this.router.navigate(['home', 'dashbaord']);
    }
  }

}
