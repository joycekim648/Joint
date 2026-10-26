document.addEventListener('DOMContentLoaded', () => {

	const yearEl = document.getElementById('year');
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear();
	}

	
	document.querySelectorAll('a[href^="#"]').forEach(a => {
		a.addEventListener('click', (e) => {
			const targetId = a.getAttribute('href').slice(1);
			const target = document.getElementById(targetId);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});

	// ---- Active nav highlighting on scroll ----
	const navLinks = document.querySelectorAll('.links a[href^="#"]');
	const sections = Array.from(navLinks)
		.map(link => document.getElementById(link.getAttribute('href').slice(1)))
		.filter(Boolean);

	if (sections.length && 'IntersectionObserver' in window) {
		const navObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				const id = entry.target.getAttribute('id');
				const link = document.querySelector(`.links a[href="#${id}"]`);
				if (!link) return;
				if (entry.isIntersecting) {
					navLinks.forEach(l => l.classList.remove('active'));
					link.classList.add('active');
				}
			});
		}, {
			rootMargin: '-40% 0px -55% 0px', // triggers when section is roughly centered in viewport
			threshold: 0
		});

		sections.forEach(section => navObserver.observe(section));
	}

	
	const fadeTargets = document.querySelectorAll('main > section, main > p');
	if (fadeTargets.length && 'IntersectionObserver' in window) {
		const fadeObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		}, {
			threshold: 0.15
		});

		fadeTargets.forEach(el => {
			el.classList.add('fade-in');
			fadeObserver.observe(el);
		});
	} else {
		
		fadeTargets.forEach(el => el.classList.add('is-visible'));
	}

	document.querySelectorAll('button[type="submit"]').forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();

			const parent = btn.closest('li') || btn.parentElement;
			const emailInput = parent.querySelector('input[type="email"]') || document.querySelector('input[type="email"]');
			if (!emailInput) return;

			const email = emailInput.value.trim();
			if (!email) {
				alert('Please enter an email address.');
				emailInput.focus();
				return;
			}

			const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!re.test(email)) {
				alert('Please enter a valid email address.');
				emailInput.focus();
				return;
			}

			
			alert('Thanks! We will contact ' + email + '.');
			emailInput.value = '';
		});
	});

});