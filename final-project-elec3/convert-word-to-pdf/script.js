const ENDPOINT = "https://v2.convertapi.com/convert/docx/to/pdf";
const SAMPLE_URL = "https://file-examples.com/storage/fe1dc762ed0a3230b948e57843b4374e/file-example_DOCX_1.docx";

const form = document.getElementById("convertForm");
const authInput = document.getElementById("auth");
const fileInput = document.getElementById("file");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const downloadLink = document.getElementById("downloadLink");
const sampleBtn = document.getElementById("sampleBtn");
const themeToggle = document.getElementById("themeToggle");

restoreAuth();
initTheme();
wireEvents();

function wireEvents() {
	form.addEventListener("submit", evt => {
		evt.preventDefault();
		const auth = authInput.value.trim();
		const file = fileInput.files?.[0];

		if (!auth) {
			setStatus("Enter your ConvertAPI token or secret.", true);
			return;
		}

		if (!file) {
			setStatus("Choose a DOCX file to convert.", true);
			return;
		}

		persistAuth(auth);
		convertFile(file, auth);
	});

	sampleBtn.addEventListener("click", async () => {
		setStatus("Fetching sample DOCX...");
		try {
			const res = await fetch(SAMPLE_URL);
			if (!res.ok) throw new Error("Could not fetch sample file.");
			const blob = await res.blob();
			const file = new File([blob], "sample.docx", { type: blob.type || "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
			const dt = new DataTransfer();
			dt.items.add(file);
			fileInput.files = dt.files;
			setStatus("Sample file loaded. Click convert.");
		} catch (err) {
			console.error(err);
			setStatus(err.message || "Failed to load sample file.", true);
		}
	});

	themeToggle?.addEventListener("click", () => {
		const next = document.body.classList.toggle("dark") ? "dark" : "light";
		try { localStorage.setItem("convertapi_theme", next); } catch (_) {}
	});
}

async function convertFile(file, auth) {
	setStatus(`Uploading ${file.name}...`);
	resultEl.hidden = true;

	const formData = new FormData();
	formData.append("File", file, file.name);
	// Request a temporary download URL instead of raw bytes
	formData.append("StoreFile", "True");

	try {
		const isSecret = /^sk_/i.test(auth);
		let apiUrl = ENDPOINT;
		const headers = {};

		if (isSecret) {
			// Use query parameter for Secret
			apiUrl = `${ENDPOINT}?Secret=${encodeURIComponent(auth)}`;
		} else {
			// Use Bearer token header for Token
			headers["Authorization"] = `Bearer ${auth}`;
		}

		const response = await fetch(apiUrl, {
			method: "POST",
			headers,
			body: formData
		});

		const payload = await response.json();

		if (!response.ok) {
			const msg = payload.Message || "Conversion failed.";
			const hint = /Missing credentials/i.test(msg)
				? " Add a valid ConvertAPI Token in the field."
				: "";
			throw new Error(msg + hint);
		}

		const url = payload.Files?.[0]?.Url;
		if (!url) throw new Error("No download URL returned.");

		downloadLink.href = url;
		downloadLink.download = payload.Files?.[0]?.FileName || "output.pdf";
		resultEl.hidden = false;
		setStatus("Done. Your PDF is ready.");
	} catch (err) {
		console.error(err);
		setStatus(err.message || "Something went wrong.", true);
	}
}

function setStatus(message, isError = false) {
	statusEl.textContent = message;
	statusEl.style.color = isError ? "#f87171" : "var(--muted)";
}

function persistAuth(auth) {
	try {
		localStorage.setItem("convertapi_auth", auth);
	} catch (_) {
		/* ignore */
	}
}

function restoreAuth() {
	try {
		const saved = localStorage.getItem("convertapi_auth");
		if (saved) authInput.value = saved;
	} catch (_) {
		/* ignore */
	}
}

function initTheme() {
	try {
		const saved = localStorage.getItem("convertapi_theme");
		const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
		if (saved === "dark" || (!saved && prefersDark)) {
			document.body.classList.add("dark");
		}
	} catch (_) {
		/* ignore */
	}
}
