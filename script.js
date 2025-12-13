document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Menu Toggle untuk Mobile ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }

    // --- 2. Scroll Animation (Intersecting Observer) ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Hentikan pengamatan setelah elemen terlihat
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // Mulai muncul saat 10% elemen terlihat
    });

    // Amati semua elemen dengan class 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
    });

    // --- 3. Smooth Scroll (Opsional) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
                // Tutup menu mobile setelah klik
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                }
            }
        });
    });

    // --- 4. Logic "Lihat Lainnya" Dokter ---
    const btnLihatLain = document.getElementById('lihat-dokter-lain');
    const dokterLainnyaContainer = document.getElementById('dokter-lainnya');
    
    // Data Dokter Tambahan (Contoh Jadwal)
    const additionalDoctors = [
        {
            img: "dr-spesialis-jantung.jpg", // Pastikan gambar ini ada di folder
            nama: "dr. Sinta, Sp.JP",
            spesialisasi: "Spesialis Jantung",
            jadwal: "Senin & Rabu, 14.00 - 16.00"
        },
        {
            img: "dr-spesialis-kulit.jpg", // Pastikan gambar ini ada di folder
            nama: "dr. Agung, Sp.KK",
            spesialisasi: "Spesialis Kulit & Kelamin",
            jadwal: "Selasa & Kamis, 10.00 - 12.00"
        },
        {
            img: "dr-spesialis-mata.jpg", // Pastikan gambar ini ada di folder
            nama: "dr. Maya, Sp.M",
            spesialisasi: "Spesialis Mata",
            jadwal: "Jumat, 08.00 - 11.00"
        }
    ];

    if (btnLihatLain && dokterLainnyaContainer) {
        btnLihatLain.addEventListener('click', () => {
            const isExpanded = dokterLainnyaContainer.classList.toggle('expanded');
            
            if (isExpanded) {
                // Isi Kontainer Dokter Tambahan
                let htmlContent = '';
                additionalDoctors.forEach(dokter => {
                    htmlContent += `
                        <div class="dokter-card animate-on-scroll is-visible">
                            <img src="${dokter.img}" alt="${dokter.nama}">
                            <h4>${dokter.nama}</h4>
                            <p>${dokter.spesialisasi}</p>
                            <p class="jadwal-info">${dokter.jadwal}</p>
                            <button>Lihat Profile</button>
                        </div>
                    `;
                });
                dokterLainnyaContainer.innerHTML = htmlContent;
                btnLihatLain.innerHTML = "Sembunyikan Dokter"; // Label diubah
            } else {
                // Beri waktu untuk transisi sebelum mengosongkan konten
                setTimeout(() => {
                    dokterLainnyaContainer.innerHTML = ''; 
                }, 800); // Harus sama atau lebih besar dari transisi CSS max-height
                btnLihatLain.innerHTML = "Lihat Dokter Lainnya"; // Label diubah
            }
        });
    }
});