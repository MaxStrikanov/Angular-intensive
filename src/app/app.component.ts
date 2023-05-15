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

  productsData = [
    {
      burgerName: "Бургер чеддер & бекон",
      description: "Котлета из говядины криспи, булочка, томат, сыр Чеддер, грудинка, лук красный, салат айсбер, майонез, кетчуп, сырный соус",
      image: "Burger_1.png",
      price: 8,
      basePrice: 8,
      weight: 360
    },
    {
      burgerName: "BBQ с беконом и курицей",
      description: "Булочка бриошь с кунжутом, куриная котлета, сыр чеддер, томат, огурец маринованный, лук маринованный, салат Ромен, бекон, соус BBQ",
      image: "Burger_2.png",
      price: 7,
      basePrice: 7,
      weight: 390
    },
    {
      burgerName: "Дабл биф бургер",
      description: "Две говяжьи котлеты, сыр чеддер, салат романо, маринованные огурцы, свежий томат, бекон, красный лук, соус бургер, горчица",
      image: "Burger_3.png",
      price: 10,
      basePrice: 10,
      weight: 420
    },
    {
      burgerName: "Баварский бургер",
      description: "Булочка для бургера, говяжья котлета, красный лук, сыр, охотничья колбаска, соус барбекю, соус сырный, салат айсберг",
      image: "Burger_4.png",
      price: 7,
      basePrice: 7,
      weight: 220
    }, 
    {
      burgerName: "Бекон чизбургер",
      description: "Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, сыр, сырный соус, кетчуп, зелень",
      image: "Burger_5.png",
      price: 8,
      basePrice: 8,
      weight: 220
    }, 
    {
      burgerName: "Индиана бургер",
      description: "Булочка для бургера, котлета куриная, грудинка, яйцо, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень",
      image: "Burger_6.png",
      price: 9,
      basePrice: 9,
      weight: 320
    }, 
    {
      burgerName: "Вегги бургер",
      description: "Булочка для бургера, вегетарианская котлета, красный лук, сыр, свежий томат, соус барбекю, соус сырный, салат айсберг",
      image: "Burger_7.png",
      price: 8,
      basePrice: 8,
      weight : 320
    },
    {
      burgerName: "Плаксивый Джо",
      description: "Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, красный лук, сыр, перец халапеньо, кетчуп, зелень",
      image: "Burger_8.png",
      price:7,
      basePrice: 7,
      weight : 380
    }, 
    {
      burgerName: "Двойной чиз бургер",
      description: "Булочка для бургера, две говяжьи котлеты, двойной сыр чеддар, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень",
      image: "Burger_9.png",
      price:11,
      basePrice: 11,
      weight : 400
    }, 
    {
      burgerName: "Фрешбургер",
      description: "Булочка для бургера, говяжья котлета, бекон, сыр чеддар, яйцо, салями, соус барбекю, соус сырный, салат айсберг, свежий томат",
      image: "Burger_10.png",
      price:9,
      basePrice: 9,
      weight : 300
    },
    {
      burgerName: "Цуккини бургер",
      description: "Булочка для бургера, вегетарианская котлета из нута, цуккини на гриле, помидор, огурец маринованный, сыр, горчичный соус, кетчуп, зелень",
      image: "Burger_11.png",
      price:8,
      basePrice: 8,
      weight : 320
    },
    {
      burgerName: "Двойной бургер чеддар",
      description: "Булочка для бургера, котлета говяжья, грудинка, красный лук, огурец маринованный, томат, кетчуп, двойной сыр чеддар, горчица, зелень",
      image: "Burger_12.png",
      price:8,
      basePrice: 8,
      weight : 320
    },
  ];

  constructor(private fb: FormBuilder) {

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
      alert("Спасибо за заказ!")
      this.form.reset()
    }
  }
}
