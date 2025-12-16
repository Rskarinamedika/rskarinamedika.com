document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Menu Toggle untuk Mobile ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper'); 
    const headerElement = document.querySelector('.header'); // Ambil elemen header

    if (menuToggle && navWrapper && headerElement) {
        menuToggle.addEventListener('click', () => {
            navWrapper.classList.toggle('active');
            // Ganti ikon toggle
            const icon = menuToggle.querySelector('i');
            if (navWrapper.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Ikon Tutup (X)
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 2. Scroll Animation (Intersecting Observer) ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // HANYA unobserve jika elemen bukan bagian dari konten dinamis (opsional)
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 
    });

    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
    });

    // --- 3. Smooth Scroll (Ditingkatkan) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault(); 
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = headerElement ? headerElement.offsetHeight : 70; // Pastikan header ada
                    const targetPosition = targetElement.offsetTop - headerHeight + 1; // Tambah 1px agar tidak menempel

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Tutup menu mobile setelah klik
                    if (navWrapper && navWrapper.classList.contains('active')) {
                        navWrapper.classList.remove('active');
                        // Pastikan ikon kembali ke fa-bars
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // --- 4. Logic "Lihat Lainnya" Dokter (Diperbaiki) ---
    // Menggunakan ID yang benar dari HTML: btn-lihat-dokter-lainnya dan dokter-tambahan-container
    const btnLihatLain = document.getElementById('btn-lihat-dokter-lainnya');
    const dokterTambahanContainer = document.getElementById('dokter-tambahan-container');
    
    // Data tambahan telah dirapikan (menghapus koma berlebihan)
    const additionalDoctors = [
        {
            img: "dr rudi.png", 
            nama: "dr. R.Rudi Ruhikmat, Sp.B",
            spesialisasi: "Spesialis Bedah",
            jadwal: "Senin-Jum'at"
        },
        {
            img: "dr huda.png", 
            nama: "dr. Huda Toriq, Sp.OG",
            spesialisasi: "Spesialis Kandungan Kebidanan",
            jadwal: "Senin-Jum'at"
        },
        {
            img: "dr intan.png", 
            nama: "dr Annisa Intan Sari Tamara",
            spesialisasi: "Dokter Umum",
            jadwal: "Setiap Hari"
        }, 
        {
            img: "dr irham.png", 
            nama: "dr Irham Rahmanurrijal",
            spesialisasi: "Dokter Umum",
            jadwal: "Setiap Hari"
        }
    ];

    if (btnLihatLain && dokterTambahanContainer) {
        // Fungsi untuk membuat HTML card dokter
        const createDoctorCard = (dokter) => {
            return `
                <div class="dokter-card animate-on-scroll">
                    <img src="${dokter.img}" alt="${dokter.nama}">
                    <h4>${dokter.nama}</h4>
                    <p>${dokter.spesialisasi}</p>
                    <p class="jadwal-info">${dokter.jadwal}</p>
                    <button>Lihat Profile</button>
                </div>
            `;
        };
        
        btnLihatLain.addEventListener('click', () => {
            // Menggunakan variabel kontainer yang sudah diperbaiki
            const isExpanded = dokterTambahanContainer.classList.toggle('expanded');
            
            if (isExpanded) {
                // Isi Kontainer Dokter Tambahan
                let htmlContent = additionalDoctors.map(createDoctorCard).join('');
                dokterTambahanContainer.innerHTML = htmlContent;
                btnLihatLain.innerHTML = "Sembunyikan Dokter"; 
                
                 // Mengamati elemen baru agar animasi 'animate-on-scroll' bekerja
                 dokterTambahanContainer.querySelectorAll('.animate-on-scroll').forEach(section => {
                    observer.observe(section);
                });

            } else {
                btnLihatLain.innerHTML = "Lihat Dokter Lainnya"; 
                // Konten hilang setelah transisi CSS (800ms)
                setTimeout(() => {
                     dokterTambahanContainer.innerHTML = '';
                }, 800); 
            }
        });
    }

    // --- 5. Emergency Trigger (Alert sederhana) ---
    document.querySelectorAll('.emergency-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Panggilan Darurat (EMERGENCY) di RSU Karina Medika: Segera Hubungi 0822-6197-7771. Petugas akan menghubungi Anda.");
        });
    });
});
