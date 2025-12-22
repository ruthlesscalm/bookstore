const masks = Array.from(document.getElementsByClassName("mask"));
const bookLists = Array.from(document.getElementsByClassName("booksContainer"));
const leftBtns = Array.from(document.getElementsByClassName("btn-left"));
const rightBtns = Array.from(document.getElementsByClassName("btn-right"));

masks.forEach((mask, index) => {
    const bookList = bookLists[index];
    const leftBtn = leftBtns[index];
    const rightBtn = rightBtns[index];
    const maxScroll = bookList.scrollWidth - bookList.clientWidth;
    
    function buttonsVisibility() {
        let currentScroll = bookList.scrollLeft;

        if(maxScroll <= 0) {
            mask.className = "mask";
            leftBtn.style.display = "none";
            rightBtn.style.display = "none";
            return;
        }

        if (currentScroll <= 10) {
            mask.className = "mask fade-right";
            leftBtn.style.display = "none";
            rightBtn.style.display = "inline-block";
        }
        else if (currentScroll >= maxScroll - 10) {
            mask.className = "mask fade-left";
            rightBtn.style.display = "none";
            leftBtn.style.display = "inline-block";
        }
        else {
            mask.className = "mask fade-both";
            leftBtn.style.display = "inline-block";
            rightBtn.style.display = "inline-block";
        }
    }
    buttonsVisibility();
    window.addEventListener("resize", buttonsVisibility);
    bookList.addEventListener("scroll", buttonsVisibility);

    function scrollAmount() {
        let list = bookList.getElementsByTagName("li")[0];
        let ul = bookList.getElementsByTagName("ul")[0];
        if(!list) return 0;

        let width = list.offsetWidth;
        let style = window.getComputedStyle(ul);
        let gap = (style.columnGap || style.gap) || 0;
        let totalWidth = width + parseFloat(gap);
        let calc = (Math.floor(bookList.clientWidth / totalWidth) * totalWidth);
        let cond = (Math.floor(bookList.clientWidth / totalWidth) > 5 ? totalWidth * 2: totalWidth);
        return calc - cond;
    }

    let isScrolling = false;
    function smoothScroll(amount) {
        if (isScrolling) return;
        isScrolling = true;

        bookList.scrollTo({
            left: bookList.scrollLeft + amount,
            behavior: "smooth"
        })
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }

    leftBtn.addEventListener("click", () => {
        smoothScroll(-scrollAmount());
    });
    rightBtn.addEventListener("click", () => {
        smoothScroll(scrollAmount());
    });
});