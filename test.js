
const d = new Date();
const currentMonth = d.getMonth();

if(d.getDay() === 1) {  
    d.setDate(d.getDate - 7);
    if (currentMonth === d.getMonth()) {
        return true;
    } else return false;
}

return false;