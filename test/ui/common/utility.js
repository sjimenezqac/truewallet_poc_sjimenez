module.exports = {

    sleep(ms) {
        return new Promise((resolve) => {
        setTimeout(resolve, ms);
        });
    },

    getGenericEmailAddress(currentDate) {
        if (currentDate === undefined || currentDate == "") {
            var date = new Date();
            currentDate = getDateStringCustom(date);
        }
        return `test${currentDate}@email.com`;
    },

    getDateStringCustom(oDate) {
        oDate = new Date();
        var sDate;
        if (oDate instanceof Date) {
            sDate = oDate.getYear() + 1900
                + ((oDate.getMonth() + 1 < 10) ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1)
                + ((oDate.getDate() < 10) ? '0' + (oDate.getDate()) : oDate.getDate())
                + ((oDate.getHours() < 10) ? '0' + (oDate.getHours()) : oDate.getHours())
                + ((oDate.getMinutes() < 10) ? '0' + (oDate.getMinutes()) : oDate.getMinutes())
                + ((oDate.getSeconds() < 10) ? '0' + (oDate.getSeconds()) : oDate.getSeconds());
        } else {
            throw new Error("oDate is not an instance of Date");
        }
        return sDate;
    }
}
// module.exports = new Utility();
