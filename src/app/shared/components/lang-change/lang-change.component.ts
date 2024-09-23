import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-change',
  standalone: true,
  imports: [],
  templateUrl: './lang-change.component.html',
  styleUrl: './lang-change.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LangChangeComponent {
  constructor(public translate: TranslateService) {}
}
