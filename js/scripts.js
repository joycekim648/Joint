
document.addEventListener('DOMContentLoaded', () => {
	// Smooth scroll for internal links
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

	// Simple email input handling for standalone send buttons
	document.querySelectorAll('button[type="submit"]').forEach(btn => {
		btn.addEventListener('click', (e) => {
			// find nearest input[type=email] sibling or nearby
			const parent = btn.parentElement;
			const emailInput = parent.querySelector('input[type="email"]') || document.querySelector('input[type="email"]');
			if (!emailInput) return;
			const email = emailInput.value.trim();
			if (!email) {
				e.preventDefault();
				alert('Please enter an email address.');
				emailInput.focus();
				return;
			}
			// basic email pattern check
			const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!re.test(email)) {
				e.preventDefault();
				alert('Please enter a valid email address.');
				emailInput.focus();
				return;
			}
			// feedback (no real submission in this simple site)
			e.preventDefault();
			alert('Thanks! We will contact ' + email + '.');
			emailInput.value = '';
		});
	});
});
