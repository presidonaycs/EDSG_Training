export function getCurrentDate() {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var date_time = new Date();

    var d = new Date(date_time.toUTCString());
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    var date = days[date_time.getDay()] + ", " + monthNames[date_time.getMonth()] + ", " + date_time.getFullYear() + " " + hh + ":" + m + ":" + s;

    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh - 12;
        dd = "PM";
    }
    if (h === 0) {
        h = 12;
    }
    m = m < 10 ? "0" + m : m;

    s = s < 10 ? "0" + s : s;

    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */

    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);

    var replacement = h + ":" + m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    replacement += " " + dd;

    return date.replace(pattern, replacement);
}


export function dateDiff(dateold, datenew) {
    var ynew = datenew.getFullYear();
    var mnew = datenew.getMonth();
    var dnew = datenew.getDate();
    var yold = dateold.getFullYear();
    var mold = dateold.getMonth();
    var dold = dateold.getDate();
    var diff = ynew - yold;
    if (mold > mnew) diff--;
    else {
        if (mold === mnew) {
            if (dold > dnew) diff--;
        }
    }
    return diff;
}

export function Age(birthday) {
    birthday = new Date(birthday);
    // eslint-disable-next-line no-new-wrappers
    return new Number((new Date().getTime() - birthday.getTime()) / 31536000000).toFixed(0);
}

export function GetDateValue(value) {
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var date_time = new Date(value);

    var date = date_time.getDay() + ", " + monthNames[date_time.getMonth()] + " " + date_time.getFullYear();

    return date;
}