import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {
	ChangeDetectorRef,
	Component,
  NgZone,
	OnDestroy,
	OnInit
} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';


import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { AuthService } from 'src/app/components/auth.service';

/** @title Responsive sidenav */
@Component({
	selector: 'app-full-layout',
	templateUrl: 'full.component.html',
	styleUrls: []
})
export class FullComponent implements OnDestroy {
	mobileQuery: MediaQueryList;

	dir = 'ltr';
	dark = false;
	minisidebar = false;
	boxed = false;
	horizontal = true;

	green = false;
	blue = false;
	danger = false;
	showHide = false;
	url = '';
	sidebarOpened = false;
	status = false;

	public showSearch = false;
	public config: PerfectScrollbarConfigInterface = {};
	// tslint:disable-next-line - Disables all
	private _mobileQueryListener: () => void;

	constructor(
		public router: Router,
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		public menuItems: MenuItems,
    public authService: AuthService,
    public ngZone: NgZone,

	) {
		this.mobileQuery = media.matchMedia('(min-width: 1100px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		// tslint:disable-next-line: deprecation
		this.mobileQuery.addListener(this._mobileQueryListener);
		// this is for dark theme
		// const body = document.getElementsByTagName('body')[0];
		// body.classList.toggle('dark');
		this.dark = false;
	}

	ngOnDestroy(): void {
		// tslint:disable-next-line: deprecation
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}


	ngOnInit() {
		//const body = document.getElementsByTagName('body')[0];
		// body.classList.add('dark');
	}

	clickEvent(): void {
		 this.status = !this.status;
	}

  horizon(): void{
    this.horizontal = !this.horizontal;
    if(this.horizontal === true){
      this.router.navigate(['/component/product']);
    }else if(this.horizontal === false){
      this.router.navigate(['/dashboard']);
    }
    console.log(this.horizontal)
  }

	darkClick() {
		// const body = document.getElementsByTagName('body')[0];
		// this.dark = this.dark;
		const body = document.getElementsByTagName('body')[0];
		body.classList.toggle('dark');
		// if (this.dark)
		// else
		// 	body.classList.remove('dark');
		// this.dark = this.dark;
		// body.classList.toggle('dark');
		// this.dark = this.dark;
	}



}
