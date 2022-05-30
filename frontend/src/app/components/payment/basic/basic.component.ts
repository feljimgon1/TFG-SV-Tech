import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment/payment.service';
declare var Stripe: any;

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  stripe: any;

  @ViewChild('cardInfo') cardInfo: ElementRef | undefined;
  cardError: String = '';
  card: any;
  success: any;
  processing = false;

  constructor(
    private ngZone: NgZone,
    private paymentService: PaymentService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.stripe = Stripe('pk_test_51IldEPBfL6JZfkGybHkSwS1L93XqKpPRV8jTyLmElzrGSQv85HIASP0arBXP0z1qeE4WX6cSq8YlOqQ1eQOvmPZ200dp7x2DRS');

    var elements = this.stripe.elements();

    var style = {
      base: {
        border: '2px solid red'
      },
    };

    this.card = elements.create('card', { style: style })
    this.card.mount(this.cardInfo?.nativeElement)
    this.card.addEventListener('change', this.onChange.bind(this))
  }

  onChange({ error }: any) {
    if (error) {
      this.ngZone.run(() => {
        this.cardError = error.message
      })
    }
    else {
      this.ngZone.run(() => {
        this.cardError != null
      })
    }
  }

  async onClick() {
    const { token, error } = await this.stripe.createToken(this.card);
    if (token) {
      this.processing = true;
      this.success = true;
      let response: any = await this.paymentService.chargeB(1, token.id);
      if (response["amount"] === 50000) {
        let user = JSON.parse(localStorage.getItem('user') || '{}')
        console.log(user['rol']);
        user['rol'] = 'BASICO'
        localStorage.setItem("user", JSON.stringify(user))
      }
    } else {
      this.ngZone.run(() => {
        this.cardError = error.message
      })
    }
    this.router.navigate(['plan-financiero']);
  }

}