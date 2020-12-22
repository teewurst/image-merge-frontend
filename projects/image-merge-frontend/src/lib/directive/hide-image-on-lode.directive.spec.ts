import {HideImageOnLodeDirective} from './hide-image-on-lode.directive';
import {ElementRef, Renderer2} from '@angular/core';
import createSpyObj = jasmine.createSpyObj;

describe('HideImageOnLoad', () => {

    let elRef: ElementRef;
    let renderer: Renderer2;
    let directive: HideImageOnLodeDirective;
    let callback: () => {};
    let eventName: string;

    beforeEach(() => {
        // Mock element ref
        elRef = createSpyObj<ElementRef>('ElementRef', {}, {
            nativeElement: createSpyObj('nativeElement',
                ['addEventListener'],
                {
                    style: {display: 'block'}
                }
            ),
        });
        // fake event registration
        elRef.nativeElement.addEventListener.and.callFake((listenerEventName, listenerCallback) => {
                eventName = listenerEventName;
                callback = listenerCallback;
            }
        );
        // Mock renderer
        renderer = createSpyObj<Renderer2>('Renderer2', ['setAttribute']);

        // create directive
        directive = new HideImageOnLodeDirective(
            elRef,
            renderer
        );
    });

    afterEach(() => {
        // reset values
        eventName = null;
        callback = null;
    });

    it('should create an instance', () => {
        // just check if constructor is working
        expect(directive).toBeTruthy();
    });

    it('should set correct src attr an :host', () => {
        const currentValue = 'any';

        // trigger change event
        directive.ngOnChanges({
            src: {
                currentValue,
                previousValue: 'other',
                firstChange: true,
                isFirstChange(): boolean {
                    return true;
                }
            }
        });

        // check if renderer receives the correct values
        expect(renderer.setAttribute).toHaveBeenCalledWith(jasmine.anything(), 'src', currentValue);
    });

    it('should set and reset the value as soon it is loaded', () => {
        const currentValue = 'any';

        // initialize eventListener
        directive.ngOnInit();

        // change src so it the component is hidden
        directive.ngOnChanges({
            src: {
                currentValue,
                previousValue: 'other',
                firstChange: true,
                isFirstChange(): boolean {
                    return true;
                }
            }
        });

        // check is everything is setup
        expect(elRef.nativeElement.style.display).toBe('none');
        expect(eventName).toBe('load');

        // fake load call
        callback();

        // check if :host is displayed again as soon as load is done
        expect(elRef.nativeElement.style.display).toBe('block');
    });
});
