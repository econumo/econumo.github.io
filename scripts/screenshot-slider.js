document.addEventListener('DOMContentLoaded', function () {
    const deviceSelector = document.querySelector('.device-selector');
    const devicePreview = document.getElementById('devicePreview');
    const screenshotSelector = document.querySelector('.screenshot-selector');
    let autoSlideInterval;

    deviceSelector.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            if (e.target.classList.contains('active')) {
                return;
            }
            const selectedDevice = e.target.getAttribute('data-device');

            document.querySelector('.device-selector li.active').classList.remove('active');
            e.target.classList.add('active');

            const currentGroup = document.querySelector('.screenshot-group.active');
            currentGroup.classList.remove('active');

            devicePreview.className = 'device-preview ' + selectedDevice;

            setTimeout(() => {
                const newGroup = document.querySelector(`.screenshot-group.screenshot-${selectedDevice}`);
                newGroup.classList.add('active');
                updateScreenshotSelector(selectedDevice);
                showFirstScreenshot();
            }, 500);
        }
    });

    screenshotSelector.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            const screenshotIndex = e.target.getAttribute('data-screenshot');
            showScreenshot(screenshotIndex);
            resetAutoSlide();
        }
    });

    function updateScreenshotSelector(device) {
        const screenshotGroup = document.querySelector(`.screenshot-group.screenshot-${device}`);
        const screenshotCount = screenshotGroup.querySelectorAll('img').length;
        const selectorHTML = Array.from({ length: screenshotCount }, (_, i) => 
            `<li ${i === 0 ? 'class="active"' : ''} data-screenshot="${i + 1}"></li>`).join('');
        screenshotSelector.innerHTML = selectorHTML;
    }

    function showFirstScreenshot() {
        const activeGroup = document.querySelector('.screenshot-group.active');
        activeGroup.querySelector('img.active').classList.remove('active');
        activeGroup.querySelector('img:first-child').classList.add('active');
        screenshotSelector.querySelector('li.active').classList.remove('active');
        screenshotSelector.querySelector('li:first-child').classList.add('active');
        resetAutoSlide();
    }

    function showScreenshot(index) {
        const activeGroup = document.querySelector('.screenshot-group.active');
        activeGroup.querySelector('img.active').classList.remove('active');
        activeGroup.querySelector(`img:nth-child(${index})`).classList.add('active');
        screenshotSelector.querySelector('li.active').classList.remove('active');
        screenshotSelector.querySelector(`li[data-screenshot="${index}"]`).classList.add('active');
    }

    function autoSlide() {
        const activeGroup = document.querySelector('.screenshot-group.active');
        let currentIndex = Array.from(activeGroup.querySelectorAll('img')).findIndex(img => img.classList.contains('active'));
        const nextIndex = (currentIndex + 1) % activeGroup.querySelectorAll('img').length + 1;
        showScreenshot(nextIndex);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(autoSlide, 5000);
    }

    updateScreenshotSelector('desktop');
    resetAutoSlide();
});