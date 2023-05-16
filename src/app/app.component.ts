import { AppService } from './app.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currency = '$';

  form = this.fb.group({
    order: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  });

  productsData: any

  constructor(private fb: FormBuilder, private appSevice: AppService) {
  }

  ngOnInit() {
    this.appSevice.getData().subscribe(data => this.productsData = data);
  }

  changeCurrency() {
    let newCurrency  = '$';
    let coeficient  = 1

  if (this.currency === '$') {
      newCurrency = "₽"
      coeficient = 80;
  } else if (this.currency === '₽') {
      newCurrency = "BYN"
      coeficient = 3;
  } else if (this.currency === 'BYN') {
      newCurrency = '€';
    coeficient = 0.9;
  } else if (this.currency === '€') {
      newCurrency = '¥';
      coeficient = 6.9;
    }

    this.currency = newCurrency;

    this.productsData.forEach((element: any) => {
      element.price = +(element.basePrice * coeficient).toFixed(1) 
    });

  }

scrollTo(target: HTMLElement, burger ?: any) {
    target.scrollIntoView({behavior: "smooth"})
    if (burger) {
      this.form.patchValue({ order: burger.burgerName + ' (' + burger.price + ' ' + this.currency + ')' });
    }
  }

  confirmOrder() {
    if (this.form.valid) {

      this.appSevice.sendOrder(this.form.value)
      .subscribe(
        {
          next: (response: any) => {
            alert(response.message)
            this.form.reset()
          },
          error: (response) => {
            alert(response.error.message)
          }
        }
      );
    }
  }
}
