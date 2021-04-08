document.addEventListener("mousemove", parallax);

function parallax(e) {
    this.querySelectorAll('.layer').forEach(layer => {
        const speed = layer.getAttribute('data-speed');

        const x = (window.innerWidth - e.pageX*speed)/100;
        const y = (window.innerHeight - e.pageY*speed)/100;

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}


const collapse = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            let currentHeight = this.offsetHeight;
            let addHeight = this.childNodes[3].offsetHeight;
            let newHeight = currentHeight + addHeight;

            if(this.offsetHeight == '70') {
                btn.style.height = `${newHeight}px`;
                this.childNodes[3].classList.toggle('descr-active');
                this.childNodes[1].childNodes[3].classList.toggle('arrow');
            } else {
                btn.style.height = `70px`;
                this.childNodes[3].classList.toggle('descr-active');
                this.childNodes[1].childNodes[3].classList.toggle('arrow');
            }
            
            
        });
    });
};

collapse('.rules__block');


const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function(e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// sending forms to email

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    const message = {
        loading: 'Loading...',
        success: 'Message sent',
        failure: 'Something went wrong...'
    };

    const postData = async (url, data) => {
        // document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            // item.appendChild(statusMessage);

            const formData = new FormData(item);

            postData('server.php', formData)
                .then(res => {
                    console.log(res);
                    // statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

forms();