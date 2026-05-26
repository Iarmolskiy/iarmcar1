document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.anim-on-scroll').forEach((el) => observer.observe(el));

    const backToTopBtn = document.getElementById('backToTop');
    const scrollArrow = document.getElementById('scrollArrow');

    window.addEventListener('scroll', function () {
        const scrolled = window.scrollY;
        if (backToTopBtn) backToTopBtn.classList.toggle('show', scrolled > 400);
        if (scrollArrow) scrollArrow.classList.toggle('scroll-hidden', scrolled > 50);
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const carData = {
        "Audi": ["A4", "A5", "A6", "A7", "Q5", "Q7", "Q8"],
        "BMW": ["3 Series", "5 Series", "7 Series", "X5", "X6", "X7"],
        "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLE", "GLS", "GLC"],
        "Porsche": ["911", "Macan", "Cayenne", "Panamera", "Taycan"],
        "Lexus": ["IS", "ES", "LS", "NX", "RX", "LX"]
    };

    const yearRange = document.getElementById('yearRange');
    const yearValue = document.getElementById('yearValue');
    const brandInput = document.getElementById('brandInput');
    const modelInput = document.getElementById('modelInput');
    const modelList = document.getElementById('modelList');
    const modelContainer = document.getElementById('modelContainer');

    if (yearRange && yearValue) {
        yearRange.addEventListener('input', function () {
            yearValue.textContent = this.value;
        });
    }

    document.querySelectorAll('#brandList span').forEach((span) => {
        span.addEventListener('click', function () {
            const brand = this.dataset.value;
            if (!brandInput) return;

            brandInput.value = brand;

            if (modelContainer) modelContainer.classList.remove('disabled');
            if (modelList) modelList.innerHTML = '';

            if (modelInput) {
                modelInput.value = '';
                modelInput.placeholder = 'Оберіть модель';
            }

            if (modelList && carData[brand]) {
                carData[brand].forEach((model) => {
                    const item = document.createElement('span');
                    item.textContent = model;
                    item.addEventListener('click', function () {
                        modelInput.value = model;
                        closeAllDropdowns();
                    });
                    modelList.appendChild(item);
                });
            }

            closeAllDropdowns();
        });
    });

    document.querySelectorAll('.dropdown-list span').forEach((span) => {
        span.addEventListener('click', function () {
            const input = this.closest('.dropdown-container')?.querySelector('input');
            if (input && input !== brandInput && input !== modelInput) {
                input.value = this.innerText;
                closeAllDropdowns();
            }
        });
    });

    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-list').forEach((list) => {
            list.style.display = 'none';
            setTimeout(() => {
                list.style.display = '';
            }, 100);
        });
    }

    const clearBtn = document.getElementById('clearFilters');

    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            const priceField = document.getElementById('priceInput');
            const mileageField = document.getElementById('mileageInput');
            const fuelField = document.getElementById('fuelInput');

            if (brandInput) brandInput.value = '';
            if (modelInput) {
                modelInput.value = '';
                modelInput.placeholder = 'Спочатку марку';
            }
            if (priceField) priceField.value = '';
            if (mileageField) mileageField.value = '';
            if (fuelField) fuelField.value = '';

            if (yearRange) yearRange.value = 2015;
            if (yearValue) yearValue.textContent = 2015;

            if (modelContainer) modelContainer.classList.add('disabled');
        });
    }

    const carImages = {
        // Audi
        "Audi A4": ["foto/AudiA4.png"],
        "Audi A5": ["foto/AudiA5.png"],
        "Audi A6": ["foto/AudiA6.png"],
        "Audi A7": ["foto/AudiA7.png"],
        "Audi Q5": ["foto/AudiQ5.png"],
        "Audi Q7": ["foto/AudiQ7.png"],
        "Audi Q8": ["foto/AudiQ8.png"],

        // BMW
        "BMW 3 Series": ["foto/BMW3Series.png"],
        "BMW 5 Series": ["foto/BMW5Series.png"],
        "BMW 7 Series": ["foto/BMW7Series.png"],
        "BMW X5": ["foto/BMWX5.png"],
        "BMW X6": ["foto/BMWX6.png"],
        "BMW X7": ["foto/BMWX7.png"],

        // Mercedes-Benz
        "Mercedes-Benz C-Class": ["foto/MercedesCClass.png"],
        "Mercedes-Benz E-Class": ["foto/MercedesEClass.png"],
        "Mercedes-Benz S-Class": ["foto/MercedesSClass.png"],
        "Mercedes-Benz GLE": ["foto/MercedesGLE.png"],
        "Mercedes-Benz GLS": ["foto/MercedesGLS.png"],
        "Mercedes-Benz GLC": ["foto/MercedesGLC.png"],

        // Porsche
        "Porsche 911": ["foto/Porsche911.png"],
        "Porsche Macan": ["foto/PorscheMacan.png"],
        "Porsche Cayenne": ["foto/PorscheCayenne.png"],
        "Porsche Panamera": ["foto/PorschePanamera.png"],
        "Porsche Taycan": ["foto/PorscheTaycan.png"],

        // Lexus
        "Lexus IS": ["foto/LexusIS.png"],
        "Lexus ES": ["foto/LexusES.png"],
        "Lexus LS": ["foto/LexusLS.png"],
        "Lexus NX": ["foto/LexusNX.png"],
        "Lexus RX": ["foto/LexusRX.png"],
        "Lexus LX": ["foto/LexusLX.png"],

        // Запасна картинка на випадок, якщо якоїсь моделі не буде в списку
        "default": ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop"]
    };

    function generateCars() {
        const brands = {
            "Audi": ["A4", "A5", "A6", "A7", "Q5", "Q7", "Q8"],
            "BMW": ["3 Series", "5 Series", "7 Series", "X5", "X6", "X7"],
            "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLE", "GLS", "GLC"],
            "Porsche": ["911", "Macan", "Cayenne", "Panamera", "Taycan"],
            "Lexus": ["IS", "ES", "LS", "NX", "RX", "LX"]
        };

        const fuels = ["Бензин", "Дизель", "Гібрид", "Електро"];
        const transmissions = ["Механіка", "Автомат"];
        const drives = ["Передній привід", "Задній привід", "Повний привід"];

        const cars = [];

        Object.keys(brands).forEach((brand) => {
            brands[brand].forEach((model) => {
                for (let i = 0; i < 20; i++) {
                    const year = 2000 + i;
                    const price = 4200 + i * 1400 + Math.floor(Math.random() * 700);
                    const mileage = Math.max(0, 320000 - i * 12000 + Math.floor(Math.random() * 4000));

                    const key = `${brand} ${model}`;
                    // Якщо знайдено картинку в carImages — беремо її, якщо ні — беремо дефолтну
                    const modelImages = carImages[key] || carImages["default"];

                    let fuel = fuels[i % fuels.length];
                    let engine = `${(1.6 + (i % 3) * 0.4).toFixed(1)} Turbo`;
                    let body = "Седан";

                    if (
                        model.includes("Q") ||
                        model.includes("X") ||
                        model === "GLE" ||
                        model === "GLS" ||
                        model === "GLC" ||
                        model === "NX" ||
                        model === "RX" ||
                        model === "LX" ||
                        model === "Macan" ||
                        model === "Cayenne"
                    ) {
                        body = "Кросовер";
                    } else if (model === "A4" || model === "A6" || model === "5 Series" || model === "E-Class") {
                        body = i % 2 === 0 ? "Седан" : "Універсал";
                    }

                    if (brand === "Porsche" && model === "Taycan") {
                        fuel = "Електро";
                        engine = "Electric";
                    }

                    cars.push({
                        brand,
                        model,
                        year,
                        price,
                        mileage,
                        fuel,
                        image: modelImages[i % modelImages.length],
                        engine,
                        transmission: transmissions[i % transmissions.length],
                        drive: drives[i % drives.length],
                        body,
                        power: `${120 + i * 5} к.с.`,
                        description: `${brand} ${model} ${year} року — хороший варіант у своєму класі. Надійний, комфортний і популярний автомобіль.`
                    });
                }
            });
        });

        return cars;
    }

    const carsDatabase = generateCars();

    const carFilter = document.getElementById('carFilter');

    if (carFilter) {
        carFilter.addEventListener('submit', function (e) {
            e.preventDefault();

            const filters = {
                brand: document.getElementById('brandInput')?.value.trim() || '',
                model: document.getElementById('modelInput')?.value.trim() || '',
                maxPrice: document.getElementById('priceInput')?.value.trim() || '',
                year: document.getElementById('yearRange')?.value || '',
                maxMileage: document.getElementById('mileageInput')?.value.trim() || '',
                fuel: document.getElementById('fuelInput')?.value.trim() || ''
            };

            localStorage.setItem('carFilters', JSON.stringify(filters));
            window.location.href = 'results.html';
        });
    }

    const resultsContainer = document.getElementById('resultsContainer');

    if (resultsContainer) {
        const savedFilters = JSON.parse(localStorage.getItem('carFilters')) || {};
        const savedSort = localStorage.getItem('carSort') || 'best';

        const brand = (savedFilters.brand || '').trim().toLowerCase();
        const model = (savedFilters.model || '').trim().toLowerCase();
        const fuel = (savedFilters.fuel || '').trim().toLowerCase();
        const maxPrice = savedFilters.maxPrice ? Number(savedFilters.maxPrice) : null;
        const maxMileage = savedFilters.maxMileage ? Number(savedFilters.maxMileage) : null;
        const targetYear = savedFilters.year ? Number(savedFilters.year) : null;

        const hasBrand = brand.length > 0;
        const hasModel = model.length > 0;
        const hasFuel = fuel.length > 0;
        const hasPrice = maxPrice !== null && !Number.isNaN(maxPrice);
        const hasMileage = maxMileage !== null && !Number.isNaN(maxMileage);
        const hasYear = targetYear !== null && !Number.isNaN(targetYear) && targetYear !== 2015;

        const minYear = hasYear ? targetYear - 3 : null;
        const maxYearFilter = hasYear ? targetYear + 3 : null;

        let filteredCars = carsDatabase.filter((car) => {
            if (hasBrand && car.brand.toLowerCase() !== brand) return false;
            if (hasModel && car.model.toLowerCase() !== model) return false;
            if (hasFuel && car.fuel.toLowerCase() !== fuel) return false;
            if (hasPrice && car.price > maxPrice) return false;
            if (hasMileage && car.mileage > maxMileage) return false;
            if (hasYear && (car.year < minYear || car.year > maxYearFilter)) return false;
            return true;
        });

        if (hasBrand && hasModel && !hasFuel && !hasPrice && !hasMileage && !hasYear) {
            filteredCars = carsDatabase.filter((car) =>
                car.brand.toLowerCase() === brand && car.model.toLowerCase() === model
            );
        }

        if (filteredCars.length === 0) {
            resultsContainer.innerHTML = `
                <section class="no-results-section">
                    <div class="container">
                        <div class="no-results-box">
                            <i class="fas fa-search"></i>
                            <h2>За вашими параметрами нічого не знайдено</h2>
                            <p>Спробуйте змінити фільтри або розширити критерії пошуку.</p>
                            <a href="selection.html" class="btn-primary">Повернутися до підбору</a>
                        </div>
                    </div>
                </section>
            `;
            return;
        }

        const getBestScore = (car) => {
            let score = 0;
            if (hasYear) score += Math.abs(car.year - targetYear);
            if (hasPrice) score += Math.abs(car.price - maxPrice) / 1000;
            if (hasMileage) score += Math.abs(car.mileage - maxMileage) / 10000;
            return score;
        };

        const sortCars = (sortValue) => {
            if (sortValue === 'price-asc') {
                filteredCars.sort((a, b) => a.price - b.price);
            } else if (sortValue === 'price-desc') {
                filteredCars.sort((a, b) => b.price - a.price);
            } else if (sortValue === 'year-desc') {
                filteredCars.sort((a, b) => b.year - a.year);
            } else if (sortValue === 'mileage-asc') {
                filteredCars.sort((a, b) => a.mileage - b.mileage);
            } else {
                filteredCars.sort((a, b) => getBestScore(a) - getBestScore(b));
            }
        };

        sortCars(savedSort);

        const filtersText = `
            ${savedFilters.brand ? `<span class="result-filter-tag">${savedFilters.brand}</span>` : ''}
            ${savedFilters.model ? `<span class="result-filter-tag">${savedFilters.model}</span>` : ''}
            ${savedFilters.maxPrice ? `<span class="result-filter-tag">до $${Number(savedFilters.maxPrice).toLocaleString('en-US')}</span>` : ''}
            ${hasYear ? `<span class="result-filter-tag">рік: ${minYear}–${maxYearFilter}</span>` : ''}
            ${savedFilters.maxMileage ? `<span class="result-filter-tag">пробіг до ${Number(savedFilters.maxMileage).toLocaleString('uk-UA')} км</span>` : ''}
            ${savedFilters.fuel ? `<span class="result-filter-tag">${savedFilters.fuel}</span>` : ''}
        `;

        const cardsHtml = filteredCars.map((car, index) => {
            const description = car.description || `${car.brand} ${car.model} ${car.year} року — хороший і надійний автомобіль у своєму класі.`;

            // Перетворюємо об'єкт машини в рядок JSON, щоб передати його у функцію кліку
            const carJson = JSON.stringify(car).replace(/"/g, '&quot;');

            return `
                <article class="result-row-card" onclick="openCarModal('${carJson}')" style="cursor: pointer;">
                    <div class="result-row-image">
                        <img src="${car.image}" alt="${car.brand} ${car.model}">
                    </div>

                    <div class="result-row-info">
                        <div class="result-row-main">
                            <div class="result-row-head">
                                <div>
                                    ${index === 0 && savedSort === 'best' ? `<span class="result-row-badge">Найкращий варіант</span>` : ''}
                                    <h2>${car.brand} ${car.model}</h2>
                                    <p class="result-row-subtitle">${car.year} рік • ${car.engine} • ${car.fuel} • ${car.mileage.toLocaleString('uk-UA')} км</p>
                                </div>

                                <div class="result-row-price">
                                    <strong>$${car.price.toLocaleString('en-US')}</strong>
                                    <span>Середня ринкова ціна</span>
                                </div>
                            </div>

                            <div class="result-row-specs">
                                <div class="result-spec-item">
                                    <span>Коробка</span>
                                    <strong>${car.transmission}</strong>
                                </div>
                                <div class="result-spec-item">
                                    <span>Привід</span>
                                    <strong>${car.drive}</strong>
                                </div>
                                <div class="result-spec-item">
                                    <span>Кузов</span>
                                    <strong>${car.body}</strong>
                                </div>
                                <div class="result-spec-item">
                                    <span>Потужність</span>
                                    <strong>${car.power}</strong>
                                </div>
                                <div class="result-spec-item">
                                    <span>Пальне</span>
                                    <strong>${car.fuel}</strong>
                                </div>
                                <div class="result-spec-item">
                                    <span>Пробіг</span>
                                    <strong>${car.mileage.toLocaleString('uk-UA')} км</strong>
                                </div>
                            </div>

                            <div class="result-row-description">
                                <p>${description}</p>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        resultsContainer.innerHTML = `
            <div class="results-page-wrap">
                <section class="results-summary-top">
                    <div class="container results-summary-bar">
                        <div class="results-summary-left">
                            <h2>Знайдено автомобілів: ${filteredCars.length}</h2>
                            <p>Показуємо всі варіанти, які підходять під обрані параметри.</p>
                            <div class="result-filter-tags">
                                ${filtersText || '<span class="result-filter-tag">Увесь асортимент</span>'}
                            </div>
                        </div>

                        <div class="results-summary-right">
                            <div class="results-sort-box">
                                <label for="sortSelect">Сортування</label>
                                <select id="sortSelect" class="results-sort-select">
                                    <option value="best" ${savedSort === 'best' ? 'selected' : ''}>Спочатку кращі</option>
                                    <option value="price-asc" ${savedSort === 'price-asc' ? 'selected' : ''}>Спочатку дешевші</option>
                                    <option value="price-desc" ${savedSort === 'price-desc' ? 'selected' : ''}>Спочатку дорожчі</option>
                                    <option value="year-desc" ${savedSort === 'year-desc' ? 'selected' : ''}>Спочатку новіші</option>
                                    <option value="mileage-asc" ${savedSort === 'mileage-asc' ? 'selected' : ''}>Спочатку менший пробіг</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="results-list-full">
                    <div class="container">
                        <div class="results-list">
                            ${cardsHtml}
                        </div>
                    </div>
                </section>
            </div>

            <div id="carModal" class="car-modal-overlay">
                <div class="car-modal-window">
                    <button class="car-modal-close" id="closeModalBtn">&times;</button>
                    <div id="modalCarContent"></div>
                </div>
            </div>
        `;

        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', function () {
                localStorage.setItem('carSort', this.value);
                location.reload();
            });
        }

        // Функція для відкриття модального вікна (БЕЗ КНОПКИ БРОНЮВАННЯ)
        window.openCarModal = function(carDataString) {
            const car = JSON.parse(carDataString);
            const modal = document.getElementById('carModal');
            const contentContainer = document.getElementById('modalCarContent');

            contentContainer.innerHTML = `
                <div class="modal-car-grid">
                    <div class="modal-car-image-side">
                        <img src="${car.image}" alt="${car.brand} ${car.model}">
                    </div>
                    <div class="modal-car-info-side">
                        <span class="modal-car-badge">Детальна специфікація</span>
                        <h2>${car.brand} ${car.model}</h2>
                        <div class="modal-car-price">$${car.price.toLocaleString('en-US')}</div>
                        
                        <div class="modal-specs-list">
                            <div class="modal-spec-row"><span>Рік випуску:</span><strong>${car.year}</strong></div>
                            <div class="modal-spec-row"><span>Пробіг:</span><strong>${car.mileage.toLocaleString('uk-UA')} км</strong></div>
                            <div class="modal-spec-row"><span>Тип пального:</span><strong>${car.fuel}</strong></div>
                            <div class="modal-spec-row"><span>Двигун:</span><strong>${car.engine}</strong></div>
                            <div class="modal-spec-row"><span>Коробка передач:</span><strong>${car.transmission}</strong></div>
                            <div class="modal-spec-row"><span>Привід:</span><strong>${car.drive}</strong></div>
                            <div class="modal-spec-row"><span>Тип кузова:</span><strong>${car.body}</strong></div>
                            <div class="modal-spec-row"><span>Потужність:</span><strong>${car.power}</strong></div>
                        </div>

                        <div class="modal-car-desc">
                            <h3>Опис моделі</h3>
                            <p>${car.description}</p>
                        </div>
                    </div>
                </div>
            `;

            modal.classList.add('modal-active');
            document.body.style.overflow = 'hidden'; // Забороняємо гортати головну сторінку під вікном
        };

        // Логіка закриття вікна
        document.addEventListener('click', function(e) {
            const modal = document.getElementById('carModal');
            if (!modal) return;
            
            if (e.target.id === 'closeModalBtn' || e.target === modal) {
                modal.classList.remove('modal-active');
                document.body.style.overflow = ''; // Повертаємо скрол сторінки
            }
        });
        // Логіка закриття вікна (перевір, щоб цей шматок коду стояв у тебе в script.js)
        document.addEventListener('click', function(e) {
            const modal = document.getElementById('carModal');
            if (!modal) return;
            
            if (e.target.id === 'closeModalBtn' || e.target === modal) {
                modal.classList.remove('modal-active');
                document.body.style.overflow = ''; // Повертаємо скрол головної сторінки
            }
        });
    }
});