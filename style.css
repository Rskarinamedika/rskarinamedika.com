document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Menu Toggle untuk Mobile ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper'); 

    if (menuToggle && navWrapper) {
        menuToggle.addEventListener('click', () => {
            navWrapper.classList.toggle('active');
            // Ganti ikon toggle
            const icon = menuToggle.querySelector('i');
            if (navWrapper.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Ikon Tutup
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 2. Scroll Animation (Intersecting Observer) ---
    // Dipindahkan ke dalam fungsi untuk memastikan hanya berjalan setelah DOMContentLoaded
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

    // --- 3. Smooth Scroll (Ditingkatkan) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault(); // Mencegah lompatan langsung
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Hitung posisi scroll dengan mempertimbangkan sticky header
                    const headerHeight = document.querySelector('.header').offsetHeight || 70;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Tutup menu mobile setelah klik
                    if (navWrapper && navWrapper.classList.contains('active')) {
                        navWrapper.classList.remove('active');
                        document.querySelector('.menu-toggle i').classList.remove('fa-times');
                        document.querySelector('.menu-toggle i').classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // --- 4. Logic "Lihat Lainnya" Dokter (Telah diperbaiki & dioptimalkan) ---
    const btnLihatLain = document.getElementById('lihat-dokter-lain');
    const dokterLainnyaContainer = document.getElementById('dokter-lainnya');
    
    const additionalDoctors = [
        {
            img: "dr rudi.png", 
            nama: "dr. R.Rudi Ruhikmat, Sp.B",
            spesialisasi: "Spesialis Bedag",
            jadwal: "Senin-jum'at"
        },
        {
            img: "dr huda.png", 
            nama: "dr. Huda Toriq, Sp.OG",
            spesialisasi: "Spesialis Kandungan Kebidanan",
            jadwal: "Senin-jum'at"
        },
        {
            img: "dr intan.png", 
            nama: "dr Annisa Intan Sari Tamara",
            spesialisasi: "Dokter Umum",
            jadwal: "Setiap Hari"
        }
        {
            img: "dr irham.png", 
            nama: "dr Irham Rahmanurrijal",
            spesialisasi: "Dokter Umum",
            jadwal: "Setiap Hari"
        }
    ];

    if (btnLihatLain && dokterLainnyaContainer) {
        // Fungsi untuk membuat HTML card dokter
        const createDoctorCard = (dokter) => {
            return `
                <div class="dokter-card animate-on-scroll is-visible">
                    <img src="${dokter.img}" alt="${dokter.nama}">
                    <h4>${dokter.nama}</h4>
                    <p>${dokter.spesialisasi}</p>
                    <p class="jadwal-info">${dokter.jadwal}</p>
                    <button>Lihat Profile</button>
                </div>
            `;
        };
        
        btnLihatLain.addEventListener('click', () => {
            const isExpanded = dokterLainnyaContainer.classList.toggle('expanded');
            
            if (isExpanded) {
                // Isi Kontainer Dokter Tambahan
                let htmlContent = additionalDoctors.map(createDoctorCard).join('');
                dokterLainnyaContainer.innerHTML = htmlContent;
                btnLihatLain.innerHTML = "Sembunyikan Dokter"; 
            } else {
                btnLihatLain.innerHTML = "Lihat Dokter Lainnya"; 
                // Konten akan hilang setelah transisi CSS selesai (karena max-height menjadi 0)
                setTimeout(() => {
                     dokterLainnyaContainer.innerHTML = '';
                }, 800); 
            }
        });
    }

    // --- 5. Emergency Trigger (Opsional: Alert sederhana) ---
    document.querySelectorAll('.emergency-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Panggilan Darurat (EMERGENCY) di RSU Karina Medika: Segera Hubungi 0822-6197-7771. Petugas akan menghubungi Anda.");
        });
    });
});
