window.onload = function(){ 
    loadSettings();
    render();
};

function saveSettings()
{
    setCookie("fullName", fullName.value, 30);
    setCookie("nameForegroundColor", nameForegroundColor.value, 30);
    setCookie("nameBackgroundColor", nameBackgroundColor.value, 30);
    setCookie("fillForegroundColor", fillForegroundColor.value, 30);
    setCookie("fillBackgroundColor", fillBackgroundColor.value, 30);
    setCookie("useTransparentBackground", useTransparenBackground.checked);
    setCookie("generalism1", generalism1.value, 30);
    setCookie("generalismRange1", generalismRange1.value, 30);
    setCookie("generalism2", generalism2.value, 30);
    setCookie("generalismRange2", generalismRange2.value, 30);
    setCookie("generalism3", generalism3.value, 30);
    setCookie("generalismRange3", generalismRange3.value, 30);
    setCookie("specialty1", specialty1.value, 30);
    setCookie("specialtyRange1", specialtyRange1.value, 30);
    setCookie("specialty2", specialty2.value, 30);
    setCookie("specialtyRange2", specialtyRange2.value, 30);
    setCookie("specialty3", specialty3.value, 30);
    setCookie("specialtyRange3", specialtyRange3.value, 30);
}

function loadSettings()
{
    fullName.value = getCookie("fullName");

    if (getCookie("nameForegroundColor") != "") {
        nameBackgroundColor.value = getCookie("nameForegroundColor");
    }

    if (getCookie("nameBackgroundColor") != "") {
        nameBackgroundColor.value = getCookie("nameBackgroundColor");
    }

    if (getCookie("fillForegroundColor") != "") {
        fillForegroundColor.value = getCookie("fillForegroundColor");
    }

    if (getCookie("fillBackgroundColor") != "") {
        fillBackgroundColor.value = getCookie("fillBackgroundColor");
    }

    generalism1.value = getCookie("generalism1");
    generalism2.value = getCookie("generalism2");
    generalism3.value = getCookie("generalism3");

    generalismRange1.value = getCookie("generalismRange1");
    generalismRange2.value = getCookie("generalismRange2");
    generalismRange3.value = getCookie("generalismRange3");

    specialty1.value = getCookie("specialty1");
    specialty2.value = getCookie("specialty2");
    specialty3.value = getCookie("specialty3");

    specialtyRange1.value = getCookie("specialtyRange1");
    specialtyRange2.value = getCookie("specialtyRange2");
    specialtyRange3.value = getCookie("specialtyRange3");

    useTransparenBackground.checked = (getCookie("useTransparentBackground") === 'true');
}

function clearSettings() {

    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    loadSettings();
    render();
}

function render()
{
    console.log("Rendering");

    generalisms.innerHTML = "";
    specialties.innerHTML = "";    

    namebox.style.visibility = fullName.value ? "visible" : "hidden";
    namebox.innerHTML = fullName.value;
    namebox.style.color = nameForegroundColor.value;
    namebox.style.backgroundColor = nameBackgroundColor.value;

    addGeneralism(generalism1.value, generalismRange1.value);
    addGeneralism(generalism2.value, generalismRange2.value);
    addGeneralism(generalism3.value, generalismRange3.value);

    addSpecialty(specialty1.value, specialtyRange1.value);
    addSpecialty(specialty2.value, specialtyRange2.value);
    addSpecialty(specialty3.value, specialtyRange3.value);

    saveSettings();  
}

function addGeneralism(text, value)
{
    if(text)
    {
        var boxDiv = document.createElement('div');
        boxDiv.className = 'box';
        boxDiv.textContent = text;
        boxDiv.style.width = 3 * value + 'px';
        boxDiv.style.color = fillForegroundColor.value;
        boxDiv.style.backgroundColor = fillBackgroundColor.value;
        generalisms.appendChild(boxDiv);
    }
}

function addSpecialty(text, value)
{
    if(text)
    {
        var boxDiv = document.createElement('div');
        boxDiv.className = 'box';
        boxDiv.style.height = 2 * value + 'px';
        boxDiv.style.color = fillForegroundColor.value;
        boxDiv.style.backgroundColor = fillBackgroundColor.value;

        var textDiv = document.createElement('div');
        textDiv.className = 'rotated-text';
        textDiv.textContent = text;

        boxDiv.appendChild(textDiv);
        specialties.appendChild(boxDiv);
    }
}

function saveImage()
{
    let bgColor = useTransparenBackground.checked ? null :  "#ffffff";

    let container = document.getElementById("canvascontent");
        html2canvas(container, {backgroundColor:bgColor}).then(function(canvas) {
            var link = document.createElement("a");
            document.body.appendChild(link);
            link.download = "t-profile " + fullName.value + ".png";
            link.href = canvas.toDataURL("image/png");
            link.target = '_blank';
            link.click();
        });
}

function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires='+ d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}