let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let selectedDate = null;
    let selectedNDate = null;

    document.addEventListener("DOMContentLoaded", () => {
        calendar(year, month);
    });

    function prev() {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        calendar(year, month);
    }

    function next() {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        calendar(year, month);
    }

    function calendar(year, month) {
        const getMonth = document.getElementById("month");
        const getCalendar = document.getElementById("calendar");

        const monthname = [
            "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
        ];

        getMonth.textContent = `${year} 年 ${monthname[month]}`;
        getCalendar.innerHTML = "";

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const cell = document.createElement("div");
            getCalendar.appendChild(cell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement("div");
            cell.textContent = day;
            cell.classList.add("calendar-day");
            if (selectedDate) {

                cell.style.pointerEvents = "none";
            }
            cell.onclick = () => selectDate(year, month, day, cell);
            getCalendar.appendChild(cell);
        }
    }

    function selectDate(year, month, day, cell) {
        if (selectedDate === null && selectedNDate === null) {
            const dateInput = document.getElementById("date");
            const dateNTInput = document.getElementById("date-nt");
            selectedDate = { year, month, day };

            dateInput.value = `${year}-${month + 1}-${day}`;
            dateNTInput.value = `${year}-${month + 1}-${day}`;
            cell.style.backgroundColor = "gray";
            cell.style.color = "white";
        } else if (selectedDate !== null && selectedNDate === null) {
            const dateNTInput = document.getElementById("date-nt");
            selectedNDate = { year, month, day };

            dateNTInput.value = `${year}-${month + 1}-${day}`;

            const allCells = document.querySelectorAll(".calendar-day");
            allCells.forEach((cell) => {
                const cellDay = parseInt(cell.textContent);
                if (
                    selectedDate.year === year &&
                    selectedDate.month === month &&
                    cellDay >= selectedDate.day &&
                    cellDay <= day
                ) {
                    cell.style.backgroundColor = "gray";
                    cell.style.color = "white";
                }
            });
        } else {
            alert("您已選擇入住日期範圍，請按取消重設以重新選擇日期。");
        }
    }

    document.getElementById("cancel").addEventListener("click", () => {
        selectedDate = null;
        selectedNDate = null;

        const allCells = document.querySelectorAll(".calendar-day");
        allCells.forEach((cell) => {
            cell.style.backgroundColor = "";
            cell.style.color = "";
        });

        // 清空輸入框內容
        document.getElementById("date").value = "";
        document.getElementById("date-nt").value = "";
    });



    document.getElementById("auto-generate").addEventListener("click", () => {
        const roomNumber = `R${Math.floor(Math.random() * 100) + 1}`;
        document.getElementById("room-number").value = roomNumber;
    });

    // document.getElementById("select-room").addEventListener("click", () => {
    //     alert("選擇房號的功能尚未實作");
    // });