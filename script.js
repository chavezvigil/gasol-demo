document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Smooth fade-in animation for products
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const products = document.querySelectorAll('.product-card');
    products.forEach((product, index) => {
        // Initial state
        product.style.opacity = '0';
        product.style.transform = 'translateY(30px)';
        product.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(product);
    });

    // 4. Product Modal Logic
    const modal = document.getElementById('product-modal');
    const closeBtn = document.getElementById('modal-close');
    const detailButtons = document.querySelectorAll('.view-details');

    const mTitle = document.getElementById('modal-title');
    const mDesc = document.getElementById('modal-desc');
    const mImg = document.getElementById('modal-img');
    const mTag = document.getElementById('modal-tag');
    const mWhatsapp = document.getElementById('modal-whatsapp-btn');

    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Populate Modal
            mTitle.textContent = btn.getAttribute('data-title');
            mDesc.textContent = btn.getAttribute('data-desc');
            mImg.src = btn.getAttribute('data-img');
            mTag.textContent = btn.getAttribute('data-tag');
            
            const message = btn.getAttribute('data-whatsapp');
            mWhatsapp.href = `https://api.whatsapp.com/send?phone=50377279203&text=${encodeURIComponent(message)}`;

            // Show Modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent bg scroll
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});
