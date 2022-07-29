class MobileNavBar{
    constructor(mobileMenu, navList, getMain, menu,menu_close){
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.getMain = document.querySelector(getMain);
        this.menu = document.querySelector(menu);
        this.activeteClass = 'active';
        this.hearClick = this.hearClick.bind(this);
        this.controller = true;
    }
    addClickEvent(){
        this.mobileMenu.addEventListener('click', this.hearClick);
    }
    hearClick(){
        this.navList.classList.toggle(this.activeteClass);
        if(this.controller === true){
            this.getMain.style.display='none';
            this.controller = false;
        }else{
            this.getMain.style.display='block';
            this.controller = true;
        }
    }
    init(){
        if(this.mobileMenu){
            this.addClickEvent()
        }
        return this
    }
}
const mobileNavBar = new MobileNavBar(".mobile-menu", ".nav-list", "#dashboard",".mobile-menu","mobile-menu-close");
mobileNavBar.init();