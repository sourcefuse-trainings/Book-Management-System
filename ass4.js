const books = [];

        function addBook() {
            const title = document.getElementById("title").value;
            const author = document.getElementById("author").value;
            if (title && author) {
                const book = { title, author };
                books.push(book);
                updateBookList();
                document.getElementById("bookForm").reset();
            }
        }

        function updateBookList() {
            const bookList = document.getElementById("bookList");
            bookList.innerHTML = "";
            books.forEach((book, index) => {
                const bookItem = document.createElement("div");
                bookItem.className = "flex justify-between items-center p-4 border rounded-md";
                bookItem.innerHTML = `
                    <div>
                        <h3 class="font-semibold">${book.title}</h3>
                        <p class="text-gray-600">${book.author}</p>
                    </div>
                    <button onclick="removeBook(${index})" class="text-red-500 hover:underline">Remove</button>
                `;
                bookList.appendChild(bookItem);
            });
        }

        function removeBook(index) {
            books.splice(index, 1);
            updateBookList();
        }