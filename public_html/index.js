function onClickMenu(){
	document.getElementById("menu").classList.toggle("change");
	document.getElementById("nav").classList.toggle("change");
	document.getElementById("menu-bg").classList.toggle("change-bg");
}

function darkMode(){

    document.getElementById("body").classList.toggle("dark_mode");
    document.getElementById("site-user-info").classList.toggle("dark_mode_name");
    document.getElementById("dark-mode-user").classList.toggle("dark_mode_label");
    document.getElementById("dark-mode-user-name").classList.toggle("dark_mode_label");

}