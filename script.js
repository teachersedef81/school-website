const books = [
    {
        id: 1,
        title: "İnce Memed",
        author: "Yaşar Kemal",
        category: "Roman",
        cover: "images/incememed.jpeg",
        description: "İnce Memed, Yaşar Kemal'in ilk kez 1955'te yayımlanan ve yazarın başyapıtı kabul edilen romandır. Çukurova'da geçen olaylar, ağalık düzenini ve köylülerin çektikleri sıkıntıları anlatır.",
        available: true
    },
    {
        id: 2,
        title: "Kürk Mantolu Madonna",
        author: "Sabahattin Ali",
        category: "Roman",
        cover: "images/kürk.jpeg",
        description: "Kürk Mantolu Madonna, Sabahattin Ali'nin 1943 yılında yayımladığı, aşk ve yalnızlık temalarını işleyen bir romandır.",
        available: true
    },
    {
        id: 3,
        title: "Cosmos",
        author: "Carl Sagan",
        category: "Bilim",
        cover: "images/cosmos.jpg",
        description: "Cosmos, Carl Sagan tarafından yazılan ve evrenin doğasını, bilim tarihini ve insanlığın evrendeki yerini anlatan popüler bilim kitabıdır.",
        available: false
    },
    {
        id: 4,
        title: "Nutuk",
        author: "Mustafa Kemal Atatürk",
        category: "Tarih",
        cover: "images/nutuk.jpg",
        description: "Nutuk, Mustafa Kemal Atatürk'ün 15-20 Ekim 1927 tarihlerinde gerçekleştirilen Cumhuriyet Halk Partisi İkinci Kurultayı'nda okuduğu konuşma metnidir.",
        available: true
    },
    {
        id: 5,
        title: "Matematiğin Temelleri",
        author: "Ian Steward, David Tall",
        category: "Matematik",
        cover: "images/matematik.jpeg",
        description: "Matematik alanında temel kavramları ve teknikleri açıklayan, öğrenciler için hazırlanmış bir kaynak kitap.",
        available: true
    },
    {
        id: 6,
        title: "Çalıkuşu",
        author: "Reşat Nuri Güntekin",
        category: "Roman",
        cover: "images/calikusu.jpg",
        description: "Çalıkuşu, Reşat Nuri Güntekin'in 1922 yılında yazılmış, Anadolu'da öğretmenlik yapan Feride'nin hikayesini anlatan romanıdır.",
        available: false
    },
    {
        id: 7,
        title: "Sefiller",
        author: "Victor Hugo",
        category: "Edebiyat",
        cover: "images/sefiller.jpg",
        description: "Sefiller, Victor Hugo'nun 1862 yılında yayımlanmış, toplumsal adaletsizlik, yoksulluk ve kurtuluş temalarını işleyen romanıdır.",
        available: true
    },
    {
        id: 8,
        title: "İstanbul Hatırası",
        author: "Ahmet Ümit",
        category: "Roman",
        cover: "images/istanbul.jpeg",
        description: "İstanbul Hatırası, Ahmet Ümit'in İstanbul'un tarihi ve kültürel özelliklerini polisiye bir kurguyla anlatan romanıdır.",
        available: true
    },
    {
        id: 9,
        title: "Osmanlı İmparatorluğu Tarihi",
        author: "Von Hammer",
        category: "Tarih",
        cover: "images/osmanli.jpeg",
        description: "Osmanlı İmparatorluğu'nun kuruluşundan yıkılışına kadar olan dönemin detaylı bir incelemesi.",
        available: true
    },
    {
        id: 10,
        title: "Olasılıksız",
        author: "Adam Fawer",
        category: "Bilim",
        cover: "images/olasiliksiz.jpeg",
        description: "Olasılıksız, olasılık, şans, kader ve matematik arasındaki ilişkiyi kurgusal bir hikaye etrafında anlatan bir romandır.",
        available: false
    }
];

window.addEventListener('DOMContentLoaded', () => {
    displayBooks(books);
});

localStorage.setItem('books', JSON.stringify(books));

const bookGrid = document.getElementById('bookGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const modal = document.getElementById('bookModal');
const bookDetails = document.getElementById('bookDetails');
const closeButton = document.querySelector('.close-button');
const availableOnlyCheckbox = document.getElementById('availableOnly');

function displayBooks(booksToShow) {
    bookGrid.innerHTML = '';
    
    if (booksToShow.length === 0) {
      bookGrid.innerHTML = '<p>Aramanızla eşleşen kitap bulunamadı.</p>';
      return;
    }
    
    booksToShow.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.className = 'book-card';
      bookCard.setAttribute('data-id', book.id);
      bookCard.setAttribute('data-category', book.category);
      
      bookCard.innerHTML = `
        <img src="${book.cover}" alt="${book.title}" class="book-cover">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <div class="book-category">${book.category}</div>
      `;
      
      bookCard.addEventListener('click', () => showBookDetails(book));
      bookGrid.appendChild(bookCard);
    });
  }

  document.getElementById("searchButton").addEventListener("click", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const availableOnly = document.getElementById('availableOnly').checked; //Checkbox durumunu al

    const bookCards = document.querySelectorAll(".book-card");

    bookCards.forEach(bookCard => {
        const title = bookCard.querySelector(".book-title").textContent.toLowerCase();
        const author = bookCard.querySelector(".book-author").textContent.toLowerCase();
        const bookCategory = bookCard.getAttribute("data-category");
        const bookId = parseInt(bookCard.getAttribute("data-id")); // Kitap ID'sini al
        const book = books.find(b => b.id === bookId); // books dizisinden ilgili kitabı bul

        const matchesSearch = title.includes(searchTerm) || author.includes(searchTerm);
        const matchesCategory = category === "all" || bookCategory === category;
        const isAvailable = !availableOnly || book.available; // Sadece mevcut kitaplar filtresi

        bookCard.style.display = matchesSearch && matchesCategory && isAvailable ? "block" : "none";
    });
});

function showBookDetails(book) {
    bookDetails.innerHTML = `
        <img src="${book.cover}" alt="${book.title}" class="modal-cover">
        <h2>${book.title}</h2>
        <p><strong>Yazar:</strong> ${book.author}</p>
        <p><strong>Kategori:</strong> ${book.category}</p>
        <p>${book.description}</p>
        <p><strong>Durum:</strong> ${book.available ? "Mevcut" : "Mevcut Değil"}</p>
    `;
    modal.style.display = "block";
}

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
