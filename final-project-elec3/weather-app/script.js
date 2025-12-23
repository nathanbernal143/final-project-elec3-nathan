const API_KEY = "908a8ce779112f82b5a252abb4ba675e";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const form = document.getElementById("searchForm");
const input = document.getElementById("cityInput");
const statusEl = document.getElementById("status");
const currentEl = document.getElementById("current");
const forecastEl = document.getElementById("forecast");
const themeToggle = document.getElementById("themeToggle");

initTheme();
attachEvents();
prefillCityFromURL();

async function fetchWeather(city) {
	setStatus(`Loading weather for ${city}...`);
	try {
		const [currentRes, forecastRes] = await Promise.all([
			fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`),
			fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`)
		]);

		if (!currentRes.ok) throw new Error("City not found or API error.");
		if (!forecastRes.ok) throw new Error("Forecast unavailable.");

		const currentData = await currentRes.json();
		const forecastData = await forecastRes.json();

		renderCurrent(currentData);
		renderForecast(pickDailyForecasts(forecastData.list));
		setStatus(`Showing results for ${currentData.name}, ${currentData.sys.country}`);
	} catch (err) {
		console.error(err);
		setStatus(err.message || "Something went wrong.", true);
		currentEl.innerHTML = "";
		forecastEl.innerHTML = "";
	}
}

function renderCurrent(data) {
	const temp = Math.round(data.main.temp);
	const feels = Math.round(data.main.feels_like);
	const icon = data.weather?.[0]?.icon;
	const desc = data.weather?.[0]?.description || "";
	const wind = Math.round(data.wind?.speed ?? 0);
	const humidity = data.main?.humidity ?? 0;

	currentEl.innerHTML = `
		<div class="current">
			<div>
				<p class="note">${new Date().toLocaleString()}</p>
				<h2>${data.name}</h2>
				<div class="current__meta">
					<span>Wind ${wind} m/s</span>
					<span>Humidity ${humidity}%</span>
				</div>
			</div>
			<div class="current__temp">${temp}&deg;C</div>
			<div class="current__icon" aria-label="${desc}">
				${icon ? `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">` : ""}
				<p class="note" style="text-transform: capitalize;">${desc}</p>
				<p class="note">Feels like ${feels}&deg;C</p>
			</div>
		</div>
	`;
}

function pickDailyForecasts(list = []) {
	const byDay = new Map();
	list.forEach(item => {
		const date = new Date(item.dt * 1000);
		const dayKey = date.toISOString().split("T")[0];
		const isNoon = date.getHours() === 12;
		if (!byDay.has(dayKey) || isNoon) byDay.set(dayKey, item);
	});

	return Array.from(byDay.values())
		.slice(0, 5)
		.map(entry => ({
			date: new Date(entry.dt * 1000),
			temp: Math.round(entry.main.temp),
			desc: entry.weather?.[0]?.description || "",
			icon: entry.weather?.[0]?.icon,
			wind: Math.round(entry.wind?.speed ?? 0),
			humidity: entry.main?.humidity ?? 0
		}));
}

function renderForecast(days) {
	if (!days.length) {
		forecastEl.innerHTML = "<p class=note>No forecast data.</p>";
		return;
	}

	forecastEl.innerHTML = days
		.map(day => {
			const weekday = day.date.toLocaleDateString(undefined, { weekday: "short" });
			const monthDay = day.date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
			return `
				<div class="card" aria-label="${weekday} ${monthDay} forecast">
					<h3>${weekday}</h3>
					<p class="note">${monthDay}</p>
					<div class="card__icon">
						${day.icon ? `<img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.desc}">` : ""}
					</div>
					<div class="card__temp">${day.temp}&deg;C</div>
					<p class="card__meta" style="text-transform: capitalize;">${day.desc}</p>
					<p class="card__meta">Wind ${day.wind} m/s · Humidity ${day.humidity}%</p>
				</div>
			`;
		})
		.join("");
}

function setStatus(message, isError = false) {
	statusEl.textContent = message;
	statusEl.style.color = isError ? "#ef4444" : "var(--muted)";
}

function attachEvents() {
	form.addEventListener("submit", evt => {
		evt.preventDefault();
		const city = input.value.trim();
		if (!city) return;
		fetchWeather(city);
	});

	themeToggle.addEventListener("click", () => {
		const next = document.body.classList.toggle("dark") ? "dark" : "light";
		localStorage.setItem("theme", next);
	});
}

function initTheme() {
	const saved = localStorage.getItem("theme");
	const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
	if (saved === "dark" || (!saved && prefersDark)) {
		document.body.classList.add("dark");
	}
}

function prefillCityFromURL() {
	const params = new URLSearchParams(window.location.search);
	const cityParam = params.get("city") || "";
	if (cityParam) input.value = cityParam;
	const initialCity = cityParam || "Lingayen, Pangasinan";
	fetchWeather(initialCity);
}
