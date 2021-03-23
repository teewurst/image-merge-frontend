import { NgModule } from '@angular/core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
export class IconsModule {
    constructor(library) {
        // todo: Refactor to used icons
        library.addIconPacks(fas, far);
    }
}
IconsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [FontAwesomeModule],
                exports: [FontAwesomeModule]
            },] }
];
IconsModule.ctorParameters = () => [
    { type: FaIconLibrary }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL21hcnRpbi5ydWYvcHJvamVjdHMvc29uc3RpZ2VzL2ltYWdlLW1lcmdlLWZyb250ZW5kL3Byb2plY3RzL2ltYWdlLW1lcmdlLWZyb250ZW5kL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9pY29ucy9pY29ucy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDeEQsT0FBTyxFQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQVF0RCxNQUFNLE9BQU8sV0FBVztJQUN0QixZQUFZLE9BQXNCO1FBQ2hDLCtCQUErQjtRQUMvQixPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7WUFURixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFFLGlCQUFpQixDQUFFO2dCQUM5QixPQUFPLEVBQUUsQ0FBRSxpQkFBaUIsQ0FBRTthQUMvQjs7O1lBUk8sYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtmYXJ9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXJlZ3VsYXItc3ZnLWljb25zJztcbmltcG9ydCB7RmFJY29uTGlicmFyeSwgRm9udEF3ZXNvbWVNb2R1bGV9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7ZmFzfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGltcG9ydHM6IFsgRm9udEF3ZXNvbWVNb2R1bGUgXSxcbiAgZXhwb3J0czogWyBGb250QXdlc29tZU1vZHVsZSBdXG59KVxuZXhwb3J0IGNsYXNzIEljb25zTW9kdWxlIHtcbiAgY29uc3RydWN0b3IobGlicmFyeTogRmFJY29uTGlicmFyeSkge1xuICAgIC8vIHRvZG86IFJlZmFjdG9yIHRvIHVzZWQgaWNvbnNcbiAgICBsaWJyYXJ5LmFkZEljb25QYWNrcyhmYXMsIGZhcik7XG4gIH1cbn1cbiJdfQ==