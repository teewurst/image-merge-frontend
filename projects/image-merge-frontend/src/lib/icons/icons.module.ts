import {NgModule} from '@angular/core';
import {far} from '@fortawesome/free-regular-svg-icons';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [],
  imports: [ FontAwesomeModule ],
  exports: [ FontAwesomeModule ]
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    // todo: Refactor to used icons
    library.addIconPacks(fas, far);
  }
}
