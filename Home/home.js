        /* ---------- PRELOADER ---------- */
        window.addEventListener('load', () => {
            const pre = document.getElementById('preloader');
            const main = document.querySelector('.main-content-wrapper');
            pre.classList.add('fade-out');
            setTimeout(() => { pre.style.display = 'none'; main.classList.add('show') }, 800);
        });

        /* ---------- HEADER SCROLL ---------- */
        addEventListener('scroll', () => {
            document.querySelector('header').classList.toggle('scrolled', scrollY > 50);
        });

        /* ---------- MOBILE MENU ---------- */
        const toggle = document.querySelector('.menu-toggle');
        const menu = document.querySelector('.mobile-menu');
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
        });
        menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        }));
        document.addEventListener('click', e => {
            if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
                toggle.classList.remove('active');
                menu.classList.remove('active');
            }
        });

        /* ---------- MODAL ---------- */
        function openModal(id) {
            document.getElementById(id).classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeModal(id) {
            document.getElementById(id).classList.remove('active');
            document.body.style.overflow = '';
        }
