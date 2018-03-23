import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
    Component,
    Directive,
    NgModule,
    HostListener,
    Input,
    OnChanges,
    ElementRef,
    Renderer
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

interface Image {
  public initial: string;
  public over: string;
};


@Directive({
  selector: "img[ccRollover]"
})
class RolloverImageDirective implements OnChanges {

  @Input('ccRollover') config: Image;
  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) { }

  @HostListener('mouseover') onMouseOver() {
    let part = this.el.nativeElement;
    this.renderer.setElementProperty(part, 'src', this.config.over);
  }

  @HostListener('mouseout') onMouseOut() {
    let part = this.el.nativeElement;
    this.renderer.setElementProperty(part, 'src', this.config.initial);
  }

  ngOnChanges() {
    let part = this.el.nativeElement;
    this.renderer.setElementProperty(part, 'src', this.config.initial);
    console.log('<img> ngOnChanges: config object set' + JSON.stringify(this.config));
    this.onMouseOut();
  }
}

@Component({
  selector: 'app',
  template: `
<img *ngFor="let image of images" [ccRollover]="image"/>
`
})
class AppComponent {
  images: Image[] = [
    {
    'initial':'https://unsplash.it/200/300?image=201',
    'over':'https://unsplash.it/200/300?image=202'
    },
    {
    'initial':'https://unsplash.it/200/300?image=202',
    'over':'https://unsplash.it/200/300?image=203'
    },
    {
    'initial':'https://unsplash.it/200/300?image=203',
    'over':'https://unsplash.it/200/300?image=204'
    },
    {
    'initial':'https://unsplash.it/200/300?image=204',
    'over':'https://unsplash.it/200/300?image=200'
    },
  ];
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    RolloverImageDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

