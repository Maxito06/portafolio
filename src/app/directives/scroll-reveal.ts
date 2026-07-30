import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollReveal implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const elemento = this.elementRef.nativeElement;
    this.renderer.addClass(elemento, 'scroll-reveal');

    this.observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          this.renderer.addClass(elemento, 'scroll-reveal--visible');
          this.observer?.unobserve(elemento);
        }
      },
      { threshold: 0.15 },
    );

    this.observer.observe(elemento);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
